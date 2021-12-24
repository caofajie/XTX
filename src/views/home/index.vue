<template>
  <!-- 两个组件：首页的入口(分类+广告) -->
    <div class="home-entry">
      <div class="container">
       <!-- 左侧分类 -->
       <HomeCategory />
       <!-- 轮播图 -->
       <HomeBanner />
   </div>
  </div>
     <!-- 新鲜好物-->
     <HomeNew />
     <!-- 人气推荐-->
     <HomeHot />
     <!-- 热门品牌组件-->
     <HomeBrand />
    <!-- 产品区块-->
    <HomeProduct />
    <!-- 最新专题-->
    <HomeSpecial />
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>
<style scoped lang="less">
 </style>
