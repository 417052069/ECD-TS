<template>
<ul>
  <li class="list">
    <div class="container container-list">
      <div>
        <h2>一、项目内容</h2>
      </div>
      <div>
        <div class="add add-project">
          <label for="projectName">项目名称</label>
          <input type="text" v-model="lists.projectName" placeholder="项目名称" id="projectName"/> 
        </div>
        <div class="add add-type">
          <label for="projectName">项目性质</label>
          <input type="text" v-model="lists.type" placeholder="项目性质" id="Type"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="changerA">A角</label>
          <input type="text" v-model="lists.changerA" placeholder="A角" id="changerA"/>
        </div>
        <div class="add add-changer add-changerB">
          <label for="changerB">B角</label>
          <input type="text" v-model="lists.changerB" placeholder="B角" id="changerB"/>
        </div>
      </div>
        <button @click="addList" class="btn btn-list">新增项目</button>
    </div>
  </li>
  <li class="overview">
    <div class="container container-overview">
      <div>
        <h2>二、项目概况</h2>
      </div>
      <div>
        <div class="add add-project">
          <label for="contractDay">合同日期</label>
          <input type="date" v-model="overView.contractDay" placeholder="合同日期" id="contractDay"/> 
        </div>
        <div class="add add-type">
          <label for="contractNo">合同号</label>
          <input type="text" v-model="overView.contractNo" placeholder="合同号" id="contractNo"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="contractDuration">工程周期</label>
          <input type="text" v-model="overView.contractDuration" placeholder="工程周期" id="contractDuration"/>
        </div>
        <div class="add add-changer add-changerB">
          <label for="projectPlace">项目地点</label>
          <input type="text" v-model="overView.projectPlace" placeholder="项目地点" id="projectPlace"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="totalPrice">施工总价</label>
          <input type="text" v-model="overView.totalPrice" placeholder="施工合同总价" id="totalPrice"/>
        </div>
        <div class="add add-changer add-changerB">
          <label for="constructionContent">施工内容</label>
          <input type="text" v-model="overView.constructionContent" placeholder="施工内容" id="constructionContent"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="Lessor">出租方</label>
          <input type="text" v-model="overView.Lessor" placeholder="出租方" id="Lessor"/>
        </div>
        <div class="add add-changer add-changerB">
          <label for="investment">投资规模</label>
          <input type="text" v-model="overView.investment" placeholder="投资规模" id="investment"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="economicPerformance">经济效益</label>
          <input type="text" v-model="overView.economicPerformance" placeholder="经济效益" id="economicPerformance"/>
        </div>
        <div class="add add-changer add-changerB">
          <label for="hetongfenjiebiao">合同分解</label>
          <input type="text" v-model="overView.hetongfenjiebiao" placeholder="合同分解" id="hetongfenjiebiao"/>
        </div>
      </div>
      <div>
        <div class="add add-changer add-chargerA">
          <label for="xiangguanfang">相关方</label>
          <input type="text" v-model="overView.xiangguanfang" placeholder="相关方" id="xiangguanfang"/>
        </div>
      </div>
      <button @click="addList" class="btn btn-overview">新增概况</button>
    </div>
  </li>
  <li class="projectTimeline">
    <div class="container container-overview">
      <div>
        <h2>三、项目执行时间轴</h2>
      </div>
      <div>
        <div class="add add-project">
          <label for="day">日期</label>
          <input type="date" v-model="projectTimeline.items[0].day" placeholder="日期" id="day"/> 
        </div>
        <div class="add add-type">
          <label for="keyponit">关键点</label>
          <input type="text" v-model="projectTimeline.items[0].keyponit" placeholder="关键点" id="keyponit"/>
        </div>
      </div>
      <div>
        <div class="add add-project">
          <label for="output">输出结果</label>
          <input type="text" v-model="projectTimeline.items[0].output" placeholder="输出结果" id="output"/> 
        </div>
        <div class="add add-type">
          <label for="qiantoudanwei">牵头单位</label>
          <input type="text" v-model="projectTimeline.items[0].qiantoudanwei" placeholder="牵头单位" id="qiantoudanwei"/>
        </div>
      </div>
      <div>
        <div class="add add-project">
          <label for="canyurenyuan">参与人员</label>
          <input type="text" v-model="projectTimeline.items[0].canyurenyuan" placeholder="参与人员" id="canyurenyuan"/> 
        </div>
      </div>
      <button @click="addList" class="btn btn-overview">新增时间轴</button>
    </div>
  </li>
  <li class="xiangmubaojianKeyPoint">
    <div class="container container-overview">
      <div>
        <h2>四、报建手续办理节点</h2>
      </div>
      <div>
        <div class="add add-type">
          <label for="name">事件名</label>
          <input type="text" v-model="xiangmubaojianKeyPoint.items[0].name" placeholder="事件名" id="name"/>
        </div>
        <div class="add add-project">
          <label for="day">日期</label>
          <input type="date" v-model="xiangmubaojianKeyPoint.items[0].day" placeholder="日期" id="day"/> 
        </div>
      </div>
      <div>
        <div class="add add-type">
          <label for="remark">备注</label>
          <input type="text" v-model="xiangmubaojianKeyPoint.items[0].remark" placeholder="备注" id="remark"/>
        </div>
      </div>
