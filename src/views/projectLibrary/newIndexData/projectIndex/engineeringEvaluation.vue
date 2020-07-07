<!-- 专业工程暂估价表 -->
<template>
  <div class='evaluation-table'>
    <el-table :data="tableData" ref="evaluationTable" style="width: 100%;" v-loading="loading" element-loading-text="正在加载中" row-key="id" default-expand-all @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="工程名称" width="300">
      </el-table-column>
      <el-table-column prop="data.content" label="工程内容">
      </el-table-column>
      <el-table-column prop="data.costWithTax" label="暂估价含税金额(元)">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/fetch/api'
import { tableFolding } from '@/assets/js/tableFolding'
export default {
  data() {
    return {
      tableData: [],
      expandLevel: '',
      projectId: this.$route.params.projectId,
      stageId: this.$route.params.stageId,
      loading: true
    }
  },
  watch: {},
  mounted() {
    this.provisionalEngineering()
  },
  updated() {
    this.tablefold()
  },
  activated() {
    this.tablefold()
  },
  methods: {
    ...tableFolding(['tablefold', 'getData']),
    provisionalEngineering() {
      api
        .provisionalEngineeringSharing({ projectId: this.projectId, stageId: this.stageId })
        .then(res => {
          this.tableData = res.data.data
          this.loading = false
        })
        .catch(res => {
          this.loading = false
        })
    },
    expandChange() {}
  }
}
</script>
<style lang='less' scoped>
.evaluation-table {
  /deep/.el-table {
    .el-table__expand-icon--expanded {
      transform: rotate(00deg);
    }
    .el-table__expand-icon {
      font-size: 12px !important;
      i {
        height: 12px;
        line-height: 12px;
        text-align: center;
        width: 12px;
        font-size: 12px !important;
        border: 1px solid rgba(216, 224, 245, 1) !important;
        background: rgba(255, 255, 255, 1) !important;
        color: #4474cf;
      }
    }
  }
}
</style>