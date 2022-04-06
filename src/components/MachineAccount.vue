<template>
  <!-- <h2>{{lists}}</h2> -->
  <div class="content">
    <div>
      <p>制度编号示例--> <strong>DEW/S13C202201</strong></p>
      <p>文件规则-->会议纪要 <strong>M</strong>, 传真 <strong> F </strong> ,工作联系单 <strong> C </strong></p>
      <p>文件示例--> 纪要: <strong>DEW/M13C2022001</strong>;传真: <strong>DEW/F13C2022001</strong></p>
    </div>
    <div class="sec-btn">
        <button class="btn btn-add" @click="showZhidu = !showZhidu,showWenjian = false">新增制度明细</button>
        <button class="btn btn-add" @click="showWenjian = !showWenjian,showZhidu = false">新增文件明细</button>
    </div>
  </div>    
  <div class="container container-zhidu" v-if="showZhidu">
      <div class="zhidu">
        <label for="id">Id</label>
        <input type="text" v-model="zhidudata.id" id="id">
        <label for="type">类型</label>
        <input type="text" v-model="zhidudata.type" id="type">
        <label for="number">编号</label>
        <input type="text" v-model="zhidudata.number" id="number">
      </div>
      <div class="zhidu">
        <label for="name">名称</label>
        <input type="text" v-model="zhidudata.name" id="name">
        <label for="remark">备注</label>
        <input type="text" v-model="zhidudata.remark" id="remark">
        <label for="publishDate">发布日期</label>
        <input type="date" v-model="zhidudata.publishDate" id="publishDate">
        <label for="launchDate">执行日期</label>
        <input type="date" v-model="zhidudata.launchDate" id="launchDate">
      </div>
      <div class="sec-btn">
        <button class="btn btn-add" @click="addZhidu">新增制度</button>
      </div>
  </div> 
  <div class="container container-wenjian" v-if="showWenjian">
      <div class="wenjian">
        <label for="id">Id</label>
        <input type="text" v-model="wenjiandata.id" id="id">
        <label for="type">类型</label>
        <input type="text" v-model="wenjiandata.type" id="type" list="url_list" @change="selectType">
          <datalist id="url_list">
            <option label="纪要" value="纪要" />
            <option label="传真" value="传真" />
            <option label="联系单" value="联系单" />
          </datalist>
        <label for="number">编号</label>
        <input type="text" v-model="wenjiandata.number" id="number">
      </div>
      <div class="wenjian">
        <label for="name">名称</label>
        <input type="text" v-model="wenjiandata.name" id="name">
        <label for="remark">备注</label>
        <input type="text" v-model="wenjiandata.remark" id="remark">
        <label for="publishDate">发布日期</label>
        <input type="date" v-model="wenjiandata.publishDate" id="publishDate">
        <label for="launchDate">执行日期</label>
        <input type="date" v-model="wenjiandata.launchDate" id="launchDate">
      </div>
      <div class="wenjian ">
        <label for="jingbanren">经办人</label>
        <input type="text" v-model="wenjiandata.jingbanren" id="jingbanren">
        <label for="qianfa">签发人</label>
        <input type="text" v-model="wenjiandata.qianfa" id="qianfa">

      </div>
      <div class="sec-btn">
        <button class="btn btn-add" @click="addWenjian">新增文件</button>
      </div>
  </div>
  <div class="container container-main">
    <div class="main">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>类别</th>
            <th>编号</th>
            <th>名称</th>
            <th>发布日期</th>
            <th>实施日期</th>
            <th>备注</th>
            <th>经办</th>
            <th>签发</th>
            <th>明细</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value,key,index) in lists[0]" :key="index">
            <td v-for="(item,key,index) in value" :key="index" >{{item}}</td>
            <td> <button class="btn btn-edit" @click="editData(value.id,value.type),showEdit=!showEdit">Edit</button></td>
          </tr>
          <tr v-for="(value,index) in lists[1]" :key="index">
            <td v-for="(item,key,index) in value" :key="index" >{{item}}</td>
            <td> <button class="btn btn-edit" @click="editData(value.id,value.type),showEdit=!showEdit">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="container container-edit" v-if="showEdit">
      <div class="zhidu">
        <label for="id">Id</label>
        <input type="text" v-model="dataedit.id" id="id">
        <label for="type">类型</label>
        <input type="text" v-model="dataedit.type" id="type">
        <label for="number">编号</label>
        <input type="text" v-model="dataedit.number" id="number">
      </div>
      <div class="zhidu">
        <label for="name">名称</label>
        <input type="text" v-model="dataedit.name" id="name">
        <label for="remark">备注</label>
        <input type="text" v-model="dataedit.remark" id="remark">
        <label for="publishDate">发布日期</label>
        <input type="date" v-model="dataedit.publishDate" id="publishDate">
        <label for="launchDate">执行日期</label>
        <input type="date" v-model="dataedit.launchDate" id="launchDate">
      </div>
      <div class="zhidu">
        <label for="jingbanren">经办</label>
        <input type="text" v-model="dataedit.jingbanren" id="jingbanren">
        <label for="qianfa">签发</label>
        <input type="text" v-model="dataedit.qianfa" id="qianfa">
      </div>
      <div class="sec-btn">
        <button class="btn btn-add" @click="UpdateData(dataedit.id,dataedit.type)">更新数据</button>
      </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  name: "MachineAccount",
  data(){
    return{
      showZhidu: false,
      showWenjian: false,
      showEdit: false,
    }
  },
  setup(){
    var lists: object[] = reactive([{
      id: 1,
      type: "",
      number: "",
      name: "",
      publishDate: "",
      launchDate: "",
      remark: ""
    }])
    var zhidudata = ref({
      id: 1,
      type: "制度",
      number: "DEW/S13C",
      name: "",
      publishDate: new Date().toLocaleString(),
      launchDate: new Date().toLocaleString(),
      remark: "",
      jingbanren: "",
      qianfa: ""
    })
    var wenjiandata = ref({
      id: 1,
      type: "",
      number: "DEW/",
      name: "",
      publishDate: new Date().toLocaleString(),
      launchDate: new Date().toLocaleString(),
      remark: "",
      jingbanren: "",
      qianfa: ""
    })
    var dataedit = ref({
      id: 1,
      type: "",
      number: "DEW/",
      name: "",
      publishDate: new Date().toLocaleString(),
      launchDate: new Date().toLocaleString(),
      remark: "",
      jingbanren: "",
      qianfa: ""
    })
    var zhiduCount = ref(0)
    var wenjianCount = ref(0)
    onMounted(async ()=>{
      await fetch("http://10.100.38.112:4000/zhidutaizhang")
      .then(res => res.json())
      .then(data => {
        lists[0] = data;
        zhiduCount.value = data.length
        zhidudata.value.id = data.length + 1
      })
      await fetch("http://10.100.38.112:4000/wenjiantaizhang")
      .then(res => res.json())
      .then(data => {
        lists[1] = data;
        wenjianCount.value = data.length
        wenjiandata.value.id = data.length + 1
      })  
    })
    const addZhidu = async(): Promise<void> =>{
      await fetch("http://10.100.38.112:4000/zhidutaizhang",{
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...zhidudata.value
        })
      })
      lists[0] = {...lists[0],"":zhidudata.value} 
      zhiduCount.value += 1;     
    }
    const addWenjian = async(): Promise<void> =>{
      await fetch("http://10.100.38.112:4000/wenjiantaizhang",{
        method: "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...wenjiandata.value
        })
      })
      lists[1] = {...lists[1],"":wenjiandata.value}
      wenjianCount.value += 1;
    }
    const editData = async (id: number|string,type: string): Promise<void> => { 
      // console.log(id,type)
      // return false
      let temp =''
      if(type === '制度'){
        temp = 'zhidutaizhang'
      } else {
        temp = 'wenjiantaizhang'
      }
      await fetch(`http://10.100.38.112:4000/${temp}/${id}`)
      .then(res => res.json())
      .then(data => {
        dataedit.value = data
      })
    }
    const UpdateData = async (id: number|string,type: string): Promise<void> => {
      let temp =''      
      if(type === '制度'){
        temp = 'zhidutaizhang'
        
      } else {
        temp = 'wenjiantaizhang'
      }
      await fetch(`http://10.100.38.112:4000/${temp}/${id}`,{
        method:"PUT",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({
          ...dataedit.value
        })
      })
    
    }
    const selectType = () => {
      /*            <option label="纪要" value="纪要" />
            <option label="传真" value="传真" />
            <option label="联系单" value="联系单" /> 
            会议纪要 M, 传真 F ,工作联系单 C*/
      if(wenjiandata.value.type === '纪要') {
        wenjiandata.value.number = 'DEW/M13C' + new Date().getFullYear()
      } else if (wenjiandata.value.type === '传真'){
        wenjiandata.value.number = 'DEW/F13C' + new Date().getFullYear()
      } else if (wenjiandata.value.type === '联系单'){
        wenjiandata.value.number = 'DEW/C13C' + new Date().getFullYear()
      } else if (wenjiandata.value.type === ''){
        wenjiandata.value.number = 'DEW/'
      }
    }

    return {
      lists,
      zhidudata,
      wenjiandata,
      addZhidu,
      addWenjian,
      zhiduCount,
      wenjianCount,
      editData,
      dataedit,
      UpdateData,
      selectType}
  }

})
</script>

<style scoped>
  .content .sec-btn{
    margin-left: 50px;
  }
  table{
    /* border: 1px solid black; */
    border-collapse: collapse;
    margin: 10px auto;
  }
  table thead tr th{
    border: 1px solid black;
    padding: 3px;
  }
  table tbody tr td{
    border: 1px solid black;
    padding: 3px;
  }
  .btn{
    background-color: #333;
    color: #f4f4f4;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-add{
    color: #f4f4f4;
    margin-left: 20px;
    margin-top: 20px;
    padding: 5PX;
  }
  .content{
    margin-left: 40px;
    display: flex;
  }
  strong{
    color: rgba(255, 0, 0, 0.651);
  }
  p{
    margin-top: 5PX;
    margin-bottom: 5px;
  }
  .zhidu{
    display: flex;
    margin-left: 10px;
  }
  .zhidu label{
    width: 6%;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  .zhidu input{
    width: 15%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .wenjian{
    display: flex;
    margin-left: 10px;
  }
  .wenjian label{
    width: 6%;
    margin-left: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  .wenjian input{
    width: 15%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .sec-btn{
    margin-left: 40%;
  }
</style>
