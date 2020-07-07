<!-- 分部分项及单价措施技经指标表 -->
<template>
  <div class='rebartable'>
    <el-table :data="tableData" ref="rebarTable" style="width: 100%;" :load="load" :expand-row-keys='expands' lazy :max-height="maxHeight" v-loading="loading" element-loading-text="正在加载中" row-key="id" @expand-change='expandChange' border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="项目名称" min-width="350" show-overflow-tooltip>
        <template slot-scope="scope">
          <img class="click-img" src="@/assets/img/list.png" alt="" v-if="scope.row.data&&scope.row.data.code&&scope.row.data.code.length==12" @click="clickRow(scope.row)">
          <span v-if="scope.row.data&&scope.row.data.code&&scope.row.data.code.length==12">{{scope.row.data.code}}</span>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目特征" show-overflow-tooltip min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.spec):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.unit):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工程量">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.amount):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价(元)">
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.cost):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="合价(元)" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.data?getData(scope.row.data.totalCost):''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="平方米含量" align="center">
        <el-table-column prop="province" label="值">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.amountPerSquare):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data&&scope.row.data.unit&&scope.row.data.unit!='-'?scope.row.data.unit+'/m2':'-'}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="平方米造价" align="center">
        <el-table-column prop="province" label="值">
          <template slot-scope="scope">
            <span>{{scope.row.data?getData(scope.row.data.costPerSquare):''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" label="单位">
          <template slot-scope="scope">
            <span>{{scope.row.data&&scope.row.data.unit&&scope.row.data.unit!='-'?'元/m2':''}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="data.costRatio" label="造价比例%">
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
import { log } from 'util'
export default {
  props: ['command'],
  data() {
    return {
      tableData: [],
      expandLevel: '',
      maxHeight: window.innerHeight - 171,
      buildingId: this.$route.params.buildingId,
      loading: true,
      projectId: this.$route.params.projectId,
      expands: []
    }
  },
  watch: {
    $props: {
      handler: function(val, oldVal) {
        this.rendering()
        this.$emit('changeLevel', 0)
      },
      deep: true
    },
    '$route.params.buildingId': {
      handler: function(val, oldVal) {
        this.loading = true
        this.monomerSummaryItems(val)
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
    ...tableFolding(['tablefold', 'getData', 'proportion']),
    load(tree, treeNode, resolve) {
      let data = []
      api.itemsByNineDigit({ monomerId: this.buildingId, nineDigit: tree.data.code }).then(res => {
        data = res.data.data
        resolve(data)
      })
    },
    clickRow(row) {
      let routePath = this.$router.resolve(`/comprehensive/${row.data.code}/${row.data.unitProjectId}`)
      window.open(routePath.href, '_blank')
    },
    addPlus(foldIcon2, val) {
      if (val == '+') {
        foldIcon2.classList.remove('el-icon-minus')
        foldIcon2.classList.add('el-icon-plus')
      } else {
        foldIcon2.classList.remove('el-icon-plus')
        foldIcon2.classList.add('el-icon-minus')
      }
    },
    unfold(val) {
      if (val > 0) {
        let expandLevel = val
        switch (expandLevel) {
          case 1:
            this.expands = []
            break
          case 2:
            this.expands = [...this.arr1]
            break
          case 3:
            this.expands = [...this.arr1, ...this.arr2]
            break
          case 4:
            this.expands = [...this.arr1, ...this.arr2, ...this.arr3]
            break
          default:
            break
        }
        let elTableRow = document.getElementsByClassName('el-table__row')
        let oneLevel = document.getElementsByClassName('el-table__row--level-0')
        let twoLevel = document.getElementsByClassName('el-table__row--level-1')
        let threeLevel = document.getElementsByClassName('el-table__row--level-2')
        let fourLevel = document.getElementsByClassName('el-table__row--level-3')
        this.tableData.map(item1 => {
          let one = 1
          this.$refs.rebarTable.toggleRowExpansion(item1, 1 >= expandLevel ? false : true)
          if (item1.children) {
            for (let i1 = 0; i1 < oneLevel.length; i1++) {
              const element1 = oneLevel[i1]
              const foldIcon = element1.getElementsByClassName('expandsi')[0]
              if (foldIcon) {
                1 >= expandLevel ? this.addPlus(foldIcon, '+') : this.addPlus(foldIcon, '-')
              }
            }
            item1.children.map(item2 => {
              this.$refs.rebarTable.toggleRowExpansion(item2, 2 >= expandLevel ? false : true)
              if (item2.children) {
                for (let i2 = 0; i2 < twoLevel.length; i2++) {
                  const element2 = twoLevel[i2]
                  const foldIcon2 = element2.getElementsByClassName('expandsi')[0]
                    ? element2.getElementsByClassName('expandsi')[0]
                    : ''
                  if (foldIcon2) {
                    2 >= expandLevel ? this.addPlus(foldIcon2, '+') : this.addPlus(foldIcon2, '-')
                  }
                }
                item2.children.map(item3 => {
                  this.$refs.rebarTable.toggleRowExpansion(item3, 3 >= expandLevel ? false : true)
                  if (item3.children) {
                    for (let i3 = 0; i3 < threeLevel.length; i3++) {
                      const element3 = threeLevel[i3]
                      const foldIcon = element3.getElementsByClassName('expandsi')[0]
                        ? element3.getElementsByClassName('expandsi')[0]
                        : ''
                      if (foldIcon) {
                        3 >= expandLevel ? this.addPlus(foldIcon, '+') : this.addPlus(foldIcon, '-')
                      }
                    }
                    item3.children.map(item4 => {
                      this.$refs.rebarTable.toggleRowExpansion(item4, 4 >= expandLevel ? false : true)
                      if (item4.children) {
                        for (let i4 = 0; i4 < fourLevel.length; i4++) {
                          const element4 = fourLevel[i4]
                          const foldIcon4 = element4.getElementsByClassName('expandsi')[0]
                            ? element4.getElementsByClassName('expandsi')[0]
                            : ''
                          if (foldIcon4) {
                            4 >= expandLevel ? this.addPlus(foldIcon4, '+') : this.addPlus(foldIcon4, '-')
                          }
                        }
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    },
    monomerSummaryItems(val) {
      api
        .monomerSummaryItems({ monomerId: val })
        .then(res => {
          this.arr1 = []
          this.arr2 = []
          this.arr3 = []
          res.data.data.map(item1 => {
            this.arr1.push(String(item1.id))
            if (item1.children) {
              item1.children.map(item2 => {
                if (item2.children) {
                  this.arr2.push(String(item2.id))
                  item2.children.map(item3 => {
                    if (item3.children) {
                      this.arr3.push(String(item3.id))
                      item3.children.map(item4 => {
                        if (item4.data) {
                          if (item4.data.totalCost || (item4.data.totalCost == 0 && item4.data.totalCost != '-')) {
                            item4.hasChildren = true
                          }
                        }
                      })
                    }
                  })
                }
              })
            }
          })
          this.$nextTick(() => {
            this.tableData = res.data.data
            this.expands = [...this.arr1, ...this.arr2, ...this.arr3]
          })
          this.loading = false
        })
        .catch(res => {
          this.tableData = []
          this.loading = false
        })
    },
    expandChange(row, expandedRows) {},
    //显示范围 一级到四级
    rendering() {
      this.unfold(this.$props.command)
    }
  }
}
</script>
<style lang='less' scoped>
.rebartable {
  /deep/.el-table {
    .el-icon-arrow-right:before {
      content: '\e6d8';
    }
    .click-img {
      cursor: pointer;
      margin-right: 11px;
    }
    .has-gutter {
      .gutter {
        width: 5px !important;
      }
    }
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