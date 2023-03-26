<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDOM" ref="btn">点位输出上方的DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
// 引入 School 组件
import School from './components/School.vue'

export default {
  name: 'App',
  components: {
      School
  },
  data() {
    return {
      msg: '欢迎学习Vue'
    }
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title); // 真实 DOM 元素
      console.log(this.$refs.btn); // 真实 DOM 元素
      console.log(this.$refs.sch); // School 组件的实例对象（vc）
    }
  },
  
}
</script>

<style>

</style>