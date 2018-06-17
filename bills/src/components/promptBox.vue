
<template>
    <transition name="prompt-slide">
      <div class="prompt-message clear-float " :style="{'z-index':z_index}" v-if="status">
                <div class="prompt" :style="{'background-color':bg_color}">{{title}}</div>
                <div class="message">{{message}}</div>
            </div>
    </transition>
</template>


<script>
export default {
  name: "promptBox",
  data() {
    return {
      z_index: 2000,
      bg_color: "", //title背景色
      title: "" //title内容
    };
  }, //提示内容  提示状态  组件状态
  props: ["message", "type", "status"],
  created() {
    //组件提示信息初始化
    if (this.type) {
      (this.title = "√"), (this.bg_color = "#13CE66");
    } else {
      (this.title = "×"), (this.bg_color = "#FF4949");
    }
  },
  watch: {
    //监听组件提示信息变化
    type: function() {
      if (this.type) {
        (this.title = "√"), (this.bg_color = "#13CE66");
      } else {
        (this.title = "×"), (this.bg_color = "#FF4949");
      }
    }
  }
};
</script>

<style>
/*过渡起始样式*/
.prompt-slide-enter,
.prompt-slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

/*过渡终止样式*/
.prompt-slide-enter-to,
.prompt-slide-leave {
  opacity: 1;
  transform: translateY(0);
}

/*过渡过程样式*/
.prompt-slide-enter-active,
.prompt-slide-leave-active {
  transition: all 0.8s ease;
}

.prompt-message {
  width: 9rem;
  height: 1.54rem;
  position: fixed;
  top: 3.773rem;
  left: 50%;
  margin-left: -4.1rem;
  background-color: #fff;
  border: 1px solid #8391a5;
  box-shadow: 0 0 5px #000;
}

.prompt-message .prompt {
  box-sizing: border-box;
  width: 1.55rem;
  height: 1.55rem;
  line-height: 1.09rem;
  padding: 6px;
  font-size: 0.928rem;
  font-weight: bold;
  color: #fff;
  float: left;
  text-align: center;
}
.prompt-message .message {
  padding-left: 0.773rem;
  height: 0.773rem;
  margin: 0.387rem 0;
  float: left;
  line-height: 0.773rem;
  font-size: 0.58rem;
  color: #8391a5;
}
</style>
