<template>
  <div>
    <top-nav></top-nav>
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Resource from 'vue-resource';
  import Router from 'vue-router';
  import topNav from './page_topNav';
  import tabBar from './page_tabBar';



  export default {
    name: "page",
    data() {
      return {

      }
    },
    components: {
      tabBar,
      topNav
    }


  }

</script>


<style>


</style>
