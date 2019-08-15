<template>
  <div class="body">
    <Head v-show="!writeShow"></Head>
    <span @click="edit" v-show="!writeShow"><b>编辑</b></span>

    <div v-show="writeShow" class="edit">
      <input type="text" placeholder="请输入标题" style="background: white" v-model="writeTitle"><br>
      <textarea id="writePoetry" placeholder="请在此编辑文本正文" v-model="writePoetry"></textarea>
      <input type="button" value="取消" @click="writeCancel" style="width: 40%;float: left;left: 10%">
      <input type="button" value="提交" @click="writeComfirm" style="width: 40%;float: right;right: 10%">
    </div>

    <div class="poetry" v-show="!writeShow" v-for="poetry in poetryList">
      <span><b>{{poetry.articleName}}---{{poetry.author}}</b></span>
      <div>{{poetry.content}}</div>
    </div>

  </div>
</template>

<script>
  import Head from "./components/Head";
  import {Dialog} from 'vant';
  import {Toast} from 'vant';

  export default {
    name: "Poetry",
    components: {Head},
    data() {
      return {
        writeTitle: '',
        writePoetry: '',
        writeShow: false,
        poetryList: '',
      };
    },
    created() {
      this.getPoetry();
    },

    methods: {
      getPoetry() {
        let _this = this;
        _this.$fetch('http://127.0.0.1:10004/poetry/getPoetryList'
        ).then(re => {
          _this.poetryList = re;
        });
      },
      writeComfirm() {
        let _this = this;
        Dialog.confirm({
          title: '提示',
          message: '确定已编辑完成提交吗?'
        }).then(() => {
          // on confirm
          _this.$post('http://127.0.0.1:10004/poetry/writePoetry', {
              'content': _this.writePoetry,
              'articleName': _this.writeTitle,
            }
          ).then(re => {
            if (re) {
              Toast.success('发表成功');
              _this.writeShow = false;
              _this.getPoetry();
            }
          });
        }).catch(() => {
          // on cancel
        });

      },
      writeCancel() {
        let _this = this;
        Dialog.confirm({
          title: '提示',
          message: '取消编辑将不会保存您已编辑的内容,确定取消吗?'
        }).then(() => {
          // on confirm
          _this.writeShow = false;
        }).catch(() => {
          // on cancel
        });

      },
      edit() {
        let _this = this;
        _this.writeShow = true;
      }
    },

  }
</script>

<style scoped src="../assets/css/common/common.css"></style>
<style scoped src="../assets/css/poetry.css"></style>
