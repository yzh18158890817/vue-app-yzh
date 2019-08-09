<template>
  <div class="full_w bg">
    <!--<Head ></Head>-->
    <div class="re mt_65 h_60"><span class="font_30_sc_re"><b>请登录</b></span></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">用户名: <input type="text" id="userName"
                                                                       placeholder="请输入用户名"></span></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">密码: <input type="text" id="password"
                                                                      placeholder="请输入密码"></span></div>
    <div class="re m_top_1 h_60" @click="login">登录</div>
    <div class="re m_top_3" @click="$router.push({name:'Register'})">没有账号?点击注册</div>


    <van-popup v-model="showLoading">
      <van-loading size="24px">登录成功!正在检测您与站长之间的关系...</van-loading>
    </van-popup>
    <!--<van-dialog-->
    <!--v-model="showDialog"-->
    <!--title="系统检测结果"-->
    <!--show-cancel-button-->
    <!--&gt;-->
    <!--<img src="@/assets/img/portrait.png">-->
    <!--</van-dialog>-->
  </div>
</template>

<script>
  import {Toast} from "vant";
  import {Dialog} from 'vant'
  import {Popup} from 'vant';
  import Head from "./components/Head";

  export default {
    name: "Login",
    components: {Head},

    data() {
      return {
        // showDialog: false,
        showLoading: false,
        user: {
          userName: '',
          password: '',
        },

      }
    },

    methods: {
      sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
      },
      showDialog() {
        Dialog.alert({
          message: '经系统检测您是站长的五星级亲密挚友,开放权限:  所有'
        }).then(() => {
          // on close
        });
      },
      login() {
        let _this = this;
        _this.userName = document.getElementById('userName').value;
        _this.password = document.getElementById('password').value;
        _this.$fetch('http://127.0.0.1:10003/user/login', {'userName': _this.userName, 'password': _this.password}
        ).then(re => {
          // Toast.success('登录成功!');
          const toast = Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            mask: true,
          });

          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (second <= 3 && second >= 2) {
              toast.message = '登录成功!正在检测您与站长之间的关系...';
            } else if (second >= 0 && second <= 1) {
              toast.message = '经系统检测您是站长的五星级亲密挚友,开放权限:  所有';
            } else {
              clearInterval(timer);
              Toast.clear();
            }
          }, 1000);
        });
        _this.$router.push({name: 'Home'});
      }
    }
  }
</script>

<style scoped src="../assets/css/common/common.css">

</style>
