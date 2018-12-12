<template>
<div class="head">
  <div class="content">
    <div class="img">
      <img :src="seller.avatar" />
    </div>
    <div class="info">
      <div class="title"><span class="brand"></span>{{seller.name}}</div>
      <div class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
      <p class="desc"><span class="icon" :class="types[type]"></span>{{desc}}</p>
    </div>
    <div class="count" @click="handleShowDetail">
      {{supports.length}}个<i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin" @click="handleShowDetail">
    <span class="icon"></span>
    <p>{{seller.bulletin}}</p>
    <i class="iconfont icon-keyboard_arrow_right"></i>
  </div>
  <div class="bgimg">
    <img :src="seller.avatar" />
  </div>
  <!-- 详情弹框 -->
  <transition name="fade">
    <div class="detail" v-show="showDetail">
      <div class="detail-wrapper clearfix">
        <div class="wrapper">
          <h1>{{seller.name}}</h1>
          <div class="star-box">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="h-title">
            <div class="line border-bottom"></div>
            <h4>优惠信息</h4>
            <div class="line border-bottom"></div>
          </div>
          <ul>
            <li v-for="item in supports" :key="item.type">
              <span class="icon" :class="types[item.type]"></span>
              <p>{{item.description}}</p>
            </li>
          </ul>
          <div class="h-title">
            <div class="line border-bottom"></div>
            <h4>商家公告</h4>
            <div class="line border-bottom"></div>
          </div>
          <div class="tips">
            {{seller.bulletin}}
          </div>
        </div>
      </div>
      <div class="detail-footer">
        <i class="iconfont icon-close" @click="handleHideDetail"></i>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import axios from 'axios'
import Star from './../star/Star'
const ERRORCODE = 0
export default {
  name: 'CommonHead',
  components: {
    Star
  },
  data () {
    return {
      seller: {},
      supports: [],
      type: null,
      desc: '',
      showDetail: false,
      // 用于显示图标
      types: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    getData () {
      axios.get('/api/seller.json').then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.seller = res.seller
        this.supports = res.seller.supports
        this.type = res.seller.supports[0].type
        this.desc = res.seller.supports[0].description
      }
    },
    // 显示详情窗口
    handleShowDetail () {
      this.showDetail = true
    },
    // 隐藏详情窗口
    handleHideDetail () {
      this.showDetail = false
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
// 引入样式时用@import 路径前面需要加 ~
@import '~styles/mixins.styl'
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
.head
  position: relative
  color: #fff
  background: rgba(7,17,27,.5)
  overflow: hidden
  .bgimg
    position: absolute
    left: 0
    right: 0
    top: 0
    z-index: -1
    img
      display: block
      /* 高斯模糊 */
      filter: blur(.1rem)
      width: 100%
  .content
    position: relative
    display: flex
    align-items: center
    .img
      width: 1.28rem
      height: 1.28rem
      margin: .48rem .32rem .36rem .48rem
      border-radius: 3px
      overflow: hidden
      img
        display: block
        width: 1.28rem
        height: 1.28rem
    .info
      .title
        display: flex
        align-items: center
        font-size: .32rem
        font-weight: 700
        line-height: 150%
        padding-top: .06rem
        .brand
          width: .6rem
          height: .36rem
          margin-right: .12rem
          bg-image('images/brand')
      .delivery
        font-size: .24rem
        line-height: 150%
        padding-top: .08rem
      .desc
        display: flex
        align-items: center
        font-size: .2rem
        line-height: 150%
        padding-top: .12rem
        .icon
          width: .24rem
          height: .24rem
          margin-right: .08rem
          &.decrease
            bg-image('images/decrease_1')
          &.discount
            bg-image('images/discount_1')
          &.guarantee
            bg-image('images/guarantee_1')
          &.invoice
            bg-image('images/invoice_1')
          &.special
            bg-image('images/special_1')
    .count
      height: .48rem
      line-height: .48rem
      padding: 0 .16rem
      background: rgba(0,0,0,.2)
      position: absolute
      bottom: .36rem
      right: .24rem
      border-radius: .24rem
      overflow: hidden
      font-size: .2rem
      display: flex
      align-items: center
      i
       padding-left: .04rem
  .bulletin
    display: flex
    align-items: center
    background: rgba(7,17,27,.2)
    height: .56rem
    line-height: .56rem
    color: #fff
    .icon
      width: .44rem
      height: .24rem
      margin-left:.24rem
      margin-right: .08rem
      bg-image('images/bulletin')
    p
      flex: 1
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
  /* sticky-footer*/
  .detail
    position: fixed
    z-index: 99
    left: 0
    right: 0
    top: 0
    bottom: 0
    //此处overflow 是为了sticky-footer布局
    overflow: auto
    background: rgba(7,17,27,.8)
    // 渐进增强，只对苹果手机有效果
    backdrop-filter: (.1rem)
    .detail-wrapper
      width: 100%
      min-height: 100%
      .wrapper
        padding-bottom: 1.3rem
        h1
          font-size: .32rem
          font-weight: 700
          text-align: center
          padding-top: 1.28rem
          padding-bottom: .32rem
        .star-box
          padding-bottom: .56rem
          .star
            text-align: center
        .h-title
          width: 80%
          margin: 0 auto
          display: flex
          align-items: center
          .line
            flex: 1
          .border-bottom::before
            border-bottom:1px solid rgb(255,255,255)
          h4
            font-size: .28rem
            font-weight: 700
            color: #fff
            line-height: 150%
            padding: 0 .24rem
        ul
          width: 80%
          margin: 0 auto
          padding: .46rem 0
          li
            display: flex
            align-items: center
            margin-bottom: .12rem
            .icon
              display: block
              width: .32rem
              height: .32rem
              margin-right: .12rem
              &.decrease
                bg-image('images/decrease_2')
              &.discount
                bg-image('images/discount_2')
              &.guarantee
                bg-image('images/guarantee_2')
              &.invoice
                bg-image('images/invoice_2')
              &.special
                bg-image('images/special_2')
            p
              font-size: .24rem
              line-height: 150%
        .tips
          width: 80%
          padding-top: .48rem
          margin: 0 auto
          text-align: justify
          font-size: .24rem
          line-height: .48rem
          color: #fff
    .detail-footer
      position: relative
      margin-top: -1.3rem
      text-align: center
      color: #fff
      padding-bottom: .64rem
      clear: both
      .iconfont
        font-size: .64rem

</style>
