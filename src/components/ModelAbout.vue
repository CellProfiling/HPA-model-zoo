<template>
  <div class="about">
    <div class="md-layout md-gutter md-alignment-left">
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="about && about.trim() != ''"
        v-html="marked(about, { sanitize: true })"
      ></div>
      <h3 v-else>This page has no text yet!</h3>
    </div>
  </div>
</template>

<script>
import marked from "marked";

import { loadContent } from "../Helper";

export default {
  name: "model-about",
  data() {
    return {
      about: "",
    };
  },
  mounted() {
    this.store = this.$root.$data.store;
    const aboutPath = process.env.BASE_URL + "about/about.md";
    loadContent(aboutPath, this.updateAbout);
  },
  created() {
    this.marked = marked;
  },
  methods: {
    updateAbout(data) {
      this.about = data;
    },
  },
};
</script>
