<!-- 人材机汇总表 -->
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" :expand-row-keys='expands' @expand-change="expandChange" :max-height="maxHeight" v-loading="loading" lazy :load="load" element-loading-text="正在加载中" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称及规格" width="300">
      </el-table-column>
      <el-table-column prop="data.unit" label="单位">
      </el-table-column>
      <el-table-column prop="data.valByContent" label="数量">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.amount):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.valByContent" label="市场价(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.marketPrice):''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="data.value" label="合计(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.totalMarketPrice):''}}</span>
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
      expands: [], //要展开的行
      buildingId: this.$route.params.buildingId,
      loading: true,
      maxHeight: window.innerHeight - 171
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.monomerResourceSummary(val)
      },
      immediate: true
    }
  },
  updated() {
    this.tablefold('personnelMachine')
  },
  activated() {
    this.tablefold()
  },
  methods: {
    ...tableFolding(['tablefold', 'getData']),
    load(tree, treeNode, resolve) {
      let datas = []
      this.spareData.map(item1 => {
        item1.children.map(item2 => {
          if (tree.id == item2.id) {
            datas = item2.children
          }
        })
      })
      resolve(datas)
    },
    expandChange(row, expanded) {
      let fineIndex = this.expands.findIndex(data => data == row.id)
      // false 是收起 true是展开
      if (!expanded && fineIndex > -1) {
        this.expands.splice(fineIndex, 1)
      }
    },
    monomerResourceSummary(val) {
      api
        .monomerResourceSummary({ monomerId: val })
        .then(res => {
          this.tableData = res.data.data
          this.spareData = JSON.parse(JSON.stringify(res.data.data))
          let arr = []
          this.tableData.forEach(item1 => {
            arr.push(String(item1.id))
            item1.children.forEach(item2 => {
              if (item2.children) {
                item2.hasChildren = true
                delete item2.children
              }
            })
          })
          this.$nextTick(() => {
            this.expands = [...arr]
          })
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