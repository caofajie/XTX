<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 该render函数返回的是通过h函数创建的节点，之后就可以进行渲染 写该函数 上面的template标签应该去除
    // 1.template标签去除，单文件组件
    // 2.返回值就是组件内容
    // 3.vue2.0的h函数传参进来，vue3.0的h函数导入进来
    // 4.h 第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，应该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的结节点，最后一个item中不加i标签
    // 5. 把动态创建的节点渲染在xtx-bread标签中
    // 获取default默认插槽内容
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      // 对插槽节点进行判断（是XtxBreadItem和Transition才进行组装）
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  // h函数是用来创建标签的
  }
}
</script>

<style lang='less'>
//去除scoped 使得该样式变为全局样式 目的是让样式也可以作用于xtx-bread-item组件中
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  //ul li:last-child {} 先找到父元素 再找到所有子元素，找到最后一个元素 判断是不是li，是就选中，不是就是无效选择器
  //ul li:last-of-type {} 先找到父元素 找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    //去除最后一个元素i的箭头
    //样式的方式不合理
   // &:last-child {
    //display: none;
   //}
  }
}
</style>
