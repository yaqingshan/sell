<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="seller-info">
        <div class="info border-bottom">
          <div class="title">{{seller.name}}</div>
          <div class="score-sale">
            <div class="star">
              <star :size="36" :score="seller.score"></star>
            </div>
            （{{seller.ratingCount}}）
            <div class="sales">
              月售{{seller.sellCount}}单
            </div>
          </div>
          <div class="collection" @click="toggleFavorite">
            <div class="icon icon-favorite" :class="{'active': this.isFavorite}"></div>
            <div class="txt">{{favoriteTxt}}</div>
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
            <icon :sizeType="4" :type="item.type"></icon>{{item.description}}
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-reality" v-show="seller.pics">
        <div class="title">
          商家实景
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picInWrapper">
              <li class="pic-item" v-for="(item, index) in seller.pics" :key="index">
                <img :src="item" />
              </li>
            </ul>
        </div>
        </div>
      </div>
      <split></split>
      <div class="seller-infos" v-show="seller.infos">
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
import Vue from 'vue'
import BScroll from 'better-scroll'
import Split from '@/common/split/Split'
import Star from '@/common/star/Star'
import Icon from '@/common/icon/Icon'
import {urlParse} from 'js/util.js'
import {saveToLocal, readFromLocal} from 'js/store.js'
// import {mapState, mapMutations} from 'vuex'
const ERRORCODE = 0
export default {
  name: 'Seller',
  components: {
    Split,
    Star,
    Icon
  },
  data () {
    return {
      seller: {},
      picLength: 0,
      isFavorite: false
    }
  },
  methods: {
    getData () {
      axios.get('api/seller.json?id=' + this.seller.id).then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      res = res.data
      if (res.errno === ERRORCODE) {
        this.seller = res.seller
        this.picLength = res.seller.pics.length
      }
    },
    picScroll () {
      if (this.picLength > 0) {
        let width = 0
        width = (120 + 6) * this.picLength
        this.$refs.picInWrapper.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.imgScroll) {
            this.imgScroll = new BScroll(this.$refs.picWrapper, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            })
          } else {
            this.imgScroll.refresh()
          }
        })
      }
    },
    toggleFavorite (event) {
      if (!event._constructed) {
        return
      }
      this.isFavorite = !this.isFavorite
      console.log(this.seller.id)
      saveToLocal(this.seller.id, 'favorite', this.isFavorite)
      // this.tagFavorite(this.isFavorite)
    },
    // ...mapMutations(['tagFavorite']),
    getParam () {
      let queryParam = urlParse()
      // console.log(queryParam)
      // 给对象添加属性时,需要引入vue使用set设置
      Vue.set(this.seller, 'id', queryParam.id)
    },
    getValue (id) {
      this.isFavorite = readFromLocal(id, 'favorite', false)
    }
    // loacalStorage 存储的数据 返回的是string 类型 需要转化为布尔型
    // setValue () {
    //   if (this.current === 'false') {
    //     this.isFavorite = false
    //   } else {
    //     this.isFavorite = true
    //   }
    //   console.log(this.isFavorite)
    // }
  },
  computed: {
    favoriteTxt () {
      return this.isFavorite ? '已收藏' : '收藏'
    }
    // ...mapState({
    //   current: 'isFavorite'
    // })
  },
  watch: {
    'seller' () {
      this.picScroll()
    }
  },
  mounted () {
    this.getData()
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerWrapper, {click: true, tap: true})
      } else {
        this.scroll.refresh()
      }
    })
    // this.setValue()
  },
  updated () {
    this.getParam()
    this.getValue(this.seller.id)
  }
}
</script>

<style lang="stylus" scoped>
.seller
  position: absolute
  left: 0
  top: 3.48rem
  right: 0
  bottom: 0
  overflow: hidden
  .title
    font-size: .28rem
    color:rgb(7,17,27)
    line-height: 150%
  .seller-info
    padding: 0 .36rem
    .info
      padding: .36rem 0
      position: relative
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
      .collection
        position: absolute
        width: .8rem
        right: 0
        top: .28rem
        font-size: .2rem
        line-height: 150%
        padding-top: .1rem
        color: rgb(77,85,93)
        text-align: center
        .icon
          font-size: .48rem
          color: #d4d6d9
          &.active
            color: #ff0000
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
    .pic-wrapper
      padding-top: .26rem
      width: 100%
      overflow: hidden
      .pic-list
        display: flex
        align-items: center
        // flex-wrap: nowrap
        .pic-item
          display: block
          width: 2.4rem
          height: 1.8rem
          margin-right: .12rem
          img
            display: block
            width: 2.4rem
            height: 1.8rem
  .seller-infos
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
