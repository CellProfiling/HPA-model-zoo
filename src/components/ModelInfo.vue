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
      <md-progress-bar v-else md-mode="indeterminate"></md-progress-bar>
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
.md-progress-bar {
  margin: 24px;
}
</style>
