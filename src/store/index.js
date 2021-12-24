import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 独立的三个模块
import cart from './module/cart'
import user from './module/user'
import category from './module/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 默认处处在localstorage
    createPersistedState({
      // 本地存储的名字
      key: 'cao-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
