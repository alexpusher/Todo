import Vue from 'vue';
import Todo from './Todo.vue';



export default new Vue({
    el:'#app',
    render: h => h(Todo)
});
