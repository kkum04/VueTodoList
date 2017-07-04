"use strict";

var data = {
    todoList: [
        {
            title: "Vue 공부하기",
            isDone: true
        },
        {
            title: "Vue component 사용법",
            isDone: false
        },
        {
            title: "Vue Router 사용법",
            isDone: false
        },
        {
            title: "Vue study 준비",
            isDone: false
        }
    ],
    selectedTodo: {}
};


////////////////////////////////////////////////////////////////
// header 및 footer component 정의
Vue.component('header-component', {
    template: '#header'
});

Vue.component('footer-component', {
    template: '#footer'
});
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// todoList component
Vue.component('todo-list-component', {
    template: '#todoList',
    data: function () {
        return {
            title: ''
        }
    },
    methods: {
        addTodo: function () {
            if( this.title === '' ) {
                alert('title');
                this.$refs.title.focus();

                return false;
            }

            data.todoList.push({
                title: this.title,
                isDone: false
            });
            this.title = '';
        },

        deleteTodo: function (todo) {
            if( confirm("삭제?") == false ) {
                return false;
            }

            var index = data.todoList.indexOf(todo);
            if(index == -1) return;

            data.todoList.splice(index, 1);
        },

        updateToDone: function (todo) {
            if( confirm("완료?") == false ) {
                return false;
            }

            todo.isDone = true;
        },

        changeTodo: function (todo) {
            data.selectedTodo = todo;
            router.push('/change')
        }
    },
    computed: {
        todoList: function () {
            return data.todoList.filter(function (todo) {
                return todo.isDone === false;
            });
        }
    }
});
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// doneList component
Vue.component('done-list-component', {
    template: '#doneList',
    methods: {
        updateToNotDone: function (todo) {
            if( confirm("되돌리기?") == false ) {
                return false;
            }

            todo.isDone = false;
        }
    },
    computed: {
        doneList: function () {
            return data.todoList.filter(function (todo) {
                return todo.isDone === true;
            });
        }
    }
});
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// main component
var main = Vue.component('main-component', {
    template: '#main'
});
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// changeTodo component
var changeTodo = Vue.component('changeTodo-component', {
    template: '#changeTodo',
    data: function () {
        return {
            selectedTodo: data.selectedTodo,
            title: data.selectedTodo.title
        }
    },
    methods: {
        updateTodo: function () {
            this.selectedTodo.title = this.title;
            router.push('/');
        },
        cancel: function () {
            router.push('/');
        }
    }
});
////////////////////////////////////////////////////////////////

var router = new VueRouter({
    routes : [
        {
            path: '/',
            component: main
        },
        {
            path: '/change',
            component: changeTodo
        }
    ]
});

var app = new Vue({
    el: '#app',
    data: data,
    router: router
});