<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <MyTop :addTodo="addTodo"/>
      <MyList 
        :todos="todos" 
        :checkTodo="checkTodo" 
        :deleteTodo="deleteTodo"
      />
      <MyBottom 
        :todos="todos" 
        :checkAllTodo="checkAllTodo"
        :clearAllTodo="clearAllTodo"
      />
    </div>
  </div>
</div>
</template>

<script>
import MyTop from './components/MyTop'
import MyList from './components/MyList'
import MyBottom from './components/MyBottom'



export default {
  name: 'App',
  components: {
    MyTop,
    MyList,
    MyBottom
  },
  data() {
      return {
          todos: [
            { id: '0001', title: '抽烟', done: true },
            { id: '0002', title: '喝酒', done: false },
            { id: '0003', title: '开车', done: true },
          ]
      }
  },
  methods: {
    // 添加一个 todo
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    // 勾选 or 取消勾选一个 todo
    checkTodo(id) {
      this.todos.forEach((element) => {
        if (element.id === id) {
          element.done = !element.done;
        }
      });
    },
    // 删除一个todo
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    // 全选 or 取消全选
    checkAllTodo(done) {
      this.todos.map(todo => todo.done = done);
    },
    // 清除所有已经完成的 todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      })
    }
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>


