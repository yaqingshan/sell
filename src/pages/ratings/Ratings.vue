<template>
  <div class="ratings">
    <div class="score-wrapper">
      <div class="score-left">
        <div class="score">{{seller.score}}</div>
        <div class="score-title">综合评分</div>
        <p>高于周边商家93%</p>
      </div>
      <div class="score-right">
        <div class="right-item">
          <div class="score-title">服务态度</div>
          <div class="star">
            <star></star>
          </div>
          <div class="star-num">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/common/star/Star'
import axios from 'axios'
export default {
  name: 'Ratings',
  components: {
    Star
  },
  data () {
    return {
      seller: {},
      ratings: []
    }
  },
  methods: {
    getData () {
      // api/goods.json
      axios.get('api/seller.json').then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      res = res.data
      if (res.errno === 0) {
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

</style>
