import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// // 导入自己UI组件库
import UI from '@/components/library'

// 重置样式的库
import 'normalize.css'
import '@/assets/styles/common.less'

// 插件的使用，在main.js中使用app.use(插件)
// createApp(App).use(store).use(router).mount('#app')
createApp(App).use(store).use(router).use(UI).mount('#app')
