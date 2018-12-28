<template>
<div class="ratings" ref="ratingsWrapper">
  <div class="ratings-content">
    <div class="score-wrapper">
      <div class="score-left">
        <div class="score">{{seller.score}}</div>
        <div class="score-title">综合评分</div>
        <p>高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="score-right border-left">
        <div class="right-wrapper">
          <div class="right-item">
            <div class="score-title">服务态度</div>
            <div class="star">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <div class="star-num">
              {{seller.serviceScore}}
            </div>
          </div>
          <div class="right-item">
            <div class="score-title">商品评价</div>
            <div class="star">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <div class="star-num">
              {{seller.foodScore}}
            </div>
          </div>
           <div class="right-item">
            <div class="score-title">送达时间</div>
            <p class="time">
              {{seller.deliveryTime}}分钟
            </p>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <div class="select-wrapper border-bottom">
      <rating-select
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @ratingType="ratingType"
        @switchOnly="switchOnly"></rating-select>
    </div>
    <div class="rating-wrapper">
      <ul>
        <li v-show="needShow(item.rateType, item.text)" class="rating-item border-bottom"
            v-for="(item, index) in ratings" :key="index">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="info">
            <div class="user">
              <div class="name">{{item.username}}</div>
              <div class="date">{{item.rateTime | formatDate}}</div>
            </div>
            <div class="info-star">
              <div class="star">
                <star :size="24" :score="item.score"></star>
              </div>
              <div class="time" v-show="item.deliveryTime">
                {{item.deliveryTime}}分钟送达
              </div>
            </div>
            <div class="txt">
              {{item.text}}
            </div>
            <div class="symbol-recommend">
              <i class="iconfont" :class="{'icon-thumb_down':item.rateType === 1, 'icon-thumb_up':item.rateType === 0}"></i>
              <div class="recommend" v-show="item.recommend">
                <div class="rec-item border" v-for="(item, index) in item.recommend" :key="index">{{item}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Star from '@/common/star/Star'
import axios from 'axios'
import Split from '@/common/split/Split'
import RatingSelect from '@/common/ratingselect/RatingSelect'
import {formatDate} from 'js/date.js'
import BScroll from 'better-scroll'
const ALL = 2
const ERRORCODE = 0
export default {
  name: 'Ratings',
  components: {
    Star,
    Split,
    RatingSelect
  },
  data () {
    return {
      seller: {},
      ratings: [],
      selectType: ALL,
      onlyContent: false
    }
  },
  methods: {
    getSeller () {
      axios.get('api/seller.json').then(
        this.getSellerSuccess
      )
    },
    getSellerSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.seller = res.seller
      }
    },
    getRatings () {
      axios.get('api/ratings.json').then(
        this.getRatingsSuccess
      )
    },
    getRatingsSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.ratings = res.ratings
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {click: true, tap: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
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
    }
  },
  mounted () {
    this.getSeller()
    this.getRatings()
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
.star >>> .star.star-36 .star-item
  margin-right: .16rem
.ratings
  position: absolute
  left: 0
  right: 0
  top: 3.48rem
  bottom: 0
  overflow: hidden
.score-wrapper
  padding: .36rem 0
  display: flex
  align-items: center
  .score-title
    font-size: .24rem
    line-height: 150%
    color: rgb(7,17,27)
    line-height: 150%
    padding: .12rem 0
  p
    font-size: .2rem
    line-height: 150%
    color: rgb(147,153,159)
  .score-left
    width: 34%
    text-align: center
    .score
      font-size: .48rem
      color: rgb(255,153,0)
  .score-right
    flex: 1
    display: flex
    justify-content: center
    .right-item
      display: flex
      align-items: center
      .score-title
        padding-right: .2rem
      .star-num
        padding-left: .2rem
.select-wrapper
  padding: 0 .36rem
.rating-wrapper
    padding: 0 .36rem
  .rating-item
    padding: .36rem 0
    display: flex
    .avatar
      width: .56rem
      height: .56rem
      border-radius: 50%
      overflow: hidden
      margin-right: .24rem
      img
        display: block
        width: .56rem
        height: .56rem
    .info
      flex: 1
      .user
        display: flex
        align-items: center
        padding-bottom: .08rem
        .name
          flex: 1
      .info-star
        display: flex
        align-items: center
        .time
          font-size: .2rem
          color: rgb(147,153,159)
      .txt
        font-size: .24rem
        padding-top: .12rem
        line-height: 150%
        color: rgb(7,17,27)
      .symbol-recommend
        display: flex
        .iconfont
          margin-top: .3rem
          font-size: .24rem
          margin-right: .08rem
          &.icon-thumb_up
            color: rgb(0,120,220)
        .recommend
          flex: 1
          font-size: 0
          .rec-item
            display: inline-block
            margin-left: .16rem
            margin-top: .16rem
            font-size: .18rem
            color: rgb(147,153,159)
            padding: .16rem .12rem

</style>
