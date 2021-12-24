<template>
<!-- 顶部通栏-->
  <AppTopnav />
<!--头部组件 -->
  <AppHeader />
  <!-- 吸顶组件-->
<AppHeaderStickyNav />
  <AppHeaderNav />
  <div class="main">
  <!-- 二级路由 -->
  <router-view />
  </div>
  <AppFooter />
</template>
<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderStickyNav from '@/components/app-header-sticky'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderStickyNav
  },
  // 获取下分类数据
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="less">
.app-boby{
min-width: 600px}
</style>
