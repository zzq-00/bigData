<template>
  <div class="trend-chart" id="trend-charts" ref="trendCharts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['data'],
  data () {
    return {}
  },
  mounted () {
    this.initChart1s()
  },

  methods: {
    initChart1s () {
      this.trendChart = echarts.init(this.$refs.trendCharts)
      var annualAverage = this.$props.data.annualAverage
      var datas = this.$props.data.arr
      var dataX = []
      var dataY = []
      datas.map(item => {
        dataX.push(item.name + '月')
        dataY.push(item.value)
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
            let arr = '<span style="display:inline-block;width:50px;text-align:justify;">' + params[0].name + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + params[0].value + '</span>' + '<br/>' + '<span style="display:inline-block;width:50px;text-align: justify;">' + '平均值' + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + annualAverage + '</span>'
            return arr
          }
        },
        grid: {
          bottom: 30
        },
        xAxis: [
          {
            type: 'category',
            axisTick: true,
            axisLabel: false,
            axisLine: false,
            lineStyle: {
              color: 'red',
              width: 2,
              type: 'solid'
            },
            data: dataX
          }
        ],
        yAxis: [
          {
            axisLabel: false,
            type: 'value',
            splitLine: true, // 分割线
            nameGap: 10, // 名称与轴线之间的距离
            axisTick: true,
            axisLine: false
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
            data: dataY
          }
        ]
      })
    }
  }
}
</script>
<style lang='less' scoped>
.trend-chart {
  height: 100%;
}
</style>
