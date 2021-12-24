<!--规格组件-->
import { get } from 'http';
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
     <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected}" @click="changesku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected}" @click="changesku(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 得到所有的sku集合 props.goods.skus
  // 从所有的sku中筛选出有效的sku集合
  // 根据有效的sku使用power-set算法得到子集
  // 根据子集往路径字典对象中 存储 key-value
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  // 选中与取消选中，约定在每一个按钮都拥有自己的选中状态数据：selected
  // 1.点击的是已经选中，只需要取消当前的选中
  // 2.点击的是未选中，把同一规格的按钮改成未选中，当前点击的改成选中
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    const changesku = (item, val) => {
      // 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
    }
    return { changesku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
       .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
