<template>
  <div class="kanban clearfix">
    <div class="change-kanban">
      <p class="kanban-province">{{province?province:'--'}}</p>
      <div class="kanben-name" @click.stop="openChange">
        <div class="kanben-name-p">
          <span>{{indicator?indicator:'请选择指标看板'}}</span>
          <span :class="[isopenKanban?'spaninverse':'spans']"></span>
          <div style="clear:both"></div>
        </div>
        <ul v-if="isopenKanban">
          <li class="kanben-li" @click="change('造价指标看板')">造价指标看板</li>
          <li class="kanben-li" @click="change('钢筋算量指标看板')">钢筋算量指标看板</li>
          <li class="kanben-li" @click="change('土建算量指标看板')">土建算量指标看板</li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="kanban-box">
      <div class="number">
        <p class="modular-number">{{numbers?numbers:'--'}}</p>
        <p class="modular-name">工程数量</p>
      </div>
      <div class="partition"></div>
      <div class="section-modular">
        <p class="modular-number">
          {{sectionNumberStrat?sectionNumberStrat:'--'}}&nbsp;-&nbsp;{{sectionNumberEnd?sectionNumberEnd:'--'}}
        </p>
        <p class="modular-name">{{sectionName}}</p>
      </div>
      <div class="partition"></div>
      <div class="trend-modular">
        <div class="trend-charts">
          <trendKanban :data="trendData" v-if="trendData.arr.length>0"></trendKanban>
        </div>
        <p class="modular-name">{{trendName}}</p>
      </div>
      <div class="partition"></div>
      <div class="columnar-modular">
        <div class="columnar-charts">
          <div class="charts">
            <ul class="charts-ul" v-if="sectionList">
              <li v-for="(item,index) in sectionList" :key="index" @click="clickSection(item)" :class="{selectP:item.select}">
                <p :style="{height:(20*item.proportion*0.01)+'px'}"></p>
              </li>
              <div style="clear:both"></div>
            </ul>
            <ul class="charts-ul-none" v-else>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <div style="clear:both"></div>
            </ul>
          </div>
          <div class="charts-number">
            <span class="min">{{minNmuber?minNmuber:''}}</span>
            <span>-</span>
            <span class="min">{{maxNmuber?maxNmuber:''}}</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
        <p class="modular-name">{{columnarNumber?columnarNumber:'--'}}{{columnarName}}</p>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- 只有土建才显示 -->
    <div v-show="isCivil" class="civil-box">
      <div class="partition"></div>
      <div class="section-modular">
        <p class="modular-number">
          {{civilSectionNumberStrat?civilSectionNumberStrat:'--'}}&nbsp;-&nbsp;{{civilSectionNumberEnd?civilSectionNumberEnd:'--'}}
        </p>
        <p class="modular-name">混凝土单方含量区间(kg/㎡)</p>
      </div>
      <div class="partition"></div>
      <div class="trend-modular">
        <div class="trend-charts">
          <trendKanbans :data="trendDatas" v-if="trendDatas.arr.length>0"></trendKanbans>
        </div>
        <p class="modular-name">近12个月混凝土单方含量走势</p>
      </div>
      <div class="partition"></div>
      <div class="columnar-modular">
        <div class="columnar-charts">
          <div class="charts">
            <ul class="charts-ul" v-if="civilSectionList">
              <li v-for="(item,index) in civilSectionList" :key="index" @click="clickClivilSection(item)" :class="{selectcP:item.select}">
                <p :style="{height:(20*item.proportion*0.01)+'px'}"></p>
              </li>
              <div style="clear:both"></div>
            </ul>
            <ul class="charts-ul-none" v-else>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <div style="clear:both"></div>
            </ul>
          </div>
          <div class="charts-number">
            <span class="min">{{civiMinNmuber}}</span>
            <span>-</span>
            <span class="min">{{civiMaxNmuber}}</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
        <p class="modular-name">{{civilColumnarNumber?civilColumnarNumber:'--'}}%的工程混凝土单方含量区间(kg/㎡)</p>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import trendKanban from '@/components/trendKanban'
