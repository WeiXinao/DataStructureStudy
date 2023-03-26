<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'School',
    data() {
      return {
        name: 'Hubei University of Science And Art',
        address: 'Hubei XiangYang'
      }
    }
}
</script>

<style>
  .school {
    background-color: gray;
  }
</style>