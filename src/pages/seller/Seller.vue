<template>
  <div class="seller">
    <div class="seller-content">
      <div class="seller-info">
        <div class="info border-bottom">
          <div class="title">{{seller.name}}</div>
          <div class="score-sale">
            <div class="star">
              <star :size="36" :score="seller.score"></star>
            </div>
            <div class="sales">
              月售{{seller.sellCount}}单
            </div>
          </div>
        </div>
        <div class="tips">
          <div class="tip-item">
            <div class="tip-title">
              起送价
            </div>
            <div class="price">
              <span>{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="tip-item border-rightleft">
            <div class="tip-title">
              商家配送
            </div>
            <div class="price">
              <span>{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="tip-item">
            <div class="tip-title">
              平均配送时间
            </div>
            <div class="price">
              <span>{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">
          公告与活动
        </div>
        <div class="txt">
          {{seller.bulletin}}
        </div>
        <ul class="list" v-show="seller.supports">
          <li class="list-item border-top" v-for="(item, index) in seller.supports" :key="index">
            <span></span>{{item.description}}
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-reality" v-show="seller.pics">
        <div class="title">
          商家实景
          <ul class="pic-list">
            <li class="pic-item" v-for="(item, index) in seller.pics" :key="index">
              <img :src="item" />
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info" v-show="seller.infos">
        <div class="title">
          商家信息
        </div>
        <ul class="info-list">
          <li class="info-item border-top" v-for="(item, index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Split from '@/common/split/Split'
import Star from '@/common/star/Star'
const ERRORCODE = 0
export default {
  name: 'Seller',
  components: {
    Split,
    Star
  },
  data () {
    return {
      seller: {}
    }
  },
  methods: {
    getData () {
      axios.get('api/seller.json').then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.seller = res.seller
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
.seller
  position: absolute
  left: 0
  top: 3.48rem
  right: 0
  .title
    font-size: .28rem
    color:rgb(7,17,27)
    line-height: 150%
  .seller-info
    padding: 0 .36rem
    .info
      padding: .36rem 0
      .score-sale
        display: flex
        align-items: center
        padding-top: .16rem
        .star >>> .star-item
         margin-right: .16rem
        .sales
          padding-left: .24rem
          font-size: .2rem
          color: rgb(77,85,93)
    .tips
      display: flex
      align-items: center
      padding: .36rem 0
      .tip-item
        flex: 1
        text-align: center
        box-sizing: border-box
        .tip-title
          font-size: .2rem
          color: rgb(147,153,159)
        .price
          padding-top: .18rem
          font-size: .2rem
          color: rgb(7,17,27)
          line-height: 150%
          span
            font-size: .48rem
  .bulletin
    padding: .36rem
    padding-bottom: 0
    .txt
      padding: .32rem 0
      font-size: .24rem
      color: rgb(240,20,20)
      line-height: 2
    .list
      .list-item
        padding: .32rem .24rem
        display: flex
        align-items: center
        font-size: .24rem
        color: rgb(7,17,27)
  .seller-reality
    padding: .36rem
    .pic-list
      display: flex
      align-items: center
      flex-wrap: nowrap
      .pic-item
        display: block
        width: 2.4rem
        height: 1.8rem
  .seller-info
    padding: .36rem
    padding-bottom: 0
    .info-list
      padding-top: .36rem
      .info-item
        padding: .32rem .24rem
        line-height: 150%
        font-size: .24rem
        color: rgb(7,17,27)
</style>
