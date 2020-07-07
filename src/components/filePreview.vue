<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <iframe :src="previewUrl" frameborder="0" width="100%" style="height: 99vh"></iframe>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data () {
    return {
      previewUrl: '',
      fullscreenLoading: false
    }
  },
  created () {
    this.fullscreenLoading = true
    api.previewFile(this.$route.params.id).then(res => {
      this.previewUrl = res.data
      this.fullscreenLoading = false
    })
  }
}
</script>
