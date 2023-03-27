<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
// import { mixin, mixin2 } from '../mixin'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Student',
  data() {
    console.log(this);
    return {
      name: '小明',
      sex: '男',
    }
  },
  // mixins: [mixin, mixin2]
}
</script>
