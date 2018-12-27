<template>
  <div class="ratings">
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
        <li class="rating-item" v-for="(item, index) in ratings" :key="index">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="info">
            <div class="user">
              <div class="name">{{item.username}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from '@/common/star/Star'
import axios from 'axios'
import Split from '@/common/split/Split'
import RatingSelect from '@/common/ratingselect/RatingSelect'
const ALL = 2
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
      if (res.errno === 0) {
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
      if (res.errno === 0) {
        this.ratings = res.ratings
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
  }
}
</script>

<style lang="stylus" scoped>
.score-right >>> .star.star-36 .star-item
  margin-right: .16rem
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
  .rating-item
    display: flex
    .avatar
      width: .56rem
      height: .56rem
      border-radius: 50%
      overflow: hidden
      img
        display: block
        width: .56rem
        height: .56rem
</style>
