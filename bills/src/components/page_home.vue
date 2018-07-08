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
          <img src="../assets/head100.jpg" width="100" height="100" rel=''>
          <div class="title">
              <p class="p1">{{user_data.user.name}}</p>
              <p class="p2">{{user_data.user.user}}</p>
          </div>
    </div>
    <div class="list_linkBtn">
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @touchend="list_btn_up($event)">
            <i class="icon iconfont icon-xianjin" style="color:#F3D457"></i>
            <p class="title">现金</P>
            <p class="message">{{user_data.user.morey}} 元</P>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @touchend="list_btn_up($event)">
            <i class="icon iconfont icon-shouyi" style="color:#E4888E"></i>
            <p class="title">总收益</P>
            <p class="message">{{user_data.user.profit}} 元</P>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @touchend="list_btn_up($event,1)">
            <i class="icon iconfont icon-wodezhangdan" style="color:#44A7DF"></i>
            <p class="title">今日账单</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @touchend="list_btn_up($event,2)">
            <i class="icon iconfont icon-kucun" style="color:#0CB05B"></i>
            <p class="title">库存情况</P>
            <i class="icon iconfont icon-enter more"></i>
        </div>
        <div class="row" @touchstart="list_btn_down($event)" @touchmove = "list_btn_leave($event)" @touchend="list_btn_up($event,3)">
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
      user_data: null,
      transfer_key: false //跳转控制钥匙，用于控制手指移除node区域时不跳转，在区域内手指抬起跳转。
    };
  },
  methods: {
    list_btn_down(event) {
      let node = event.currentTarget;
      if (event.touches.length < 2) {
        node.style.backgroundColor = "#cfcfcf";
        this.transfer_key = true;
      }
    },
    list_btn_leave(event) {
      console.log(event);
      let node = event.currentTarget; //获取触发node
      let div_Y_top = node.offsetTop; //获取触发node 上边框Y坐标
      let div_Y_right = node.offsetWidth; //获取触发node 左边框X坐标
      let div_Y_bottom = div_Y_top + node.offsetHeight; //计算触发node 下边框Y坐标

      let touch_Y = event.targetTouches[0].pageY; //获取手指Y坐标
      let touch_X = event.targetTouches[0].pageX; //获取手指X坐标

      if (
        touch_Y < div_Y_top + 20 ||
        touch_Y > div_Y_bottom - 20 ||
        touch_X < 20 ||
        touch_X > div_Y_right - 20
      ) {
        //判断是否移动超出，超出复原。区域为触发对象上下左右各缩小20px区域，为了避免划出显示bug
        node.style.backgroundColor = null; //按钮恢复
        this.transfer_key = false; //不传送
      }
    },
    list_btn_up(event, index = 0) {
      let node = event.currentTarget; //获取触发node
      node.style.backgroundColor = null; //按钮复原
      if (this.transfer_key) {
        //判断是否跳转
        switch (index) { //跳转
          case 1:
            this.$router.push({ name: "page_home_todayBill" });
            break;
          case 2:
            this.$router.push({ name: "page_home_stockMessage" });
            break;
          case 3:
            this.$router.push({ name: "page_home_customerMessage" });
            break;
        }
      }
    }
  },
  created() {
    this.user_data = JSON.parse(sessionStorage.user_data);
    this.transfer_key = false;
  }
};
</script>
