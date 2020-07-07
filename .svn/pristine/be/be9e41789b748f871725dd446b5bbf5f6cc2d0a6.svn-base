<!-- 分部工程技术指标 清单编码不要 --> 
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" :max-height="maxHeight" v-loading="loading" element-loading-text="正在加载中" default-expand-all style="width: 100%;" row-key="id" @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="项目名称" width="300">
      </el-table-column>
      <el-table-column label="工程量" align="center">
        <el-table-column prop="data.unit" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.unit):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.amount" label="值">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.amount):''}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平方米含量" align="center">
        <el-table-column prop="" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.unit)+'/m2':''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="data.amountPerSquare" label="值">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.amountPerSquare):''}}</span>
          </template>
        </el-table-column>
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
        this.subdivisionAmountIndex(val)
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
    ...tableFolding(['tablefold', 'getData']),
    subdivisionAmountIndex(val) {
      api
        .subdivisionAmountIndex({ monomerId: val })
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