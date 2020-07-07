<!-- 指标分析完成 -->
<template>
  <div class="result">
    <template v-if="analysisCompleted">
      <img src="@/assets/img/analyzed.png" alt="">
      <p class="status" style="font-size: 18px;">指标分析完成！</p>
      <el-button class="see-btn" @click="seeIndex">查看指标信息</el-button>
    </template>
    <template>
      <img src="@/assets/img/analyzing.png" alt="">
      <p class="result">解析需要持续几分钟，关闭当前界面可在
        <span style="color: #4474CF;">项目信息</span> >
        <span style="color: #4474CF;cursor:pointer" @click="seeRecord">指标数据记录</span>
        中查看具体进度。
      </p>
    </template>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  components: {},
  data() {
    return {
      directoryList: [],
      projectId: (() => this.$route.params.projectId)(),
      analysisCompleted: false //分析完成
    }
  },
  methods: {
    seeRecord() {
      this.$router.push(`/indexAnalysis/record/${this.projectId}`)
    },
    // 指标分析查看
    seeIndex() {
      // 指标目录
      api.sidebarDirectory(this.projectId).then(res => {
        this.directoryList = res.data
        let arr = []
        this.directoryList.map(item => {
          item.indicatorName.map(items => {
            if (items.indicatorName == '造价指标') {
              arr.push(items.indicatorName)
            }
          })
        })
        for (let i = 0; i < this.directoryList.length; i++) {
          const one = this.directoryList[i]
          for (let a = 0; a < one.indicatorName.length; a++) {
            const two = one.indicatorName[a]
            if (arr.length > 0) {
              if (two.indicatorName == '造价指标') {
                if (two.projectIndex.length > 0) {
                  let proIndex = two.projectIndex.findIndex(data => data.projectIndexNmae == '项目指标')
                  if (proIndex || proIndex == 0) {
                    let buildingId = two.projectIndex[proIndex].projectId
                    let stageId = two.projectIndex[proIndex].stageId
                    this.$router.push(
                      `/projectManage/detail/newIndexData/proIndex/${this.projectId}/${buildingId}/${stageId}`
                    )
                  } else {
                    break
                  }
                }
              } else {
                continue
              }
            } else {
              this.$router.push(
                `/projectManage/detail/newIndexData/operandIndex/${this.projectId}/${this.directoryList[0].indicatorName[0].monomerMessage[0].buildingId}`
              )
            }
          }
        }
      })
    }
  },
  mounted() {
    this.$store.dispatch('nextStepFUN', 4)
  }
}
</script>
<style lang='less' scoped>
.result {
  text-align: center;
  padding-top: 83px;
  box-sizing: border-box;
  .status {
    margin: 60px 0 51px;
  }
  .see-btn {
    display: inline-block;
    background-color: #44cf96;
    height: 30px;
    line-height: 30px;
    padding: 0 33px;
    color: #fff;
  }
}
</style>