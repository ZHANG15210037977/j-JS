<style >
    .register-box {
      width: 9.6rem;
      height: 10.6rem;
      padding: 1.16rem 2.32rem;
      margin: 6.01rem auto;
      border: 1px solid #ddd;
      -webkit-box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
    }
    
    .register-box .title {
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.62rem;
      font-weight: 400;
      color: #000;
      text-align: center;
      border-bottom: 1px solid #000;
    }
    
    .register-box form > input {
      width: 100%;
      margin-top: 1.16rem;
      height: 1.16rem;
      line-height: 1.16rem;
      text-indent: 0.31rem;
      border: 1px solid #ccc;
    }
    .register-box form .form_row {
      width: 100%;
      margin-top: 1.16rem;
      height: 0.78rem;
      line-height: 0.78rem;
      font-size: 0.47rem;
    }
    
    .register-box form .form_row input {
      width: 0.78rem;
      height: 0.78rem;
      margin-left: -5.5rem;
    }
    .register-box form .form_row label {
      position: relative;
      top: -0.194rem;
      left: 0.39rem;
      cursor: pointer;
    }
    
    .register-box form .buttom {
      width: 7.31rem;
      height: 1.16rem;
      margin: 1.13rem auto;
      background-color: #1A81D1;
      font-size: 0.542rem;
      color: #fff;
      line-height: 1.16rem;
      border-radius: 0.542rem;
      text-align: center;
      cursor: pointer;
    }
    </style>

<template>
    <div class="register-box">
            <div class="title">
                欢迎使用小会计
            </div>

            <form>
                <input type="number" name="mobile" placeholder="请输入手机号" v-model="user_name">
                <input type="password" name="user_password" placeholder="请输入密码" v-model="pwd">
                <div class="form_row">
                    <input type="checkbox" v-model="caching_key" id="autoLogin">
                    <label for="autoLogin">记住账号密码</label>
                </div>
                <div class="buttom" @click="buttom" >登陆</div>
            </form>

            <prompt-box :message = "prompt.message" :type = "prompt.type" :status = "prompt.status"></prompt-box>
        </div>


</template>

<script>
import Vue from "vue";
import promptBox from "./promptBox";
import Resource from "vue-resource";
import Router from "vue-router";
Vue.use(Resource);
Vue.use(Router);
let url = "http://blog.mixvjiezi.xyz/bill/";
export default {
  name: "login",
  data() {
    return {
      caching_key: false, //记住密码开关
      user_name: null,
      pwd: null,
      prompt: {
        message: "", //提示内容
        type: false, //提示状态
        status: false, //显隐控制
        key: true //动画开关
      }
    };
  },
  components: {
    promptBox
  },
  methods: {
    prompt_change(message, type = false) {
      //提示框控制函数
      if (this.prompt.key) {
        //动画持续期间，不添加新的提示
        this.prompt.key = false;
        this.prompt.message = message;
        this.prompt.type = type;
        this.prompt.status = true;

        setTimeout(() => {
          this.prompt.status = false;
          this.prompt.key = true;
        }, 3000);
      }
    },
    buttom() {
      if ((this.user_name + "").length < 11) {
        this.prompt_change("请输入正确手机号");
        return;
      }

      if ((this.pwd + "").length < 6) {
        this.prompt_change("请输入6位数以上密码");
        return;
      }

      let that = this;
      this.$http
        .post(url + "login.php", {
          //http请求登陆验证
          user_name: this.user_name,
          pwd: this.pwd
        })
        .then(res => {
          if (res.data.status) {
            //登陆成功

            localStorage.user_data = JSON.stringify(res.data.data); //账户数据写入缓存
            if (this.caching_key) {
              //记住账号密码
              localStorage.user_message = JSON.stringify({
                user_name: this.user_name,
                pwd: this.pwd
              });
            } else {//不记住账号密码移除缓存信息
              if (localStorage.user_message) {
                localStorage.removeItem("user_message");
              }
            }

          this.$router.push({path:'page'});
          } else {
            //错误提示
            this.prompt_change(res.data.info);
          }
        });
    }
  },
  created() {
    if (localStorage.user_message) {
      //账号信息存在，直接读取
      let user_message = JSON.parse(localStorage.user_message);
      this.user_name = user_message.user_name;
      this.pwd = user_message.pwd;
      this.caching_key = true;
    }
  }
};
</script>




