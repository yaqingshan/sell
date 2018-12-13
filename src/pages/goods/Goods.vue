<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item border-bottom"
              v-for="(item,index) in goods"
              :key="index"
              :class="{'current':currentIndex === index}"
              @click="selectMenu(index,$event)">
            <div class="txt">
              <span v-show="item.type > 0" class="icon" :class="types[item.type]"></span>{{item.name}}
          </div>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li class="food-list-item food-list-hook" v-for="(item,index) in goods" :key="index">
            <h3 class="border-left">{{item.name}}</h3>
            <ul>
              <li class="food-item" v-for="(food,index) in item.foods" :key="index">
                <div class="food border-bottom">
                  <div class="img">
                    <img :src="food.icon" />
                  </div>
                  <div class="info">
                    <h4>{{food.name}}</h4>
                    <p class="desc">
                      {{food.description}}
                    </p>
                    <div class="sale">
                      月售{{food.sellCount}}份 好评率{{food.rating}}%
                    </div>
                    <div class="price">
                      ￥<span>{{food.price}}</span>
                      <del v-show="food.oldPrice">￥{{food.oldPrice}}</del>
                    </div>
                  </div>
                </div>
                <div class="control">
                  <control-cart :food="food"></control-cart>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shop-cart :selectGoods="selectGoods" :minPrice="minPrice" :deliveryPrice="deliveryPrice"></shop-cart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import ShopCart from '@/common/cart/ShopCart'
import ControlCart from '@/common/cart/ControlCart'
const ERRORCODE = 0
export default {
  name: 'Goods',
  components: {
    ShopCart,
    ControlCart
  },
  data () {
    return {
      goods: [],
      types: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heightList: [],
      scrollY: 0,
      minPrice: null,
      deliveryPrice: null
    }
  },
  methods: {
    getData () {
      axios.get('api/goods.json').then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.goods = res.goods
        this.deliveryPrice = res.deliveryPrice
        this.minPrice = res.minPrice
        // $nextTick 是在下次DOM更新循环结束之后执行延迟回调,在修改数据之后使用
        // $nextTick 则可以在回调中获取更新后的DOM,(页面渲染完成之后调用)
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      }
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true, tap: true})
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {click: true, tap: true, probeType: 3})
      // probeType: 3 参数设置 滚动时返回实时位置
      this.foodScroll.on('scroll', (pos) => {
        // console.log(pos)
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight () {
      // 获取所有类名为 food-list-hook 的元素集合
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      // 初始高度为0
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let tempitem = foodList[i]
        height += tempitem.clientHeight
        this.heightList.push(height)
      }
      // console.log(this.heightList)
    },
    selectMenu (index, event) {
      // 阻止pc访问时点击事件又一次触发
      if (!event._constructed) {
        return false
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 200)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let h1 = this.heightList[i]
        let h2 = this.heightList[i + 1]
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i
        }
      }
      return 0
    },
    selectGoods () {
      let foods = []
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped="scoped">
@import '~styles/mixins'
.border-left::before
  border-left: 3px solid #d9dde1!important
.goods
  position: absolute
  left: 0
  top: 3.48rem
  bottom: .96rem
  right: 0
  overflow: hidden
  display: flex
  .menu-wrapper
    flex: 0 0 1.6rem
    width: 1.6rem
    background: #f3f5f7
    .menu-item
      display: table
      width: 100%
      box-sizing: border-box
      padding: 0 .24rem
      height: 1.08rem
      line-height: 150%
      font-size: .22rem
      &.current
        background: #fff
        font-weight: 700
      &:last-child
        &.border-bottom::before
          border-bottom: 0
      .txt
        display:table-cell
        vertical-align: middle
        .icon
          display: inline-block
          margin-right: .04rem
          position: relative
          top: .02rem
          width: .24rem
          height: .24rem
          overflow: hidden
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
  .foods-wrapper
    flex: 1
    .food-list-item
      h3
        background: #f3f5f7
        height: .52rem
        line-height: .52rem
        padding-left: .28rem
        font-size: .24rem
        color: rgb(147,153,159)
      .food-item
        position: relative
        padding: 0 .36rem
        .food
          padding: .36rem 0
          display:flex
          .img
            width: 1.14rem
            height: 1.14rem
            margin-right: .2rem
            overflow: hidden
            img
              display: block
              width: 100%
              height: 100%
          .info
            flex: 1
            h4
              font-size: .28rem
              color: rgb(7,17,27)
            .desc, .sale
              font-size: .2rem
              color: rgb(147,153,159)
            .desc
              padding: .16rem 0
              line-height: 150%
            .price
              padding-top: .16rem
              font-size: .2rem
              color: #ff0000
              span
                font-size: .28rem
                font-weight: 700
              del
                color: rgb(147,153,159)
                padding-left: .16rem
                text-decoration: line-through
                font-weight: 700
        &:last-child
          .food.border-bottom::before
            border-bottom: 0
        .control
          position: absolute
          right: .28rem
          bottom: .3rem
</style>
