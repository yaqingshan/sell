<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item border-bottom" v-for="(item,index) in goods" :key="index">
          <span>111</span>{{item.name}}
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li class="food-item" v-for="(item,index) in goods" :key="index">
          <h3 class="border-left">{{item.name}}</h3>
          <ul>
            <li class="food-li" v-for="(food,index) in item.foods" :key="index">
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
const ERRORCODE = 0
export default {
  name: 'Goods',
  components: {
  },
  data () {
    return {
      goods: []
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
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped="scoped">
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
    background: #f3f5f7
    .menu-item
      display: table
      margin: 0 .24rem
      height: 1.08rem
      line-height: 150%
      span
        display: inline-block!important
  .foods-wrapper
    flex: 1
    .food-item
      h3
        background: #f3f5f7
        height: .52rem
        line-height: .52rem
        padding-left: .28rem
        font-size: .24rem
        color: rgb(147,153,159)
      .food-li
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
              line-height: 150%
            .desc, .sale
              font-size: .2rem
              color: rgb(147,153,159)
            .desc
              padding: .16rem 0
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
          .food.border-bottom
            border: 0
</style>
