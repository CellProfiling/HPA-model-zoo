<template>
  <md-app id="app" md-mode="flexible">
    <md-app-toolbar class="md-primary app-toolbar">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <img
            class="site-image"
            src="icons/hpa-icon.png"
            alt="HPA Model Zoo"
          />
          <br />
          <span class="site-title">Human Protein Atlas Model Zoo</span>
        </div>
        <div class="md-toolbar-section-end">
          <md-menu md-size="big" md-direction="bottom-end">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item v-if="currentPath != '/'" @click="goHome()">
                <span>Home</span>
                <md-icon>home</md-icon>
              </md-menu-item>
              <md-menu-item v-if="currentPath != '/about/'" @click="goAbout()">
                <span>About</span>
                <md-icon>info</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "app",
  computed: {
    currentPath: function() {
      return this.$route.path;
    },
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    goAbout() {
      this.$router.push({ path: "/about/" });
    },
  },
};
</script>

<style>
:root {
  --md-theme-default-primary: #6c6d6f !important;
  --md-theme-default-accent: #ff5252;
  --md-theme-default-theme: light;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.site-image {
  padding: 10px;
  width: 60px;
}
.site-title {
  font-size: 1.5em;
}
.md-app-toolbar {
  z-index: 99 !important;
}
.md-toolbar {
  padding: 0px !important;
}
</style>
