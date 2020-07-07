<template>
  <div class="pie-charts" id="pie-charts" ref="myEchart" v-loading="loading"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['data', 'color'],
  data () {
    return {
      loading: true
    }
  },
  components: {},
  watch: {
    $props: {
      handler: function (val, oldVal) {
        this.loading = false
      },
      deep: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.initChart3()
    }, 300)

    let _this = this
    window.addEventListener('resize', function () {
      // 注意此处的this指向window
      _this.piechart.resize()
    })
  },

  methods: {
    initChart3 () {
      this.piechart = echarts.init(this.$refs.myEchart)
      var datas = this.$props.data
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
            var value = (datas[0].total * (abc / 100)).toFixed(0) + '(' + abc + '%)'
            let arr = ['各部分单方造价占比<br/>' + name.data.name + ' : ' + value]
            return arr
          },
          confine: true
        },

        legend: {
          // 小标题
          orient: 'vertical', // 小标题布局方式
          type: 'scroll',
          top: '10%',
          right: '2%',
          itemWidth: 10, // 设置图例图形的宽
          itemHeight: 10, // 设置图例图形的宽
          itemGap: 18,
          formatter: function (name) {
            var target
            for (let index = 0; index < datas.length; index++) {
              if (datas[index].name == name) {
                target = datas[index].value
              }
            }
            var arr = []
            var abc = ''
            var screen = window.innerWidth
            if (screen > 1920) {
              arr = ['{a|' + target + '%}' + '{b|' + name + '}']
              return arr
            }
            if (screen == 1920) {
              abc = name.length > 13 ? name.slice(0, 13) + '...' : name
              arr = ['{a|' + target + '%}' + '{b|' + abc + '}']
              return arr
            }
            if (screen >= 1768 && screen < 1920) {
              abc = name.length > 9 ? name.slice(0, 9) + '...' : name
              arr = ['{a|' + target + '%}' + '{b|' + abc + '}']
              return arr
            }
            if (screen >= 1280 && screen < 1768) {
              abc = name.length > 6 ? name.slice(0, 6) + '...' : name
              arr = ['{a|' + target + '%}' + '{b|' + abc + '}']
              return arr
            }
            if (screen >= 1280 && screen < 1280) {
              abc = name.length > 6 ? name.slice(0, 6) + '...' : name
              arr = ['{a|' + target + '%}' + '{b|' + abc + '}']
              return arr
            }
            if (screen < 1280) {
              abc = name.length > 4 ? name.slice(0, 4) + '...' : name
              arr = ['{a|' + target + '%}' + '{b|' + abc + '}']
              return arr
            }
          },
          textStyle: {
            fontSize: '12',
            color: 'rgba(125,134,153,1)',
            fontWeight: '400',
            rich: {
              a: {
                width: 40,
                padding: [0, 12, 0, 0]
              },
              b: {
                // width: '100%'
              }
            }
          },
          tooltip: {
            show: true
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
