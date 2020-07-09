<template>
  <div class="md-layout md-gutter md-alignment-center">
    <md-card
      v-for="m in models"
      :key="m.name"
      class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
      md-with-hover
    >
      <md-card-header>
        <div class="md-title">{{ m.name }}</div>
      </md-card-header>

      <md-card-content>{{ m.description }}</md-card-content>
      <md-card-content>
        <md-chip class="md-accent">{{ m.framework }}</md-chip>
        <md-chip v-if="m.license" class="md-primary">{{ m.license }}</md-chip>
      </md-card-content>

      <md-card-actions>
        <md-button @click="showDetails(m.name)">Details</md-button>
        <md-button
          v-if="m.source"
          target="_blank"
          :href="m.source"
          @click="trackDownload(m.name)"
          >Get Model</md-button
        >
      </md-card-actions>
    </md-card>
    <md-dialog-confirm
      :md-active.sync="showGoToDialog"
      md-title="Notice"
      md-content="Hi there, we decided to host the HPA classification models in BioImage.IO -- a dedicated platform for hosting AI models for bioimage analysis. <br> Please check it out!"
      md-confirm-text="Go to BioImage.IO"
      md-cancel-text="Stay here"
      @md-confirm="goToBioImageIO"
    />
  </div>
</template>

<script>
const empty_model = {
  name: "No Model Available",
  tags: [],
  framework: "",
  author: [],
  license: "",
  licenseUrl: "",
  citeAs: "",
  email: "",
  source: "",
  docker: "",
  models: [],
  description: "",
  icon: "",
  readme: "",
};

export default {
  name: "model-zoo",
  data() {
    return {
      models: [empty_model],
      showDetailsDialog: false,
      showGoToDialog: true,
    };
  },
  created() {
    this.store = this.$root.$data.store;
    this.store.getModels().then(models => {
      this.models = models;
    });
  },
  mounted() {
    window.gtag("config", "UA-153763911-1", {
      page_title: "home",
      page_path: "/home",
    });
  },
  methods: {
    goToBioImageIO() {
      window.location.href = "https://bioimage.io/#/?partner=hpa";
    },
    showDetails(id) {
      this.$router.push({ path: "/model/" + id });
    },
    trackDownload(modelName) {
      window.gtag("config", "UA-153763911-1", {
        page_title: modelName,
        page_path: "/download/" + modelName,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-layout-item {
  width: 420px;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
