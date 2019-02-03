<template>
  <div>
    <form novalidate class="md-layout md-gutter md-alignment-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Model Manifest</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('modelName')">
                <label for="model-name">Model name</label>
                <md-input name="model-name" id="model-name" autocomplete="name" v-model="form.modelName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.modelName.required">The model name is required</span>
                <span class="md-error" v-else-if="!$v.form.modelName.minlength">Invalid model name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('source')">
                <label for="source">Source</label>
                <md-input name="source" id="source" autocomplete="url" v-model="form.source" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.source.required">The source is required</span>
                <span class="md-error" v-else-if="!$v.form.source.url">Invalid source</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('author')">
                <label for="author">Author</label>
                <md-input name="author" id="author" autocomplete="family-name" v-model="form.author" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.author.required">The author is required</span>
                <span class="md-error" v-else-if="!$v.form.author.minlength">Invalid author</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('citeAs')">
                <label for="cite-as">Cite as</label>
                <md-input name="cite-as" id="cite-as" autocomplete="on" v-model="form.citeAs" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.citeAs.required">Cite as is required</span>
                <span class="md-error" v-else-if="!$v.form.citeAs.minlength">Invalid cite as</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('scripts')">
                <label for="train">Train script</label>
                <md-input name="train" id="train" autocomplete="on" v-model="form.scripts.train" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.scripts.required">The train script is required</span>
                <span class="md-error" v-else-if="!$v.form.scripts.minlength">Invalid train script</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('scripts')">
                <label for="predict">Predict script</label>
                <md-input name="predict" id="predict" autocomplete="on" v-model="form.scripts.predict" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.scripts.required">The predict script is required</span>
                <span class="md-error" v-else-if="!$v.form.scripts.minlength">Invalid predict script</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Gender</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
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
                <md-input name="icon" id="icon" autocomplete="on" v-model="form.icon" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.icon.required">The icon is required</span>
                <span class="md-error" v-else-if="!$v.form.icon.minlength">Invalid icon</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('description')">
            <label for="description">Description</label>
            <md-input id="description" name="description" autocomplete="on" v-model="form.description" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
            <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid description</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Export</md-button>
          <md-button class="md-accent" v-on:click="clearForm()">Clear form</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="formExported">The model {{ lastModel }} was exported with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { saveAs } from 'file-saver'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength,
    url
  } from 'vuelidate/lib/validators'

  export default {
    name: 'manifest-generator',
    mixins: [validationMixin],
    data: () => ({
      form: {
        modelName: null,
        author: null,
        citeAs: null,
        source: null,
        scripts: {
          train: null,
          predict: null
        },
        gender: null,
        description: null,
        icon: null
      },
      formExported: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        modelName: {
          required,
          minLength: minLength(2)
        },
        author: {
          required,
          minLength: minLength(2)
        },
        citeAs: {
          required,
          minLength: minLength(2)
        },
        source: {
          required,
          url: url()
        },
        scripts: {
          required,
          minLength: minLength(2)
        },
        description: {
          required,
          maxLength: minLength(3)
        },
        gender: {
          required
        },
        icon: {
          required,
          minLength: minLength(2)
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.modelName = null
        this.form.author = null
        this.form.citeAs = null
        this.form.source = null
        this.form.scripts.train = null
        this.form.scripts.predict = null
        this.form.description = null
        this.form.gender = null
        this.form.icon = null
      },
      exportUser () {
        this.sending = true
        const user = JSON.stringify(this.form)
        const blob = new Blob([user], {type: "text/plain;charset=utf-8"})
        const FileSaver = require('file-saver')
        FileSaver.saveAs(blob, "exported_user.json")

        this.lastModel = `${this.form.modelName} ${this.form.author}`
        this.formExported = true
        this.sending = false
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.exportUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
