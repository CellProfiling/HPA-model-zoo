<template>
  <div class="info-markdown">
    <div class="md-layout md-gutter md-alignment-left">
      <div>
        <div>
          <md-card-header>
            <div v-if="modelInfo" class="md-title">{{ modelInfo.name }}</div>
          </md-card-header>
        </div>
        <div class="md-layout-item">
          <md-chip v-if="modelInfo && modelInfo.framework" class="md-accent">{{
            modelInfo.framework
          }}</md-chip>
          <md-chip v-for="author in authors" :key="author" class="md-primary">{{
            author
          }}</md-chip>
        </div>
        <div v-if="modelInfo" class="md-layout-item">
          <md-chip v-for="tag in modelInfo.tags" :key="tag">
            {{ tag }}
          </md-chip>
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
    window.gtag("config", "UA-153763911-1", {
      page_title: this.$route.params.id,
      page_path: "/model/" + this.$route.params.id,
    });
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
.info-markdown {
  text-align: left;
  padding-left: 10px;
  padding-right: 5px;
}
.md-progress-bar {
  margin: 24px;
}
.md-layout-item {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
