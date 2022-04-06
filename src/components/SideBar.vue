<template>
  <div class="siderBar">
    <li><router-link to="/"><i class="fa fa-hand-o-right">主页</i></router-link></li>
    <li><router-link to="/lists"><i class="fa fa-hand-o-right">项目</i></router-link></li>
    <li><router-link to="/addlist"><i class="fa fa-hand-o-right">新增</i></router-link></li>
    <li><router-link to="/machineaccount"><i class="fa fa-hand-o-right">台账</i></router-link></li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>


<style  scoped>
.siderBar {
  font-size: 20px;
  margin-left: 20px;
}
li {
  list-style: none;
  margin-top: 10px;
}
a {
  background-color: #f4f4f4;
  text-decoration: none;
}
a:hover {
  color: red;
}
i {
  padding-right: 20px;
  color: #000;
}
</style>
