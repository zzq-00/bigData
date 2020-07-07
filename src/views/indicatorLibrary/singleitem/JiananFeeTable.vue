<template>
  <div class="self-tables scroll-table">
    <el-table :data="tableData" stripe border v-loading="loading" :class="{'fixedHeader': headerFixed}" :span-method="arraySpanMethod">
      <el-table-column prop="date" label="" min-width="108" align='center'>
      </el-table-column>
      <el-table-column prop="name1" label="名称 " min-width="120" align='center'>
      </el-table-column>
      <el-table-column :label='item.unitProjectName' :prop="'cipcBase'+index" min-width="180 " align='center' v-for='(item,index) in indexDatas' :key='index'>
        <template slot-scope="scope">
          <span v-if='scope.row["cipcBase"+ index]||scope.row["cipcBase"+ index]==0'>{{scope.row["cipcBase"+ index]}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label='合计' min-width="180 " align='center'>
        <template slot-scope="scope">
          <span v-if='scope.row.cipcBaseTotal'>{{scope.row.cipcBaseTotal}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['fixTabs'],
  data () {
    return {
      headerFixed: false,
      params: {
        flag: 1,
        monomerId: (() => this.$route.params.monomerId)()
      }, // 请求参数
      indexDatas: [],
      loading: true, // 加载动画
      tableData: [
        {
          date: '单位工程',
          name1: '总造价(元)'
        },
        {
          date: '单位工程',
          name1: '单方造价(元)'
        },
        {
          date: '分部分项',
          name1: '费用(元)'
        },
        {
          date: '分部分项',
          name1: '指标(元/m³)'
        },
        {
          date: '分部分项',
          name1: '造价专业占比'
        },
        {
          date: '管理费',
          name1: '费用(元)'
        },

        {
          date: '管理费',
          name1: '指标(元/m³)'
        },
        {
          date: '管理费',
          name1: '造价专业占比'
        },
        {
          date: '利润',
          name1: '费用(元)'
        },
        {
          date: '利润',
          name1: '指标(元/m³)'
        },
        {
          date: '利润',
          name1: '造价专业占比'
        },

        {
          date: '规费	',
          name1: '费用(元)'
        },
        {
          date: '规费',
          name1: '指标(元/m³)'
        },
        {
          date: '措施费',
          name1: '费用(元)'
        },
        {
          date: '措施费',
          name1: '指标(元/m³)'
        },
        {
          date: '综合人日',
          name1: '费用(元)'
        },
        {
          date: '综合人日',
          name1: '指标(元/m³)'
        },
        {
          date: '人工费',
          name1: '费用(元)'
        },
        {
          date: '人工费',
          name1: '指标(元/m³)'
        },
        {
          date: '材料费',
          name1: '费用(元)'
        },
        {
          date: '材料费',
          name1: '指标(元/m³)'
        },
        {
          date: '机械费',
          name1: '费用(元)'
        },
        {
          date: '机械费',
          name1: '指标(元/m³)'
        }
      ],
      // maxHeight: window.screen.height - 610,
      maxHeight: window.innerHeight - 500
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.getCostIndicatorsAnalyse()
      },
      // 深度观察监听
      deep: true
    },
    fixTabs (val) {
      this.headerFixed = val
    }
  },
  methods: {
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 2) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        if (rowIndex === 5) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        if (rowIndex === 8) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        if (rowIndex === 11) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 13) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 15) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 17) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 19) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (rowIndex === 21) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 获取指标信息 建安费指标flag =1,综合单价指标flag =2,人材机指标flag =3
    getCostIndicatorsAnalyse () {
      api
        .getCostIndicatorsAnalyse(this.params)
        .then(res => {
          if (res.data.constructionFeeBuildingList) {
            this.indexDatas = res.data.constructionFeeBuildingList.cfList
            let totalArr = res.data.constructionFeeBuildingList.aggregate
            this.$set(this.tableData[0], 'cipcBaseTotal', totalArr.unitProjectCostTotal) // 单位工程-总造价
            this.$set(this.tableData[1], 'cipcBaseTotal', totalArr.unitProjectCostPerSquareTotal) // 单位工程-单方造价
            this.$set(this.tableData[2], 'cipcBaseTotal', totalArr.subdivisionCostTotal) // 分部分项-费用
            this.$set(this.tableData[3], 'cipcBaseTotal', totalArr.subdivisionCostPerSquareTotal) // 分部分项-指标
            this.$set(this.tableData[4], 'cipcBaseTotal', totalArr.subdivisionCostProportionTotal) // 分部分项-造价专业占比

            this.$set(this.tableData[5], 'cipcBaseTotal', totalArr.managementCostTotal) // 管理费-费用
            this.$set(this.tableData[6], 'cipcBaseTotal', totalArr.managementCostPerSquareTotal) // 管理费-指标
            this.$set(this.tableData[7], 'cipcBaseTotal', totalArr.managementCostProportionTotal) // 管理费-造价专业占比

            this.$set(this.tableData[8], 'cipcBaseTotal', totalArr.profitTotal) // 利润-费用
            this.$set(this.tableData[9], 'cipcBaseTotal', totalArr.profitPerSquareTotal) // 利润-指标
            this.$set(this.tableData[10], 'cipcBaseTotal', totalArr.profitProportionTotal) // 利润-造价专业占比

            this.$set(this.tableData[11], 'cipcBaseTotal', totalArr.feeTotal) // 规费-费用
            this.$set(this.tableData[12], 'cipcBaseTotal', totalArr.feePerSquareTotal) // 规费-指标

            this.$set(this.tableData[13], 'cipcBaseTotal', totalArr.measureCostTotal) // 措施费-费用
            this.$set(this.tableData[14], 'cipcBaseTotal', totalArr.measureCostPerSquareTotal) // 措施费-指标

            this.$set(this.tableData[15], 'cipcBaseTotal', totalArr.manDayCostTotal) // 综合人日-费用
            this.$set(this.tableData[16], 'cipcBaseTotal', totalArr.manDayCostPerSquareTotal) // 综合人日-指标

            this.$set(this.tableData[17], 'cipcBaseTotal', totalArr.laborCostTotal) // 人工费-费用
            this.$set(this.tableData[18], 'cipcBaseTotal', totalArr.laborCostPerSquareTotal) // 人工费-指标

            this.$set(this.tableData[19], 'cipcBaseTotal', totalArr.materialCostTotal) // 材料费-费用
            this.$set(this.tableData[20], 'cipcBaseTotal', totalArr.materialCostPerSquareTotal) // 材料费-指标

            this.$set(this.tableData[21], 'cipcBaseTotal', totalArr.machineryFeeTotal) // 机械费-费用
            this.$set(this.tableData[22], 'cipcBaseTotal', totalArr.machineryFeePerSquareTotal) // 机械费-指标
            this.loading = false
            if (this.indexDatas) {
              this.indexDatas.map((item, index) => {
                this.$set(this.tableData[0], 'cipcBase' + index, item.unitProjectCost) // 单位工程-总造价
                this.$set(this.tableData[1], 'cipcBase' + index, item.unitProjectCostPerSquare) // 单位工程-单方造价
                this.$set(this.tableData[2], 'cipcBase' + index, item.subdivisionCost) // 分部分项-费用
                this.$set(this.tableData[3], 'cipcBase' + index, item.subdivisionCostPerSquare) // 分部分项-指标
                this.$set(this.tableData[4], 'cipcBase' + index, item.subdivisionCostProportion) // 分部分项-造价专业占比

                this.$set(this.tableData[5], 'cipcBase' + index, item.managementCost) // 管理费-费用
                this.$set(this.tableData[6], 'cipcBase' + index, item.managementCostPerSquare) // 管理费-指标
                this.$set(this.tableData[7], 'cipcBase' + index, item.managementCostProportion) // 管理费-造价专业占比

                this.$set(this.tableData[8], 'cipcBase' + index, item.profit) // 利润-费用
                this.$set(this.tableData[9], 'cipcBase' + index, item.profitPerSquare) // 利润-指标
                this.$set(this.tableData[10], 'cipcBase' + index, item.profitProportion) // 利润-造价专业占比

                this.$set(this.tableData[11], 'cipcBase' + index, item.fee) // 规费-费用
                this.$set(this.tableData[12], 'cipcBase' + index, item.feePerSquare) // 规费-指标

                this.$set(this.tableData[13], 'cipcBase' + index, item.measureCost) // 措施费-费用
                this.$set(this.tableData[14], 'cipcBase' + index, item.measureCostPerSquare) // 措施费-指标

                this.$set(this.tableData[15], 'cipcBase' + index, item.manDayCost) // 综合人日-费用
                this.$set(this.tableData[16], 'cipcBase' + index, item.manDayCostPerSquare) // 综合人日-指标

                this.$set(this.tableData[17], 'cipcBase' + index, item.laborCost) // 人工费-费用
                this.$set(this.tableData[18], 'cipcBase' + index, item.laborCostPerSquare) // 人工费-指标

                this.$set(this.tableData[19], 'cipcBase' + index, item.materialCost) // 材料费-费用
                this.$set(this.tableData[20], 'cipcBase' + index, item.materialCostPerSquare) // 材料费-指标

                this.$set(this.tableData[21], 'cipcBase' + index, item.machineryFee) // 机械费-费用
                this.$set(this.tableData[22], 'cipcBase' + index, item.machineryFeePerSquare) // 机械费-指标
              })
            }
          } else {
            this.loading = false
          }
        })
        .catch(res => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.getCostIndicatorsAnalyse()
  }
}
</script>
<style lang="less" scoped>
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  max-height: 30px;
  height: 30px;
  padding: 0 10px;
  line-height: 13px;
  min-width: 120px;
}
.col {
  border-bottom: 1px solid #ccc;
}
</style>
<style scoped>
.self-tables >>> .el-table th {
  background: #fafafb;
  color: #888888;
  font-size: 12px;
  height: 30px;
  padding: 0;
  font-weight: bold;
}
.self-tables >>> .el-table__row td {
  padding: 0;
  height: 30px;
  font-size: 12px;
  color: #666666;
  font-weight: 400;
}
.self-tables >>> .el-table--striped .el-table__body tr.el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--striped .el-table__body tr:nth-child(2).el-table__row--striped td:nth-child(1),
.self-tables >>> .el-table--striped .el-table__body tr:nth-child(4).el-table__row--striped td:nth-child(1),
.self-tables >>> .el-table--striped .el-table__body tr:nth-child(8).el-table__row--striped td:nth-child(1),
.self-tables >>> .el-table--striped .el-table__body tr:nth-child(10).el-table__row--striped td:nth-child(1) {
  background-color: #f5f6f8 !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(1) > td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(2) > td:nth-child(1) {
  background-color: #ecf4ff !important;
}

.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(1):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(2):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(3):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(4):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(6):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(8):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(9):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.self-tables >>> .el-table--enable-row-hover .el-table__body tr:nth-child(10):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
/* .self-tables >>> .el-table--enable-row-hover .el-table__body tr > td:nth-child(1) {
  background-color: #ecf4ff !important;
} */
</style>

<style>
/* 置顶 */
.fixedHeader .el-table__header-wrapper {
  position: fixed;
  top: 117px;
  z-index: 4;
}
</style>
