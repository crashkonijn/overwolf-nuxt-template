import {OWGameListener} from "../../overwolf/odk-ts/ow-game-listener";
import RunningGameInfo = overwolf.games.RunningGameInfo;
import {OWGames} from "../../overwolf/odk-ts/ow-games";
import NewGameEvents = overwolf.games.events.NewGameEvents;
import InfoUpdates2Event = overwolf.games.events.InfoUpdates2Event;

export default class OverwolfHandler {
  private _gameListener: OWGameListener
  public _onGameStarted?: (info: overwolf.games.RunningGameInfo) => void | undefined;
  public _onGameEnded?: (info: overwolf.games.RunningGameInfo) => void;
  public _onEvent?: (event: NewGameEvents) => void
  public _onInfo?: (event: InfoUpdates2Event) => void

  constructor(input: Partial<OverwolfHandlerInput>) {
    this._onGameStarted = input.onGameStarted
    this._onGameEnded = input.onGameEnded
    this._onEvent = input.onEvent
    this._onInfo = input.onInfo

    this._gameListener = new OWGameListener({
      onGameStarted: this.onGameStarted.bind(this),
      onGameEnded: this.onGameEnded.bind(this)
    });

    this._gameListener.start();

    overwolf.games.events.onNewEvents.addListener(this.onEvent.bind(this));
    overwolf.games.events.onInfoUpdates2.addListener(this.onInfo.bind(this));
  }

  private onGameStarted(info: overwolf.games.RunningGameInfo) {
    this._onGameStarted?.(info)
  }

  private onGameEnded(info: overwolf.games.RunningGameInfo) {
    this._onGameEnded?.(info)
  }

  private onEvent(event: NewGameEvents) {
    this._onEvent?.(event)
  }

  private onInfo(event: InfoUpdates2Event) {
    this._onInfo?.(event)
  }

  public setFeatures(features: Array<string>) {
    return new Promise((resolve) => {
      overwolf.games.events.setRequiredFeatures(features, (info) => {
        // @ts-ignore
        if (info.status == "error")
        {
          //console.log("Could not set required features: " + info.reason);
          //console.log("Trying in 2 seconds");
          setTimeout(() => {
            this.setFeatures(features).then(() => {
              resolve()
            })
          }, 2000);

          return;
        }

        resolve();
      });
    })
  }
}

export class OverwolfHandlerInput {
  public onGameStarted: (info: overwolf.games.RunningGameInfo) => void;
  public onGameEnded: (info: overwolf.games.RunningGameInfo) => void;
  public onEvent: (event: NewGameEvents) => void
  public onInfo: (event: InfoUpdates2Event) => void
}

export class OverwolfRunningGameInfo {
  public readonly info: RunningGameInfo;

  constructor(info: RunningGameInfo) {
    this.info = info;
  }

  public isGame(game: Game) {
    return this.info.classId === game
  }

  public isGameRunning(game: Game) {
    return this.info.isRunning && this.isGame(game)
  }

  public static async get(): Promise<OverwolfRunningGameInfo | null> {
    return new OverwolfRunningGameInfo(await OWGames.getRunningGameInfo())
  }
}

export enum Game {
  ApexLegends = 21566
}
