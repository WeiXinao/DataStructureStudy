<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">把学生名给App</button>
    <button @click="unbind">解绑xiaoxin事件</button>
    <button @click="death">销毁当前 Student 组件的实例（vc）</button>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Student',
  data() {
    console.log(this);
    return {
      name: '小明',
      sex: '男',
      number: 0
    }
  },
  methods: {
    add() {
      console.log('add回调被调用了');
      this.number++;
    },
    sendStudentName() {
      // 触发 Student 组件实例身上的 xiaoxin 事件
      this.$emit('xiaoxin', this.name, 666, 888, 900);
      // this.$emit('demo');
      // this.$emit('click');
    },
    unbind() {
      // this.$off('xiaoxin'); // 解绑一个自定义事件
      // this.$off(['xiaoxin', 'demo']); // 解绑多个自定义事件
      this.$off(); // 解绑s自定义事件
    },
    death() { 
      this.$destroy(); // 销毁了当前 Student 组件实例，销毁后所有 Student 实例的自定义事件全都不奏效。
    }
  },
  mounted() {
    /* this.$on('haha', (data) => {
      alert('哈哈事件被触发了', data);
    }); */
  }
}
</script>
<style lang="less">
  .student {
    background-color: pink;
    padding: 5px;
    margin-top: 30px;
  }
</style>
