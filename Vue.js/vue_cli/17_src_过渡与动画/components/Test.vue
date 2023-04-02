<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="hello" appear>
        <h1 v-show="isShow">Hello World</h1>
    </transition>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Test',
    data() {
        return {
            isShow: true,
        }
    }
}
</script>

<style scoped>
    h1 {
        background-color: orange;
    }
    .hello-enter-active {
        animation: come 1s linear;
    }
    .hello-leave-active {
        animation: come 1s linear reverse;
    }

    @keyframes come {
        0% {
            transform: translateX(-100%);
        }
        100% {
        }
    }
</style>