<template>
    <section class="wrapper">
      <div class="title">
        <h1>
            ToDo web application
        </h1>
      </div>
      <div class="app">
        <div>
          <input type="text" placeholder="Input task" v-model="inputTask" @keyup.enter="addTask()"/>
        </div>
        <div class="tasks" v-if="tasks">
          <div class="task" v-for="task in tasks">
            <label>{{task.name}}</label>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </section>
</template>
/*
* ToDo application for test
* Some description about app
* status can be:
*   1 - new task
*   2 - finished task
*   0 - deleted task
*/
<script>
    export default {
        data(){
            return {
                inputTask: '',
                tasks: []
            };
        },
        mounted(){
            //alert(123);
        },
        methods:{
          // Add new task
          addTask(){
            let task = {
              name: this.inputTask,
              status: 1,
            };
            this.tasks.push(task);
            this.inputTask = '';
          }
        }
    }

</script>
