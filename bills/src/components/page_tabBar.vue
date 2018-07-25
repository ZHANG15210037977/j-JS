<style>
* {
  padding: 0;
  margin: 0;
}
.tabBar {
  width: 14rem;
  height: 2.5rem;
  position: fixed;
  bottom: 0;
  padding: 0 1rem 0 1rem;
  background-color: #fafbfe;
  border-top: 1px solid #e7e7e6;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
}
.tabBar ul li {
  width: 3.5rem;
  height: 1.9rem;
  padding: 0.3rem 0 0.3rem 0;
  float: left;
  list-style: none;
}
.tabBar ul li i {
  font-size: 1rem;
}
.tabBar ul li p {
  font-size: 0.5rem;
}
</style>

<template>
  <div class="tabBar">
    <ul>
      <li @click="go(0)" :style="{'color':icon_color[0]}">
        <i class="icon iconfont icon-zhuye" ></i>
        <p>主页</p>
        </li> 
      <li @click="go(1)" :style="{'color':icon_color[1]}">
        <i class="icon iconfont icon-zengjiahetong"></i>
        <p>增账</p>
      </li>
      <li @click="go(2)"  :style="{'color':icon_color[2]}" >
        <i class="icon iconfont icon-zhangdan"></i>
        <p>查账</p>
      </li>
      <li @click="go(3)"  :style="{'color':icon_color[3]}" >
        <i class="icon iconfont icon-wuliujinhuo"></i>
        <p>进货</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "tabBar",
  data() {
    return {
      index: 0, //当前标签id
      icon_color: ["#1296db", "#8f8f8f", "#8f8f8f","#8f8f8f"] //tabBar颜色
    };
  },
  methods: {
    go(index) {
      if (index != this.index) {
        this.$set(this.icon_color, this.index, "#8f8f8f"); //原来蓝标签变灰
        this.$set(this.icon_color, index, "#1296db"); //目标标签变蓝

        this.index = index; //当前标签id更新
        switch (index) { //跳转
          case 0:
            this.$router.push({ name: "page_home" });//xxxx
            break;
          case 1:
            this.$router.push({ name: "page_addBills" });
            break;
          case 2:
            this.$router.push({ name: "page_bills" });
            break;
          case 3:
            this.$router.push({ name: "page_purchase" });
            break;
        }
      }
    }
  }
};
</script>
