<!-- 土建算量指标表格 -->
<template>
  <div class='civiltable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" :max-height="maxHeight" v-loading="loading" element-loading-text="正在加载中" default-expand-all row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称" width="300">
      </el-table-column>
      <el-table-column prop="data.value" label="总量" width="300">
      </el-table-column>
      <el-table-column prop="data.valByArea" label="总量/面积">
      </el-table-column>
      <el-table-column prop="data.valByVol" label="总量/体积">
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
      buildingId: this.$route.params.buildingId,
      loading: true,
      maxHeight: window.innerHeight - 171
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.indexCivil(val)
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
    indexCivil(val) {
      api
        .indexCivil({ buildingId: val })
        .then(res => {
          this.tableData = res.data.data
          this.loading = false
        })
        .catch(res => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang='less' scoped>
.civiltable {
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