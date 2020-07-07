<!-- 安装算量指标表格 -->
<template>
  <div class='installtable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" @expand-change="expandChange" :load="load" lazy :expand-row-keys='expands' :max-height="maxHeight" row-key="id" v-loading="loading" element-loading-text="正在加载中" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称" width="300">
      </el-table-column>
      <el-table-column prop="data.material" label="材质">
      </el-table-column>
      <el-table-column prop="data.spec" label="规格">
      </el-table-column>
      <el-table-column prop="data.unit" label="单位">
      </el-table-column>
      <el-table-column prop="data.amount" label="数量">
      </el-table-column>
      <el-table-column prop="data.amountByArea" label="单方含量(/㎡)">
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
      spareData: [],
      expandLevel: '',
      buildingId: this.$route.params.buildingId,
      loading: true,
      maxHeight: window.innerHeight - 171,
      expands: [] //要展开的行
    }
  },
  watch: {
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.indexInstallation(val)
      },
      immediate: true
    }
  },
  updated() {
    this.tablefold('price')
  },
  activated() {
    this.tablefold('price')
  },
  methods: {
    ...tableFolding(['tablefold', 'getData']),
    load(tree, treeNode, resolve) {
      let datas = []
      this.spareData.map(item1 => {
        if (item1.children) {
          item1.children.map(item2 => {
            if (item2.children) {
              item2.children.map(item3 => {
                if (item3.children) {
                  item3.children.map(item4 => {
                    if (item4.id == tree.id) {
                      datas = item4.children
                    }
                  })
                }
              })
            }
          })
        }
      })
      resolve(datas)
    },
    indexInstallation(val) {
      api
        .indexInstallation({ buildingId: val })
        .then(res => {
          this.tableData = res.data.data
          this.spareData = JSON.parse(JSON.stringify(res.data.data))
          let arr1 = []
          let arr2 = []
          let arr3 = []
          this.tableData.map(item1 => {
            arr1.push(String(item1.id))
            if (item1.children) {
              item1.children.map(item2 => {
                if (item2.children) {
                  arr2.push(String(item2.id))
                  item2.children.map(item3 => {
                    if (item3.children) {
                      arr3.push(String(item3.id))
                      item3.children.map(item4 => {
                        if (item4.children) {
                          item4.hasChildren = true
                          delete item4.children
                        }
                      })
                    }
                  })
                }
              })
            }
          })
          this.$nextTick(() => {
            this.expands = [...arr1, ...arr2, ...arr3]
          })

          this.loading = false
        })
        .catch(res => {
          this.loading = false
        })
    },
    expandChange(row, expanded) {
      let fineIndex = this.expands.findIndex(data => data == row.id)
      // false 是收起 true是展开
      if (!expanded && fineIndex > -1) {
        this.expands.splice(fineIndex, 1)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.installtable {
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