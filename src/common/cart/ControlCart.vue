<template>
  <div class="control-cart">
    <transition name="move">
      <div class="btn minus-btn" @click="countMinus" v-show="food.count>0">
        <i class="iconfont icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="btn plus-btn" @click="countPlus">
      <i class="iconfont icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ControlCart',
  props: {
    food: Object
  },
  data () {
    return {
    }
  },
  methods: {
    countPlus (event) {
      // 规避pc端点击事件
      if (!event._constructed) {
        return false
      }
      if (!this.food.count) {
        // this.food.count = 1 这样写设置的属性不会被观测到，需要引入vue通过set去设置
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 再添加物品时，向父级组件（Good.vue） 派发事件 监听当时的加号按钮元素
      this.$emit('cartPlus', event.target)
    },
    countMinus () {
      if (!event._constructed) {
        return false
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .control-cart
    display: flex
    align-items: center
    justify-content:center
    .minus-btn
      width: .42rem
      height: .42rem
      display: flex
      align-items: center
      justify-content: center
      font-size: .4rem
      color: rgb(0,160,220)
    .plus-btn
      width: .42rem
      height: .42rem
      display: flex
      align-items: center
      justify-content: center
      font-size: .4rem
      color: rgb(0,160,220)
    .count
      font-size: .24rem
      color: #93999f
      padding: 0 .16rem
  /* 动画样式 */
  .move-enter-active, .move-leave-active
    transition: all .3s linear
    transform: translate3d(0, 0, 0)
    opacity: 1
    .iconfont
      transform: rotate(0)
      transition: all .3s linear
  .move-enter, .move-leave-to
    transform: translate3d(.48rem, 0, 0)
    opacity: 0
    .iconfont
      transform: rotate(180deg)
</style>
