<template>
  <transition name="move">
    <div class="detail" v-show="showFlag">
      <div class="content">
        <div class="head-img">
          <img :src="selfood.image" />
          <div class="back" @click="back">
            <span class="iconfont icon-arrow_lift"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GoodsDetail',
  props: {
    selfood: Object
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    back () {
      this.showFlag = false
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
</style>
