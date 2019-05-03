<template>
  <div>
    {{ metric }}
  </div>
</template>

<script>
import marked from "marked";

import { loadContent } from "../Helper";

export default {
  name: "model-about",
  data() {
    return {
      metric: "",
    };
  },
  mounted() {
    this.store = this.$root.$data.store;
    const metricPath = process.env.BASE_URL + "about/metric.md"
    loadContent(metricPath, this.updateMetric);
  },
  created() {
    this.marked = marked;
  },
  methods: {
    updateMetric(data) {
      this.metric = data;
    }
  }
};
</script>
