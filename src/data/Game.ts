export interface Game {
  readonly name: string;
  readonly description: string;
  readonly id: string;
  readonly startSceneId: string;
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
