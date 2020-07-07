<template>
  <div class="engine-cost-container">
    <div class="charts-box" v-show="charts">
      <div class="boxs">
        <p class="title">单项工程单方造价走势图</p>
        <trendModular :data="trendData"></trendModular>
      </div>
      <div class="boxs">
        <p class="title">各部分单方造价占比</p>
        <pieChart2 :color='color' :data="peiData"></pieChart2>
        <div class="total-money" v-show="totalNmuber">
          <p class="money">
            {{totalNmuber}}
          </p>
          <p class="word_tips">单项工程总额(万元)</p>
        </div>
      </div>
      <div class="boxs">
        <p class="title">综合单价区间分布</p>
        <el-select v-model="materialValue" placeholder="请选择" class="persong-select selects1" @change="changeValue()">
          <el-option v-for="(item,index) in materialData" :key="index" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <intervalDistribution :data="sectionData"></intervalDistribution>
      </div>
      <div class="boxs">
        <p class="title">各部分人材机占比分析(单位：万元)</p>
        <el-select v-model="listValue" placeholder="请选择" class="persong-select" @change="changeValues()">
          <el-option v-for="(item,index) in analysisList" :key="index" :label="item.unitProjectName" :value="item.unitProjectId">
          </el-option>
        </el-select>
        <annularCharts :color='color' :data="annularData" style="margin-top:0px;"></annularCharts>
      </div>
    </div>
    <div class="chioce-rdi">
      <span class="rdi-title">经济指标：</span>
      <el-radio-group v-model="radio" size="mini">
        <el-radio label="1"><span class="label">建安费分析</span></el-radio>
        <el-radio label="2"><span class="label">综合单价分析</span></el-radio>
        <el-radio label="3"><span class="label">人材机分析</span></el-radio>
      </el-radio-group>
      <!-- <button class="btn" @click="ExcelCommon">导出</button> -->
    </div>
    <div class="mrmain">
      <JiananFeeTable id="1" v-if="radio=='1'" :fixTabs="fixTabs"></JiananFeeTable>
      <IntegratedUnitPriceTable v-if="radio=='2'" :fixTabs="fixTabs"></IntegratedUnitPriceTable>
      <personnelTable v-if="radio=='3'" :fixTabs="fixTabs"></personnelTable>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import trendModular from '@/components/trendModular' // 走势图
