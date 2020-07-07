<template>
  <div class="pie-charts" id="pie-charts" ref="myEchart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['data', 'color', 'totalNmuber'],
  data () {
    return {}
  },
  components: {},
  watch: {
    $props: {
      handler: function (val, oldVal) {
        this.initChart3()
      },
      deep: true
    }
  },
  mounted () {},

  methods: {
    initChart3 () {
      this.piechart = echarts.init(this.$refs.myEchart)
      var datas = this.$props.data
      var totalNmuber = this.$props.totalNmuber
      this.piechart.setOption({
        color: this.$options.propsData.color,
        tooltip: {
          formatter: function (name) {
            var abc
            for (let index = 0; index < datas.length; index++) {
              if (datas[index].name == name.data.name) {
                abc = datas[index].value
              }
            }
            let arr = ['各部分单方造价占比<br/>' + name.data.name + ' : ' + (totalNmuber * (abc / 100)).toFixed(0) + '(' + abc + '%)']
            return arr
          }
        },
        legend: {
          // 小标题
          orient: 'vertical', // 小标题布局方式
          top: '15%',
          right: '5%',
          itemWidth: 10, // 设置图例图形的宽
          itemHeight: 10, // 设置图例图形的宽
          itemGap: 15,
          formatter: function (name) {
            var target
            for (let index = 0; index < datas.length; index++) {
              if (datas[index].name == name) {
                target = datas[index].value
              }
            }
            let arr = ['{a|' + target + '%}' + '{b|' + name + '}']
            return arr
          },
          textStyle: {
            fontSize: '12',
            color: 'rgba(125,134,153,1)',
            fontWeight: '400'
          },
          textStyle: {
            rich: {
              a: {
                width: 40,
                padding: [0, 18, 0, 0]
              }
            }
          }
        },
        grid: {
          left: '7.8%'
        },
        calculable: false,
        series: [
          {
            name: '各部分单方造价占比',
            type: 'pie',
            radius: '59%', // 半径
            center: ['27.45%', '48.18%'],
            data: datas,
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 标签
            label: {
              show: false
            }
          }
        ]
      })
      window.addEventListener('resize', () => {
        // 注意此处的this指向window
        this.piechart.resize()
      })
    }
  }
}
</script>
<style lang='less' scoped>
.pie-charts {
  margin-left: -21px;
  height: 100%;
}
</style>