<!--           name: "",
          day: "2022-03-01",
          remark: "征地" -->
      <button @click="addList" class="btn btn-overview">报建手续</button>
    </div>
  </li>
</ul>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: "AddList",
  setup(){
    const ipAddress = localStorage.getItem("ip")
    const lists = reactive({        
        projectName: "",
        type: "",      
        changerA: "",
        changerB: "",
        detail1: "前期准备",
        status1: false,
        detail2: "初步设计",
        status2: false,
        detail3: "招标",
        status3: false,
        detail4: "施工",
        status4: false,
        detail5: "竣工验收",
        status5: false,
        detail6: "竣工结算",
        status6: false,
        detail7: "项目运营",
        status7: false,
        detail8: "备注",
        status8: false,
        status: false,
        isFav: false,
    });
    const overView = reactive({
        contractDay: new Date().toLocaleString(),
        contractNo: "DEW***",
        contractDuration: 360,
        projectPlace: "**",
        totalPrice: 125000,
        constructionContent: "**",
        Lessor: "龙马重工",
        investment: 100000000,
        economicPerformance: 25125851,
        hetongfenjiebiao: "",
        xiangguanfang: ""
    })
    const projectTimeline = reactive({      
      items: [
        {          
          day: "2022-03-21",
          keyponit: "发送电子技术要求",
          output: "技术文件",
          qiantoudanwei: "工程建设部",
          canyurenyuan: "刘源、张先林等"
        }
      ]
    })
    const xiangmubaojianKeyPoint = reactive({
      items: [
        {          
          name: "",
          day: "2022-03-01",
          remark: "征地"
        }]
    })
    const addList = async (): Promise<void> => {
      if(lists.projectName.length ===0 || lists.type.length ===0) 
      { alert("要素不全！")
        return}
      try{
        await fetch(`${ipAddress}todolists`,{
          method: "POST",
          headers :{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...lists})
        })
        await fetch(`${ipAddress}overview`,{
          method: "POST",
          headers :{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...overView})
        })
        await fetch(`${ipAddress}projectTimeline`,{
          method: "POST",
          headers :{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...projectTimeline})
        })
        await fetch(`${ipAddress}xiangmubaojianKeyPoint`,{
          method: "POST",
          headers :{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...xiangmubaojianKeyPoint})
        })
        // .then(res => res.json())
        // .then(data => console.log(data))
      } catch(err){
        console.log(err)
      }
    }

    return {
      lists,
      addList,
      overView,
      projectTimeline,
      xiangmubaojianKeyPoint
    }
  },
})
</script>

<style  scoped>
  h2{
    margin-left: 20px;
    margin-bottom: 10px;
    max-width: 20%;
    padding: 5px;
    display: inline;
  }
  .container{
    background-color: #f4f4f4;
    display: inline;
   }
  .add {
    display: inline;
    margin-left: 15%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 2em;
    line-height: 2em;
  }
  .add-charger{
    display: block;
  }
  label{
    display: inline-block;
    width: 6%;
    margin-right: 10px;
  }

  input{
    width: 20%;
    font-size: 1.3em;
    line-height: 1.3em;
    margin-right: 20px;
    margin-bottom: 5px;
  }

  button {
    display: block;
    min-width: 100px;
    height: 1.5em;
    background-color: rgba(19, 53, 116,0.2);
    color: green;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: rgba(19, 53, 116,0.5);
  }

  .btn{
    margin: 10px auto;
  }
  li{
    list-style-type: none;
    display: inline;
  }

</style>
