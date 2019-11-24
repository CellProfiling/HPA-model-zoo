<template>
  <div class="md-layout md-gutter md-alignment-center">
    <div>
      <div>
        <md-card-header>
          <div v-if="modelInfo" class="md-title">{{ modelInfo.name }}</div>
        </md-card-header>
      </div>
      <div>
        <md-chip v-if="modelInfo && modelInfo.framework" class="md-accent">{{
          modelInfo.framework
        }}</md-chip>
        <md-chip v-for="author in authors" :key="author" class="md-primary">{{
          author
        }}</md-chip>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="docs"
        style="padding-left: 10px; padding-right: 5px;"
        v-html="docs"
      ></div>
      <h3 v-else>Oops, this model has no documentation!</h3>
    </div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
import marked from "marked";

import { loadContent } from "../Helper";

export default {
  name: "model-info",
  data() {
    return {
      docs: "",
      modelsById: null,
      modelInfo: null,
    };
  },
  computed: {
    authors: function() {
      return this.modelInfo ? this.modelInfo.author : [];
    },
  },
  async mounted() {
    this.store = this.$root.$data.store;
    if (!this.store.modelsById) {
      await this.store.getModels();
    }
    this.modelsById = this.store.modelsById;
    this.modelInfo = this.modelsById[this.$route.params.id];
    loadContent(this.modelInfo.readme, this.updateDocs);
  },
  methods: {
    updateDocs(data) {
      data = data.trim();
      this.docs = DOMPurify.sanitize(marked(data));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout-item {
  height: 280px;
  margin-top: 8px;
  margin-bottom: 8px;
  transition: 0.3s $md-transition-stand-timing;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background: md-get-palette-color(purple, 200);
    content: " ";
  }
}
</style>
