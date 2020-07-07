<template>
  <div class="trend-modular">
    <div class="trend-title">
      {{business}}
    </div>
    <ul class="trend-value">
      <li>
        <p>{{$props.data.concreteAndConcreteContent?$props.data.concreteAndConcreteContent.concrete:''}}</p>
        <p>混凝土总量(m³)</p>
      </li>
      <li>
        <p>{{$props.data.concreteAndConcreteContent?$props.data.concreteAndConcreteContent.concreteContent:''}}</p>
        <p>单方含量(m³/㎡)</p>
      </li>
      <div style="clear:both"></div>
    </ul>
    <div class="trend-chart" id="trend-charts" ref="trendChart"></div>
  </div>

</template>

<script>
import echarts from 'echarts'
export default {
  props: ['data'],
  data () {
    return {
      business: '' // 建筑业态
    }
  },
  components: {},

  computed: {},
  watch: {
    $props: {
      handler: function (val, oldVal) {
        this.initChart1()
      },
      deep: true
    }
  },
  mounted () {},

  methods: {
    initChart1 () {
      this.trendChart = echarts.init(this.$refs.trendChart)
      let annualAverage = this.$props.data.annualAverage
      var datas = this.$props.data.monthlyConcreteContent
      this.business = this.$props.data.business
      var datasX = []
      var datasY = []
      datas.map(item => {
        item.months = item.month.split('-')[1]
        datasX.push(item.months + '月')
        datasY.push(item.concreteContent)
      })
      this.trendChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            show: true,
            type: 'cross',
            snap: true,
            crossStyle: {
              color: '#ACAFFE',
              width: 1,
              type: 'solid'
            }
          },
          formatter: function (params) {
            let arr = '<span style="display:inline-block;width:45px;text-align:justify;">' + params[0].name + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + params[0].value + '</span>' + '<br/>' + '<span style="display:inline-block;width:45px;text-align: justify;">' + '平均值' + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + annualAverage + '</span>'
            return arr
          }
        },
        grid: {
          x: 50,
          top: '20%'
        },
        calculable: true,

        xAxis: [
          {
            type: 'category',
            axisTick: false,
            boundaryGap: true, // 类目起始和结束两端空白策略
            data: datasX
          }
        ],
        yAxis: [
          {
            nameTextStyle: {
              padding: [0, 50, 0, 0]
            },
            type: 'value',
            name: '(m³/㎡)', // 坐标轴名称
            nameLocation: 'end',
            splitLine: false, // 分割线
            nameGap: 10, // 名称与轴线之间的距离
            axisTick: false,
            minInterval: 2
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                color: '#ACAFFE', // 折线的颜色
                width: '2' // 折线粗细
              }
            },
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#ACAFFE',
                areaStyle: {
                  type: 'default',
                  opacity: 0.1
                }
              },
              emphasis: {
                show: true,
                symbol: 'circle',
                borderWidth: 2,
                color: '#fff' // hover拐点颜色定义
              }
            },
            data: datasY
          }
        ]
      })
      window.addEventListener('resize', () => {
        // 注意此处的this指向window
        this.trendChart.resize()
      })
    }
  }
}
</script>
<style lang='less' scoped>
.trend-modular {
  // height: 292px;
  margin-top: 5%;
  height: 84%;
  width: 100%;
  .trend-title {
    height: 22px;
    line-height: 22px;
    font-size: 22px;
    font-weight: 400;
    color: rgba(58, 165, 255, 1);
  }
  .trend-value {
    margin-top: 7%;
    li {
      float: left;
      height: 40px;
      padding: 0 33px 0 0px;
      p:nth-child(1) {
        color: #3aa5ff;
        font-size: 22px;
        line-height: 22px;
      }
      p:nth-child(2) {
        margin-top: 5px;
        color: #7d8699;
        font-size: 12px;
        line-height: 12px;
      }
    }
    li:nth-child(1) {
      border-right: 1px solid #dedede;
      margin-right: 26px;
    }
    li:nth-child(2) {
      padding-right: 10px;
    }
  }
  .trend-chart {
    height: 74%;
    margin-left: -12px;
  }
  .tooltips {
    color: red;
    display: inline-block !important;
    width: 300px !important;
  }
}
</style>
