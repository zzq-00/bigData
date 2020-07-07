<template>
  <div class="content">
    <div>
      <div class="title">
        <h5>项目地域分布</h5>
      </div>
      <div class="inner-data">
        <!-- <h6>项目数量前15排行榜：</h6> -->
        <div class="china-axis" id="china-axis"></div>
        <div class="china-map" id="china-map"></div>
      </div>
    </div>
    <div>
      <div class="title">
        <h5>项目分类统计</h5>
      </div>
      <div class="inner-data">
        <!-- <h6>各类项目占比情况及项目数量：</h6> -->
        <div>
          <ul class="canvas-bg">
            <li>
              <canvas id="canvas1" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[0].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[0].num}}</span>
            </li>
            <li>
              <canvas id="canvas2" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[1].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[1].num}}</span>
            </li>
            <li>
              <canvas id="canvas3" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[2].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[2].num}}</span>
            </li>
            <li>
              <canvas id="canvas4" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[3].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[3].num}}</span>
            </li>
            <li>
              <canvas id="canvas5" width="90" height="90"></canvas>
             <span><em>{{ProjectPercentArr.length && ProjectPercentArr[4].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[4].num}}</span>
            </li>
            <li>
              <canvas id="canvas6" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[5].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[5].num}}</span>
            </li>
            <li>
              <canvas id="canvas7" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[6].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[6].num}}</span>
            </li>
            <li>
              <canvas id="canvas8" width="90" height="90"></canvas>
             <span><em>{{ProjectPercentArr.length && ProjectPercentArr[7].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[7].num}}</span>
            </li>
            <li>
              <canvas id="canvas9" width="90" height="90"></canvas>
              <span><em>{{ProjectPercentArr.length && ProjectPercentArr[8].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[8].num}}</span>
            </li>
            <li>
              <canvas id="canvas10" width="90" height="90"></canvas>
             <span><em>{{ProjectPercentArr.length && ProjectPercentArr[9].name}}</em>{{ProjectPercentArr.length && ProjectPercentArr[9].num}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import echarts from 'echarts'
import 'echarts/map/js/china'
export default {
  props: {
    psArray: {
      type: Array,
      required: true
    },
    psList: {
      type: Array,
      required: true
    }
  },
  watch: {
    psArray: function(val, oldVal) {
      if (val.length && !oldVal.length) {
        this.psArrayCompare(val)
      } else if (oldVal.length) {
        for (let index = 0; index < oldVal.length; index++) {
          const element = oldVal[index]
          if (element.num != val[index].num) this.psArrayCompare(val)
        }
      }
    },
    psList: function(val) {
      this.handleChinaData(val)
    }
  },
  data() {
    return {
      ProjectPercentArr: [
        { num: 0, percent: 0.0, name: '房屋建筑' },
        { num: 0, percent: 0.0, name: '市政工程' },
        { num: 0, percent: 0.0, name: '电力' },
        { num: 0, percent: 0.0, name: '交通' },
        { num: 0, percent: 0.0, name: '矿产' },
        { num: 0, percent: 0.0, name: '石油天然气' },
        { num: 0, percent: 0.0, name: '化工' },
        { num: 0, percent: 0.0, name: '航空' },
        { num: 0, percent: 0.0, name: '水利' },
        { num: 0, percent: 0.0, name: '农林牧业' }
      ],
      mapOption: '',
      barOption: '',
      allDataBack: [],
      chinaData: [],
      allScatterData: [
        // 23省
        { name: '甘肃', geoCoord: [103.73, 36.03] },
        { name: '青海', geoCoord: [101.74, 36.56] },
        { name: '四川', geoCoord: [104.06, 30.67] },
        { name: '河北', geoCoord: [114.48, 38.03] },
        { name: '云南', geoCoord: [102.73, 25.04] },
        { name: '贵州', geoCoord: [106.71, 26.57] },
        { name: '湖北', geoCoord: [114.31, 30.52] },
        { name: '河南', geoCoord: [113.65, 34.76] },
        { name: '山东', geoCoord: [117, 36.65] },
        { name: '江苏', geoCoord: [118.78, 32.04] },
        { name: '安徽', geoCoord: [117.27, 31.86] },
        { name: '浙江', geoCoord: [120.19, 30.26] },
        { name: '江西', geoCoord: [115.89, 28.68] },
        { name: '福建', geoCoord: [119.3, 26.08] },
        { name: '广东', geoCoord: [113.23, 23.16] },
        { name: '湖南', geoCoord: [113, 28.21] },
        { name: '海南', geoCoord: [110.35, 20.02] },
        { name: '辽宁', geoCoord: [123.38, 41.8] },
        { name: '吉林', geoCoord: [125.35, 43.88] },
        { name: '黑龙江', geoCoord: [126.63, 45.75] },
        { name: '山西', geoCoord: [112.53, 37.87] },
        { name: '陕西', geoCoord: [108.95, 34.27] },
        { name: '台湾', geoCoord: [121.3, 25.03] },
        // 4直辖市
        { name: '北京', geoCoord: [116.46, 39.92] },
        { name: '上海', geoCoord: [121.48, 31.22] },
        { name: '重庆', geoCoord: [106.54, 29.59] },
        { name: '天津', geoCoord: [117.2, 39.13] },
        // 5自治区
        { name: '内蒙古', geoCoord: [111.65, 40.82] },
        { name: '广西', geoCoord: [108.33, 22.84] },
        { name: '西藏', geoCoord: [91.11, 29.97] },
        { name: '宁夏', geoCoord: [106.27, 38.47] },
        { name: '新疆', geoCoord: [87.68, 43.77] },
        // 2特别行政区
        { name: '香港', geoCoord: [114.17, 22.28] },
        { name: '澳门', geoCoord: [113.54, 22.19] },
        { name: '南海诸岛', geoCoord: [] }
      ],
      scatterData15: []
    }
  },
  methods: {
    drawMain(drawing_elem, percent, forecolor, bgcolor) {
      /*
        @drawing_elem: 绘制对象
        @percent：绘制圆环百分比, 范围[0, 100]
        @forecolor: 绘制圆环的前景色，颜色代码
        @bgcolor: 绘制圆环的背景色，颜色代码
      */
      var context = drawing_elem.getContext('2d')
      var center_x = drawing_elem.width / 2
      var center_y = drawing_elem.height / 2
      var rad = (Math.PI * 2) / 100
      var speed = 0

      // 绘制背景圆圈
      function backgroundCircle() {
        context.save()
        context.beginPath()
        context.lineWidth = 6 // 设置线宽
        var radius = center_x - context.lineWidth
        context.lineCap = 'round'
        context.strokeStyle = bgcolor
        context.arc(center_x, center_y, radius, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
        context.restore()
      }

      // 绘制运动圆环
      function foregroundCircle(n) {
        context.save()
        context.strokeStyle = forecolor
        context.lineWidth = 6
        context.lineCap = 'round'
        var radius = center_x - context.lineWidth
        context.beginPath()
        context.arc(center_x, center_y, radius, -Math.PI / 2, -Math.PI / 2 + n * rad, false) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke()
        context.closePath()
        context.restore()
      }

      // 绘制文字
      function text(n) {
        context.save() // save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = '#555555'
        var font_size = 24
        context.font = font_size + 'px Helvetica'
        var text_width = context.measureText(n.toFixed(0) + '%').width
        context.fillText(n.toFixed(0) + '%', center_x - text_width / 2, center_y + font_size / 2.5)
        context.restore()
      }

      // 执行动画
      ;(function drawFrame() {
        window.requestAnimationFrame(drawFrame)
        context.clearRect(0, 0, drawing_elem.width, drawing_elem.height)
        backgroundCircle()
        text(speed)
        foregroundCircle(speed)
        if (speed >= percent) return
        speed += 1
      })()
    },
    get15Pos() {
      let scatterData15 = []
      this.allDataBack.forEach((item, index) => {
        if (index < 15) {
          for (let scatterIndex = 0; scatterIndex < this.allScatterData.length; scatterIndex++) {
            let scatterItem = this.allScatterData[scatterIndex]
            if (item.province.includes(scatterItem.name)) {
              scatterData15.push({
                name: scatterItem.name,
                value: scatterItem.geoCoord,
                num: item.num
              })
              break
            }
          }
        }
      })
      while (scatterData15.length < 15) {
        scatterData15.push({
          name: '',
          value: '',
          num: ''
        })
      }
      return scatterData15
    },
    handleChinaData(dataList) {
      let chinadatacopy = []
      this.allScatterData.forEach((allItem, allIndex) => {
        let equalFlag = false
        this.allDataBack = dataList
        let data
        for (let index = 0; index < dataList.length; index++) {
          const item = dataList[index]
          if (item.province.includes(allItem.name)) {
            data = {
              value: item.num,
              name: allItem.name // 好像只能简写
            }
            equalFlag = true
            break
          }
        }
        if (!equalFlag) {
          data = {
            value: 0,
            name: allItem.name
          }
        }
        chinadatacopy.push(data)
      })
      this.chinaData = chinadatacopy
      this.scatterData15 = this.get15Pos()
      this.setOption()
    },
    getChinaData() {
      // 项目地域分布
      api.getProjectStatistics().then(res => {
        this.handleChinaData(res.data)
      })
    },
    setOption() {
      let valueData = this.scatterData15
      var yAxisData = []
      var xAxisData = []
      for (var i = 0; i < valueData.length; i++) {
        // y轴坐标的名称
        yAxisData.push(valueData[i].name)
        xAxisData.push(valueData[i].num)
      }
      this.mapOption = {
        geo: {
          show: true,
          map: 'china',
          // right: '5%',
          left: '5%',
          top: 20,
          // silent: true, // 鼠标不能点击
          // zoom: 0.85,
          // layoutCenter: ['60%', '50%'], // 位置根据布局的百分比 应该是相对中心点
          // layoutSize: '100%', // 地图的大小
          // aspectScale: 0.75, //长宽比
          // roam: true, //可缩放
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(obj) {
            if (obj.componentSubType === 'map') {
              return obj.data.name + '<br/>项目数量：' + obj.data.value
            } else if (obj.componentSubType === 'scatter') {
              return obj.data.name + '<br/>项目数量：' + obj.data.num
            } else {
              return '暂无数据'
            }
          },
          padding: [10, 20],
          confine: true // 限制图标区域
        },
        series: [
          {
            // 地图
            type: 'map',
            map: 'china',
            name: 'map',
            geoIndex: 0,
            data: this.chinaData
          },
          {
            // 散点图
            name: '地址',
            type: 'scatter',
            symbol: 'pin',
            symbolSize: [20, 20], // 图标大小
            coordinateSystem: 'geo', // 坐标系
            data: valueData,
            itemStyle: {
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.3,
                  r: 0.4,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'transparent' // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#fff' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              },
              emphasis: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.3,
                  r: 0.4,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#fff' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'RGBA(255, 0, 0, 1)' // 0% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          }
        ],
        visualMap: {
          // 右侧颜色条
          min: 0 /* this.allDataBack[this.allDataBack.length - 1].num */,
          max: this.allDataBack[0].num,
          inverse: true,
          right: 0,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#A7D4F9', '#70B4EB', '#1C3FBF']
            // symbolSize: [2,5]
          },
          seriesIndex: 0 // 作用于对应的series
        }
      }
      this.barOption = {
        xAxis: {
          type: 'value',
          scale: true,
          // nameLocation: 'start', // 名称显示位置
          show: false,
          position: 'top',
          boundaryGap: false,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { margin: 0, textStyle: { color: '#aaa' } }
        },
        yAxis: {
          type: 'category',
          nameLocation: 'start', // 名称显示位置
          // name: '项目数量前15排行榜：',
          nameGap: 20, // 上下的距离
          nameTextStyle: {
            'font-size': '12px',
            color: '#7d8699'
          },
          axisLine: { show: false, lineStyle: { color: '#666' } },
          axisTick: { show: false, lineStyle: { color: '#666' } },
          axisLabel: { interval: 0, textStyle: { color: '#666' } },
          data: yAxisData,
          inverse: true
        },
        // 直角坐标系内绘网格 -- 控制位置
        grid: {
          left: 55,
          top: 20,
          bottom: 40
        },
        series: [
          {
            // 横向坐标系
            id: 'bar',
            type: 'bar',
            barWidth: 12, //  柱条的宽度
            data: xAxisData,
            itemStyle: {
              normal: {
                color: '#7ECEF4'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                color: '#666'
              }
            }
            // barCategoryGap: '10%',
          }
        ]
      }
      // 初始化地图
      var chart = echarts.init(document.getElementById('china-map'))
      var chartAxis = echarts.init(document.getElementById('china-axis'))
      chart.setOption(this.mapOption)
      chartAxis.setOption(this.barOption)
      chartAxis.on('mouseover', 'series', function(event) {
        chart.dispatchAction({
          type: 'highlight',
          name: event.name
        })
      })
      chartAxis.on('mouseout', 'series', function(event) {
        chart.dispatchAction({
          type: 'downplay',
          name: event.name
        })
      })
      // chart.on('mouseover', 'series', function(event){
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     name: event.name
      //   });
      // })
      // 跟随改变
      window.onresize = function() {
        chart.resize()
        chartAxis.resize()
      }
    },

    psArrayCompare(resData) {
      let canvas1 = document.getElementById('canvas1'),
        canvas2 = document.getElementById('canvas2'),
        canvas3 = document.getElementById('canvas3'),
        canvas4 = document.getElementById('canvas4'),
        canvas5 = document.getElementById('canvas5'),
        canvas6 = document.getElementById('canvas6'),
        canvas7 = document.getElementById('canvas7'),
        canvas8 = document.getElementById('canvas8'),
        canvas9 = document.getElementById('canvas9'),
        canvas10 = document.getElementById('canvas10')
    //    for (let index = 0, length = resData.length; index < length; index++) {
    //     let element2 = resData[index]
    //     for (let index = 0, length = this.ProjectPercentArr.length; index < length; index++) {
    //       let element1 = this.ProjectPercentArr[index]
    //       if (element1.name === element2.name) {
    //         this.ProjectPercentArr[index] = element2
    //       }
    //     }
    //   }
      this.ProjectPercentArr[0] = resData[0] ? resData[0] : this.ProjectPercentArr[0];
      this.ProjectPercentArr[1] = resData[1] ? resData[1] : this.ProjectPercentArr[1];
      this.ProjectPercentArr[2] = resData[2] ? resData[2] : this.ProjectPercentArr[2];
      this.ProjectPercentArr[3] = resData[3] ? resData[3] : this.ProjectPercentArr[3];
      this.ProjectPercentArr[4] = resData[4] ? resData[4] : this.ProjectPercentArr[4];
      this.ProjectPercentArr[5] = resData[5] ? resData[5] : this.ProjectPercentArr[5];
      this.ProjectPercentArr[6] = resData[6] ? resData[6] : this.ProjectPercentArr[6];
      this.ProjectPercentArr[7] = resData[7] ? resData[7] : this.ProjectPercentArr[7];
      this.ProjectPercentArr[8] = resData[8] ? resData[8] : this.ProjectPercentArr[8];
      this.ProjectPercentArr[9] = resData[9] ? resData[9] : this.ProjectPercentArr[9];
      this.$forceUpdate()
      this.drawMain(canvas1, Math.round(this.ProjectPercentArr[0].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas2, Math.round(this.ProjectPercentArr[1].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas3, Math.round(this.ProjectPercentArr[2].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas4, Math.round(this.ProjectPercentArr[3].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas5, Math.round(this.ProjectPercentArr[4].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas6, Math.round(this.ProjectPercentArr[5].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas7, Math.round(this.ProjectPercentArr[6].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas8, Math.round(this.ProjectPercentArr[7].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas9, Math.round(this.ProjectPercentArr[8].percent * 100), '#F67979', '#E5E5E5')
      this.drawMain(canvas10, Math.round(this.ProjectPercentArr[9].percent * 100), '#F67979', '#E5E5E5')
    }
  },
  created() {
     this.getChinaData()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  height: 400px;
  margin-top: 10px;
  > div {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    background-color: #fff;
    padding: 18px 21px;
    & + div {
      margin-left: 10px;
    }
    .title {
      display: flex;
      align-items: center;
      > h5 {
        font-size: 14px;
        color: #333;
      }
    }
    .inner-data {
      > h6 {
        font-size: 12px;
        font-weight: normal;
        color: #7d8699;
        margin-top: 26px;
      }
    }
  }
}

.canvas-bg {
  display: flex;
  flex-wrap: wrap;
  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    margin-top: 30px;
    > span {
      font-size: 12px;
      color: #666666;
      margin-top: 11px;
      > em::after {
        display: inline-block;
        content: '';
        width: 1px;
        height: 11px;
        background-color: #dedede;
        margin: 0 3px;
        position: relative;
        top: 1px;
      }
    }
  }
}
.china-map {
  width: 60%;
  height: 350px;
  display: inline-block;
}
.china-axis {
  width: 35%;
  height: 350px;
  display: inline-block;
}
</style>
