<template>
  <div @click="hideFilterUl">
    <!-- <div class="mrHeader">
      <div class="target">
        <div class="btns">
          <div class="downBtn">
            <button @click="exportFunc(6)">导出</button>
            <ul v-show="isul">
              <li @click="exportFunc(6)">导出为excel</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
    <div class="charts-box" v-show="charts">
      <div class="boxs">
        <p class="title">钢筋单方含量走势图</p>
        <trendModular :data="trendData"></trendModular>
      </div>
      <div class="boxs">
        <p class="title">钢筋各部分含量占比</p>
        <peiCharts :color='color' :data="pieData" :totalNmuber='totalNmuber' v-show="totalNmuber"></peiCharts>
        <div class="total-money" v-show="totalNmuber">
          <p class="money">
            {{totalNmuber}}
          </p>
          <p class="word_tips">
            钢筋总量(kg)</p>
        </div>
      </div>
    </div>

    <div class="mrmain">
      <!-- 钢筋指标     -->
      <el-table class="steelTable scroll-table" stripe :data="tableData6" key="tableData6" ref="table6" :class="{'fixedHeader': headerFixed}" v-loading="loading6" :span-method="arraySpanMethods" style="width: 100%" border id="6">
        <el-table-column label="钢筋指标" min-width="180" align="center">
          <el-table-column prop="date" width="168"></el-table-column>
          <el-table-column prop="name1" width="207"></el-table-column>
        </el-table-column>
        <el-table-column :prop="'cipcBase'" label="钢筋总量(kg)" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.cipcBase||(scope.row.cipcBase==0)&&scope.row.cipcBase!=null">{{scope.row["cipcBase"]}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="单方含量(kg/㎡)" min-width="120" align="center">
          <template slot-scope="scope">
            <span v-if="(scope.row.cipcBaseContent!='NaN')&&(scope.row.cipcBaseContent!='Infinity')&&(scope.row.cipcBase!=null||scope.row.cipcBase==0)">{{(scope.row.cipcBaseContent)}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="计算规则说明" min-width="120" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import trendModular from '@/components/trendModular' // 走势图
import peiCharts from '@/components/pieChart' // 饼图
import api from '@/fetch/api'
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'
export default {
  props: ['fixTabs', 'charts'],
  components: {
    trendModular,
    peiCharts
  },
  data () {
    return {
      headerFixed: false,
      isul: false, // 导出按钮
      excelName: '', // excel文件名
      condition: 0,
      newVal: '',
      loading6: false, // 钢筋
      contions: {
        flag: 6,
        monomerId: (() => this.$route.params.monomerId)()
      },
      tableData6: [
        {
          date: '基础',
          name1: '汇总',
          explain: '基础钢筋（汇总）/基础面积'
        },
        {
          date: '基础',
          name1: '基础梁',
          explain: '基础梁钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '筏板基础',
          explain: '筏板基础钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '集水坑',
          explain: '集水坑钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '柱墩',
          explain: '柱墩钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '独立基础',
          explain: '独立基础钢筋/基础面积'
        },

        {
          date: '基础',
          name1: '条形基础',
          explain: '条形基础钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '桩承台',
          explain: '桩承台基础钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '承台梁',
          explain: '承台梁基础钢筋/基础面积'
        },
        {
          date: '基础',
          name1: '后浇带',
          explain: '后浇带基础钢筋/基础面积'
        },

        {
          date: '基础以上钢筋',
          name1: '汇总',
          explain: '基础以上钢筋（汇总）/建筑面积'
        },

        {
          date: '基础以上钢筋(地下)',
          name1: '汇总',
          explain: '基础以上钢筋（地下汇总）/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '柱',
          explain: '柱钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '暗柱/端柱',
          explain: '暗柱和端柱钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '墙',
          explain: '墙钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '人防门框墙',
          explain: '人防门框墙钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '暗梁',
          explain: '暗梁钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '连梁',
          explain: '连梁钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '梁',
          explain: '梁钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '现浇板',
          explain: '现浇板钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '空心楼盖板',
          explain: '空心楼盖板钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '主肋梁',
          explain: ' 主肋梁钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '次肋梁',
          explain: '次肋梁钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '楼梯',
          explain: '楼梯钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '后浇带',
          explain: '后浇带钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '墙洞',
          explain: '墙洞钢筋/地下面积'
        },
        {
          date: '基础以上钢筋(地下)',
          name1: '板洞',
          explain: '板洞钢筋/地下面积'
        },

        {
          date: '基础以上钢筋(地上)',
          name1: '汇总',
          explain: '基础以上钢筋（地上汇总）/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '柱',
          explain: '柱钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '暗柱/端柱',
          explain: '暗柱和端柱钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '墙',
          explain: '墙钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '人防门框墙',
          explain: '人防门框墙钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '暗梁',
          explain: '暗梁钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '连梁',
          explain: '连梁钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '梁',
          explain: '梁钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '现浇板',
          explain: '现浇板钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '空心楼盖板',
          explain: '空心楼盖板钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '主肋梁',
          explain: '主肋梁钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '次肋梁',
          explain: '次肋梁钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '楼梯',
          explain: '楼梯钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '后浇带',
          explain: '后浇带钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '墙洞',
          explain: '墙洞钢筋/地上面积'
        },
        {
          date: '基础以上钢筋(地上)',
          name1: '板洞',
          explain: '板洞钢筋/地上面积'
        },

        {
          date: '节点等其他钢筋',
          name1: '汇总',
          explain: '节点等其他钢筋/建筑面积'
        },
        {
          date: '节点等其他钢筋(地下)',
          name1: '汇总',
          explain: '节点等其他钢筋（地下）/地下面积'
        },
        {
          date: '节点等其他钢筋(地下)',
          name1: '自定义线',
          explain: '自定义线钢筋/地下面积'
        },
        {
          date: '节点等其他钢筋(地下)',
          name1: '其他',
          explain: '其它钢筋/地下面积'
        },

        {
          date: '节点等其他钢筋(地上)',
          name1: '汇总',
          explain: '节点等其他钢筋（地上）/地上面积'
        },
        {
          date: '节点等其他钢筋(地上)',
          name1: '自定义线',
          explain: '自定义线钢筋/地上面积'
        },
        {
          date: '节点等其他钢筋(地上)',
          name1: '其他',
          explain: '其它钢筋/地上面积'
        },

        {
          date: '二次结构钢筋',
          name1: '汇总',
          explain: '二次结构钢筋/建筑面积'
        },

        {
          date: '二次结构钢筋（地下）',
          name1: '汇总',
          explain: '二次结构钢筋（地下）/地下面积'
        },
        {
          date: '二次结构钢筋（地下）',
          name1: '构造柱',
          explain: '构造柱钢筋/地下面积'
        },
        {
          date: '二次结构钢筋（地下）',
          name1: '砌体墙',
          explain: '砌体墙钢筋/地下面积'
        },
        {
          date: '二次结构钢筋（地下）',
          name1: '砌体加筋',
          explain: '砌体加筋钢筋/地下面积'
        },
        {
          date: '二次结构钢筋（地下）',
          name1: '过梁',
          explain: '过梁钢筋/地下面积'
        },
        {
          date: '二次结构钢筋（地下）',
          name1: '圈梁',
          explain: '圈梁钢筋/地下面积'
        },

        {
          date: '二次结构钢筋（地上）',
          name1: '汇总',
          explain: '二次结构钢筋（地上）/地上面积'
        },
        {
          date: '二次结构钢筋（地上）',
          name1: '构造柱',
          explain: '构造柱钢筋/地上面积'
        },
        {
          date: '二次结构钢筋（地上）',
          name1: '砌体墙',
          explain: '砌体墙钢筋/地上面积'
        },
        {
          date: '二次结构钢筋（地上）',
          name1: '砌体加筋',
          explain: '砌体加筋钢筋/地上面积'
        },
        {
          date: '二次结构钢筋（地上）',
          name1: '过梁',
          explain: '过梁钢筋/地上面积'
        },
        {
          date: '二次结构钢筋（地上）',
          name1: '圈梁',
          explain: '圈梁钢筋/地上面积'
        },

        {
          date: '汇总指标',
          name1: '总钢筋',
          explain: '钢筋/建筑面积'
        },
        {
          date: '汇总指标',
          name1: '总钢筋(不含基础)',
          explain: '总钢筋（不含基础）/建筑面积'
        },
        {
          date: '汇总指标',
          name1: '地下部分钢筋总量(含二次结构)',
          explain: '地上部分钢筋/地上面积'
        },
        {
          date: '汇总指标',
          name1: '地上部分钢筋总量（含二次结构）',
          explain: '地上部分钢筋/地上面积'
        },
        {
          date: '钢筋接头汇总',
          name1: '钢筋接头总量',
          explain: '钢筋接头总量/建筑面积'
        },
        {
          date: '钢筋接头汇总',
          name1: '地下部分钢筋接头总量',
          explain: '地下部分钢筋接头总量/地下面积'
        },
        {
          date: '钢筋接头汇总',
          name1: '地上部分钢筋接头总量',
          explain: '地上部分钢筋接头总量/地上面积'
        }
      ],
      ExportParams: {
        // 导出excel需要的参数
        flag: '6',
        monomerId: (() => this.$route.params.monomerId)()
      },
      // maxHeight: window.screen.height - 560,
      maxHeight: window.innerHeight - 460,
      totalNmuber: '', // 钢筋总量
      pieData: [],
      color: ['#3AA5FF', '#8398F3', '#01D3AB', '#FFBE40', '#F67979'],
      trendData: {
        data: {},
        type: '钢筋'
      } // 钢筋单方含量走势图 数据
    }
  },
  watch: {
    condition (val, oldVal) {
      this.newVal = val
    },
    $route: {
      handler: function (val, oldVal) {
        this.change(val.query.name)
      },
      // 深度观察监听
      deep: true
    },
    fixTabs (val) {
      this.headerFixed = val
    }
  },
  mounted () {
    this.change(6)
    this.rebarIndexChart() // 钢筋单方含量走势图
    this.rebarContent() // 钢筋各部分含量占比
    this.calculation()
    let vm = this
    window.addEventListener('resize', function () {
      // 注意此处的this指向window
      vm.calculation()
    })
    this.$nextTick(() => {
      /* 删除表头的第二级 */
      let group = document.getElementsByClassName('is-group')[0]
      let tr = group.getElementsByTagName('tr')
      if (tr.length === 2) {
        group.removeChild(tr[1])
      }
    })
  },
  methods: {
    // 钢筋各部分含量占比
    rebarContent () {
      api
        .rebarContent(this.contions.monomerId)
        .then(res => {
          if (res.data.baseRebar) this.pieData.push({ value: res.data.baseRebar, name: '基础钢筋' })
          if (res.data.jointsNOtherTotal) this.pieData.push({ value: res.data.jointsNOtherTotal, name: '节点等其他钢筋' })
          if (res.data.rebarAboveBaseTotal) this.pieData.push({ value: res.data.rebarAboveBaseTotal, name: '基础以上钢筋' })
          if (res.data.secStructureTotal) this.pieData.push({ value: res.data.secStructureTotal, name: '二次结构' })
          if (res.data.splicesTotal) this.pieData.push({ value: res.data.splicesTotal, name: '钢筋接头总量' })
          this.totalNmuber = res.data.totalRebar
        })
        .catch(res => {})
    },
    // 钢筋单方含量走势图
    rebarIndexChart () {
      api
        .rebarIndexChart(this.contions.monomerId)
        .then(res => {
          if (res.errorCode == '200') {
            this.trendData.data = res.data
            this.trendData.type = '钢筋'
          }
        })
        .catch(res => {})
    },
    // 计算
    calculation () {
      let box = document.getElementsByClassName('boxs')
      for (let index = 0; index < box.length; index++) {
        if (index > 0) {
          box[index].style.height = box[index].offsetWidth * 0.755 - 42 + 'px'
        } else {
          box[index].style.height = box[index].offsetWidth * 0.755 - 21 + 'px'
        }
      }
    },
    // 合并单元格 钢筋指标
    arraySpanMethods ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 10,
            colspan: 1
          }
        }
        if (rowIndex === 10) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        if (rowIndex === 11) {
          return {
            rowspan: 16,
            colspan: 1
          }
        }
        if (rowIndex === 27) {
          return {
            rowspan: 16,
            colspan: 1
          }
        }
        if (rowIndex === 43) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        if (rowIndex === 44) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        if (rowIndex === 47) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        // 二次结构钢筋
        if (rowIndex === 50) {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        if (rowIndex === 51) {
          return {
            rowspan: 6,
            colspan: 1
          }
        }
        if (rowIndex === 57) {
          return {
            rowspan: 6,
            colspan: 1
          }
        }
        // 汇总指标
        if (rowIndex === 63) {
          return {
            rowspan: 4,
            colspan: 1
          }
        }
        // 钢筋接头汇总
        if (rowIndex === 67) {
          return {
            rowspan: 3,
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
    // 关闭筛选区域
    hideFilterUl () {
      // this.condition = 0
    },
    // 导出Excel 接口
    ExcelCommon () {
      api
        .ExcelCommon(this.ExportParams)
        .then(res => {
          downloadBlob(res, '钢筋算量指标')
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
    // 导出为excel
    exportFunc (tableId) {
      this.isul = false
      this.excelName = '钢筋指标'
      this.ExcelCommon()
    },
    // 选择安装指标、土建指标或者钢筋指标
    change (val) {
      this.loading6 = true
      this.getCostIndicatorAnalyse().then(res => {
        this.loading6 = false
      })
    },
    getCostIndicatorAnalyse () {
      return new Promise((resolve, relect) => {
        api
          .getCostIndicatorAnalyse(this.contions)
          .then(res => {
            // 钢筋指标
            if (res.data.rebarQuantityList) {
              let item = res.data.rebarQuantityList
              if (item.baseRebar) {
                this.$set(this.tableData6[0], 'cipcBase', item.baseRebar.toFixed(2)) // 基础-汇总基础钢筋总量
                this.$set(this.tableData6[0], 'cipcBaseContent', (item.baseRebar / item.baseArea).toFixed(3)) // 基础-汇总基础钢筋含量
              }
              this.$set(this.tableData6[1], 'cipcBase', item.baseBeam) // 基础-基础梁
              this.$set(this.tableData6[1], 'cipcBaseContent', (item.baseBeam / item.baseArea).toFixed(3)) // 基础-基础梁

              this.$set(this.tableData6[2], 'cipcBase', item.raftFoundation) // 基础-筏板基础
              this.$set(this.tableData6[2], 'cipcBaseContent', (item.raftFoundation / item.baseArea).toFixed(3)) // 基础-筏板基础含量

              this.$set(this.tableData6[3], 'cipcBase', item.sumpPit) // 基础-集水坑
              this.$set(this.tableData6[3], 'cipcBaseContent', (item.sumpPit / item.baseArea).toFixed(3)) // 基础-集水坑含量

              this.$set(this.tableData6[4], 'cipcBase', item.piers) // 基础-柱墩
              this.$set(this.tableData6[4], 'cipcBaseContent', (item.piers / item.baseArea).toFixed(3)) // 基础-柱墩含量

              this.$set(this.tableData6[5], 'cipcBase', item.independentFoundation) // 基础-独立基础
              this.$set(this.tableData6[5], 'cipcBaseContent', (item.independentFoundation / item.baseArea).toFixed(3)) // 基础-独立基础含量

              this.$set(this.tableData6[6], 'cipcBase', item.stripFoundation) // 基础-条形基础
              this.$set(this.tableData6[6], 'cipcBaseContent', (item.stripFoundation / item.baseArea).toFixed(3)) // 基础-条形基础含量

              this.$set(this.tableData6[7], 'cipcBase', item.pileCap) // 基础-桩承台
              this.$set(this.tableData6[7], 'cipcBaseContent', (item.pileCap / item.baseArea).toFixed(3)) // 基础-桩承台含量

              this.$set(this.tableData6[8], 'cipcBase', item.cappingBeam) // 基础-承台梁
              this.$set(this.tableData6[8], 'cipcBaseContent', (item.cappingBeam / item.baseArea).toFixed(3)) // 基础-承台梁含量

              this.$set(this.tableData6[9], 'cipcBase', item.basePostPouringBelt) // 基础-后浇带
              this.$set(this.tableData6[9], 'cipcBaseContent', (item.basePostPouringBelt / item.baseArea).toFixed(3)) // 基础-后浇带含量

              this.$set(this.tableData6[10], 'cipcBase', item.rebarAboveBaseTotal) // 基础以上钢筋-基础以上钢筋总量
              this.$set(this.tableData6[10], 'cipcBaseContent', (item.rebarAboveBaseTotal / (item.undergroundArea + item.abovegroundArea)).toFixed(3)) // 基础以上钢筋-基础以上钢筋含量

              this.$set(this.tableData6[11], 'cipcBase', item.rebarAboveBaseUnder) // 基础以上钢筋(地下)-
              this.$set(this.tableData6[11], 'cipcBaseContent', (item.rebarAboveBaseUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-

              this.$set(this.tableData6[12], 'cipcBase', item.pillarUnder) // 基础以上钢筋(地下)-柱
              this.$set(this.tableData6[12], 'cipcBaseContent', (item.pillarUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-柱单方含量

              this.$set(this.tableData6[13], 'cipcBase', item.embeddedColumnUnder) // 基础以上钢筋(地下)-暗柱/端柱
              this.$set(this.tableData6[13], 'cipcBaseContent', (item.embeddedColumnUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-暗柱/端柱单方含量

              this.$set(this.tableData6[14], 'cipcBase', item.wallUnder) // 基础以上钢筋(地下)-墙
              this.$set(this.tableData6[14], 'cipcBaseContent', (item.wallUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-墙单方含量

              this.$set(this.tableData6[15], 'cipcBase', item.adfwallUnder) // 基础以上钢筋(地下)-人防门框墙
              this.$set(this.tableData6[15], 'cipcBaseContent', (item.adfwallUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-人防门框墙单方含量
              this.$set(this.tableData6[16], 'cipcBase', item.embeddedBeamUnder) // 基础以上钢筋(地下)-暗梁
              this.$set(this.tableData6[16], 'cipcBaseContent', (item.embeddedBeamUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-暗梁单方含量

              this.$set(this.tableData6[17], 'cipcBase', item.couplingBeamUnder) // 基础以上钢筋(地下)-连梁
              this.$set(this.tableData6[17], 'cipcBaseContent', (item.couplingBeamUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-连梁单方含量

              this.$set(this.tableData6[18], 'cipcBase', item.beamUnder) // 基础以上钢筋(地下)-梁
              this.$set(this.tableData6[18], 'cipcBaseContent', (item.beamUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-梁单方含量

              this.$set(this.tableData6[19], 'cipcBase', item.cipplateUnder) // 基础以上钢筋(地下)-现浇板
              this.$set(this.tableData6[19], 'cipcBaseContent', (item.cipplateUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-现浇板单方含量

              this.$set(this.tableData6[20], 'cipcBase', item.hollowSlabsUnder) // 基础以上钢筋(地下)-空心楼盖板
              this.$set(this.tableData6[20], 'cipcBaseContent', (item.hollowSlabsUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-空心楼盖板单方含量

              this.$set(this.tableData6[21], 'cipcBase', item.mainRibBeamUnder) // 基础以上钢筋(地下)-主肋梁
              this.$set(this.tableData6[21], 'cipcBaseContent', (item.mainRibBeamUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-主肋梁单方含量

              this.$set(this.tableData6[22], 'cipcBase', item.secRibBeamUnder) // 基础以上钢筋(地下)-次肋梁
              this.$set(this.tableData6[22], 'cipcBaseContent', (item.secRibBeamUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-次肋梁单方含量

              this.$set(this.tableData6[23], 'cipcBase', item.stairsUnder) // 基础以上钢筋(地下)-楼梯
              this.$set(this.tableData6[23], 'cipcBaseContent', (item.stairsUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-楼梯含量

              this.$set(this.tableData6[24], 'cipcBase', item.postPouringBeltUnder) // 基础以上钢筋(地下)-后浇带
              this.$set(this.tableData6[24], 'cipcBaseContent', (item.postPouringBeltUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-后浇带单方含量

              this.$set(this.tableData6[25], 'cipcBase', item.wallHoleUnder) // 基础以上钢筋(地下)-墙洞
              this.$set(this.tableData6[25], 'cipcBaseContent', (item.wallHoleUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-墙洞含量

              this.$set(this.tableData6[26], 'cipcBase', item.slabHoleUnder) // 基础以上钢筋(地下)-板洞
              this.$set(this.tableData6[26], 'cipcBaseContent', (item.slabHoleUnder / item.undergroundArea).toFixed(3)) // 基础以上钢筋(地下)-板洞单方含量

              this.$set(this.tableData6[27], 'cipcBase', item.rebarAboveBaseAbove) // 基础以上钢筋(地上)-
              this.$set(this.tableData6[27], 'cipcBaseContent', (item.rebarAboveBaseAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-

              this.$set(this.tableData6[28], 'cipcBase', item.pillarAbove) // 基础以上钢筋(地上)-柱
              this.$set(this.tableData6[28], 'cipcBaseContent', (item.pillarAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-柱单方含量

              this.$set(this.tableData6[29], 'cipcBase', item.embeddedColumnAbove) // 基础以上钢筋(地上)-暗柱/端柱
              this.$set(this.tableData6[29], 'cipcBaseContent', (item.embeddedColumnAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-暗柱/端柱单方含量

              this.$set(this.tableData6[30], 'cipcBase', item.wallAbove) // 基础以上钢筋(地上)-墙
              this.$set(this.tableData6[30], 'cipcBaseContent', (item.wallAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-墙单方含量

              this.$set(this.tableData6[31], 'cipcBase', item.adfwallAbove) // 基础以上钢筋(地上)-人防门框墙
              this.$set(this.tableData6[31], 'cipcBaseContent', (item.adfwallAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-人防门框墙单方含量

              this.$set(this.tableData6[32], 'cipcBase', item.embeddedBeamAbove) // 基础以上钢筋(地上)-暗梁
              this.$set(this.tableData6[32], 'cipcBaseContent', (item.embeddedBeamAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-暗梁单方含量

              this.$set(this.tableData6[33], 'cipcBase', item.couplingBeamAbove) // 基础以上钢筋(地上)-连梁
              this.$set(this.tableData6[33], 'cipcBaseContent', (item.couplingBeamAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-连梁单方含量

              this.$set(this.tableData6[34], 'cipcBase', item.beamAbove) // 基础以上钢筋(地上)-梁
              this.$set(this.tableData6[34], 'cipcBaseContent', (item.beamAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-梁单方含量

              this.$set(this.tableData6[35], 'cipcBase', item.cipplateAbove) // 基础以上钢筋(地上)-现浇板
              this.$set(this.tableData6[35], 'cipcBaseContent', (item.cipplateAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-现浇板单方含量

              this.$set(this.tableData6[36], 'cipcBase', item.hollowSlabsAbove) // 基础以上钢筋(地上)-空心楼盖板
              this.$set(this.tableData6[36], 'cipcBaseContent', (item.hollowSlabsAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-空心楼盖板单方含量

              this.$set(this.tableData6[37], 'cipcBase', item.mainRibBeamAbove) // 基础以上钢筋(地上)-主肋梁
              this.$set(this.tableData6[37], 'cipcBaseContent', (item.mainRibBeamAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-主肋梁单方含量

              this.$set(this.tableData6[38], 'cipcBase', item.secRibBeamAbove) // 基础以上钢筋(地上)-次肋梁
              this.$set(this.tableData6[38], 'cipcBaseContent', (item.secRibBeamAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-次肋梁单方含量

              this.$set(this.tableData6[39], 'cipcBase', item.stairsAbove) // 基础以上钢筋(地上)-楼梯
              this.$set(this.tableData6[39], 'cipcBaseContent', (item.stairsAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-楼梯含量

              this.$set(this.tableData6[40], 'cipcBase', item.postPouringBeltAbove) // 基础以上钢筋(地上)-后浇带
              this.$set(this.tableData6[40], 'cipcBaseContent', (item.postPouringBeltAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-后浇带单方含量

              this.$set(this.tableData6[41], 'cipcBase', item.wallHoleAbove) // 基础以上钢筋(地上)-墙洞
              this.$set(this.tableData6[41], 'cipcBaseContent', (item.wallHoleAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-墙洞含量

              this.$set(this.tableData6[42], 'cipcBase', item.slabHoleAbove) // 基础以上钢筋(地上)-板洞
              this.$set(this.tableData6[42], 'cipcBaseContent', (item.slabHoleAbove / item.abovegroundArea).toFixed(3)) // 基础以上钢筋(地上)-板洞单方含量

              this.$set(this.tableData6[43], 'cipcBase', item.jointsNOtherTotal) // 节点等其他钢筋-节点等其他钢筋总量
              this.$set(this.tableData6[43], 'cipcBaseContent', (item.jointsNOtherTotal / (item.abovegroundArea + item.undergroundArea)).toFixed(3)) // 节点等其他钢筋-节点等其他钢筋含量

              this.$set(this.tableData6[44], 'cipcBase', item.jointsNOtherUnder) // 节点等其他钢筋(地下)-
              this.$set(this.tableData6[44], 'cipcBaseContent', (item.jointsNOtherUnder / item.undergroundArea).toFixed(3)) // 节点等其他钢筋(地下)-含量

              this.$set(this.tableData6[45], 'cipcBase', item.customLineUnder) // 节点等其他钢筋(地下)-自定义线
              this.$set(this.tableData6[45], 'cipcBaseContent', (item.customLineUnder / item.undergroundArea).toFixed(3)) // 节点等其他钢筋(地下)-自定义线含量

              this.$set(this.tableData6[46], 'cipcBase', item.otherUnder) // 节点等其他钢筋(地下)-其他
              this.$set(this.tableData6[46], 'cipcBaseContent', (item.otherUnder / item.undergroundArea).toFixed(3)) // 节点等其他钢筋(地下)-其他含量

              this.$set(this.tableData6[47], 'cipcBase', item.jointsNOtherAbove) // 节点等其他钢筋(地上)-
              this.$set(this.tableData6[47], 'cipcBaseContent', (item.jointsNOtherAbove / item.abovegroundArea).toFixed(3)) // 节点等其他钢筋(地上)-含量

              this.$set(this.tableData6[48], 'cipcBase', item.customLineAbove) // 节点等其他钢筋(地上)-自定义线
              this.$set(this.tableData6[48], 'cipcBaseContent', (item.customLineAbove / item.abovegroundArea).toFixed(3)) // 节点等其他钢筋(地上)-自定义线含量

              this.$set(this.tableData6[49], 'cipcBase', item.otherAbove) // 节点等其他钢筋(地上)-其他
              this.$set(this.tableData6[49], 'cipcBaseContent', (item.otherAbove / item.abovegroundArea).toFixed(3)) // 节点等其他钢筋(地上)-其他含量

              this.$set(this.tableData6[50], 'cipcBase', item.secStructureTotal) // 二次结构钢筋- 汇总
              this.$set(this.tableData6[50], 'cipcBaseContent', (item.secStructureTotal / item.constructionArea).toFixed(3)) // 二次结构钢筋-含量汇总

              this.$set(this.tableData6[51], 'cipcBase', item.secStructureUnder) // 二次结构钢筋(地下)- 汇总
              this.$set(this.tableData6[51], 'cipcBaseContent', (item.secStructureUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-含量汇总

              this.$set(this.tableData6[52], 'cipcBase', item.tieColumnUnder) // 二次结构钢筋(地下)-构造柱
              this.$set(this.tableData6[52], 'cipcBaseContent', (item.tieColumnUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-构造柱含量

              this.$set(this.tableData6[53], 'cipcBase', item.masonryWallUnder) // 二次结构钢筋(地下)-砌体墙
              this.$set(this.tableData6[53], 'cipcBaseContent', (item.masonryWallUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-砌体墙含量

              this.$set(this.tableData6[54], 'cipcBase', item.masonryReinforceUnder) // 二次结构钢筋(地下)-砌体加筋
              this.$set(this.tableData6[54], 'cipcBaseContent', (item.masonryReinforceUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-砌体加筋含量

              this.$set(this.tableData6[55], 'cipcBase', item.lintelUnder) // 二次结构钢筋(地下)-过梁
              this.$set(this.tableData6[55], 'cipcBaseContent', (item.lintelUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-过梁含量

              this.$set(this.tableData6[56], 'cipcBase', item.ringBeamUnder) // 二次结构钢筋(地下)-圈梁
              this.$set(this.tableData6[56], 'cipcBaseContent', (item.ringBeamUnder / item.undergroundArea).toFixed(3)) // 二次结构钢筋(地下)-圈梁含量

              this.$set(this.tableData6[57], 'cipcBase', item.secStructureAbove) // 二次结构钢筋(地上)- 汇总
              this.$set(this.tableData6[57], 'cipcBaseContent', (item.secStructureAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-含量汇总

              this.$set(this.tableData6[58], 'cipcBase', item.tieColumnAbove) // 二次结构钢筋(地上)-构造柱
              this.$set(this.tableData6[58], 'cipcBaseContent', (item.tieColumnAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-构造柱含量

              this.$set(this.tableData6[59], 'cipcBase', item.masonryWallAbove) // 二次结构钢筋(地上)-砌体墙
              this.$set(this.tableData6[59], 'cipcBaseContent', (item.masonryWallAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-砌体墙含量

              this.$set(this.tableData6[60], 'cipcBase', item.masonryReinforceAbove) // 二次结构钢筋(地上)-砌体加筋
              this.$set(this.tableData6[60], 'cipcBaseContent', (item.masonryReinforceAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-砌体加筋含量

              this.$set(this.tableData6[61], 'cipcBase', item.lintelAbove) // 二次结构钢筋(地上)-过梁
              this.$set(this.tableData6[61], 'cipcBaseContent', (item.lintelAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-过梁含量

              this.$set(this.tableData6[62], 'cipcBase', item.ringBeamAbove) // 二次结构钢筋(地上)-圈梁
              this.$set(this.tableData6[62], 'cipcBaseContent', (item.ringBeamAbove / item.abovegroundArea).toFixed(3)) // 二次结构钢筋(地上)-圈梁含量

              this.$set(this.tableData6[63], 'cipcBase', item.totalRebar) // 汇总指标-总钢筋
              this.$set(this.tableData6[63], 'cipcBaseContent', (item.totalRebar / item.constructionArea).toFixed(3)) // 汇总指标-总钢筋含量

              this.$set(this.tableData6[64], 'cipcBase', item.rebarNobase) // 汇总指标-总钢筋(不含基础)
              this.$set(this.tableData6[64], 'cipcBaseContent', (item.rebarNobase / item.constructionArea).toFixed(3)) // 汇总指标-总钢筋(不含基础)含量

              this.$set(this.tableData6[65], 'cipcBase', item.rebarUnder) // 汇总指标-地下部分钢筋(含二次结构)
              this.$set(this.tableData6[65], 'cipcBaseContent', (item.rebarUnder / item.undergroundArea).toFixed(3)) // 汇总指标-地下部分钢筋(不含二次结构)含量

              this.$set(this.tableData6[66], 'cipcBase', item.rebarAbove) // 汇总指标-地上部分钢筋(含二次结构)
              this.$set(this.tableData6[66], 'cipcBaseContent', (item.rebarAbove / item.abovegroundArea).toFixed(3)) // 汇总指标-地上部分钢筋(不含二次结构)含量

              this.$set(this.tableData6[67], 'cipcBase', item.splicesTotal) // 钢筋接头汇总-钢筋接头总量
              this.$set(this.tableData6[67], 'cipcBaseContent', (item.splicesTotal / item.constructionArea).toFixed(3)) // 钢筋接头汇总-钢筋接头含量

              this.$set(this.tableData6[68], 'cipcBase', item.splicesUnder) // 钢筋接头汇总-地下部分钢筋接头总量
              this.$set(this.tableData6[68], 'cipcBaseContent', (item.splicesUnder / item.undergroundArea).toFixed(3)) // 钢筋接头汇总-地下部分钢筋接头含量

              this.$set(this.tableData6[69], 'cipcBase', item.splicesAbove) // 钢筋接头汇总-地上部分钢筋接头总量
              this.$set(this.tableData6[69], 'cipcBaseContent', (item.splicesAbove / item.abovegroundArea).toFixed(3)) // 钢筋接头汇总-地上部分钢筋接头含量
            } else {
              this.loading6 = false
              this.tableData6 = []
            }
            resolve(this.tableData6)
          })
          .catch(res => {
            this.tableData6 = []
            this.loading6 = false
          })
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// .mrHeader {
//   box-sizing: border-box;
//   background-color: #e7eaee;
//   padding-bottom: 10px;
//   .target {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     .btns {
//       // margin-left: 20px;
//       .downBtn {
//         position: relative;
//         display: inline-block;
//         button {
//           cursor: pointer;
//           width: 70px;
//           text-align: center;
//           height: 30px;
//           line-height: 30px;
//           color: #fff;
//           background-color: #4474cf;
//           vertical-align: middle;
//           // margin-bottom: 10px;
//         }
//         ul {
//           position: absolute;
//           left: 18px;
//           text-align: center;
//           width: 104.67px;
//           margin-top: 5px;
//           z-index: 2001;
//           background: #f2f5fc;
//           li {
//             height: 20px;
//             line-height: 20px;
//             font-size: 12px;
//             background: #f2f5fc;
//             cursor: pointer;
//             opacity: 0.8;
//           }
//           li:nth-child(1) {
//             border-bottom: 1px solid gray;
//           }
//         }
//       }
//     }
//   }
// }
.charts-box {
  width: 100%;
  display: flex;
  .boxs {
    background: #fff;
    width: e('calc((100% - 27px)/4)');
    padding: 21px 0 21px 21px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    .title {
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }
    .total-money {
      position: absolute;
      text-align: center;
      width: 39%;
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
table,
th,
td {
  border: 1px solid #eff2f9;
  text-align: center;
  height: 30px;
  line-height: 30px;
  min-width: 120px;
}

table {
  tr:hover {
    background: #f2f5fb;
    cursor: default;
  }
  tr {
    background: #fff;
  }
  th {
    background: #a9acb3;
    color: #fff;
    font-size: 12px;
  }
  td {
    color: #444;
    font-size: 14px;
  }
  .gangjin {
    th {
      min-width: 138px;
      padding: 0 10px;
    }
  }
  .title {
    background: #a9acb3;
    td {
      color: #fff;
      font-size: 12px;
    }
  }
  .title:hover {
    background: #a9acb3;
  }
}

// @media screen and (max-width: 1366px) {
//   .mrHeader {
//     padding: 18px 6px 0;
//   }
// }
</style>
<style lang="less">
.fixedHeader .el-table__header-wrapper {
  position: fixed;
  top: 117px;
  z-index: 1;
}
.target input.el-input__inner::-webkit-input-placeholder {
  color: #4474cf;
}
.target .el-tag.el-tag--info.el-tag--small {
  float: left;
}
.target .el-select__tags-text {
  max-width: 147px;
  display: block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mrmain .el-table thead.is-group th {
  background: #fafafb;
  color: #888;
  font-size: 12px;
  height: 30px;
  padding: 0;
  font-weight: bold;
}
.mrmain .el-table th.is-leaf {
  background: #fafafb;
  color: #666;
  font-size: 12px;
}
</style>
<style scoped>
.btns .selects >>> .el-input--medium .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
.steelTable >>> .el-table__row td {
  padding: 0;
  padding-left: 10px;
  height: 30px;
  font-size: 12px;
  color: #666;
  font-size: 400;
}
.mrmain >>> .el-table--striped .el-table__body tr.el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(2n).el-table__row--striped td:nth-child(1) {
  background-color: #f5f6f8 !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(12).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(28).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(44).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(48).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(52).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(58).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(64).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--striped .el-table__body tr:nth-child(68).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}

.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(1):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(2n):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(11):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(12):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(28):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(44):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(45):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(48):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(51):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(52):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(58):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(64):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.mrmain >>> .el-table--enable-row-hover .el-table__body tr:nth-child(68):hover > td:nth-child(1) {
  background-color: #fff !important;
}
</style>
