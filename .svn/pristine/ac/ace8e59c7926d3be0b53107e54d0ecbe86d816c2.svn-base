<!-- 主要人材机消耗量表 -->
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" :max-height="maxHeight" v-loading="loading" element-loading-text="正在加载中" border>
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="name" label="项目名称">
      </el-table-column>
      <el-table-column label="消耗量" align="center">
        <el-table-column prop="" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.unit):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="值">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.amount):''}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平方米含量" align="center">
        <el-table-column prop="province" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.unit)+'/m2':''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="含量">
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
        this.monomerMajorResource(val)
      },
      immediate: true
    }
  },
  updated() {},
  methods: {
    ...tableFolding(['tablefold', 'getData']),
    monomerMajorResource(val) {
      api
        .monomerMajorResource({ monomerId: val })
        .then(res => {
          this.tableData = res.data.data
          this.loading = false
        })
        .catch(res => {
          this.tableData = []
          this.loading = false
        })
    }
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