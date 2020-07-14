<template>
  <nuxt></nuxt>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'nuxt-property-decorator'

  @Component({
    components: {},
    head: {
      script: [
        {src: 'http://localhost:8098'}
      ]
    }
  })
  export default class Default extends Vue {
    /* Props */

    /* Watch */

    /* Data */

    /* Computed */

    /* Lifecycle */

    /* Methods */

    /* Events/Listeners */
  }
</script>

<style>
  html {
    /*background-color: white;*/
  }
</style>
