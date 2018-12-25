<template>
  <div class="ratingselect">
    <div class="select-tab border-bottom">
      <div class="tab-item" @click="select(2,$event)" :class="{'active':selectType===2}">{{selectDesc.all}}<span>12</span></div>
      <div class="tab-item" @click="select(0,$event)" :class="{'active':selectType===0}">{{selectDesc.positive}}<span>12</span></div>
      <div class="tab-item negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{selectDesc.negative}}<span>12</span></div>
    </div>
    <div class="filter" :class="{'on':onlyContent}" @click="toggleOnly">
      <i class="iconfont icon-check_circle"></i>
      只看有内容评价
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'RatingSelect',
  props: {
    // 列表内容
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 当前所选择的tab
    selectType: {
      type: Number,
      default: ALL
    },
    // 是否只看有内容的评论
    onlyContent: {
      type: Boolean,
      default: false
    },
    // tab的内容
    selectDesc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    select (type, event) {
      // 引用better-scroll 才需要做该判断
      if (!event._constructed) {
        return
      }
      // this.selectType = type 此句写了会报错，需要通过事件派发，通知父组件修改
      // 通过$emit一个事件通知父组件来更新，父组件调用时必需传入@ratingType
      this.$emit('ratingType', type)
    },
    toggleOnly (event) {
      if (!event._constructed) {
        return
      }
      let only = this.onlyContent
      this.$emit('switchOnly', only)
    }
  }
}
</script>

<style lang="stylus" scoped>
.select-tab
  padding: .36rem 0
  font-size: 0
  .tab-item
    display: inline-block
    color: rgb(77,85,93)
    background: rgba(0,120,220,.2)
    font-size: .24rem
    padding: 0.16rem .24rem
    margin-right: .16rem
    &.active
      color: #fff
      background: rgb(0,120,220)
    &.negative
      background: rgba(77,85,93,.2)
      &.active
        background: rgb(77,85,93)
    span
      font-size: .16rem
      padding-left: .08rem
.filter
  display: flex
  padding: .24rem 0
  align-items: center
  font-size: .24rem
  color: rgb(147,153,159)
  &.on
    .iconfont
      color: #00c850
  .iconfont
    font-size: .48rem
    margin-left: .1rem
</style>
