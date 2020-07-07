<!-- 造价下的项目指标 -->
<template>
  <div class="cost-index-page">
    <div class="tab-control">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目指标汇总表" name="first"></el-tab-pane>
        <el-tab-pane label="专业工程暂估价表" name="second"></el-tab-pane>
      </el-tabs>
      <!-- <div class="separated"></div> -->
    </div>
    <keep-alive>
      <proIndexSummary v-if='activeName === "first"' @changeLevel="changeLevel"></proIndexSummary>
      <engineeringEvaluation v-if='activeName === "second"' @changeLevel="changeLevel"></engineeringEvaluation>
    </keep-alive>

  </div>
</template>
<script>
import api from '@/fetch/api'
import proIndexSummary from './projectIndex/proIndexSummary' //项目指标汇总表
import engineeringEvaluation from './projectIndex/engineeringEvaluation' //专业工程暂估价表
export default {
  components: {
    proIndexSummary,
    engineeringEvaluation
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {},

  mounted() {},

  methods: {
    changeLevel(val) {
      this.command = val
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang='less' scoped>
.cost-index-page {
  padding: 0px 20px 20px 20px;
  .tab-control {
    position: relative;
    /deep/.el-tabs {
      #tab-first {
        padding-left: 0;
      }
      .el-tabs__nav-wrap::after {
        background-color: #ced2dc;
        height: 1px !important;
      }
      .el-tabs__item {
        height: 50px !important;
        line-height: 50px !important;
      }
    }
    .separated {
      position: absolute;
      left: 300px;
      top: 17px;
      width: 1px;
      height: 16px;
      background: #ced2dc;
    }
  }
}
</style>