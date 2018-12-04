<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item border-bottom" v-for="(item,index) in goods" :key="index">
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
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
const ERRORCODE = 0
export default {
  name: 'Goods',
  components: {
  },
  data () {
    return {
      goods: [],
      types: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heightList: []
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
      }
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true, tap: true })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, { click: true, tap: true })
    },
    calculateHeight () {
      // 获取所有类名为 food-list-hook 的元素集合
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      console.log(foodList.length)
      // 初始高度为0
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        console.log(foodList[i])
        let tempitem = foodList[i]

        height += tempitem.clientHeight
        console.log(height)
        this.heightList.push(height)
      }
      // console.log(this.heightList)
    }
  },
  computed: {

  },
  mounted () {
    this.getData()
    this.initScroll()

  },
  updated () {
    this.calculateHeight()
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
  bottom: 1.166rem
  right: 0
  overflow: hidden
  display: flex
  .menu-wrapper
    flex: 0 0 1.6rem
    width: 1.6rem
    background: #f3f5f7
    .menu-item
      display: table
      margin: 0 .24rem
      height: 1.08rem
      line-height: 150%
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
</style>
