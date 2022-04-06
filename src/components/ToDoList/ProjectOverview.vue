<template>
  <div class="content content-edit">
    <div v-show="showEdit" class="div-edit">             
        <div  class="edit-sub" >
          <div >
            <label >id</label>
            <input type="text" v-model="subOverview.id" />
            <label >合同时间</label>
            <input type="date" v-model="subOverview.contractDay" />
            <label >合同编号</label>
            <input type="text" v-model="subOverview.contractNo" />
            <label >工期</label>
            <input type="text" v-model="subOverview.contractDuration" />
            <label >项目地点</label>
            <input type="text" v-model="subOverview.projectPlace" />
            <label >施工合同总价</label>
            <input type="text" v-model="subOverview.totalPrice" />
          </div>
          <div>
            <label >建设内容</label>
            <input type="text" v-model="subOverview.constructionContent" />
            <label >出租方</label>
            <input type="text" v-model="subOverview.Lessor" />
            <label >投资规模</label>
            <input type="text" v-model="subOverview.investment" />
            <label >经济效益</label>
            <input type="text" v-model="subOverview.economicPerformance" />
            <label >合同分解表</label>
            <input type="text" v-model="subOverview.hetongfenjiebiao" />
            <label >相关方服务</label>
            <input type="text" v-model="subOverview.xiangguanfang" />
          </div>          
        </div>
      <div><button @click="updateOverview" :id="paramsId">确认修改</button></div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["showOverview"],
  data() {
    return {    
    paramsId: "", 
    subOverview: {          
      projectName: "",
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
      id: 0
      },
    subOverviewData: {      
      projectName: "",
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
      id: 0
      },
    };
  },  
  async mounted(){
    await fetch("http://localhost:4500/api/posts/overview/"+this.$route.params.id ) //+this.overView.id
    .then(res => res.json())
    .then(data => {
      // this.subOverview = data[0];
      this.paramsId = data[0]._id    
      this.subOverview.projectName = data[0].projectName
      this.subOverview.contractDay = data[0].contractDay
      this.subOverview.contractNo = data[0].contractNo
      this.subOverview.contractDuration = data[0].contractDuration
      this.subOverview.projectPlace = data[0].projectPlace
      this.subOverview.totalPrice = data[0].totalPrice
      this.subOverview.constructionContent = data[0].constructionContent
      this.subOverview.Lessor = data[0].Lessor
      this.subOverview.investment = data[0].investment
      this.subOverview.economicPerformance = data[0].economicPerformance
      this.subOverview.hetongfenjiebiao = data[0].hetongfenjiebiao
      this.subOverview.xiangguanfang = data[0].xiangguanfang
      this.subOverview.id = data[0].id    

    })
  },  
  methods:{
    async updateOverview(): Promise<void> {          
      if(!this.subOverview)
      {
        alert("数据不全！");
        return;
      } else{
        try{
          await fetch(`http://localhost:4500/api/posts/overview/${this.paramsId}`,{
            method: "PUT",
            headers: {
              "content-type": "application/json"
            },
            body:JSON.stringify({
              ...this.subOverview         
            })
          }) 
          this.$emit('updateOv',this.subOverview) 
          // console.log(this.subOverview)         
        }catch(err){
          console.log(err)
        }
      }
    },
  },
  computed:{
       showEdit(){
         return this.showOverview
       },
    }

});
</script>

<style scoped>
  label{
    display: inline-block;
    width: 20%;
    align-content: space-between;
  }
  input{    
    width: 70%;
    margin-bottom: 5px;
  }

  button{
    background-color: #333;
    color: #f4f4f4;
    margin: 20px;
    font-size: 1.2em;
    border-radius: 5px;
    cursor: pointer;
  }
  .div-edit{
    display: flex;
    align-items: center;
  }
  .div-edit>div{
    width: 100%;
  }
  .div-add{
    display: flex;
    align-items: center;
    /* width:600px; */
  }
  .div-add>div{
    width: 50%;
  }
  .div-add label{
    width: 15%;
  }
  .div-add input{
    width: 75%;
  }
</style>
