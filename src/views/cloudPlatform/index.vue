<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container">
      <firstRow v-has="['uiYMxO']" :indexLatestNews='indexLatestNews' :fourData='fourData' />
      <secondRow v-if="hasChart1" :psArray='psArray' :psList='psList' />
      <thirdRow v-if="hasChart2" />
      <fourthRow v-if="hasChart2" />
      <fifthRow v-has="['uiYMxO']" :xmMonthDeptShow='xmMonthDeptShow' :xmMonthUserShow='xmMonthUserShow' :dxMonthDeptShow='dxMonthDeptShow' :dxMonthUserShow='dxMonthUserShow' />
    </div>
    <span v-has="['DE9XOM']" class="J-has"></span>
    <span v-has="['Uqq0UU']" class="K-has"></span>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import firstRow from './firstRow'
import secondRow from './secondRow'
import thirdRow from './thirdRow'
import fourthRow from './fourthRow'
import fifthRow from './fifthRow'
import { isDisplay } from '@/assets/js/Utils'

export default {
  components: {
    headerComponent,
    breadcrumb,
    firstRow,
    secondRow,
    thirdRow,
    fourthRow,
    fifthRow
  },
  data () {
    return {
      hasChart1: true,
      hasChart2: false,
      breadcrumbs: [{ name: '首页', path: this.$route.fullPath }],
      websocket: null,
      indexLatestNews: [], // 最新动态
      xmMonthDeptShow: [], // 项目贡献榜 大区
      xmMonthUserShow: [], // 项目贡献榜 员工
      dxMonthDeptShow: [], // 单项工程贡献榜 大区
      dxMonthUserShow: [], // 单项工程贡献榜 员工
      psArray: [], // 项目分类统计
      psList: [], // 项目地域分布
      fourData: [] // 顶部我的项目、企业项目、单项工程指标、综合单价指标
    }
  },
  methods: {
    // 顶部我的项目、企业项目、单项工程指标、综合单价指标
    getIndex4 () {
      api.getIndex4().then(res => (this.fourData = res.data))
    },
    // 最新动态
    getIndexNews () {
      api.getIndexNews().then(res => {
        // if (this.indexLatestNews.length && res.data.length) {
        //   if (this.indexLatestNews[0].id != res.data[0].id) this.showNew = true
        // }
        this.indexLatestNews = res.data
      })
    },
    // 最新动态定时器
    startNewsInterval () {
      let index = 0
      window.interval = setInterval(() => {
        index++
        if (index === 10) clearInterval(interval)
        this.getIndexNews()
      }, 60000)
    },
    // 项目分类统计
    getProjectPercent () {
      api.getProjectPercent().then(res => (
          this.psArray = res.data
      ))
    },
    // 项目 || 单项工程贡献榜（当月）
    getProjectOrMonomerTop5 (val) {
      api.getProjectOrMonomerTop5(val).then(res => {
        console.log(res,'red');
        if (val == 1) {
          this.xmMonthDeptShow = res.data.deptShow || []
          this.xmMonthUserShow = res.data.userShow || []
        } else {
          this.dxMonthDeptShow = res.data.deptShow || []
          this.dxMonthUserShow = res.data.userShow || []
        }
      })
    },
    initWebSocket () {
      // 初始化weosocket
      const wsurl = process.env.VUE_APP_API.replace('http', 'ws') + 'webSocket/' + localStorage.userName // ws地址
      this.websocket = new WebSocket(wsurl)
      this.websocket.onopen = this.websocketonopen
      this.websocket.onerror = this.websocketonerror
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onclose = this.websocketclose
    },
    websocketonopen () {
      console.log('WebSocket连接成功')
    },
    websocketonerror (e) {
      // window.location.href = process.env.VUE_APP_LOGIN_ROOT + '/login/index?subsystemUrl=' + window.location.href
    },
    websocketonmessage (e) {
      const redata = JSON.parse(e.data)
      // 我的项目数据需要单独获取
      api.getMyProject().then(res => {
        redata.threeData[0] = res.data
        this.indexLatestNews = redata.indexLatestNews
        this.xmMonthDeptShow = redata.projectTopShow.deptShow || []
        this.xmMonthUserShow = redata.projectTopShow.userShow || []
        this.dxMonthDeptShow = redata.monomerTopShow.deptShow || []
        this.dxMonthUserShow = redata.monomerTopShow.userShow || []
        this.psArray = redata.psArray
        this.psList = redata.psList
        this.fourData = redata.threeData
      })
    },
    websocketsend (agentData) {
      this.websocket.send(agentData)
    },
    websocketclose (e) {
      console.log(e.type)
    },
    getChinaData () {
      // 项目地域分布
      api.getProjectStatistics().then(res => {
        // this.handleChinaData(res.data)
        this.psList = res.data
      })
    }
  },
  created () {
    // 随便调个接口，防止用户未登录
    api.getMyProject().then(res => {})
    // 页面刚进入时且支持时开启长连接
    //if ('WebSocket' in window) {
      this.initWebSocket() 
    //} else {
      this.getIndex4()
      this.getIndexNews()
      this.startNewsInterval()
      this.getProjectPercent()
      this.getProjectOrMonomerTop5(1)
      this.getProjectOrMonomerTop5(3)
      this.getChinaData()
    //}
    console.log('WebSocket' in window,'1111');
  },
  mounted () {
    isDisplay(this, 'J-has', 'hasChart1')
    isDisplay(this, 'K-has', 'hasChart2')
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.websocket.close()
    clearInterval(window.interval)
  }
}
</script>
<style lang="less" scoped>
.container {
  margin-top: 20px;
  margin-bottom: 22px;
  width: 97.2%;
}
</style>
