<template>
  <div class="star" :class="starType">
    <span class="star-item"
    v-for="(itemClass,index) in classesMap"
    :key="index"
    :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'Star',
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    classesMap () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let isDecimal = score % 1 !== 0
      let num = Math.floor(score)
      for (let i = 0; i < num; i++) {
        result.push(CLS_ON)
      }
      if (isDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.star
  font-size: 0
  .star-item
    display: inline-block
  &.star-24
    .star-item
      width: .2rem
      height: .19rem
      margin-right: .06rem
      &:last-child
        margin-right: 0
      &.on
        bg-image('images/star24_on')
      &.half
        bg-image('images/star24_half')
      &.off
        bg-image('images/star24_off')
  &.star-36
    .star-item
      width: .3rem
      height: .29rem
      margin-right: .44rem
      &:last-child
        margin-right: .12rem
      &.on
        bg-image('images/star36_on')
      &.half
        bg-image('images/star36_half')
      &.off
        bg-image('images/star36_off')
  &.star-48
    .star-item
      width: .4rem
      height: .38rem
      margin-right: .44rem
      &:last-child
        margin-right: 0
      &.on
        bg-image('images/star48_on')
      &.half
        bg-image('images/star48_half')
      &.off
        bg-image('images/star48_off')
</style>
