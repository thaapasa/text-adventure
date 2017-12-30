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

export type ConditionType = 'hasItem' | 'doesNotHaveItem';

export interface Condition {
  readonly type: ConditionType;
  readonly item: string;
}

export type ActionType = 'receiveItem' | 'loseItem';

export interface Action {
  readonly type: ActionType;
  readonly item: string;
}

export interface Item {
  readonly id: string;
  readonly name: string;
  readonly image: string;
}

export interface Choice {
  readonly text: string;
  readonly sceneId: string;
  readonly conditions: Condition[];
  readonly actions: Action[];
}
