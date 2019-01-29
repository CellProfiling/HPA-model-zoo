<template>
  <div class="md-layout md-gutter md-alignment-center">
    <md-card
      v-for="m in models"
      :key="m.name"
      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
      md-with-hover
    >
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ m.name }}</div>
          <!-- <div class="md-subhead">{{ m.name }}</div> -->
          <md-chip
            v-for="tag in m.tags"
            :key="tag"
            class="md-primary"
            md-clickable
            >{{ tag }}</md-chip
          >
        </md-card-header>

        <md-card-content>
          {{ m.description }}
        </md-card-content>

        <md-card-actions>
          <md-button target="_blank" :href="m.source">Get Model</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios';

const empty_model = {
  name: "No Model Available",
  tags: [],
  authors: [],
  citeAs: "",
  source: "",
  description:"",
  icon: ""
};

export default {
  name: "ModelZoo",
  data() {
    return {
      models: [empty_model]
    };
  },
  mounted() {
    axios.get('https://cellprofiling.github.io/HPA-model-zoo/models-zoo-manifest.json').then(response => {
      if (response && response.data && response.data.models) {
        const manifest = response.data
        const models = manifest.models.filter((p) => {
          return !p.disabled
        })
        this.models = models
      }
    });
  }
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
