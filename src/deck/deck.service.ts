import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckService {


  private colors: Array<string> = ['♥️', '♠️', '♦️', '♣️']
  private numbers: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'As'];
  private deck: Array<string> = [];

  async createDeck(): Promise<Array<string>> {
    for (let color of this.colors) {
      for (let num of this.numbers) {
        this.deck.push(`${num} ${color}`);
      }
    }
    this.deck.sort(() => Math.random() - 0.5);
    return this.deck;
  }
}
