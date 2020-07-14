<template>
  <h1>SOMETHING {{ this.$route.params }}</h1>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'nuxt-property-decorator'

  @Component({
    components: {}
  })
  export default class Error extends Vue {
    /* Props */

    /* Watch */

    /* Data */

    /* Computed */
    get fixedPath() {
      let path = this.$route.params.pathMatch

      path = path.replace('.html', '')
      path = path.replace('index', '')

      return path
    }

    /* Lifecycle */
    mounted() {
      console.log(this.fixedPath);

      this.$router.push({
        path: '/' + this.fixedPath
      })
    }

    /* Methods */

    /* Events/Listeners */
  }
</script>
