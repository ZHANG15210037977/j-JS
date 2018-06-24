<style>
* {
  padding: 0;
  margin: 0;
}

.topNav {
  width: 16rem;
  height: 1.5rem;
  background-color: #1a81d1;
  position: fixed;
  top: 0;
  color: #ffffff;
}
.topNav .return {
  float: left;
  width: 3.2rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.topNav .return i.icon-fanhui1 {
  font-size: 1rem;
}
.topNav .logOut {
  float: right;
  width: 3.2rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.topNav .logOut i.icon-zhuxiaologout9 {
  font-size: 0.9rem;
}
.box{
  width: 16rem;
  height: 1.5rem;
}
</style>
<template>
  <div>
    <div class="box">

    </div>
    <div class="topNav">
    <div @click="retuend" class="return">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div @click="logOut" class="logOut">
      <i class="icon iconfont icon-zhuxiaologout9"></i>
    </div>
  </div>
  </div>
</template>
<script>
import Vue from "vue";
import Resource from "vue-resource";
import Route from "vue-router";
Vue.use(Resource);
Vue.use(Route);

export default {
  name: "topNav",
  data() {
    return {};
  },
  methods: {
    retuend() {
      this.$router.go(-1);
    },
    logOut() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
