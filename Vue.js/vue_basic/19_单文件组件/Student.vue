<template>
    <!-- 组件的结构 -->
    <div class="demo">
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>

<script>
    // 分别暴露
    //组件交互相关的代码（数据、方法等等）
    export default {
        name: 'Student',
        data() {
            return {
                schoolName: 'Zhangsan',
                address: 18 
            }
        }   
    }

    // 统一暴露
    // export { school }

    // 默认暴露
    // export default school
</script>

<style>
    /* 组件的样式 */
    .demo {
        background-color:orange;
    }
</style>

