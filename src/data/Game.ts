export interface Game {
  readonly name: string;
  readonly description: string;
  readonly id: string;
  readonly startSceneId: string | null;
  readonly image: string | null;
}

export interface Scene {
  readonly id: string;
  readonly name: string;
  readonly text: string;
  readonly image: string | null;
  readonly question?: string;
  readonly choices?: Choice[];
}

export interface Choice {
  readonly text: string;
  readonly sceneId: string;
}
