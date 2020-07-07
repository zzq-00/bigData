<!-- 分部工程经济指标  不要清单编码-->
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" :max-height="maxHeight" v-loading="loading" element-loading-text="正在加载中" default-expand-all style="width: 100%;" row-key="id" @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="项目名称" width="300">
      </el-table-column>
      <el-table-column prop="data.unit" label="工程量单位">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.unit):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.cost" label="单价(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.cost):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.costPerSquare" label="平米造价(元/㎡)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.costPerSquare):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.costRatio" label="造价比例(%)">
        <template slot-scope="scope">
          <span>{{scope.row.data?proportion(scope.row.data.costRatio):''}}</span>
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
      loading: true,
      maxHeight: window.innerHeight - 171
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.subdivisionCostIndex(val)
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
    subdivisionCostIndex(val) {
      api
        .subdivisionCostIndex({ monomerId: val })
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