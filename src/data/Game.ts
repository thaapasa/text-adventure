export interface Game {
  readonly name: string;
  readonly description: string;
  readonly id: string;
  readonly startSceneId: string;
  readonly image: string | undefined;
}

export interface Scene {
  readonly id: string;
  readonly name: string;
  readonly text: string;
  readonly image: string | undefined;
  readonly question?: string;
  readonly choices?: Choice[];
}

export interface Choice {
  readonly text: string;
  readonly sceneId: string;
}
