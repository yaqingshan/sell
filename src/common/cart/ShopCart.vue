<template>
  <div class="shopcart">
    <div class="cart">
      <div class="cart-left">
        <div class="bike">
          <div class="inner">
            <i class="iconfont">&#xe60a;</i>
          </div>
        </div>
        <div class="price border-right">
          ￥0
        </div>
        <div class="delivery-price">
          另需配送费￥4元
        </div>
      </div>
      <div class="cart-right">
        20起送
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart'
}
</script>

<style lang="stylus" scoped>
.shopcart
  position: fixed
  left: 0
  right: 0
  bottom: 0
  height: .96rem
  z-index: 66
  .cart
    display: flex
    color: rgba(255,255,255,.4)
  .cart-left
    flex: 1
    background: #141d27
    fon-size: 0
    .bike
      display: inline-block
      vertical-align: top
      width: 1.16rem
      height: 1.16rem
      padding: .12rem
      box-sizing: border-box
      position: relative
      top: -.2rem
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
    .price
      display: inline-block
      vertical-align: top
      font-weight: 700
    .delivery-Price
      display: inline-block
      vertical-align: top
  .cart-right
    width: 2.1rem
    background: #2b333b
    display: flex
    align-items: center
    justify-content: center
    flex: 0 0 2.1rem
    font-size: .24rem
    font-weight: 700

</style>
