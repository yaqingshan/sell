<template>
<div class="head">
  <div class="content">
    <div class="img">
      <img :src="this.seller.avatar" />
    </div>
    <div class="info">
      <div class="title">{{this.seller.name}}</div>
      <div class="delivery">{{this.seller.description}}/{{this.seller.deliveryTime}}分钟送达</div>
      <p class="desc">满500减200</p>
    </div>
    <div class="count">
      {{this.supports.length}}<i class="iconfont">&#xe609;</i>
    </div>
  </div>
  <div class="bulletin">
    <span></span>
    <p>{{this.seller.bulletin}}</p>
    <i class="iconfont">&#xe609;</i>
  </div>
  <div class="bgimg">
    <img :src="this.seller.avatar" />
  </div>
</div>
</template>

<script>
import axios from 'axios'
const ERRORCODE = 0
export default {
  name: 'CommonHead',
  data () {
    return {
      seller: {},
      supports: []
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
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
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
        font-size: .32rem
        font-weight: 700
        line-height: 150%
        padding-top: .06rem
      .delivery
        font-size: .24rem
        font-weight: 200
        line-height: 150%
        pading-top: .13rem
      .desc
        font-size: .2rem
        font-weight: 200
        line-height: 150%
        padding-top: .2rem
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
      i
       padding-left: .12rem
  .bulletin
    display: flex
    align-items: center
    background: rgba(7,17,27,.2)
    height: .56rem
    line-height: .56rem
    color: #fff
    p
      flex: 1
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden

</style>
