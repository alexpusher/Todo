<template>
    <section class="wrapper">
      <header class="title">
        <div>
          <h1>
              ToDo web application
          </h1>
        </div>
        <div>
          <input type="text" placeholder="Input task" class="taskInput" v-model="inputTask" @keyup.enter="addTask()"/>
        </div>
      </header>
      <section class="tasks" v-show="tasks.length">

          <div class="task" v-for="(task, taskId) in filteredTasks">


            <textarea
              v-if="task.isEdit"
              v-model="task.text"
              @keyup.esc="closeEdit(taskId)"
              @blur="closeEdit(taskId)"
              wrap="hard" name="text" class="editTask"
              >
            </textarea>
            <div v-else v-on:dblclick="editTask(taskId)" class="taskText">
              <label>{{task.text}}</label>
            </div>
            <div>
                <button class="taskButtons" v-on:click="closeTask(taskId)">Close task</button>
                <button class="taskButtons" v-on:click="deleteTask(taskId)">Delete</button>
            </div>
          </div>


      </section>
      <footer v-show="tasks.length">
        <div class="panel" >
          <div class="count">
            {{ tasks.length }} task
          </div>
          <div>
            <button v-on:click="setFilter('all')">
              All
            </button>
            <button v-on:click="setFilter('launched')">
              Active
            </button>
            <button v-on:click="setFilter('completed')">
              Completed
            </button>
          </div>
        </div>
      </footer>
    </section>
</template>


<script>
    import { TodoStorage } from './components';
    const $ = require('jquery');

    export default {
        data(){
            return {
                inputTask: '',
                tasks: TodoStorage.getTasks(),
                taskStatus: 'all'
            };
        },
        mounted(){
        },
        computed: {
          filteredTasks(){

              let tasks = [];
              if(this.taskStatus === 'all'){
                tasks = this.tasks;
              }else if(this.taskStatus === 'completed'){
                tasks = this.filterTask();
              }else if(this.taskStatus === 'launched'){
                tasks = this.filterTask();
              }


            return tasks;
          }
        },
        methods:{
          // Add new task
          addTask(){
            if(this.inputTask.length <= 0) return;
            let task = {
              text: this.inputTask,
              status: 'launched',
              isEdit: false
            };
            this.tasks.push(task);
            this.inputTask = '';
            this.sortTask();

          },
          deleteTask(taskId){
            this.$delete(this.tasks, taskId);
            this.sortTask();
          },
          editTask(taskId){
            this.tasks[taskId].isEdit = true;
          },
          closeEdit(taskId){
            console.log(this.tasks[taskId].text.length);
            if(this.tasks[taskId].text.length <= 0){
              this.deleteTask(taskId);
              return;
            }
            this.tasks[taskId].isEdit = false;
            this.sortTask();
          },
          closeTask(taskId){
            this.tasks[taskId].status = 'completed';
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
          },
          // Set status for filter
          setFilter(status){
            this.taskStatus = status;
          },
          // Filter task by current task status
          filterTask(){
            let self = this;
            return self.tasks.filter(function (task) {
              return task.status === self.taskStatus
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
