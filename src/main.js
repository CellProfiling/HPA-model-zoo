import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import VueRouter from 'vue-router'
import ModelZoo from "./components/ModelZoo.vue";
import ModelInfo from "./components/ModelInfo.vue";
import ManifestGenerator from "./components/ManifestGenerator.vue";
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueMaterial);

// register
Vue.component('model-zoo', ModelZoo)
Vue.component('model-info', ModelInfo)
Vue.component('manifest-generator', ManifestGenerator)

Vue.config.productionTip = false;


const routes = [
  { path: '/', component: ModelZoo },
  { path: '/model/:id', component: ModelInfo },
  { path: '/generator', component: ManifestGenerator }
]

const router = new VueRouter({
  routes
})

var absolutePath = function(href) {
    var link = document.createElement("a");
    link.href = href;
    return link.href;
}

const store = {}
const getModels = ()=>{
  return new Promise((resolve, reject)=>{
    let baseUrl = '/';
    if (process.env.NODE_ENV === 'production') {
       baseUrl = 'https://cellprofiling.github.io/HPA-model-zoo/'
    }
    axios.get(baseUrl + 'models-zoo-manifest.json').then(response => {
      if (response && response.data && response.data.models) {
        const manifest = response.data
        const models = manifest.models.filter((p) => {
          return !p.disabled
        })
        store.models = models
        store.modelsById = {}
        for(let i=0;i<models.length;i++){
          store.modelsById[models[i].name] = models[i]
        }
        resolve(models)
      }
      else{
        store.models = null
        store.modelsById = null
        reject('Error occurred')
      }
    }).catch((e)=>{
      store.models = null
      store.modelsById = null
      console.error(e)
      reject('Error occurred:' + e.toString())
    });
  })
}
store.getModels = getModels

new Vue({
  render: h => h(App),
  router,
  data: {
    store: store
  }
}).$mount("#app");
