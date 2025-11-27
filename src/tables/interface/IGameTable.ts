export interface IGameTable {
  name: string;
  smallBlind: number;
  bigBlind: number;
  players: Array<IPlayers>,
  deck: Array<string>,
  displayCard: Array<string>,
  pot: number,
  burnCard: Array<string>,
}

interface IPlayers {
  name: string;
  status: string;
  chips: number;
  hand: Array<string>;
}
