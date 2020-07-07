<!-- 项目指标汇总表 -->
<template>
  <div class='summary-table'>
    <el-table :data="tableData" ref="summaryTable" style="width: 100%;" v-loading="loading" element-loading-text="正在加载中" default-expand-all row-key="id" @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="项目名称" width="300">
      </el-table-column>
      <el-table-column prop="data.totalCost" label="合计(元)">
        <template slot-scope="scope">
          <span>{{getData(scope.row.data.totalCost)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.labor" label="人工费(元)">
        <template slot-scope="scope">
          <span>{{getData(scope.row.data.labor)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="材料费">
        <el-table-column prop="data.material" label="普通材料费(元)" min-width="100">
          <template slot-scope="scope">
            <span>{{getData(scope.row.data.material)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.mainMaterial" label="主材费(元)">
          <template slot-scope="scope">
            <span>{{getData(scope.row.data.mainMaterial)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.device" label="设备费(元)">
          <template slot-scope="scope">
            <span>{{getData(scope.row.data.device)}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="data.machinery" label="机械费(元)">
        <template slot-scope="scope">
          <span>{{getData(scope.row.data.machinery)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.managementAndProfit" label="管理费和利润(元)">
        <template slot-scope="scope">
          <span>{{getData(scope.row.data.managementAndProfit)}}</span>
        </template>
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
    this.projectSummary()
  },
  updated() {
    this.tablefold()
  },
  activated() {
    this.tablefold()
  },
  methods: {
    ...tableFolding(['tablefold', 'getData']),
    projectSummary() {
      api
        .projectSummarySharing({ projectId: this.projectId, stageId: this.stageId })
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
.summary-table {
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