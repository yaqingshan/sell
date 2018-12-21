<template>
  <transition name="move">
    <div class="detail" v-show="showFlag" ref="detailWrapper">
      <div class="content">
        <div class="head-img">
          <img :src="food.image" />
          <div class="back" @click="back">
            <span class="iconfont icon-arrow_lift"></span>
          </div>
        </div>
        <div class="food-info">
          <h3>{{food.name}}</h3>
          <div class="info">
            月售{{food.sellCount}}份 好评率{{food.rating}}%
          </div>
          <div class="price">
            ￥{{food.price}}
            <del v-show="food.oldPrice">￥{{food.oldPrice}}</del>
          </div>
          <div class="put-in">
            <div class="put-btn" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
            <control-cart :food="food" v-show="food.count>0" @cartPlus="addFood"></control-cart>
          </div>
        </div>
        <split></split>
        <div class="goods-info">
          <h3>商品介绍</h3>
          <p>{{food.info}}</p>
        </div>
        <split></split>
        <div class="goods-comment">
          <h3>商品评价</h3>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ControlCart from '@/common/cart/ControlCart'
import Vue from 'vue'
import Bscroll from 'better-scroll'
import Split from '@/common/split/Split'
export default {
  name: 'GoodsDetail',
  props: {
    food: Object
  },
  components: {
    ControlCart,
    Split
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.detailWrapper, {click: true, tap: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    back () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return false
      }
      this.$emit('cartPlus', event.target)
      Vue.set(this.food, 'count', 1)
    },
    // food组件中引用的cartcontrol组件中监听自己派发的事件cart-add，触发函数addFood（随意命名，不同于goods组件的addFood函数），
    // 在addFood函数中再派发一个事件，让goods父组件去监听，从而触发goods中的addFood函数
    addFood () {
      this.$emit('cartPlus', event.target)
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: .92rem
  background: #ffffff
  z-index: 33
  transform: translate3d(0, 0, 0)
  &.move-enter-active, &.move-leave-active
    transition: all .3s linear
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .head-img
    position: relative
    width: 100%
    height: 0
    padding-bottom: 100%
    img
      display: block
      width: 100%
    .back
      position: absolute
      left: .2rem
      top: .2rem
      z-index: 34
      padding: .1rem
      color: rgba(255,255,255,.7)
      font-size: .4rem
  h3
    font-size: .28rem
    line-height: 150%
    color: rgb(7,17,27)
  .food-info
    position: relative
    padding: .36rem
    h3
      font-weight: 700
    .info
      padding: .16rem 0
      font-size: .2em
      color: rgb(147,153,159)
    .price
      font-size: .28rem
      color: rgb(240,20,20)
      font-weight: 700
      del
        // text-decoration: line-through
        font-size: .2rem
        padding-left: .12rem
        color:  rgb(147,153,159)
    .put-in
      position: absolute
      right: .36rem
      bottom: .46rem
      .put-btn
        width: 1.48rem
        height: .48rem
        border-radius: .24rem
        background: rgb(0,160,220)
        color: #ffffff
        font-size: .2rem
        text-align: center
        line-height: .48rem
  .goods-info
    padding: .36rem
    p
      padding: .12rem 0
      font-size: .24rem
      color: rgb(77,85,93)
      line-height: 180%
      text-align: justify
  .goods-comment
    padding: .36rem
</style>
