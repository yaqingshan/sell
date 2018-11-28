<template>
  <div id="app">
    <top-head></top-head>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
import Tab from '@/common/tab/Tab'
import TopHead from '@/common/head/Head'
export default {
  name: 'App',
  components: {
    Tab,
    TopHead
  }
}
</script>

<style>

</style>
