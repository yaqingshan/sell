<template>
  <div class="tab border-bottom">
    <router-link to="/" class="tab-item">商品</router-link>
    <router-link to="/ratings" class="tab-item">评价</router-link>
    <router-link to="/seller" class="tab-item">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'GoodsTab'
}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  height: .8rem
  line-height: .8rem
  font-size: .28rem
  .router-link-exact-active.router-link-active
    color: rgb(240,20,20)
  .tab-item
    flex: 1
    text-align: center
    color: rgb(77,85,93)
</style>
