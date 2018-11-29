<template>
  <div class="head">
    <div class="img">
      <img />
    </div>
    <div class="info">
      <div class="title">粥品香坊（大运村）</div>
      <div class="delivery">蜂鸟配送/38分钟送达</div>
      <p class="discount">满500减200</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CommonHead',
  data () {
    return {

    }
  },
  methods: {
    getData () {
      axios.get('/api/seller.json').then(
        this.getDataSuccess
      )
    },
    getDataSuccess (res) {
      console.log(res)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
.head
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
</style>
