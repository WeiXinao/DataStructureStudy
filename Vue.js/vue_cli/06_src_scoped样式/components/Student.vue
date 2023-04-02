<template>
  <div class="demo">
    <h2 class="title">学生姓名：{{ name }}</h2>
    <h2 class="fontSize-40">学生性别：{{ sex }}</h2>
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
    }
  }
}
</script>
<style lang="less">
  .demo {
    background-color: pink;
    .fontSize-40 {
      font-size: 40px;
    }
  }
</style>
