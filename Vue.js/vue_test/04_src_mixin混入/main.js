// 引入 Vue
import { createApp } from 'vue'
// 引入 App
import App from './App.vue'
import { mixin, mixin2 } from './mixin'

// CreateApp 作为 vue 的启动函数，返回一个应用实例
const app = createApp(App);
app.mixin(mixin);
app.mixin(mixin2);
app.mount('#app');
