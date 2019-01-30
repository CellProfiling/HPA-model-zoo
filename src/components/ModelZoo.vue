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
          <md-button @click="showDetails(m.name)">Details</md-button>
          <md-button v-if="m.source" target="_blank" :href="m.source">Get Model</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    <!-- <md-dialog :md-active.sync="showDetailsDialog" :md-click-outside-to-close="false" :md-close-on-esc="false">
      <md-dialog-content>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDetailsDialog=false">Close</md-button>
      </md-dialog-actions>
    </md-dialog> -->
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
  name: "model-zoo",
  data() {
    return {
      models: [empty_model],
      showDetailsDialog: false
    };
  },
  created(){
    this.store = this.$root.$data.store
    this.store.getModels().then((models)=>{
      this.models = models
    })
  },
  mounted() {
  },
  methods:{
    showDetails(id){
      let routeData = this.$router.resolve({path: '/model/'+id});
      window.open(routeData.href, '_blank');
    }
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
