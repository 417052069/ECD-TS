<template>
  <div class="container">
    <ul> 
      <li class="li-overview">
        <div class="overview">
          <h2 class="header header-overview">一、项目概况</h2>
          <table class="tbl tbl-overview">
            <thead>
              <tr>
                <th>合同时间</th>
                <th>合同编号</th>
                <th>工期</th>
                <th>项目地点</th>
                <th>施工合同总价</th>
                <th>建设内容</th>
                <th>出租方</th>
                <th>投资规模</th>
                <th>经济效益</th>
                <th>合同分解表</th>
                <th>相关方服务</th>
                <th>ID</th>
                <th>编辑</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <template v-for="(name, key, index) in overview" :key="index">       
                  <td v-if="key!=='_id' && key!=='projectName' ">
                    {{ name }}
                  </td>
                </template>
                <td>
                  <button class="btn btn-edit" :value="currentId" @click="toggleUpdateOverview = !toggleUpdateOverview,showOverview=!showOverview" >Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="toggleUpdateOverview">
          <project-overview :overviewdata="overview" :overView="overview" :showOverview="showOverview" @updateOv="updateOv"/>
        </div>  
      </li>
      <li class="li-projectTimeline">
        <div class="projectTimeline">
          <h2 class="header header-projectTimeline">二、项目执行时间轴</h2>
          <table class="tbl tbl-projectTimeline">
            <thead>
              <tr>   
                <th>ID</th>         
                <th>时间</th>
                <th>关键点</th>
                <th>输出结果</th>
                <th>牵头单位</th>
                <th>参与人员</th>
                <th><button class="btn btn-edit" :value="currentId" @click="toggleProjectTimeline = !toggleProjectTimeline,showPtAdd=true,showPtEdit = false"> 新增数据</button></th>
              </tr>
            </thead>
            <tbody>                     
                  <tr v-for="(item,index) in projectTimeline.items" :key="index">
                    <td v-for="(value,name,index) in item" :key="index">
                      {{value}} 
                    </td>   
                    <td>
                      <button class="btn btn-edit" :value="item.id" @click="toggleProjectTimeline = !toggleProjectTimeline,showPtEdit=true,showPtAdd=false">
                        Edit
                      </button>
                      <button class="btn btn-delete" :value="item.id" @click="deletePtItem(item.id)" >
                        Delete
                      </button>
                    </td>
                  </tr>
            </tbody>
          </table>          
        </div>
        <div v-show="toggleProjectTimeline">          
          <project-timeline  :projectTimeline="projectTimeline" @updatePt="updatePt" :showPtEdit="showPtEdit" :showPtAdd="showPtAdd"/>
        </div> 
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectOverview from "./ProjectOverview.vue"
import ProjectTimeline from "./ProjectTimeline.vue"

export default defineComponent({
  props: ["propdata"],
  components:{ProjectOverview,ProjectTimeline}, //
  data() {
    return {
      currentId: this.$route.params.id,
      toggleUpdateOverview: false,
      toggleProjectTimeline: false,
      showPtEdit: false,
      showPtAdd: false,
      showOverview: false,
      overview: {
        id: 1,
        contractDay: "",
        contractNo: "",
        contractDuration: "",
        projectPlace: "",
        totalPrice: "",
        constructionContent: "",
        Lessor: "",
        investment: "",
        economicPerformance: "",
        hetongfenjiebiao: "",
        xiangguanfang: "",
        _id: ""
      },
      projectTimeline: {
        _id: "",
        id: 0,
        items:[{
          id: 0,          
          day: "",
          keyponit: "",
          output: "",
          qiantoudanwei: "",
          canyurenyuan: ""
        }]
      },
    };
  },
  async mounted() {
    try {
      await fetch("http://localhost:4500/api/posts/overview/" + this.$route.params.id)
      .then(res => res.json())
      .then(data => {
        this.overview = data[0];
      })
      await fetch("http://localhost:4500/api/posts/projectTimeline/" + this.$route.params.id)
      .then(res => res.json())
      .then(data => {
        this.projectTimeline = data[0];
        // console.log(this.projectTimeline)
      })
    } catch (err) {
      console.log(err);
    }
  },
  methods:{
    updatePt(data: any): void{
      this.projectTimeline = data
    },
    async deletePtItem(id: number): Promise<void>{ //async : Promise<void>
      if(confirm("确认删除?")){
        try{
          let newPt = this.projectTimeline.items.filter(item => item.id != id)
          // console.log(newPt)
          await fetch("http://localhost:4500/api/posts/projectTimeline/"+ this.$route.params.id,{
            method: "PUT",
            headers:{
              "content-type": "application/json"
            },
            body: JSON.stringify({
              ...this.projectTimeline,items : newPt 
            })
          })
          this.projectTimeline.items = newPt
        } catch(err){
          console.log(err)
        }
      }
    },
    updateOv(data: any){
      this.overview = data
    }
  }
});
</script>

<style scoped>
.container {
  display: inline-block;
  margin-left: 50px;
}

table {
  margin: 10px;
  border-collapse: collapse;
}
thead th {
  border: 1px solid #333;
  border-collapse: collapse;
  padding: 5px;
}

tbody td {
  padding: 5px;
  border: 1px solid #333;
  border-collapse: collapse;
}
.header {
  background-color: #f4f4f4;
  color: rgba(255, 0, 0, 0.6);
  display: inline-block;
}
.btn {
  background-color: #333;
  border: none;
  border-right: 2px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-edit {
  color: #f4f4f4;
  margin-right: 2px;
}
.btn-add {
  color: #333;
  background-color: white;
  margin-right: 2px;
}

.btn-delete {
  color: red;
}

li{
  list-style-type: none;
  
}
</style>
