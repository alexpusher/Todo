<template>
    <section class="wrapper">
      <header class="title">
          <h1>ToDo web application</h1>
		  
          <input type="text" placeholder="Input task title" class="taskInput" v-model="task.title" @keyup.enter="addTask()"/>
          <input type="text" placeholder="Input task text" class="taskInput" v-model="task.text" @keyup.enter="addTask()"/>
      </header>
      <div class="tasks">
          <div v-show="tasks.length">
              <div class="task" v-for="(task, taskId) in filteredTasks">
                  <div class="taskDate">
                      {{task.title}}
                  </div>
                  <textarea
					  v-if="task.isEdit && task.status != 'completed'"
					  v-model="task.text"
					  @keyup.esc="closeEdit(taskId)"
					  @blur="closeEdit(taskId)"
					  wrap="hard" name="text" class="editTask"
                  >
				  </textarea>
                  <div v-else v-on:dblclick="editTask(taskId)" :class="{completed: task.status == 'completed'}" class="taskText">
                      {{task.text}}
                  </div>
                  <div class="btns">
                      <button class="taskButtons " v-on:click="closeTask(taskId)" v-if="task.status != 'completed'">Close</button>
                      <button class="taskButtons taskButtons_delete" v-on:click="deleteTask(taskId)"></button>
                  </div>
              </div>
          </div>
          <div v-show="tasks.length">
              <div class="panel">
                  <div class="count">
                      {{ filteredTasks.length }} task
                  </div>
                  <div class="btn-wrapper">
                      <button class="btn btn_all" v-on:click="setFilter('all')">
                          All
                      </button>
                      <button class="btn btn_active" v-on:click="setFilter('launched')">
                          Active
                      </button>
                      <button class="btn btn_done" v-on:click="setFilter('completed')">
                          Completed
                      </button>
                  </div>
                  <div class="btn-wrapper" v-if="tasks.length">
                      <button class="btn btn_delete_all" v-on:click="deleteAll()">
                          Delete all
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </section>
</template>


<script>
    import { TodoStorage } from './components';
    const $ = require('jquery');

    export default {
        data(){
            return {
                task: {
					title: '',
					text: ''
				},
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
          },
		  // Check when need to add 's' symbol
		  countItems(){
			let taskWord = this.filteredTasks.length === 1 ? ' task' : ' tasks'
			return this.filteredTasks.length + taskWord;
		  }
        },
        methods:{
          // Add new task
          addTask(){
			let err = '';
			
			if(this.task.title <= 0){
				err += 'You should specify title of task\n';
				
			}
            if(this.task.text <= 0){
				err += 'Text can\'t be empty\n';
				
			}
			
			if(err.length > 0){
				alert(err);
				return;
			}
			
            let task = {
			  title: this.task.title,
              text: this.task.text,
              status: 'launched',
              isEdit: false,
              //date: new Date().toString().split(' ').splice(1,4).join(' ')

            };
            this.tasks.push(task);
            this.task = {
					title: '',
					text: ''
				};
            this.sortTask();

          },
          deleteTask(taskId){
            this.$delete(this.tasks, taskId);
            this.sortTask();
          },
		  deleteAll(){
			if(confirm("Are you sure?"))			
			  this.tasks = [];
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

              if (a.title > b.title) {
                return 1;
              }
              if (a.title < b.title) {
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
          filterTask(status){
            let self = this;
			self.taskStatus = status || self.taskStatus;
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
