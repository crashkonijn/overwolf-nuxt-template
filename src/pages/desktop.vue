<template>
  <div class="card">
    <div class="card__header">
      Desktop
    </div>
    <div class="card__body">

    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator'
  import {OWWindow} from "~/../overwolf/odk-ts/ow-window";
  import {Windows} from "~/classes/enums";
  import {ApexFeatures} from "~/classes/features";
  import OverwolfHandler, {Game, OverwolfRunningGameInfo} from "~/classes/overwolfHandler";
  import NewGameEvents = overwolf.games.events.NewGameEvents;
  import InfoUpdates2Event = overwolf.games.events.InfoUpdates2Event;

  @Component({
    components: {}
  })
  export default class Desktop extends Vue {
    /* Props */

    /* Watch */

    /* Data */
    windows: Array<OWWindow> = []
    overwolf: OverwolfHandler

    features: Array<string> = [
      ApexFeatures.team,
      ApexFeatures.death,
      ApexFeatures.kill,
      ApexFeatures.match_state,
      ApexFeatures.me,
      ApexFeatures.revive,
      ApexFeatures.roster,
      ApexFeatures.kill_feed,
      ApexFeatures.rank,
      ApexFeatures.match_summary,
      ApexFeatures.location,
      ApexFeatures.match_info,
      ApexFeatures.phase,
      ApexFeatures.victory,
      ApexFeatures.damage,
      ApexFeatures.inventory,
      ApexFeatures.gep_internal
    ];

    /* Computed */

    /* Lifecycle */
    mounted() {

      this.overwolf = new OverwolfHandler({
        onEvent: this.onEvent,
        onInfo: this.onInfo,
        onGameStarted: this.onGameStarted,
        onGameEnded: this.onGameEnded
      })

      this.windows[Windows.desktop] = new OWWindow(Windows.desktop.toLowerCase());
      this.windows[Windows.desktop].restore();

      this.run();
    }

    /* Methods */
    async run() {
      let info = await OverwolfRunningGameInfo.get()
      const currWindow = info.isGameRunning(Game.ApexLegends) ? Windows.ingame : Windows.desktop;

      this.windows[currWindow].restore();
    }

    /* Events/Listeners */
    onEvent(events: NewGameEvents) {
      events.events.forEach((event) => {
        console.log(event);
      })
    }

    onInfo(info: InfoUpdates2Event) {
      console.log(info);
    }

    async onGameStarted() {
      console.log('onGameStarted');
      await this.overwolf.setFeatures(this.features)
    }

    async onGameEnded() {
      console.log('onGameEnded');
    }
  }
</script>