import pieChart2 from '@/components/pieChart2'
import intervalDistribution from '@/components/intervalDistribution' // 综合单价区间分布图
import annularCharts from '@/components/annularCharts'
import JiananFeeTable from './JiananFeeTable' // 建安费指标
import IntegratedUnitPriceTable from './IntegratedUnitPriceTable' // 综合单价
import personnelTable from './personnelTable' // 人材机指标
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'
export default {
  props: ['fixTabs', 'charts'],
  components: {
    JiananFeeTable,
    personnelTable,
    IntegratedUnitPriceTable,
    trendModular,
    pieChart2,
    intervalDistribution,
    annularCharts
  },
  data () {
    return {
      radio: '1',
      ExportParams: {
        // 导出excel需要的参数
        flag: '1',
        monomerId: (() => this.$route.params.monomerId)()
      },
      color: ['#3AA5FF', '#8398F3', '#01D3AB', '#FFBE40', '#F67979', '#EAD83D', '#ABC374', '#FFC799'],
      peiData: [],
      totalNmuber: '', // 单项工程总额
      materialData: [], // 综合单价下拉列表
      materialValue: '',
      materialParams: {
        buildingId: (() => this.$route.params.monomerId)(),
        code: '',
        unitProjectId: ''
      },
      sectionData: {
        annualAverage: '', // 平均值
        arr: [] // 综合单价区间分布数据
      },
      annularData: [],
      trendData: {
        type: '造价',
        data: {}
      },
      analysisList: [], // 人才机占比下拉列表
      listValue: '',
      analysisParams: {
        buildingId: (() => this.$route.params.monomerId)(),
        unitProjectId: ''
      }
    }
  },
  mounted () {
    this.calculation()
    this.unilateralCostChart()
    this.integratedunitpriceDetails() // 综合单价下拉
    this.costRatioContent() // 各部分单方造价占比
    this.talentMachine() // 人材机占比下拉
    let vm = this
    window.addEventListener('resize', function () {
      // 注意此处的this指向window
      vm.calculation()
    })
  },
  methods: {
    // 点击综合单价区间分布下拉
    changeValue () {
      this.materialParams.code = this.materialValue
      this.IntegrateDistributed()
    },
    // 点击各部分人材机占比分析 下拉
    changeValues () {
      this.analysisParams.unitProjectId = this.listValue
      this.talentMachineRatio()
    },
    // 各部分人材机占比分析
    talentMachineRatio () {
      api
        .talentMachineRatio(this.analysisParams)
        .then(res => {
          this.annularData = res.data
          this.annularData.map(item => {
            item.value = item.proportion
            item.name = item.unitProjectName
          })
        })
        .catch(res => {})
    },
    // 人材机占比下拉
    talentMachine () {
      api
        .talentMachine(this.$route.params.monomerId)
        .then(res => {
          this.analysisList = res.data
          this.listValue = this.analysisList[0].unitProjectId
          this.analysisParams.unitProjectId = this.analysisList[0].unitProjectId
          this.talentMachineRatio()
        })
        .catch(res => {})
    },
    // 单方造价走势图
    unilateralCostChart () {
      api
        .unilateralCostChart(this.$route.params.monomerId)
        .then(res => {
          this.trendData.data = res.data
        })
        .catch(res => {})
    },
    // 各部分单方造价占比
    costRatioContent () {
      api
        .costRatioContent(this.$route.params.monomerId)
        .then(res => {
          if (res.data) {
            this.totalNmuber = res.data[0].total
            res.data.map(item => {
              this.peiData.push({ value: item.proportion, name: item.unitProjectName, total: item.total })
            })
          }
        })
        .catch(res => {})
    },
    // 综合单价下拉
    integratedunitpriceDetails () {
      api
        .integratedunitpriceDetails(this.$route.params.monomerId)
        .then(res => {
          this.materialData = res.data
          this.materialValue = this.materialData[0].code
          this.materialParams.code = this.materialData[0].code
          this.IntegrateDistributed()
        })
        .catch(res => {})
    },
    // 综合单价分布
    IntegrateDistributed () {
      api
        .IntegrateDistributed(this.materialParams)
        .then(res => {
          this.sectionData.arr = res.data.monthlyUnilateralCostContent
          this.sectionData.annualAverage = res.data.annualAverage
        })
        .catch(res => {})
    },
    ExcelCommon () {
      this.ExportParams.flag = this.radio
      api
        .ExcelCommon(this.ExportParams)
        .then(res => {
          switch (this.radio) {
            case '1':
              downloadBlob(res, '建安费分析')
              break
            case '2':
              downloadBlob(res, '综合单价分析')
              break
            case '3':
              downloadBlob(res, '人材机分析')
              break
            default:
              break
          }
          this.$message({
            showClose: true,
            message: '导出成功',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message({
            showClose: true,
            message: '导出文件失败',
            type: 'error'
          })
        })
    },
    calculation () {
      let box = document.getElementsByClassName('boxs')
      for (let index = 0; index < box.length; index++) {
        if (index > 0) {
          box[index].style.height = box[index].offsetWidth * 0.755 - 42 + 'px'
        } else {
          box[index].style.height = box[index].offsetWidth * 0.755 - 21 + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.engine-cost-container {
  font-size: 12px;
  .charts-box {
    width: 100%;
    // height: 350px;
    display: flex;
    .boxs {
      background: #fff;
      width: e('calc((100% - 27px)/4)');
      padding: 21px 0 21px 21px;
      position: relative;
      overflow: hidden;
      .title {
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
      }
      .persong-select {
        position: absolute;
        width: 44%;
        height: 8%;
        top: 16%;
        right: 2%;
        // border: 1px solid #e5e5e5;

        padding-left: 9px;
        z-index: 2;
        .el-input__inner {
          height: 100% !important;
        }
        .select-li {
          padding: 2px 10px;
        }
      }
      .selects1 {
        right: 6%;
      }
      .total-money {
        position: absolute;
        text-align: center;
        width: 38%;
        bottom: 3%;
        left: 8%;
        color: #666;
        .money {
          font-size: 22px;
        }
        .word_tips {
          margin-top: 1%;
          font-size: 12px;
        }
      }
    }
    .boxs:nth-child(1) {
      padding-bottom: 0;
    }
    .boxs:nth-child(2) {
      margin: 0 9px;
      position: relative;
    }
    .boxs:nth-child(3) {
      margin-right: 9px;
    }
  }
  .chioce-rdi {
    padding: 10px 0 15px 0;
    .rdi-title {
      color: #444;
      margin-right: 10px;
    }
    .el-radio + .el-radio {
      margin-left: 20px;
    }
    .label {
      font-size: 12px;
    }
    .btn {
      display: inline-block;
      width: 70px;
      height: 30px;
      line-height: 30px;
      background-color: #4474cf;
      color: #fff;
      text-align: center;
      margin-left: 40px;
      position: relative;
      cursor: pointer;
      &:before {
        content: '';
        position: absolute;
        width: 2px;
        height: 10px;
        background-color: #999999;
        left: -22px;
        top: 10px;
      }
    }
  }
}
</style>
<style scoped>
.persong-select >>> .el-input {
  height: 100% !important;
}
.persong-select >>> .el-input__inner {
  height: 100% !important;
  line-height: 100% !important;
  border-radius: 5px !important;
}
.persong-select >>> .el-input__icon {
  line-height: 100% !important;
}
</style>
