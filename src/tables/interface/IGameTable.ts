export interface IGameTable {
  name: string;
  smallBlind: number;
  bigBlind: number;
  players: Array<IPlayers>;
  deck: Array<string>;
  displayCard: Array<string>;
  pot: number;
  burnCard: Array<string>;
  turnStarted: boolean;
}

interface IPlayers {
  name: string;
  status: string;
  robot: boolean;
  chips: number;
  hand: Array<string>;
  position: number;
  bet: number,
}
