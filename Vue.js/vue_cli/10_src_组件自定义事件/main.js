import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted() {
    setTimeout(() => {
      this.$destroy();
    }, 3000);
  }
}).$mount('#app')
