<template>
  <div class="container">
    <div class="header">      
      <h2>项目名称： {{ list.projectName }}</h2>
      <h3>项目类别：{{ list.type }}</h3>
      <h4 class="charactor charactorA">A角: {{ list.changerA }}</h4>
      <h4 class="charactor charactorB">B角: {{ list.changerB }}</h4>     
    </div>
    <div class="body">
      <h5>Id:{{ this.$route.params.id }} </h5>
      <h5 :class="list.status1 ? 'status-true' : ''">{{ list.detail1 }}</h5>
      <input type="checkbox" v-model="list.status1" @click="changeStatus(list, 1)"/> -->
      <h5 :class="list.status2 ? 'status-true' : ''">{{ list.detail2 }}</h5>      
      <input type="checkbox" v-model="list.status2" @click="changeStatus(list, 2)"/> -->
      <h5 :class="list.status3 ? 'status-true' : ''">{{ list.detail3 }}</h5>
      <input type="checkbox" v-model="list.status3" @click="changeStatus(list, 3)"/> -->
      <h5 :class="list.status4 ? 'status-true' : ''">{{ list.detail4 }}</h5>
      <input type="checkbox" v-model="list.status4" @click="changeStatus(list, 4)"/> -->
      <h5 :class="list.status5 ? 'status-true' : ''">{{ list.detail5 }}</h5>
      <input type="checkbox" v-model="list.status5" @click="changeStatus(list, 5)"/> -->
      <h5 :class="list.status6 ? 'status-true' : ''">{{ list.detail6 }}</h5>
      <input type="checkbox" v-model="list.status6" @click="changeStatus(list, 6)"/> -->
      <h5 :class="list.status7 ? 'status-true' : ''">{{ list.detail7 }}</h5>
      <input type="checkbox" v-model="list.status7" @click="changeStatus(list, 7)" />-->
      <h5 :class="list.status8 ? 'status-true' : ''">{{ list.detail8 }}</h5>
      <input type="checkbox" v-model="list.status8" @click="changeStatus(list, 8)"/>

    </div>

  </div>
  <div>
    <ProjectRecord :propdata="propdata"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Lists from "@/models/MonLists";
import ProjectRecord from "./ProjectRecord.vue"

export default defineComponent({
  name: "ListDetail",
  components: {ProjectRecord},
  data() {
    return {
      ipAddress: localStorage.getItem("ip"),
      propdata:"test prop data",
      list: {
        projectName: "",
        type: "",
        changerA: "",
        changerB: "",
        detail1: "",
        status1: false,
        detail2: "",
        status2: false,
        detail3: "",
        status3: false,
        detail4: "",
        status4: false,
        detail5: "",
        status5: false,
        detail6: "",
        status6: false,
        detail7: "",
        status7: false,
        detail8: "",
        status8: false,
        status: false,
        isFav: false,
        _id: 0,
        id: 0,
      },
    };
  },
  async mounted() {
    try{
      await fetch(`http://localhost:4500/api/posts/toDoLists/${this.$route.params.id}`) 
      .then((res) => res.json())
      .then((data) => {
        this.list = data[0];
        // console.log(this.list)
      });
    } catch(err) {
      console.log(err)
    }
  },
  methods: {
    async changeStatus(list: Lists, order: number) {
      try{        
        // let  state!: Lists;
        let  state!: object;
        // switch (order) {
        //   case 1:
        //     state = { ...list, status1: !list.status1 };
        //     break;
        //   case 2:
        //     state = { ...list, status2: !list.status2 };
        //     break;
        //   case 3:
        //     state = { ...list, status3: !list.status3 };
        //     break;
        //   case 4:
        //     state = { ...list, status4: !list.status4 };
        //     break;
        //   case 5:
        //     state = { ...list, status5: !list.status5 };
        //     break;
        //   case 6:
        //     state = { ...list, status6: !list.status6 };
        //     break;
        //   case 7:
        //     state = { ...list, status7: !list.status7 };
        //     break;
        //   case 8:
        //     state = { ...list, status8: !list.status8 };
        //     break;
        // }
        switch (order) {
          case 1:
            state = {status1: !list.status1};
            break;
          case 2:
            state = {status2: !list.status2};   
            break;
          case 3:
            state = {status3: !list.status3};  
            break;
          case 4:
            state = {status4: !list.status4};
            break;
          case 5:
            state = {status5: !list.status5};
            break;
          case 6:
            state = {status6: !list.status6};
            break;
          case 7:
            state = {status7: !list.status7};
            break;
          case 8:
            state = {status8: !list.status8};
            break;
        }
        await fetch("http://localhost:4500/api/posts/todolists/" + list._id, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
             ...state
          }),
        })
      } catch(err){
        console.log(err)
      }
    }
  },

  // setup(){
  //   const list = reactive({
  //     projectName: "",type: "", changerA: "",changerB: "", detail1: "",status1: false,detail2: "",
  //     status2: false, detail3: "", status3: false, detail4: "",status4: false,
  //     detail5: "",status5: false,detail6: "",status6: false,
  //     detail7: "", status7: false,detail8: "",status8: false,status: false  //,id: 2
  //   })
  //   // onMounted(async ():Promise<void> => {
  //   //   await fetch("http://localhost:4500/api/posts/todolists/" + )
  //   //   .then(res => res.json())
  //   //   .then(data => {
  //   //     console.log(data)
  //   //   })
  //   // })

  //   return {...toRefs(list)}
  // },
});
</script>

<style scoped>
.charactor{
  background-color: #333;
}
.charactorA {
  color: red;
}
.charactorB {
  color: yellow;
}

.status-true {
  background-color: rgba(30, 128, 0, 0.4);
}
.container {
  display: inline-block;
}
.header {
  display: flex;
  align-items: center;
}
.header h2,h3,h4 {
  margin: 20px 50px;
  padding: 20px;
  border: 1px dashed #333;
  border-radius: 10px;
}
.body {
  align-items: center;
  display: flex;
  margin-left: 20px;
}
.body h5 {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.2em;
}
.body input {
  margin-left: 5px;
  margin-right: 10px;
  height: 1.2em;
  width: 1.2em;
}

h2{
  background-color: #cabcbc;  
}

h3{
  background-color: aquamarine;
}
</style>
