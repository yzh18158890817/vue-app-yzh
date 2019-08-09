<template>
  <div class="bg full_w">
    <Head></Head>
    <div class=" h_150 bw"></div>
    <div class="m_top_10"></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">用户名: <input type="text" id="userName"
                                                                       placeholder="请输入用户名"></span></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">密码: <input type="text" id="password"
                                                                      placeholder="请输入密码"></span></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">姓名: <input type="text" id="name"
                                                                      placeholder="请输入真实姓名"></span></div>
    <div class="re  m_top_1 h_30 "><span class="fl m_l_13">性别:</span>
      <van-radio-group v-model="radio">
        <van-radio name="1" class="fl m_l_3 m_top_1">男</van-radio>
        <van-radio name="2" class="fl m_l_3 m_top_1">女</van-radio>
      </van-radio-group>
    </div>
    <div class="re  m_top_1 h_30 " @click="birthdaySelect"><span class="fl m_l_13  ">生日:</span> <div class="fl m_l_3 bw">{{dataSelect}}</div></div>
    <div class="m_top_10 gray " @click="register">注册</div>
    <van-datetime-picker
      v-show="showDate"
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      @cancel="cancel"
      @confirm="confirm"
      @change="change"
    />

  </div>
</template>

<script>
  import Head from "./components/Head";
  import {Toast} from "vant";
  export default {
    name: "Register",
    components: {Head},
    data() {
      return {
        radio: '1',
        currentDate: new Date(),
        showDate: false,
        dataSelect: '',
        userName: '',
        password: '',
        minDate: new Date(1980, 1, 1),
        maxDate: new Date(2030, 1, 1),
      }
    },
    created() {
      this.nowTime()

    },
    methods: {

      register() {
        let _this = this;
        _this.userName = document.getElementById('userName').value;
        _this.password = document.getElementById('password').value;
        _this.name = document.getElementById('name').value;

        _this.$post('http://127.0.0.1:10003/user/register', ({
          userName: _this.userName,
          password: _this.password,
          name: _this.name,
          sex: _this.radio,
          birthday: _this.dataSelect,
        })).then(re => {
          if (re==='注册成功'){

            Toast.success(re);
            _this.$router.push({name: 'Login'});
          }else {

            Toast.fail(re)
          }
        })
      },

      confirm() {
        let _this = this;
        _this.showDate = false;
      },
      nowTime() {
        let _this = this;
        const date = new Date();
        _this.dataSelect = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      },
      change(e) {
        let _this = this;
        let timeArr = e.getValues();
        _this.dataSelect = timeArr[0].substring(0, timeArr[0].length ) + '-' + timeArr[1].substring(0, timeArr[1].length )+'-'+timeArr[2].substring(0,timeArr[2].length);
      },
      cancel() {
        let _this = this;
        _this.showDate = false;
        _this.nowTime();
      },
      birthdaySelect() {
        let _this = this;
        _this.showDate = true;
      }

    },
    computed: {},

  }
</script>

<style scoped src="../assets/css/common/common.css"></style>

<style scoped>

</style>
