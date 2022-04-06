<template>
<div class="content">
  <h1 class="header">资源与工程事业部 ></h1>
  <h2 class="body">工程建设部 ></h2>
  <h3 class="detail">欢迎您！</h3>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {

  },
});
</script>
<style scoped>
  .content{
    display: flex;
    align-items: center;
  }
  .header,.body,.detail{
    margin: 20px;
  }
</style>



