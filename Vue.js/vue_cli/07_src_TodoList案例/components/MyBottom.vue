<template>
  <div class="todo-footer" v-show="this.todos.length">
        <label>
          <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/>全选 -->
          <input type="checkbox" v-model="isAll"/>全选
        </label>
        <span>
          <span>已完成 {{ doneTotal }}</span> / 全部 {{ todos.length }}
        </span>
        <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'MyBottom',
    props: ['todos', 'checkAllTodo', 'clearAllTodo'],
    computed: {
        doneTotal() {
            return this.todos.reduce((pre, current) => pre + Number(current.done), 0); 
        },
        isAll: {
            get() {
                return this.doneTotal === this.todos.length && this.todos.length > 0;
            },
            set(value) {
                this.checkAllTodo(value);  
            }
        }
    },
    methods: {
        /* checkAll(e) {
            this.checkAllTodo(e.target.checked); 
        } */
        clearAll() {
            this.clearAllTodo();
        }
    }
}
</script>

<style scoped>
    /*footer*/
    .todo-footer {
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input {
        position: relative;
        top: -1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button {
        float: right;
        margin-top: 5px;
    }
</style>