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
          <div class="task" v-for="(task, id) in tasks" :data-task-id="id">
            <input v-if="task.isEdit" v-model="task.text" @keyup.enter="closeEdit($event)" @keyup.esc="closeEdit($event)" type="textarea" placeholder="Input task"/>
            <label v-else v-on:dblclick="editTask($event)">{{task.text}}</label>
            <button v-on:click="closeTask($event)">Close task</button>
            <button v-on:click="deleteTask($event)">Delete</button>
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
    import { TodoStorage } from './components';
    const $ = require('jquery');
    export default {
        data(){
            return {
                inputTask: '',
                tasks: TodoStorage.getTasks()
            };
        },
        mounted(){
        },
        methods:{
          // Add new task
          addTask(){
            if(this.inputTask.length <= 0) return;
            let task = {
              text: this.inputTask,
              status: 1,
              isEdit: false
            };
            this.tasks.push(task);
            this.inputTask = '';
            this.sortTask();

          },
          deleteTask(ev){
            let item = $(ev.currentTarget).parent();
            this.$delete(this.tasks,item.attr('data-task-id'));
            this.sortTask();
          },
          editTask(ev){
            let item = $(ev.currentTarget).parent();
            this.tasks[item.attr('data-task-id')].isEdit = true;
          },
          closeEdit(ev){
            let item = $(ev.currentTarget).parent();
            if(this.tasks[item.attr('data-task-id')].text.length <= 0) return;
            this.$set(this.tasks[item.attr('data-task-id')], 'isEdit', false);
            this.sortTask();
            //this.tasks[item.attr('data-task-id')].isEdit = false;
          },
          closeTask(ev){
            let item = $(ev.currentTarget).parent();
            this.tasks[item.attr('data-task-id')].status = 2;
          },
          sortTask(){
            this.tasks.sort(function (a, b) {

              if (a.text > b.text) {
                return 1;
              }
              if (a.text < b.text) {
                return -1;
              }
              return 0;
            });
          }
        },
        watch: {
          tasks:{
            handler(){
              TodoStorage.saveTasks(this.tasks);
            },
            deep: true
          }
        }
    }

</script>
