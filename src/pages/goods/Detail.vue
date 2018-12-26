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
        <split v-show="food.info"></split>
        <div class="goods-info" v-show="food.info">
          <h3>商品介绍</h3>
          <p>{{food.info}}</p>
        </div>
        <split></split>
        <div class="goods-comment">
          <h3>商品评价</h3>
          <rating-select :ratings="food.ratings"
                         :selectType="selectType"
                         :onlyContent="onlyContent"
                         :selectDesc="selectDesc"
                         @ratingType="ratingType"
                         @switchOnly="switchOnly"></rating-select>
           <div class="rating-list">
             <ul v-show="isShow">
               <li class="list-item border-bottom"
                   v-show="needShow(item.rateType, item.text)"
                   v-for="(item, index) in food.ratings" :key="index">
                 <div class="item-top">
                   <div class="date">
                     {{item.rateTime | formatDate}}
                   </div>
                   <div class="username">
                     {{item.username}}
                   </div>
                   <div class="avatar">
                     <img :src="item.avatar"  />
                   </div>
                 </div>
                 <div class="item-bot">
                   <i class="iconfont" :class="{'icon-thumb_down':item.rateType === 1, 'icon-thumb_up':item.rateType === 0}"></i>{{item.text}}
                 </div>
               </li>
             </ul>
             <div class="no-data" v-show="!isShow">
              暂无评价
             </div>
           </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ControlCart from '@/common/cart/ControlCart'
import RatingSelect from '@/common/ratingselect/RatingSelect'
import {formatDate} from 'js/date.js'
import Vue from 'vue'
import Bscroll from 'better-scroll'
import Split from '@/common/split/Split'
const ALL = 2
export default {
  name: 'GoodsDetail',
  props: {
    food: Object
  },
  components: {
    ControlCart,
    Split,
    RatingSelect
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      selectDesc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false
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
    },
    // 监听从RatingSelect子组件传过来的当前tab选择项
    ratingType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    switchOnly (only) {
      this.onlyContent = !only
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, txt) {
      if (this.onlyContent && !txt) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  computed: {
    // 是否有数据显示
    isShow () {
      if (this.food.ratings && this.food.ratings.length) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      // 第一个参数为时间 第二个参数为需要转化的格式
      return formatDate(date, 'yyyy-MM-dd hh:mm')
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
        text-decoration: line-through
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
    .rating-list
      .list-item
        padding: .32rem 0
        .item-top
          display: flex
          align-items: center
          font-size: .2rem
          color: rgb(147,153,159)
          .date
            flex: 1
          .avatar
            margin-left: .12rem
            width: .24rem
            height: .24rem
            border-radius: 50%
            overflow: hidden
            img
              display: block
              width: 100%
              height: 100%
        .item-bot
          padding-top: .18rem
          display: flex
          align-items: center
          font-size: .24rem
          color: rgb(7,17,27)
          line-height: 150%
          .iconfont
            margin-right: .08rem
            &.icon-thumb_up
              color: rgb(0,120,220)
</style>
