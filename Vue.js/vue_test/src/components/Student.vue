<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>学生性别：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>学生年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Student',
    data() {
      return {
        msg: 'I am a college student'
      }
    }
}
</script>
