<template>
  <div class="about">
    <div class="md-layout md-gutter md-alignment-left">
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="about" v-html="about"></div>
      <h3 v-else>This page has no text yet!</h3>
    </div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
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
  methods: {
    updateAbout(data) {
      data = data.trim();
      this.about = DOMPurify.sanitize(marked(data));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  text-align: left;
  padding-left: 10px;
  padding-right: 5px;
}
</style>
