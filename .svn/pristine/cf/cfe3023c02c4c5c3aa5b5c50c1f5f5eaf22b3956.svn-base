<!-- 分部分项及单价措施技经指标表 -->
<template>
  <div class="cost-index-page">
    {{maxHeight}}
    <p class="page-title">综合单价分析表</p>
    <div class="introduce">
      <span class="name">工程名称：{{info.unitProjectName}}</span>
      <el-tag>清单子目编码：{{info.code}}</el-tag>
      <el-tag>清单子目名称：{{info.name}}</el-tag>
      <el-tag>计量单位：{{info.unit}}</el-tag>
      <el-tag>工程量：{{info.amount}}</el-tag>
    </div>
    <el-table :data="tableData" style="width: 100%" :max-height="maxHeight/2" show-summary :summary-method="getSummaries" v-loading="loading" element-loading-text="正在加载中">
      <el-table-column label="清单综合单价明细" align="center">
        <el-table-column prop="code" label="定额编号" width="">
        </el-table-column>
        <el-table-column prop="name" label="定额子目名称" min-width="260" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="unit" label="定额单位" width="">
        </el-table-column>
        <el-table-column prop="amount" label="数量" width="">
        </el-table-column>
        <el-table-column prop="totalCost" label="合计" width="">
        </el-table-column>
        <el-table-column label="单价" align="center">
          <el-table-column prop="labor" label="人工费" width="">
          </el-table-column>
          <el-table-column prop="material" label="材料费" width="">
          </el-table-column>
          <el-table-column prop="mainMaterial" label="主材费" width="">
          </el-table-column>
          <el-table-column prop="device" label="设备费" width="">
          </el-table-column>
          <el-table-column prop="machinery" label="机械费" width="">
          </el-table-column>
          <el-table-column prop="manageAndProfit" label="管理费和利润" width="">
          </el-table-column>
        </el-table-column>
      </el-table-column>

    </el-table>
    <div class="introduce">
      <span class="name">未计价材料明细</span>
    </div>
    <el-table class="material-table" :data="materialScience" :max-height="maxHeight/2" width="700" v-loading="loading" element-loading-text="正在加载中">
      <el-table-column prop="name" label="未计价材料名称、规格、型号" width="450">
      </el-table-column>
      <el-table-column prop="unit" label="单位" width="100">
      </el-table-column>
      <el-table-column prop="amount" label="数量" width="150">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  components: {},
  data() {
    return {
      maxHeight: window.innerHeight - 168,
      code: this.$route.params.code,
      unitProjectId: this.$route.params.unitProjectId,
      loading: true,
      tableData: [],
      materialScience: [], //材料
      info: {}
    }
  },
  mounted() {
    this.compUnitPrice()
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '清单子目综合单价'
          return
        }
        if (index == 4) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          }
        }
      })

      return sums
    },
    compUnitPrice() {
      let data = {
        code: this.code,
        unitProjectId: this.unitProjectId
      }
      api
        .compUnitPriceSharing(data)
        .then(res => {
          this.info = res.data.item
          this.tableData = res.data.norms
          this.materialScience = res.data.resources
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
.cost-index-page {
  padding: 0px 20px 20px 20px;
  height: e('calc(100vh - 20px)');
  .page-title {
    text-align: center;
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    margin: 29px 0 22px 0;
  }
  .introduce {
    margin-top: 20px;
    margin-bottom: 10px;
    .name {
      margin-right: 55px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
    }
    /deep/.el-tag {
      height: 28px;
      line-height: 26px;
      background: #e4ebfb;
      border: 1px solid #c7d1ea;
      border-radius: 4px;
      font-weight: 400;
      color: rgba(105, 120, 158, 1);
      margin-right: 10px;
    }
  }
  .material-table {
    width: 700px;
  }
}
</style>