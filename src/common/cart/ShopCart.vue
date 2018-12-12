<template>
  <div class="shopcart">
    <div class="cart">
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
      <div class="cart-right" :class="payClass">
        {{payDesc}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
  props: {
    deliveryPrice: Number,
    minPrice: Number,
    selectGoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 1
        }]
      }
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
      if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return ''
      } else {
        return 'enough'
      }
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

</style>
