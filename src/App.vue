<template>
  <div class="head">
    <nav>
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/lists">项目</router-link></li>
      <li><router-link to="/addlist">新增</router-link></li>
      <li><router-link to="/machineaccount">台账</router-link></li>
      <li><router-link to="/mongodbLists">M项目</router-link></li>
    </nav>
  </div>
  <div class="container">
    <div class="left"><SideBar /></div>
    <div class="right"><router-view /></div>
  </div>
    <!-- <div>
      data: {{mongodbData}}
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";


export default defineComponent({
  components: {
    SideBar,
  },
  // data(){
  //   return {
  //     mongodbData: {}
  //   }
  // },
  // async mounted() {
  //   try{
  //     await fetch("http://localhost:4500/api/posts")
  //     .then(res => res.json())
  //     .then(data => {
  //       this.mongodbData = data
  //       console.log(this.mongodbData)
  //     })
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

});
</script>

<style scoped>
.head {
  background-color: #000;
  font-weight: bold;
  margin: 0px;
  width: 100%;
  height: 50px;
}
.head nav {
  padding: 5px;
  align-content: center;
}
.head li {
  text-decoration: none;
  display: inline-block;
  margin: 5px;
  list-style: none;
  font-size: 20px;
}
.head a {
  color: #f4f4f4;
  text-decoration: none;
  margin-left: 15px;
}
a.router-link-exact-active {
  color: #c92727;
  text-decoration: none;
}
a.router-link {
  color: #f4f4f4;
  text-decoration: none;
}
.container {
  display: flex;
}
.left {
  width: 150px;
  min-height: 600px;
  background-color: #f4f4f4;
  border-left: 2px dotted #000;
  border-right: 2px dotted #000;
  border-bottom: 2px dotted #000;
}
.right {
  flex: 1;
  min-height: 600px;
  border-right: 2px dotted #000;
  border-bottom: 2px dotted #000;
}
</style>
