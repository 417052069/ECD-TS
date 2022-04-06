<template>
  <div class="content content-edit">
    <div v-show="showEdit" class="div-edit">
      <template v-for="(item,key,index) in ptItems.items" :key="index">                
        <div  class="edit-sub" v-if="item.id === ptItems.id" >
          <div >
            <label >id</label>
            <input type="number" v-model="item.id" />
            <label >日期</label>
            <input type="date" v-model="item.day" />
            <label >关键点</label>
            <input type="text" v-model="item.keyponit" />
            <label >输出文件</label>
            <input type="text" v-model="item.output" />
            <label >牵头单位</label>
            <input type="text" v-model="item.qiantoudanwei" />
            <label >参与人员</label>
            <input type="text" v-model="item.canyurenyuan" />
          </div>          
        </div>
      </template>
      <div><button @click="updatePt(ptItems.id)">确认修改</button></div>
    </div>
    <!-- <div v-show="showEdit" class="div-edit">
      <div v-for="(item,key,index) in projectTimeline.items" :key="index" class="edit-sub" >
        <div v-for="(value,key,index) in item" :key="index">
          <label :for="index">{{labels[index]}}</label>
          <input type="text" :value="value" :id="index" @change="showInfo"/>
        </div>
      </div>
      <div><button @click="updatePt(projectTimeline.id)">确认修改</button></div>
    </div> -->
    <div v-show="showAdd" class="div-add">
      <div>
        <div>
            <label>id</label>
            <input type="number"  v-model="items[0].id" />
            <label>日期</label>
            <input type="date"  v-model="items[0].day" />
            <label>关键点</label>
            <input type="text"  v-model="items[0].keyponit" />
            <label>输出文件</label>
            <input type="text"  v-model="items[0].output" />
            <label>牵头单位</label>
            <input type="text"  v-model="items[0].qiantoudanwei" />
            <label>参与人员</label>
            <input type="text"  v-model="items[0].canyurenyuan" />
        </div>          

      </div>
      <div><button @click="addPt(projectTimeline.id)">确认新增</button></div>
    </div>
  </div>
  <div class="content content-add"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["projectTimeline","showPtEdit","showPtAdd"],
  data() {
    return {     
      ptItems: {
        _id: "",
        id:0,
        items:[{
          id: 0,          
          day: "",
          keyponit: "",
          output: "",
          qiantoudanwei: "",
          canyurenyuan: ""
        }]
      },
      labels: ['Id','日期','关键点','输出文件','牵头单位','参与人员',],
      items:[{
          id: this.projectTimeline.items.length + 1,          
          day: "",
          keyponit: "",
          output: "",
          qiantoudanwei: "",
          canyurenyuan: ""
      }],
      temp:[{}],
    };
  },  
  async mounted(){
    await fetch("http://localhost:4500/api/posts/projectTimeline/"+this.$route.params.id ) 
    .then(res => res.json())
    .then(data => {
      this.ptItems = data[0];
      // console.log(this.ptItems)
    })
  },
  methods:{
    async addPt(id: number): Promise<void> {
      this.temp = (this.projectTimeline.items)
      this.temp.push(this.items[0])      
      // console.log(this.temp)
      if(this.items[0].keyponit ==="" || this.items[0].output === "")
      {
        alert("数据不全！");
        return;
      } else{
        try{
          await fetch(`http://localhost:4500/api/posts/projectTimeline/${id}`,{
            method: "PUT",
            headers: {
              "content-type": "application/json"
            },
            body:JSON.stringify({
              items: this.temp
            })
          });
        }catch(err){
          console.log(err)
        }
      }
    },
    async updatePt(id: number): Promise<void> {      
      if(!this.projectTimeline.items)
      {
        alert("数据不全！");
        return;
      } else{
        try{
          await fetch(`http://localhost:4500/projectTimeline/${id}`,{
            method: "PUT",
            headers: {
              "content-type": "application/json"
            },
            body:JSON.stringify({
              ...this.projectTimeline,items: this.ptItems.items            
            })
          }) 
          this.$emit('updatePt',this.ptItems) 
        }catch(err){
          console.log(err)
        }
      }
    },
  },
  computed:{
       showEdit(){
         return this.showPtEdit
       },
       showAdd(){
         return this.showPtAdd
       }
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
