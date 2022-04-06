<template>
  <!-- {{ipAddress}} -->
  <div class="search">
    <label for="search">查找项目:</label>
    <input type="text" v-model="searchValue" id="search" />
    <div class="orderCmd">
      <ul>
        <li>
          <button @click="handleTerm('_id')">Order By Id</button>
        </li>
        <li>
          <button @click="handleTerm('projectName')">Order By Project</button>
        </li>
        <li>
          <button @click="handleTerm('type')">Order By Type</button>          
        </li>
        <li>
          <button @click="handleTerm('status')">Order By Status</button>
        </li>
        <li>
          <button @click="handleTerm('changerA')">Order By Changer</button>
        </li>
        <li>
          <button @click="handleTerm('isFav')">Order By isFav</button>
        </li>
      </ul>
    </div>
    <h3 class="h3-search">Order by {{ orderTerm }}</h3>
  </div>
  <transition-group name="list" tag="ul">
    <li
      v-for="(list, index) in searchLists"
      :key="index"     
      class="card"
    >
      <div>
        <div class="main">
          <h2>项目名称：{{ list.projectName }}</h2>
          <h3>项目性质：{{ list.type }}</h3>
          <h4>A角: {{ list.changerA }}</h4>
          <h4>B角: {{ list.changerB }}</h4>
          <h4 :class="[list.status ? 'green' : 'red']"  @dblclick="changeStatus(list), (list.status = !list.status)">
            执行状态： {{ list.status }}
          </h4>
          <router-link :to="{ name: 'ListDetail', params: { id: list._id } }"
            ><button class="btn btn-primary">Details</button></router-link
          >

          <span class="soucangjia"
            ><i
              :class="list.isFav ? 'fa fa-heart color-gold' : 'fa fa-heart'"
              @click="changeIsFav(list), (list.isFav = !list.isFav)"
            ></i
          ></span>
        </div>
        <div class="detail">
          <p class="p-detail">
            {{ list._id }} : {{ list.detail1 }} --> {{ list.detail2 }} -->{{
              list.detail3
            }}
            -->{{ list.detail4 }} -->{{ list.detail5 }} -->{{
              list.detail6
            }}
            -->{{ list.detail7 }} -->{{ list.detail8 }}
            <span class="icon-close"
              ><i class="fa fa-times fa-10x" @click="deleteTask(list._id)"></i
            ></span>
          </p>
          <div></div>
        </div>
      </div>
    </li>
  </transition-group>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import MonLists from "../models/MonLists.js";
import MonTerms from "../models/MonTerms.js";

export default defineComponent({
  name: "ToDoLists",
  setup() {
    // var ipAddress: any = ref(localStorage.getItem("ip"))
    var lists = ref<MonLists[]>([]);
    var searchLists = ref<MonLists[]>([]);
    var searchValue = ref();
    var timer = ref<any>(0);
    var orderTerm = ref<MonTerms>("_id");
    const handleTerm = (term: MonTerms) => {
      orderTerm.value = term;
    };

    onMounted(async (): Promise<void> => {
      // let res = await fetch("http://10.100.38.112:4000/todolists/");
      let res = await fetch("http://10.100.38.112:4500/api/posts/toDoLists");
      lists.value = await res.json();
      searchLists.value = lists.value;
      // console.log(lists.value[0].type)
    });
    watch(searchValue, (newValue) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        if (newValue === "") {
          searchLists.value = lists.value;
        } else {
          searchLists.value = lists.value.filter(
            (list) =>
              list.projectName.includes(newValue) ||
              list.changerA.includes(newValue) ||
              list.type.includes(newValue)
          );
        }
      }, 500);
    });
    watch(searchLists, (newValue) => {
      return newValue;
    });
    watch(orderTerm, (newValue) => {
      if (newValue === "isFav") {
        searchLists.value.sort((a: MonLists, b: MonLists) => {
          return a[newValue] < b[newValue] ? 1 : -1;
        });
      } else {
        searchLists.value.sort((a: MonLists, b: MonLists) => {
          return a[newValue] > b[newValue] ? 1 : -1;
        });
      }
    });

    const changeStatus = async (obj: MonLists): Promise<void> => {
      var state: MonLists = { ...obj, status: !obj.status };
      // console.log(state);
      try {
        await fetch("http://10.100.38.112:4000/todolists/" + obj._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...state, //解析 state  作为 fetch api 的body 发送给服务器 更新数据
          }),
        }).then((res) => {
          if (!res.ok) {
            console.log("Change status failed!");
            return;
          }
        });
        // .then((data) => {
        //   console.log('Change status successed!');
        // });
      } catch (err) {
        console.log(err);
      }
    };

    const changeIsFav = async (obj: MonLists): Promise<void> => {
      var state: MonLists = { ...obj, isFav: !obj.isFav };
      try {
        await fetch("http://10.100.38.112:4000/todolists/" + obj._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...state, //解析 state  作为 fetch api 的body 发送给服务器 更新数据
          }),
        }).then((res) => {
          if (!res.ok) {
            console.log("Change isFav failed!");
            return;
          }
        });
        // searchLists.value = {...state }
      } catch (err) {
        console.log(err);
      }
    };

    const deleteTask = async (id: number): Promise<void> => {
      if (confirm("是否确认删除?")) {
        try {
          await fetch("http://10.100.38.112:4000/todolists/" + id, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          });
          searchLists.value = searchLists.value.filter(
            (list) => list._id !== id
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      searchValue,
      lists,
      searchLists,
      orderTerm,
      handleTerm,
      changeStatus,
      deleteTask,
      changeIsFav,
    };
  },
});
</script>

<style  scoped>
.btn {
  margin-left: 20px;
  background-color: #333;
  color: #eee;
  border: none;
  min-width: 50px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}
.icon-close .fa {
  display: inline;
  flex-wrap: wrap;
  margin-left: 200px;
  font-size: 1.5em;
  color: red;
}

li {
  list-style: none;
}
.search {
  margin-top: 10px;
  display: inline-block;
}
.search h3 {
  margin-left: 50px;
  text-transform: capitalize;
}
.search button {
  margin-left: 50px;
  margin-top: 10px;
  height: 2.2rem;
  background-color: #000;
  border-radius: 4px;
  color: #f4f4f4;
}
.search label {
  color: red;
  margin-left: 50px;
}
.search input {
  margin-left: 10px;
  height: 28px;
  width: 200px;
  line-height: 28px;
  font-size: 20px;
  border: 2px dotted blue;
}
.card {
  border: 1px solid black;
  margin: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
}
.card .main {
  display: flex;
  vertical-align: middle;
  height: 3em;
  align-items: center;
}
h2 {
  margin-left: 20px;
  margin-right: 10px;
  color: #2f0ad4de;
  width: 25%;
}
h3 {
  width: 15%;
}
h4 {
  width: 8%;
}
.green {
  color: green;
  width: 12%;
}
.red {
  color: red;
  width: 12%;
}
.card p {
  margin-left: 40px;
}

.soucangjia {
  margin-left: 50px;
}

.soucangjia i {
  font-size: 1.5em;
  cursor: pointer;
}
.color-gold {
  color: rgba(255, 30, 0, 0.74);
}
.p-detail{
  width: 80%;
}
.icon-close i{
  width: 20%;
  cursor: pointer;
}
.h3-search{
  width: 40%;  
}
.orderCmd ul{
  display: flex;
}
</style>
