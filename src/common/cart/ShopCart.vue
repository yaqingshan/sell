<template>
  <div class="shopcart">
    <div class="cart">
      <div class="cart-left">
        <div class="bike">
          <div class="inner">
            <i class="iconfont">&#xe60a;</i>
          </div>
        </div>
        <div class="price-box">
          <div class="price border-right">
            ￥{{}}
          </div>
          <div class="desc">
            另需配送费￥{{deliveryPrice}}元
          </div>
        </div>
      </div>
      <div class="cart-right">
        {{minPrice}}起送
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
        return []
      }
    }
  },
  computed: {
    totalPrice () {

    },
    totalCount () {
      
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
      .inner
        width: 100%
        height: 100%
        border-radius: 50%
        background: #2b343c
        display: flex
        align-items: center
        justify-content: center
      .iconfont
        font-size: .48rem
    .price-box
      flex: 1
      display: flex
      align-items: center
      font-size: .32rem
      font-weight: 700
      .price
        padding: .12rem .24rem .12rem 0
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
    font-size: .32rem
    font-weight: 700

</style>
