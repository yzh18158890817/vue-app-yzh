<template>
  <div class="body">
    <Head></Head>
    <ul>
      <li @click="$router.push({name:'Poetry'})">诗词曲赋</li>
      <li>K歌作品</li>
      <li>心路</li>
      <li>易容术</li>
    </ul>
  </div>
</template>

<script>
  import Head from "./components/Head";

  export default {
    name: "Home",
    components: {Head}
  }
</script>

<style scoped src="../assets/css/common/common.css"></style>
