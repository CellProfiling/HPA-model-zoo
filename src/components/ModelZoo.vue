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
          <div class="md-subhead">It also have a ripple</div>
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
          <md-button>Get Model</md-button>
          <md-button>Run</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
const test_model = {
  name: "Test Model",
  tags: ["PyTorch", "Classification"],
  authors: [],
  citeAs: "",
  source: "",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.",
  icon: ""
};

export default {
  name: "ModelZoo",
  data() {
    return {
      models: [test_model, test_model, test_model]
    };
  },
  mounted() {}
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
