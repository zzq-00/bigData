<!--  -->
<template>
  <div class="annular-charts" ref="annular" id="annular-charts" v-loading="loading"></div>
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
  watch: {
    $props: {
      handler: function (val, oldVal) {
        this.loading = false
        setTimeout(() => {
          this.initChart4()
        }, 300)
        let _this = this
        window.addEventListener('resize', function () {
          // 注意此处的this指向window
          _this.annularchart.resize()
        })
      },
      deep: true
    }
  },
  mounted () {},

  methods: {
    initChart4 () {
      this.annularchart = echarts.init(this.$refs.annular)
      var datas = this.$props.data
      this.annularchart.setOption({
        color: ['#3AA5FF', '#8398F3', '#01D3AB', '#575960', '#FFBE40', '#F67979'],
        tooltip: {
          formatter: function (name) {
            var abc
            for (let index = 0; index < datas.length; index++) {
              if (datas[index].name == name.data.name) {
                abc = datas[index].value
              }
            }
            let arr = ['各部分人材机占比分析<br/>' + name.data.name + ' : ' + (datas[0].total * (abc / 100)).toFixed(0) + '(' + abc + '%)']
            return arr
          },
          confine: true // 是否将 tooltip 框限制在图表的区域内。
        },
        calculable: false,
        graphic: {
          type: 'text', // [ default: image ]用 setOption 首次设定图形元素时必须指定。image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
          top: 'center', // 描述怎么根据父元素进行定位。top 和 bottom 只有一个可以生效。如果指定 top 或 bottom，则 shape 里的 y、cy 等定位属性不再生效。『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 group 的子元素，父元素就是 group 元素。
          left: 'center', // 同上
          style: {
            text: datas[0].total + '\n总额', // 文本块文字。可以使用 \n 来换行。[ default: '' ]
            textAlign: 'center',
            fill: '#7D8699', // 填充色。
            fontSize: 21, // 字体大小
            fontWeight: '400' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['38%', '58%'],
            avoidLabelOverlap: false,
            label: {
              // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
              normal: {
                show: true, // 是否显示标签[ default: false ]
                position: 'outside', // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                formatter: '{b} : {c}%', // 标签内容
                textStyle: {
                  fontSize: '12',
                  fontWeight: '400'
                }
              }
            },
            labelLine: {
              // 标签的视觉引导线样式,在 label 位置 设置为'outside'的时候会显示视觉引导线。
              normal: {
                show: true, // 是否显示视觉引导线。
                length: 15, // 在 label 位置 设置为'outside'的时候会显示视觉引导线。
                length2: 0 // 视觉引导项第二段的长度。
              }
            },
            data: datas
          }
        ]
      })
    }
  }
}
</script>
<style lang='less' scoped>
.annular-charts {
  margin-left: -21px;
  height: 100%;
  padding-top: 20px;
}
</style>
