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
      players: [],
      deck: deck,
      displayCard: [],
      pot: 0,
      burnCard: [],
      turnStarted: false
    };

    gameTable.players.push({
      name: player.username,
      chips: player.chips,
      status: 'in game',
      robot: false,
      hand: [],
      position: 0,
      bet: 0,
    })

    while (gameTable.players.length < 3) {
      gameTable.players.push({
        name: 'robot-' + gameTable.players.length,
        chips: 1000,
        status: 'in game',
        robot: true,
        hand: [],
        position: gameTable.players.length,
        bet: 0,
      })
    }

    if (player && table && deck) {
      for (let dealingCards = 0; dealingCards < gameTable.players.length * 2; dealingCards++) {
        gameTable.players[dealingCards % gameTable.players.length].hand.push(<string>deck.pop());
      }
    }
    gameTable.burnCard.push(<string>deck.pop());
    for (let dealingCards = 0; dealingCards < 3; dealingCards ++) {
      gameTable.displayCard.push(<string>deck.pop());
    }
    return gameTable
  }

  async joinTable(name: string, username: string): Promise<any> {
    const player = await this.userModel.findOne({username: username}).exec();
    const table = await this.tableModel.findOne({name: name}).exec();
    if (player && table) {
      const game = await this.createTableGame(player, table)
      this.gameTables.push(game)
      return game
    }
    throw new HttpException('No user or table found', HttpStatus.BAD_REQUEST);
  }

  async leaveTable(username: string): Promise<any> {
    for (const gameTable of this.gameTables) {
      for (const player of gameTable.players) {
        if (player.name === username) {
          gameTable.players = gameTable.players.filter(player => player.name !== username)
          throw new HttpException('You leave the table', HttpStatus.OK)
        }
      }
    }
    throw new HttpException('You have to join table to leave it', HttpStatus.BAD_REQUEST)
  }

  async findTable(username: string): Promise<IGameTable> {
    for (const gameTable of this.gameTables) {
      for (const player of gameTable.players) {
        if (player.name === username) {
          return gameTable
        }
      }
    }
    throw new HttpException('No table found', HttpStatus.BAD_REQUEST);
  }

  async play(table: IGameTable, bet: number, fold: boolean): Promise<IGameTable> {
    table.turnStarted = true;

    for (const player of table.players) {
        !bet && player.position === 0 ? player.bet = table.smallBlind : null
        !bet && player.position === 1 ? player.bet = table.bigBlind : null
        player.robot ? player.bet = table.players[1].bet : null
      if (bet) {
          player.robot ? player.bet = table.players[player.position - 1].bet : player.bet = bet
        }
      }
    return table
    }
}
