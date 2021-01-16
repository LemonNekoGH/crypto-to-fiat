<template>
  <v-app>
    <v-app-bar
        app
        flat>
      <v-app-bar-nav-icon>
        <v-icon>mdi-cash-lock-open</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("appBarTitle") }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},

  data: () => ({
    //
  }),
});
</script>
<style>
.v-app-bar {
  border-bottom: 1px solid #eeeeee !important;
}
</style>