import trendKanbans from '@/components/trendKanbans'
export default {
  props: ['kanbanData'],
  components: {
    trendKanban,
    trendKanbans
  },
  data () {
    return {
      indicator: '',
      isopenKanban: false,
      province: '',
      numbers: '', // 工程数量
      sectionName: '单方--区间(--)',
      sectionNumberStrat: '', // 区间数开头
      sectionNumberEnd: '', // 区间数开头
      trendName: '近12个月单方--走势',
      columnarNumber: '', // 区间数
      columnarName: '%的工程单方--区间(--)', // 区间名称
      minNmuber: '', // 区间最小值
      maxNmuber: '', // 区间最大值
      isCivil: false,
      civilSectionNumberStrat: '', // 土建混凝土区间数开头
      civilSectionNumberEnd: '', // 土建混凝土区间数结束
      civilColumnarNumber: '',
      civiMinNmuber: '',
      civiMaxNmuber: '',
      trendData: {
        arr: [],
        annualAverage: '' // 平均值
      },
      trendDatas: {
        arr: [],
        annualAverage: '' // 平均值
      },
      sectionList: [], // 柱状区间
      civilSectionList: [] // 土建混凝土柱状区间
    }
  },
  watch: {
    $props: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldValue) {
        var newData = val.kanbanData
        if (newData.indexdataName && newData.indexdataName != '安装算量指标') {
          this.indicator = newData.indexdataName + '看板'
          this.province = newData.provinceName
          this.judge(this.indicator)
        }
        if (newData.indexdataName == '安装算量指标' || newData.indexdataName == '') {
          this.trendData.arr = []
          this.numbers = ''
          this.sectionNumberStrat = ''
          this.sectionNumberEnd = ''
          this.indicator = '请选择指标看板'
          this.sectionName = '单方--区间(--)'
          this.trendName = '近12个月单方--走势'
          this.columnarNumber = '--'
          this.columnarName = '%的工程单方--区间(--)'
          this.minNmuber = '' // 区间最小值
          this.maxNmuber = '' // 区间最大值
          this.province = ''
          this.isCivil = false
          this.sectionList = []
          newData.deliveryData = ''
          newData.civilData = ''
        }
        // debugger
        // 判断选择的指标类型
        if (newData.indexdataName == '造价指标' || newData.indexdataName == '钢筋算量指标' || newData.indexdataName == '土建算量指标') {
          this.trendData.arr = []
          this.trendDatas.arr = []
          // debugger
          if (newData.indexdataName == '土建算量指标') {
            this.numbers = newData.civilData ? newData.civilData.count : '--'
          } else {
            this.numbers = newData.deliveryData.count ? newData.deliveryData.count : ''
          }
          this.sectionNumberStrat = newData.deliveryData.lowestValue ? newData.deliveryData.lowestValue : ''
          this.sectionNumberEnd = newData.deliveryData.highestValue
          if (newData.deliveryData.monthlyUnilateralContent) {
            newData.deliveryData.monthlyUnilateralContent.map(item => {
              item.months = item.month.split('-')[1]
              this.trendData.arr.push({ value: item.monthlyContent, name: item.months })
            })
          }
          this.trendData.annualAverage = newData.deliveryData.annualAverage // 平均值
          this.minNmuber = newData.deliveryData.maxAndMin ? newData.deliveryData.maxAndMin[0].min : ''
          this.maxNmuber = newData.deliveryData.maxAndMin ? newData.deliveryData.maxAndMin[0].max : ''
          this.columnarNumber = newData.deliveryData.maxAndMin ? newData.deliveryData.maxAndMin[0].proportion : ''
          switch (newData.indexdataName) {
            case '造价指标':
              this.columnarName = '%的工程单方造价区间(元/㎡)'
              break
            case '钢筋算量指标':
              this.columnarName = '%的工程钢筋单方含量区间(kg/㎡)'
              break
            case '土建算量指标':
              this.columnarName = '%的工程砌体单方含量区间(kg/㎡)'
              break
            default:
              break
          }
          this.sectionList = newData.deliveryData.maxAndMin
          this.civilSectionList = []
          if (newData.indexdataName == '土建算量指标') {
            this.civilSectionNumberStrat = newData.civilData ? newData.civilData.lowestValue : ''
            this.civilSectionNumberEnd = newData.civilData ? newData.civilData.highestValue : ''
            this.civilColumnarNumber = newData.civilData.maxAndMin ? newData.civilData.maxAndMin[0].proportion : ''
            this.civiMinNmuber = newData.civilData.maxAndMin ? newData.civilData.maxAndMin[0].min : ''
            this.civiMaxNmuber = newData.civilData.maxAndMin ? newData.civilData.maxAndMin[0].max : ''
            this.civilSectionList = newData.civilData.maxAndMin
            if (newData.civilData.monthlyUnilateralContent) {
              newData.civilData.monthlyUnilateralContent.map(item => {
                item.months = item.month.split('-')[1]
                this.trendDatas.arr.push({ value: item.monthlyContent, name: item.months })
              })
            }
            this.trendDatas.annualAverage = newData.civilData.annualAverage // 平均值
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 点击柱状区间
    clickSection (item) {
      this.minNmuber = item.min
      this.maxNmuber = item.max
      this.sectionList.map(items => {
        items.select = false
      })
      item.select = true
      this.columnarNumber = item.proportion
    },
    // 点击混凝土柱状区间
    clickClivilSection (item) {
      this.civiMinNmuber = item.min
      this.civiMaxNmuber = item.max
      this.civilSectionList.map(items => {
        items.select = false
      })
      item.select = true
      this.civilColumnarNumber = item.proportion
    },
    openChange () {
      this.isopenKanban = !this.isopenKanban
    },
    // 选择指标看板
    change (val) {
      this.judge(val)
      let id = ''
      let name = ''
      switch (val) {
        case '造价指标看板':
          id = '2f41c015f43f409f9778e5183da8416c,e4ecf980659c4025bebc8823b519f111'
          name = '造价指标'
          break
        case '土建算量指标看板':
          id = '3eebbe1f23334e86be300c42be1f6600'
          name = '土建算量指标'
          break
        case '钢筋算量指标看板':
          id = '6dc03175a2a7413c8197002149d6bc8d'
          name = '钢筋算量指标'
          break
        default:
          break
      }
      let indexData = { id: id, name: name }
      this.$emit('indexData', indexData)
    },
    judge (val) {
      this.indicator = val
      switch (val) {
        case '造价指标看板':
          this.sectionName = '单方造价区间(元/㎡)'
          this.trendName = '近12个月单方造价走势'
          this.isCivil = false
          break
        case '钢筋算量指标看板':
          this.sectionName = '钢筋单方含量区间(kg/㎡)'
          this.trendName = '近12个月钢筋单方含量走势'
          this.isCivil = false
          break
        case '土建算量指标看板':
          this.isCivil = true
          this.sectionName = '砌体单方含量区间(kg/㎡)'
          this.trendName = '近12个月砌体单方含量走势'
          break
        default:
          break
      }
    }
  },
  mounted () {
    document.addEventListener('click', e => {
      if (e.target.className != 'kanben-name-p') {
        this.isopenKanban = false
      }
    })
  }
}
</script>
<style lang="less" scoped>
.kanban {
  min-height: 60px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  .change-kanban {
    width: 113px;
    padding: 12px 0 0 7px;
    height: 48px;
    background-color: #417eda;
    color: #ffffff;
    position: relative;
    .kanban-province {
      height: 14px;
      line-height: 14px;
      vertical-align: top;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .kanben-name {
      min-width: 112px;
      .kanben-name-p {
        font-size: 12px;
        height: 13px;
        line-height: 13px;
        font-weight: 400;
        cursor: pointer;
        span:nth-child(1) {
          float: left;
          width: 97px;
        }
        span:nth-child(2) {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 4.5px 0px;
          border-color: #ffffff transparent transparent;
          margin-top: 5px;
          float: left;
          margin-left: 4px;
        }
        .spans {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.5s;
        }
        .spaninverse {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          transition: transform 0.5s;
        }
      }
      ul {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -91px;
        background-color: #417eda;
        padding: 8px 0 8px 7px;
        z-index: 2;
        // opacity: 0.9;
        li {
          font-size: 12px;
          height: 25px;
          line-height: 25px;
          color: #fff;
        }
        li:hover {
          cursor: pointer;
        }
      }
    }
  }
  .number {
    padding: 11px 26px 10px 23px;
    float: left;
    min-width: 50px;
    height: 39px;
  }
  .partition {
    width: 1px;
    height: 30px;
    background-color: #dedede;
    float: left;
    margin: 15px 0;
  }
  .section-modular {
    float: left;
    padding: 11px 29px 10px 26px;
    height: 39px;
  }
  .trend-modular {
    float: left;
    padding: 0px 24px 10px 22px;
    height: 50px;
    .trend-charts {
      height: 35px;
      width: 135px;
    }
  }
  .columnar-modular {
    float: left;
    padding: 9px 20px 10px 18px;
    height: 41px;
    .columnar-charts {
      margin-bottom: 6px;
      .charts {
        height: 20px;
        margin-right: 16px;
        float: left;
        min-width: 57px;
        ul {
          li {
            border: 1px solid #dedede;
            border-right: none;
            height: 20px;
            width: 12px;
            float: left;
          }
          li:last-of-type {
            border-right: 1px solid #dedede;
          }
          p {
            width: 100%;
            background: #e5e5e5;
          }
        }
        .charts-ul {
          li {
            cursor: pointer;
            display: flex;
            align-items: flex-end;
          }
          li:hover {
            p {
              background: #8398f3;
            }
          }
          .selectP,
          .selectcP {
            p {
              background: #8398f3;
            }
          }
        }
        .charts-ul-none {
        }
      }
      .charts-number {
        float: left;
        .min {
          background-color: #f5f5fd;
          min-width: 68px;
          padding: 0 6px;
          height: 20px;
          line-height: 20px;
          color: rgba(102, 102, 102, 1);
          font-size: 12px;
          font-weight: 400;
          float: left;
        }
        span:nth-child(2) {
          height: 20px;
          line-height: 20px;
          float: left;
          margin: 0 6px;
        }
      }
    }
  }
  .modular-number {
    font-size: 18px;
    line-height: 14px;
    font-weight: bold;
    color: rgba(68, 116, 207, 1);
    margin-bottom: 11px;
  }
  .modular-name {
    height: 13px;
    line-height: 13px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
@media screen and (max-width: 1663px) {
  .civil-box {
    padding-left: 220px;
  }
}
// @media screen and (min-width: 1681px) {
//   .civil-box {
//     float: left;
//   }
//   .kanban-box {
//     float: left;
//   }
// }
</style>
