<template>
  <div class="excel-info">
    <div class="background_page" ref="background_page">
      <!-- <iframe :src="url" frameborder="0" width="100%" height="800px"></iframe> -->
      <!-- <iframe src="http://data.qingju.cn:8053/file/userId-userName/pdf/1218e22fff4944fd899b94df7d813389-2018-07-20项目管理的名单.pdf" frameborder="0" width="100%" height="800px"></iframe> -->
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: ['message'],
  data () {
    return {
      id: '',
      url: '',
      show: true,
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0
    }
  },
  mounted () {
    this.getID()
    this.previewFile() // 实际是获取文件id
  },
  watch: {
    message: function (val, oldVal) {
      this.getID()
      this.previewFile()
    }
  },
  methods: {
    getID () {
      function getRequest () {
        var url = window.location.search // 获取url中"?"符后的字串
        var theRequest = new Object()
        if (url.indexOf('?') != -1) {
          var str = url.substr(1)
          let strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
          }
        }
        return theRequest
      }
      this.id = getRequest().id
    },
    previewFile () {
      api.previewFile(this.id).then(res => {
        this.url = res.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.excel-info {
  background-color: #fff;
  text-align: center;
  .background_page {
    min-height: 800px;
  }
}
</style>
