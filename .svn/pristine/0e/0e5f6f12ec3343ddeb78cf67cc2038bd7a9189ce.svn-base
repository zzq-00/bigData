<!-- 单项工程指标指标汇总表 -->
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" v-loading="loading" element-loading-text="正在加载中" default-expand-all row-key="id" @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="项目名称" width="300">
      </el-table-column>
      <el-table-column prop="data.cost" label="合计(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.cost):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.labor" label="人工费(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.labor):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="材料费" align="center">
        <el-table-column prop="data.material" label="普通材料费(元)" min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.material):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.mainMaterial" label="主材费(元)">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.mainMaterial):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.device" label="设备费(元)">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.device):''}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="data.machine" label="机械费(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.machine):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.managementAndProfit" label="管理费和利润(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.managementAndProfit):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.costByArea" label="平方米造价(元/㎡)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.costByArea):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.costPercent" label="造价比例(%)">
        <template slot-scope="scope">
          <span>{{scope.row.data?proportion(scope.row.data.costPercent):''}}</span>
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
      buildingId: this.$route.params.buildingId,
      loading: true
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.monomerSummary(val)
      },
      immediate: true
    }
  },
  updated() {
    this.tablefold()
  },
  activated() {
    this.tablefold()
  },
  methods: {
    ...tableFolding(['tablefold', 'getData', 'proportion']),
    monomerSummary(val) {
      api
        .monomerSummarySharing({ monomerId: val })
        .then(res => {
          this.tableData = res.data.data
          this.loading = false
        })
        .catch(res => {
          this.tableData = []
          this.loading = false
        })
    },
    expandChange() {}
  }
}
</script>
<style lang='less' scoped>
.rebartable {
  /deep/.el-table {
    .el-table__expand-icon--expanded {
      transform: rotate(00deg);
    }
    .el-table__expand-icon {
      font-size: 12px !important;
      margin-right: 0;
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