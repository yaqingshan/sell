<template>
  <div id="app">
    <common-head></common-head>
    <common-tab></common-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import CommonTab from '@/common/tab/Tab'
import CommonHead from '@/common/head/Head'
export default {
  name: 'App',
  components: {
    CommonTab,
    CommonHead
  }
}
</script>

<style>

</style>
