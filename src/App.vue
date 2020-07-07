<template>
  <div id="app">
    <keep-alive :include="/projectLibrary|projectManage|monitorCenter/">
      <router-view />
    </keep-alive>
    <floatIcon v-if="showFloatIcon"/>
  </div>
</template>

<script>
import floatIcon from '@/components/floatIcon'

export default {
  name: 'App',
  components: {
    floatIcon
  },
  computed: {
    showFloatIcon () {
      return window.location.pathname !== '/login'
    }
  }
}
</script>

<style>
/* 有滚动条时抖动 */
/* html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
} */
</style>
