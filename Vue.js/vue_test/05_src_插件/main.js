// 引入 Vue
import { createApp } from 'vue'
// 引入 App
import App from './App.vue'
import plugins from './plugins';

// CreateApp 作为 vue 的启动函数，返回一个应用实例
const app = createApp(App);
 
app.use(plugins, 1, 2, 3);

app.mount('#app');
