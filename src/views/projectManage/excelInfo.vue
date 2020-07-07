<template>
  <div class="excel-info">
    <iframe :src="data" width="100%" height="850px">
      This browser does not support PDFs. Please download the PDF to view it:
      <a :href="data">Download PDF</a>
    </iframe>
  </div>
</template>

<script>
import api from '@/fetch/api'

export default {
  data () {
    return {
      data: ''
    }
  },
  watch: {
    '$route.params.excelId': function (val) {
      this.previewFile()
    }
  },
  methods: {
    previewFile () {
      api.previewFile(this.$route.params.excelId).then(res => {
        this.data = res.data
      })
    }
  },
  mounted () {
    this.previewFile()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.excel-info {
  background-color: #fff;
  text-align: center;
}
</style>
