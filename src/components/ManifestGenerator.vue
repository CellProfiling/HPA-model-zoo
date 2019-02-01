<template>
  <div class="md-layout md-gutter md-alignment-center">
    {{message}}
  </div>
</template>

<script>

export default {
  name: "manifest-generator",
  props: {
  },
  data() {
    return {
      message: 'hello'
    };
  },
  methods:{
    sayHello(){
      console.log('hello')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
