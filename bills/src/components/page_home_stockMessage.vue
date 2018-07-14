<style>
.control_group {
  width: 16rem;
  height: 4.5rem;
  border-bottom: #d7c9c9 solid 0.05rem;
}
.control_group .search {
  position: relative;
  width: 14rem;
  height: 2rem;
  padding: 0 1rem 0.5rem;
  background-color: #1a81d1;
}
.control_group .search input {
  width: 14rem;
  height: 1.5rem;
  background-color: rgba(125, 183, 246, 0.6);
  border: none;
  border-radius: 0.75rem;
  font-size: 0.57rem;
  text-align: center;
  letter-spacing: 0.2rem;
  color: #ffffff;
}
.control_group .search input:focus {
  border: none;
  border-radius: 0.75rem;
  outline: none;
}
.control_group .search .icon_text {
  position: absolute;
  top: 0;
  left: 6rem;
  text-align: center;
}
.control_group .search .icon_text i {
  float: left;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #ffffff;
}
.control_group .search .icon_text label {
  line-height: 1.5rem;
  font-size: 0.57rem;
  color: #ffffff;
}
.control_group .sort_add {
  position: relative;
  width: 16rem;
  height: 2rem;
  background-color: #ffffff;
}
.control_group .sort_add .sort_buttom div {
  width: 2.6rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.6rem;
  text-align: center;
  float: left;
}
.control_group .sort_add div {
  width: 7.975rem;
  height: 2rem;
  line-height: 2rem;
  float: left;
  text-align: center;
  margin: 0;
}

.control_group .sort_add div a {
  text-decoration: none;
}

.control_group .sort_add div p {
  font-size: 0.5rem;
  color: #1f1f1f;
}
.control_group .sort_add div p i {
  font-size: 0.5rem;
  margin-left: 0.2rem;
  line-height: 1.9rem;
}

.message_list {
  width: 16rem;
  margin-bottom: 2.5rem;
  background-color: #ffffff;
  overflow: hidden;
}
.message_list .row {
  position: relative;
  width: 18.5rem;
  padding-left: 0.5rem;
  height: 2.5rem;
  transition: left 3s ease;
}
.message_list .move {
  left: -2.5rem;
}
.message_list .row > div {
  float: left;
  height: 2.5rem;
  width: 3rem;
  line-height: 2.5rem;
  text-align: center;
  font-size: 0.7rem;
}
.message_list .row > div.gName {
  width: 4.5rem;
  line-height: normal;
  display: table;
}
.message_list .row > div.gName div {
  width: 4.5rem;
  line-height: normal;
  display: table-cell;
  vertical-align: middle;
}
.message_list .row .lt {
  width: 4.5rem;
}
.message_list .row .null {
  width: 0.5rem;
}
.message_list .row .btn {
  margin-left: 0.5rem;
  background-color: red;
}
.message_list .title {
  height: 1.5rem;
}
.message_list .title > div {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.6rem;
}
.message_list .title > div i {
  margin-right: 0.1rem;
}
</style>

<template>
    <div>
        <div class="control_group">
            <div class="search">
                <input id="search" type="text"  v-model="search_key"  @focus="search_focus()" @blur="search_blur()" @input="search_list()" >
                <div v-show="(!search_key && search_icon_key)" class="icon_text">
                    <i  class="icon iconfont icon-search"></i>
                    <label for="search">输入查找信息</label>
                </div>
            </div>

            <div class="sort_add">
                <div @touchstart="touch_start($event)" @touchend="goods_sort_end($event,1)"  style="border-right: #d7c9c9 solid 0.05rem">
                    <p>还原<i class="icon iconfont icon-zhongzhi"></i></p>
                </div>
                <div>
                    <router-link to="/page_home_addGood"><p>添加<i class="icon iconfont icon-zengjia" ></i></p></router-link>
                </div>
            </div>
        </div>


        <div class="message_list">
          <div class="row title">
            <div style="color:#DE8100;" class="lt" @touchstart="touch_start($event)" @touchend="goods_sort_end($event,1)"><i class="icon iconfont icon-huowujilu"></i>货物</div>
            <div style="color:#82A6F5;" @touchstart="touch_start($event)" @touchend="goods_sort_end($event,2)"><i class="icon iconfont icon-jiage"></i>进价</div>
            <div style="color:#ABC327;" @touchstart="touch_start($event)" @touchend="goods_sort_end($event,3)"><i class="icon iconfont icon-shouyi"></i>售价</div>
            <div style="color:#77C34F;" class="lt" @touchstart="touch_start($event)" @touchend="goods_sort_end($event,4)"><i class="icon iconfont icon-kucun"></i>库存</div>
          </div>

          <div @touchstart="get_touch_btn_start_X($event)" @touchmove="change_btn($event,index)" v-for="(item,index) in goods" :style="{backgroundColor:bg_color[index%2]}"  class="row">
            <div class="gName">
              <div class="lt">{{item.name}}</div>
            </div>
            <div>{{item.input}}</div>
            <div>{{item.output}}</div>
            <div class="lt">{{item.stock}}</div>
            <div class="btn">修改</div>
          </div>
        </div>

        <prompt-box :message = "prompt.message" :type = "prompt.type" :status = "prompt.status"></prompt-box>
    </div>
