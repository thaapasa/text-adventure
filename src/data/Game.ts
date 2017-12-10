export interface Game {
  readonly name: string;
  readonly id: string;
}

export interface Scene {
  readonly id: string;
  readonly name: string;
  readonly text: string;
  readonly question?: string;
  readonly choices?: Choice[];
}

export interface Choice {
  readonly text: string;
  readonly sceneId: string;
}
