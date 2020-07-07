<!--  -->
<template>
  <div class="interval-charts" ref="interval" v-loading="loading"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['data'],
  data () {
    return {
      loading: true
    }
  },

  components: {},

  computed: {},
  watch: {
    $props: {
      handler: function (val, oldVal) {
        this.loading = false
        setTimeout(() => {
          this.initChart2()
        }, 300)
        let _this = this
        window.addEventListener('resize', function () {
          // 注意此处的this指向window
          _this.intervalchart.resize()
        })
      },
      deep: true
    }
  },
  mounted () {},
  methods: {
    initChart2 () {
      this.intervalchart = echarts.init(this.$refs.interval)
      var datas = this.$props.data
      var datasX = []
      var datasY = []
      datas.arr.map(item => {
        item.months = item.month.split('-')[1]
        datasX.push(item.months + '月')
        datasY.push(item.unitProjectCost)
      })
      this.intervalchart.setOption({
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
            let arr = '<span style="display:inline-block;width:45px;">' + params[0].name + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + params[0].value + '</span>' + '<br/>' + '<span style="display:inline-block;width:45px;text-align: justify;">' + '平均值' + '</span>' + ':' + '<span style="display:inline-block;width:70px">&nbsp;' + datas.annualAverage + '</span>'
            return arr
          }
        },
        grid: {
          x: 55
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
            type: 'value',
            name: '(元)', // 坐标轴名称
            nameLocation: 'end',
            splitLine: false, // 分割线
            // nameGap: '1px', //名称与轴线之间的距离
            axisTick: false,
            nameTextStyle: {
              padding: [0, 50, 0, 0]
            }
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
    }
  }
}
</script>
<style lang='less' scoped>
.interval-charts {
  height: 100%;
  width: 100%;
}
</style>
