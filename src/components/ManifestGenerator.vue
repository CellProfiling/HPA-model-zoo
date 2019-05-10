<template>
  <div>
    <form
      novalidate
      class="md-layout md-gutter md-alignment-center"
      @submit.prevent="validateManifest"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Model Manifest</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('modelName')">
                <label for="model-name">Model name</label>
                <md-input
                  id="model-name"
                  v-model="form.modelName"
                  name="model-name"
                  autocomplete="name"
                  :disabled="sending"
                />
                <span v-if="!$v.form.modelName.required" class="md-error"
                  >The model name is required</span
                >
                <span v-else-if="!$v.form.modelName.minLength" class="md-error"
                  >Invalid model name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('source')">
                <label for="source">Source</label>
                <md-input
                  id="source"
                  v-model="form.source"
                  name="source"
                  autocomplete="url"
                  :disabled="sending"
                />
                <span v-if="!$v.form.source.required" class="md-error"
                  >The source is required</span
                >
                <span v-else-if="!$v.form.source.url" class="md-error"
                  >Invalid source</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('author')">
                <label for="author">Author</label>
                <md-input
                  id="author"
                  v-model="form.author"
                  name="author"
                  autocomplete="family-name"
                  :disabled="sending"
                />
                <span v-if="!$v.form.author.required" class="md-error"
                  >The author is required</span
                >
                <span v-else-if="!$v.form.author.minLength" class="md-error"
                  >Invalid author</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('citeAs')">
                <label for="cite-as">Cite as</label>
                <md-input
                  id="cite-as"
                  v-model="form.citeAs"
                  name="cite-as"
                  autocomplete="on"
                  :disabled="sending"
                />
                <span v-if="!$v.form.citeAs.required" class="md-error"
                  >Cite as is required</span
                >
                <span v-else-if="!$v.form.citeAs.minLength" class="md-error"
                  >Invalid cite as</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('scripts.train')">
                <label for="train">Train script</label>
                <md-input
                  id="train"
                  v-model="form.scripts.train"
                  name="train"
                  autocomplete="on"
                  :disabled="sending"
                />
                <span v-if="!$v.form.scripts.train.required" class="md-error"
                  >The train script is required</span
                >
                <span
                  v-else-if="!$v.form.scripts.train.minLength"
                  class="md-error"
                  >Invalid train script</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('scripts.predict')">
                <label for="predict">Predict script</label>
                <md-input
                  id="predict"
                  v-model="form.scripts.predict"
                  name="predict"
                  autocomplete="on"
                  :disabled="sending"
                />
                <span v-if="!$v.form.scripts.predict.required" class="md-error"
                  >The predict script is required</span
                >
                <span
                  v-else-if="!$v.form.scripts.predict.minLength"
                  class="md-error"
                  >Invalid predict script</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Gender</label>
                <md-select
                  id="gender"
                  v-model="form.gender"
                  name="gender"
                  md-dense
                  :disabled="sending"
                >
                  <md-option></md-option>
                  <md-option value="M">M</md-option>
                  <md-option value="F">F</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('icon')">
                <label for="icon">Icon</label>
                <md-input
                  id="icon"
                  v-model="form.icon"
                  name="icon"
                  autocomplete="on"
                  :disabled="sending"
                />
                <span v-if="!$v.form.icon.required" class="md-error"
                  >The icon is required</span
                >
                <span v-else-if="!$v.form.icon.minLength" class="md-error"
                  >Invalid icon</span
                >
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('description')">
            <label for="description">Description</label>
            <md-input
              id="description"
              v-model="form.description"
              name="description"
              autocomplete="on"
              :disabled="sending"
            />
            <span v-if="!$v.form.description.required" class="md-error"
              >The description is required</span
            >
            <span v-else-if="!$v.form.description.minLength" class="md-error"
              >Invalid description</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar v-if="sending" md-mode="indeterminate" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Export</md-button
          >
          <md-button class="md-accent" @click="clearForm()"
            >Clear form</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="formExported"
        >The model {{ lastModel }} was exported with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { validationMixin } from "vuelidate";
import { required, minLength, url } from "vuelidate/lib/validators";

export default {
  name: "ManifestGenerator",
  mixins: [validationMixin],
  data: () => ({
    lastModel: null,
    form: {
      modelName: null,
      author: null,
      citeAs: null,
      source: null,
      scripts: {
        train: null,
        predict: null,
      },
      gender: null,
      description: null,
      icon: null,
    },
    formExported: false,
    sending: false,
    lastUser: null,
  }),
  validations: {
    form: {
      modelName: {
        required,
        minLength: minLength(2),
      },
      author: {
        required,
        minLength: minLength(2),
      },
      citeAs: {
        required,
        minLength: minLength(2),
      },
      source: {
        required,
        url: url(),
      },
      scripts: {
        train: {
          required,
          minLength: minLength(2),
        },
        predict: {
          required,
          minLength: minLength(2),
        },
      },
      description: {
        required,
        maxLength: minLength(3),
      },
      gender: {
        required,
      },
      icon: {
        required,
        minLength: minLength(2),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.modelName = null;
      this.form.author = null;
      this.form.citeAs = null;
      this.form.source = null;
      this.form.scripts.train = null;
      this.form.scripts.predict = null;
      this.form.description = null;
      this.form.gender = null;
      this.form.icon = null;
    },
    exportUser() {
      this.sending = true;
      const user = JSON.stringify(this.form);
      const blob = new Blob([user], { type: "text/plain;charset=utf-8" });
      //const FileSaver = require("file-saver");
      saveAs(blob, "exported_user.json");

      this.lastModel = `${this.form.modelName} ${this.form.author}`;
      this.formExported = true;
      this.sending = false;
    },
    validateManifest() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.exportUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
