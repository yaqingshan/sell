<template>
  <div :class="classSize">
    <!-- 当传入多个class时，需要用数组的方式传入 [types[type], classSize]-->
    <span class="icon" :class="types[type]"></span>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    sizeType: Number,
    type: Number
  },
  data () {
    return {
      // 用于显示图标
      types: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {
    classSize () {
      return 'icon-' + this.sizeType
    }
  }
}
</script>

<style lang="stylus" scoped>
// 引入样式时用@import 路径前面需要加 ~
@import '~styles/mixins.styl'
.icon
    display: block
.icon-1
  .icon
    width: .24rem
    height: .24rem
    margin-right: .08rem
    &.decrease
      bg-image('images/decrease_1')
    &.discount
      bg-image('images/discount_1')
    &.guarantee
      bg-image('images/guarantee_1')
    &.invoice
      bg-image('images/invoice_1')
    &.special
      bg-image('images/special_1')
.icon-2
  .icon
    width: .32rem
    height: .32rem
    margin-right: .12rem
    &.decrease
      bg-image('images/decrease_2')
    &.discount
      bg-image('images/discount_2')
    &.guarantee
      bg-image('images/guarantee_2')
    &.invoice
      bg-image('images/invoice_2')
    &.special
      bg-image('images/special_2')
.icon-3
  .icon
    width: .24rem
    height: .24rem
    &.decrease
      bg-image('images/decrease_3')
    &.discount
      bg-image('images/discount_3')
    &.guarantee
      bg-image('images/guarantee_3')
    &.invoice
      bg-image('images/invoice_3')
    &.special
      bg-image('images/special_3')
.icon-4
  .icon
    width: .32rem
    height: .32rem
    margin-right: .12rem
    &.decrease
      bg-image('images/decrease_4')
    &.discount
      bg-image('images/discount_4')
    &.guarantee
      bg-image('images/guarantee_4')
    &.invoice
      bg-image('images/invoice_4')
    &.special
      bg-image('images/special_4')
</style>
