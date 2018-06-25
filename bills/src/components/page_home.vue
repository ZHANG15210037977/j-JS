<style>
.user_message {
  width: 14rem;
  height: 3rem;
  padding: 0.1rem 1rem 0.9rem;
  background-color: #1a81d1;
  text-align: left;
}

.user_message img {
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 0.4rem;
  float: left;
  border: 0.1rem solid #61abe4;
}
.user_message .title {
  position: relative;
  top: 0.5rem;
  width: 5rem;
  height: 2rem;
  line-height: 1rem;
  margin-left: 4rem;
}
.user_message .title .p1 {
  font-size: 0.7rem;
  color: #f4f9fd;
  letter-spacing: 0.2rem;
}
.user_message .title .p2 {
  font-size: 0.4rem;
  color: #98c6ea;
}
.list_linkBtn {
  width: 16rem;
  margin-top: 1rem;

  margin-bottom: 3rem;
  background-color: #ffffff;
}
.list_linkBtn .row {
  width: 14rem;
  height: 2.5rem;
  padding: 0.2rem 1rem;
  line-height: 2.5rem;
  text-align: left;
  border-bottom: 0.05rem solid #f1f1f1;
}
.list_linkBtn .row i {
  float: left;
  font-size: 0.8rem;
}

.list_linkBtn .row .title {
  font-size: 0.7rem;
  margin-left: 1.3rem;
}

.list_linkBtn .row .message {
  float: right;
  margin-top: -2.4rem;
  line-height: 2.5rem;
  font-size: 0.5rem;
  color: #8f8f8f;
}
.list_linkBtn .row i.more {
  float: right;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: -2.4rem 0 0 0;
}
</style>

<template>
<div>
    <div class="user_message">
        <div>
            <img src="../assets/head100.jpg" width="100" height="100" rel=''>
            <div class="title">
                <p class="p1">{{user_data.user.name}}</p>
                <p class="p2">{{user_data.user.user}}</p>
            </div>
        </div>
    </div>
    <div class="list_linkBtn">
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event)">
            <i class="icon iconfont icon-xianjin" style="color:#F3D457"></i>
            <p class="title">现金</P>
            <p class="message">{{user_data.user.morey}} 元</P>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event)">
            <i class="icon iconfont icon-shouyi" style="color:#E4888E"></i>
            <p class="title">总收益</P>
            <p class="message">{{user_data.user.profit}} 元</P>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event,1)">
            <i class="icon iconfont icon-wodezhangdan" style="color:#44A7DF"></i>
            <p class="title">今日账单</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event,2)">
            <i class="icon iconfont icon-kucun" style="color:#0CB05B"></i>
            <p class="title">库存情况</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event,3)">
            <i class="icon iconfont icon-huowu" style="color:#FF7E36"></i>
            <p class="title">货物信息</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @mouseup="list_btn_up($event,4)">
            <i class="icon iconfont icon-customer" style="color:#FF9800"></i>
            <p class="title">客户信息</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "page_home",
  data() {
    return {
      user_data: null
    };
  },
  methods: {
    list_btn_down(event) {
      let node = event.currentTarget;
      node.style.backgroundColor = "#cfcfcf";
    },
    list_btn_leave(event) {
      let node = event.currentTarget;
      let div_Y_top = node.offsetTop;
      let div_Y_bottom = div_Y_top + node.offsetHeight;
      let touch_Y = event.touches[0].pageY;
      if (touch_Y < div_Y_top || touch_Y > div_Y_bottom) {
        node.style.backgroundColor = null;
      }
    },
    list_btn_up(event,index = 0) {
      let node = event.currentTarget;
      node.style.backgroundColor = null;

      switch (index) { //跳转
        case 1:
          this.$router.push({ name: "page_home_todayBill" });
          break;
        case 2:
          this.$router.push({ name: "page_home_stockMessage" });
          break;
        case 3:
          this.$router.push({ name: "page_home_goodsMessage" });
          break;
        case 4:
          this.$router.push({ name: "page_home_customerMessage" });
          break;
      }
    }
  },
  created() {
    this.user_data = JSON.parse(sessionStorage.user_data);
  }
};
</script>
