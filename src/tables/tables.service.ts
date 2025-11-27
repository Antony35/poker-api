import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITable } from './interface/ITable';
import { Table } from './schemas/table.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../users/schemas/user.schemas';
import { IUser } from '../users/interface/IUser';
import { DeckService } from '../deck/deck.service';
import { IGameTable } from './interface/IGameTable';

@Injectable()
export class TablesService {

  public gameTables: Array<IGameTable> = [];

  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<ITable>,
    @InjectModel(Users.name) private readonly userModel: Model<IUser>,
    private readonly deckService: DeckService
  ) {}

  async findAll(): Promise<ITable[]> {
    return await this.tableModel.find().exec()
  }

  async createTableGame(player: IUser, table: ITable): Promise<IGameTable> {
    const deck = await this.deckService.createDeck()
    const gameTable: IGameTable = {
      name: table.name,
      smallBlind: table['small_blind'],
      bigBlind: table['big_blind'],
      players: [
        {
          name: player.username,
          chips: player.chips,
          status: 'active',
          hand: []
        },
        {
          name: 'robot-one',
          chips: 1000,
          status: 'active',
          hand: []
        },
        {
          name: 'robot-two',
          chips: 1000,
          status: 'active',
          hand: []
        },
      ],
      deck: deck,
      displayCard: [],
      pot: 0,
      burnCard: []
    };
    if (player && table && deck) {
      for (let dealingCards = 0; dealingCards < gameTable.players.length * 2; dealingCards++) {
            gameTable.players[dealingCards % gameTable.players.length].hand.push(<string>deck.pop());
      }
    }
    console.log(deck.pop);
    gameTable.burnCard.push(<string>deck.pop());
    for (let dealingCards = 0; dealingCards < 3; dealingCards ++) {
      gameTable.displayCard.push(<string>deck.pop());
    }
    console.log(gameTable);
    return gameTable
  }

  async joinTable(name: string, username: string): Promise<any> {
    const player = await this.userModel.findOne({username: username}).exec();
    const table = await this.tableModel.findOne({name: name}).exec();
    if (player && table) {
      return this.gameTables.push(await this.createTableGame(player, table));
    }
    throw new HttpException('No user or table found', HttpStatus.BAD_REQUEST);
  }
}
