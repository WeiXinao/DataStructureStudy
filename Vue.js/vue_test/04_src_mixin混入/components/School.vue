<template>
  <div>
    <h2 @click="showName">学校名称：{{ name }}</h2>
    <h2>学生地址：{{ address }}</h2>
  </div>
</template>

<script>
// 引入一个混合
// import { mixin, mixin2 } from '../mixin'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'School',
  data() {
    console.log(this);
    return {
      name: '湖北文理学院',
      address: '湖北襄阳',
      x: 666
    }
  },
  // mixins: [mixin, mixin2],
  mounted () {
    console.log('你好啊！！！！');
  }
}
</script>
