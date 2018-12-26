<template>
  <div>
    <div class="shopcart">
      <div class="cart" @click="toggle">
        <div class="cart-left">
          <div class="bike">
            <div class="inner" :class="{'highlight':totalCount>0}">
              <i class="iconfont icon-shopping_cart"></i>
            </div>
            <div class="cart-count" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price-box">
            <div class="price border-right" :class="{'highlight':totalCount>0}">
              ￥{{totalPrice}}
            </div>
            <div class="desc">
              另需配送费￥{{deliveryPrice}}元
            </div>
          </div>
        </div>
        <div class="cart-right" :class="payClass" @click.stop.prevent="gopay">
          {{payDesc}}
        </div>
      </div>
      <!--动画小球-->
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="dropEnter" @after-enter="afterEnter">
          <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <!-- 购物车列表 -->
      <transition name="fold">
        <div class="cart-list" v-show="listShow">
          <div class="cart-top border-bottom">
            <div class="cart-title">购物车</div>
            <div class="cleanup" @click="emptyBike">清空</div>
          </div>
          <div class="list" ref="listWrapper">
            <ul>
              <li class="list-item border-bottom" v-for="(item,index) in selectGoods" :key="index">
                <div class="item-title">
                  {{item.name}}
                </div>
                <div class="item-price">
                  ￥{{item.price*item.count}}
                </div>
                <div class="item-control">
                  <control-cart :food="item"></control-cart>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 遮罩 -->
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </div>
</template>

<script>
import ControlCart from '@/common/cart/ControlCart'
import BScroll from 'better-scroll'
export default {
  name: 'ShopCart',
  components: {
    ControlCart
  },
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    selectGoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      balls: [{
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      }],
      dropballs: [],
      fold: true
    }
  },
  methods: {
    drop (el) {
      // console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropballs.push(ball)
          return
        }
      }
    },
    // el 为当前执行动画的对象
    beforeEnter (el) {
      // 设置动画开始之前的初始位置
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性
          let rect = ball.el.getBoundingClientRect()
          // console.log(rect)
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropEnter (el, done) {
      // 刷新动画效果
      /* eslint-disable no-unused-vars */
      // 触发浏览器重绘
      let rf = el.offsetHeight
      // 因为重绘，可能需要等待DOM完全加载完成，所以使用$nextTick优化体验
      this.$nextTick(() => {
        // 当没有变量时，要用单引号
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        // Vue为了知道过渡的完成，必须设置相应的事件监听器。它可以是transitionend或 animationend
        el.addEventListener('transitionend', done)
      })
      // 直接 done() 看不到过渡的动画效果
      // done()
    },
    afterEnter (el) {
      // 完成一次动画就删除一个dropBalls的小球
      let ball = this.dropballs.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    // 购物车折叠、收起切换
    toggle () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    // 清空购物车
    emptyBike () {
      this.selectGoods.forEach((item) => {
        item.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    gopay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      let payMoney = this.totalPrice + this.deliveryPrice
      window.alert(`需要支付${payMoney}`)
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectGoods.forEach((item) => {
        total += item.price * item.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectGoods.forEach((item) => {
        count += item.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice && this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return ''
      }
    },
    // 是否展开购物车
    listShow () {
      // 缓存this 否则eslint报错
      let that = this
      if (!this.totalPrice) {
        that.fold = true
        return false
      }
      let show = !this.fold
      // 购车列表出现时，执行事件
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            that.scroll = new BScroll(this.$refs.listWrapper, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  position: fixed
  left: 0
  right: 0
  bottom: 0
  z-index: 66
  .cart
    display: flex
    color: rgba(255,255,255,.4)
    background: #141d27
  .cart-left
    flex: 1
    display: flex
    .bike
      width: 1.12rem
      height: 1.12rem
      padding: .12rem
      margin: 0 .36rem
      margin-top: -.2rem
      box-sizing: border-box
      border-radius: 50%
      background: #141d27
      position: relative
      .inner
        width: 100%
        height: 100%
        border-radius: 50%
        background: #2b343c
        display: flex
        align-items: center
        justify-content: center
        &.highlight
          background: rgb(0,160,220)
          color: #ffffff
      .iconfont
        font-size: .48rem
      .cart-count
        position: absolute
        right: .1rem
        top: -.06rem
        z-index: 2
        min-width: .48rem
        height: .32rem
        line-height: .22rem
        font-size: .18rem
        padding: .06rem .1rem
        box-sizing: border-box
        border-radius: .32rem
        background: #f01414
        color: #fff
        text-align: center
        box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,.4)
    .price-box
      flex: 1
      display: flex
      align-items: center
      font-size: .32rem
      font-weight: 700
      .price
        padding: .12rem .24rem .12rem 0
        &.highlight
          color: #ffffff
        &.border-right::before
          border-right: 1px solid rgba(255,255,255,.2)
      .desc
        font-size: .24rem
        padding-left: .24rem
        line-height: 150%
  .cart-right
    width: 2.1rem
    background: #2b333b
    display: flex
    align-items: center
    justify-content: center
    flex: 0 0 2.1rem
    font-size: .3rem
    font-weight: 700
    &.enough
      background: #00b43c
      color: #ffffff
  .ball-container
    .ball
      position: fixed
      left: .64rem
      bottom: .44rem
      .inner
        width: .32rem
        height: .32rem
        border-radius: 50%
        background: rgb(0,160,220)
        transition: all .4s linear
      &.drop-enter-active
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  .cart-list
    position: absolute
    left: 0
    top: 0
    width: 100%
    background: #ffffff
    font-size: .28rem
    color: rgb(7,17,27)
    z-index: -1
    transform: translate3d(0,-100%,0)
    .cart-top
      display: flex
      padding: .28rem
      align-items: center
      background: #f3f5f7
      .cart-title
        flex: 1
      .cleanup
        color: rgb(0,160,220)
    .list
      padding:0 .28rem
      max-height: 4.34rem
      overflow: hidden
      .list-item
        display: flex
        padding: .28rem 0
        align-items: center
        .item-title
          flex: 1
        .item-price
          padding-left: .36rem
          padding-right: .24rem
        &:last-child
          &.border-bottom::before
            border-bottom: 0
  .fold-enter-active, .fold-leave-active
    transition: all .5s
  .fold-enter, .fold-leave-to
    transform: translate3d(0,0,0)
.list-mask
  position: fixed
  left: 0
  top: 0
  bottom: 0
  right: 0
  z-index: 22
  back-drop: blur(10px)
  background: rgba(7,17,27,.6)
.fade-enter-active, .fade-leave-active
  transition: all .5s
.fade-enter, .fade-leave-to
  opacity: 0
  background: rgba(7,17,27,0)
</style>
