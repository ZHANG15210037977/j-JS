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
.control_group .sort_add .sort_buttom div{
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
  padding-bottom: 2.5rem;
  background-color: #ffffff;
}
.message_list .row {
  display: table;
  width: 15rem;
  padding: 0 0.5rem;
  height: 2.5rem;
}
.message_list .row > div {
  display: table-cell;
  vertical-align: middle;
  height: 2.5rem;
  width: 3rem;
  text-align: center;
  font-size: 0.7rem;
}
.message_list .row .lt {
  width: 4.5rem;
}

.message_list .title{
  height: 1.5rem;  
}
.message_list .title > div{
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.6rem;
}
.message_list .title > div i{
  margin-right: 0.1rem;
}

</style>

<template>
    <div>
        <div class="control_group">
            <div class="search">
                <input id="search" type="text"  v-model="search_key" @change="search_list" @focus="search_icon_key_false" @blur="search_icon_key_true" >
                <div v-show="(!search_key && search_icon_key)" class="icon_text">
                    <i  class="icon iconfont icon-search"></i>
                    <label for="search">输入查找信息</label>
                </div>
            </div>

            <div class="sort_add">
                <div style="border-right: #d7c9c9 solid 0.05rem">
                    <p>查找<i class="icon iconfont icon-search"></i></p>
                </div>
                <div>
                    <router-link to="/page_home_addGood"><p>添加<i class="icon iconfont icon-zengjia" ></i></p></router-link>
                </div>
            </div>
        </div>


        <div class="message_list">
          <div class="row title">
            <div style="color:#DE8100;" class="lt"><i class="icon iconfont icon-huowujilu"></i>货物</div>
            <div style="color:#82A6F5;"><i class="icon iconfont icon-jiage"></i>进价</div>
            <div style="color:#ABC327;"><i class="icon iconfont icon-shouyi"></i>售价</div>
            <div style="color:#77C34F;" class="lt"><i class="icon iconfont icon-kucun"></i>库存</div>
          </div>

          <div v-for="(item,index) in goods" :style="{backgroundColor:bg_color[index%2]}"  class="row">
            <div class="lt">{{item.name}}</div>
            <div>{{item.input}}</div>
            <div>{{item.output}}</div>
            <div class="lt">{{item.stock}}</div>
          </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default {
  name: "page_home_stockMessage",
  data() {
    return {
      bg_color:["#E5F3FC","#FFFFFF"],
      goods: [
        {
          id: "1",
          input: "32.5",
          name: "大窑嘉宾（柠檬）我爱罗",
          output: "52",
          stock: "0"
        },
        {
          id: "2",
          input: "34.5",
          name: "大窑嘉宾（可乐）",
          output: "53",
          stock: "0"
        },
        {
          id: "3",
          input: "32.5",
          name: "大窑嘉宾（黑轮）",
          output: "52",
          stock: "0"
        },
        {
          id: "4",
          input: "32.5",
          name: "雪碧",
          output: "52",
          stock: "0"
        },
        {
          id: "5",
          input: "32.5",
          name: "可乐",
          output: "52",
          stock: "0"
        },
        {
          id: "6",
          input: "32.5",
          name: "葡萄",
          output: "52",
          stock: "34"
        },
        {
          id: "7",
          input: "32.5",
          name: "七喜（柠檬）",
          output: "52",
          stock: "712"
        },
        {
          id: "8",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "0"
        },
        {
          id: "9",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "0"
        },
        {
          id: "10",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "0"
        },
        {
          id: "11",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "187"
        },
        {
          id: "12",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "124"
        },
        {
          id: "13",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "0"
        },
        {
          id: "14",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "879"
        },
        {
          id: "15",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "652"
        },
        {
          id: "16",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "525"
        },
        {
          id: "19",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "42"
        },
        {
          id: "18",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "31"
        },
        {
          id: "21",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "17"
        },
        {
          id: "23",
          input: "32.5",
          name: "大窑嘉宾（柠檬）",
          output: "52",
          stock: "28"
        }
      ],
      search_icon_key: true,
      search_key: null
    };
  },
  methods: {
    search_list() {},
    search_icon_key_false() {
      this.search_icon_key = false;
    },
    search_icon_key_true() {
      this.search_icon_key = true;
    }
  },
  created() {}
};
</script>