</template>
<script>
import Vue from "vue";
import Router from "vue-router";
import promptBox from "./promptBox";
Vue.use(Router);

export default {
  name: "page_home_stockMessage",
  data() {
    return {
      prompt: {
        message: "", //提示内容
        type: false, //提示状态
        status: false, //显隐控制
        key: true //动画开关
      },
      search_icon_key: true, //查询提示信息控制变量
      search_key: null, //查询关键词
      goods_sort_key: [, true, true, true, true], //展示数据排序控制数组，true为从大到小，false为从小到大
      bg_color: ["#E5F3FC", "#FFFFFF"], //背景色控制数组
      base_goods: null,
      goods: null,
      touch_btn_start_X: null
    };
  },
  components: {
    promptBox
  },
  methods: {
    prompt_change(message, type = false) {
      //消息提示框控制函数
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

    search_list() {
      this.search_icon_key = true; //查询信息提示显示
      if (this.search_key != null || this.search_key) {
        //判断查询条件是否存在
        let arr = this.base_goods.filter(item => {
          if (item.name.indexOf(this.search_key) != -1) {
            return true;
          } else {
            return false;
          }
        });

        if (arr.length != 0) {
          //判断检索是否为空
          this.goods = arr; //不为空刷新信息

          if (this.search_key == "") {
            //检索谢谢是否为空字符，为空字符则赋值为空，以便还原后 有输入关键字提示
            this.search_key = null;
          }
        } else {
          this.prompt_change("您查询的信息不存在"); //为空提示不刷新信息
        }
      }
    },
    search_focus() {
      this.search_icon_key = false; //查询信息提示隐藏
    },
    search_blur(){
      if(this.search_key == null || this.search_key == ''){
        this.search_icon_key = true;
      }
    },
    touch_start(event) {
      //按钮点击变灰函数
      let node = event.currentTarget;
      if (event.touches.length < 2) {
        //判断触点是否唯一，避免多发bug
        node.style.backgroundColor = "#cfcfcf";
      }
    },
    goods_sort_end(event, index) {
      //排序按钮触摸弹起排序函数
      function sortFun(arr, index, that) {
        //货物排序数组，输入货物列表信息arr和排序关键index
        let key = null; //排序关键词
        switch (index) {
          case 2:
            key = "input";
            break;
          case 3:
            key = "output";
            break;
          case 4:
            key = "stock";
            break;
        }
        for (let i = 0; i < arr.length; i++) {
          //冒泡排序数组
          for (let j = 1; j < arr.length - i; j++) {
            if (that.goods_sort_key[index]) {
              //从大到小排序
              if (parseFloat(arr[j - 1][key]) < parseFloat(arr[j][key])) {
                let mid = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = mid;
                mid = null; //释放 中间对象
              }
            } else {
              if (parseFloat(arr[j - 1][key]) > parseFloat(arr[j][key])) {
                //从小到大排序
                let mid = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = mid;
                mid = null; //释放 中间对象
              }
            }
          }
        }

        that.goods_sort_key[index] = !that.goods_sort_key[index]; //排序切换
      }

      let that = this;
      let arr = this.base_goods.slice(0); //获取原始货物数据,深复制 从头截取到尾
      let node = event.currentTarget; //获取触发node
      node.style.backgroundColor = null; //按钮复原
      switch (index) {
        case 1:
          this.goods = this.base_goods;
          break;
        case 2:
          sortFun(arr, 2, that);
          this.goods = arr;
          break;
        case 3:
          sortFun(arr, 3, that);
          this.goods = arr;
          break;
        case 4:
          sortFun(arr, 4, that);
          this.goods = arr;
          break;
      }
    },
    get_touch_btn_start_X(event) {

      if (event.touches.length < 2) {
        this.touch_btn_start_X = event.targetTouches[0].pageX;
      }
    },
    change_btn(event, index) {
      //货物信息修改按钮展示函数

      let node = event.currentTarget;
      if (event.touches.length < 2) {
        //判断触点是否唯一，避免多发bug
        if (event.targetTouches[0].pageX - this.touch_btn_start_X > 50) {
          //若向右移动距离超过定值，则按钮隐藏
          node.style.left = "";
        }

        if (this.touch_btn_start_X - event.targetTouches[0].pageX > 50) {
          //若向左移动距离超过定值，则按钮隐藏
          node.style.left = "-2.5rem";
        }
      }
    }
  },
  created() {
    let goods = JSON.parse(sessionStorage.user_data).goods; //从对话缓存中读取货物列表
    this.goods = goods; //货物展示数组初始化
    this.base_goods = goods; //货物原始数据数组初始化
  }
};
</script>