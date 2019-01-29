<template>
  <md-app id="app" md-mode="flexible">
    <md-app-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <span class="md-display-1">Human Protein Atlas Model Zoo</span>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <model-zoo />
    </md-app-content>
  </md-app>
</template>

<script>
import ModelZoo from "./components/ModelZoo.vue";

export default {
  name: "app",
  components: {
    ModelZoo
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.md-toolbar {
  padding: 0px !important;
}
</style>
