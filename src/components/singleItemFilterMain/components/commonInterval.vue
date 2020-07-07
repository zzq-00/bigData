<template>
  <div class="filter-list">
    <span>{{title}}：</span>
    <div>
      <ul>
        <li>
          <input type="number" v-model.lazy.trim="value1" class="input-box">
          ~
          <input type="number" v-model.lazy.trim="value2" class="input-box">
          {{unit}}
        </li>
        <li class="confirm-btn" @click="handleConfirm">确定</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    title: String
  },
  computed: {
    ...mapState(['singleItemFilterData']),
    unit() {
      switch (this.title) {
        case '建设规模':
          return 'MW'
        case '日处理量':
          return 't'
        case '项目规划容量':
          return '万kVA'
        case '年客货运量':
          return '万吨/万人'
        case '建筑面积':
        case '地上建筑面积':
        case '地下建筑面积':
        case '大堂面积':
        case '车站建筑面积(主体+附属)':
        case '车站主体建筑面积':
        case '车站附属建筑面积':
        case '总面积':
        case '占地面积':
        case '绿化面积':
        case '商业面积':
        case '办公面积':
        case '住宅面积':
          return '㎡'
        case '地上层数':
        case '地下层数':
        case '层数':
        case '车站层数':
        case '总层数':
          return '层'
        case '车位数':
          return '个'
        case '换乘通道个数':
        case '收费通道数量':
        case '主跑通道数量':
          return '条'
        case '区间长度':
        case '总铺轨长度':
        case '其中正线铺轨长度':
        case '线路长度':
        case '区间桥梁(含高架)总长':
        case '区间隧道总长':
        case '桥梁长度':
        case '桥梁宽度':
        case '管道长度':
        case '围墙总长':
        case '隧道长度':
        case '檐高(或建筑高度)':
          return 'm'
        case '供电电压等级':
        case '电压等级':
        case '送出电压等级':
          return 'KV'
        case '项目容量':
        case '本期容量':
          return 'MW'
        case '单项工程规划容量':
        case '本期容量' && singleItemFilterData.indexCode === 'T003': // T003电网工程
          return '万kVA'
        case '本期台数':
        case '站内充电设施数量':
          return '台'
        case '设计生产能力' && (singleItemFilterData.indexCode === 'T024' || singleItemFilterData.indexCode === 'T025'): // T024矿井 T025 煤化工工艺系统
          return 'Mt/a'
        case '储油总容积':
        case '存储容量':
        case '年运输能力':
          return 'm³'
        case '设计生产能力':
          return '万吨/年'
        case '管道直径':
          return 'mm'
        case '床位数':
          return '位'
        case '年生产能力':
          return '桶油当量'
        case '污水处理能力':
          return '万吨/日'
      }
    }
  },
  data() {
    return {
      value1: '',
      value2: ''
    }
  },
  methods: {
    ...mapMutations(['setSingleItemFilterData']),
    handleConfirm() {
      switch (this.title) {
        case '建设规模':
          this.setSingleItemFilterData({
            dataForBack: {
              projectScale1: this.value1,
              projectScale2: this.value2
            },
            dynamicTags: {
              projectScaleSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '日处理量':
          this.setSingleItemFilterData({
            dataForBack: {
              handleCapacity1: this.value1,
              handleCapacity2: this.value2
            },
            dynamicTags: {
              handleCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '项目规划容量':
          this.setSingleItemFilterData({
            dataForBack: {
              commonPlanCapacity1: this.value1,
              commonPlanCapacity2: this.value2
            },
            dynamicTags: {
              commonPlanCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '年客货运量':
          this.setSingleItemFilterData({
            dataForBack: {
              transportVolum1: this.value1,
              transportVolum2: this.value2
            },
            dynamicTags: {
              transportVolumSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '建筑面积':
          this.setSingleItemFilterData({
            dataForBack: {
              buildArea1: this.value1,
              buildArea2: this.value2
            },
            dynamicTags: {
              buildAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '地上建筑面积':
          this.setSingleItemFilterData({
            dataForBack: {
              groundArea1: this.value1,
              groundArea2: this.value2
            },
            dynamicTags: {
              groundAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '地下建筑面积':
          this.setSingleItemFilterData({
            dataForBack: {
              undergroundArea1: this.value1,
              undergroundArea2: this.value2
            },
            dynamicTags: {
              undergroundAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '大堂面积':
          this.setSingleItemFilterData({
            dataForBack: {
              lobbyArea1: this.value1,
              lobbyArea2: this.value2
            },
            dynamicTags: {
              lobbyAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '车站建筑面积(主体+附属)':
        case '总面积':
          this.setSingleItemFilterData({
            dataForBack: {
              totalArea1: this.value1,
              totalArea2: this.value2
            },
            dynamicTags: {
              totalAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '车站主体建筑面积':
          this.setSingleItemFilterData({
            dataForBack: {
              mainArea1: this.value1,
              mainArea2: this.value2
            },
            dynamicTags: {
              mainAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '车站附属建筑面积':
          this.setSingleItemFilterData({
            dataForBack: {
              otherArea1: this.value1,
              otherArea2: this.value2
            },
            dynamicTags: {
              otherAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '占地面积':
          this.setSingleItemFilterData({
            dataForBack: {
              monomerArea1: this.value1,
              monomerArea2: this.value2
            },
            dynamicTags: {
              monomerAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '绿化面积':
          this.setSingleItemFilterData({
            dataForBack: {
              afforestedArea1: this.value1,
              afforestedArea2: this.value2
            },
            dynamicTags: {
              afforestedAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '商业面积':
          this.setSingleItemFilterData({
            dataForBack: {
              commercialArea1: this.value1,
              commercialArea2: this.value2
            },
            dynamicTags: {
              commercialAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '办公面积':
          this.setSingleItemFilterData({
            dataForBack: {
              workArea1: this.value1,
              workArea2: this.value2
            },
            dynamicTags: {
              workAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '住宅面积':
          this.setSingleItemFilterData({
            dataForBack: {
              residentialArea1: this.value1,
              residentialArea2: this.value2
            },
            dynamicTags: {
              residentialAreaSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '地上层数':
          this.setSingleItemFilterData({
            dataForBack: {
              groundFloors1: this.value1,
              groundFloors2: this.value2
            },
            dynamicTags: {
              groundFloorsSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '地下层数':
          this.setSingleItemFilterData({
            dataForBack: {
              undergroundFloors1: this.value1,
              undergroundFloors2: this.value2
            },
            dynamicTags: {
              undergroundFloorsSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '层数':
          this.setSingleItemFilterData({
            dataForBack: {
              floors1: this.value1,
              floors2: this.value2
            },
            dynamicTags: { floorsSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2 }
          })
          break
        case '车站层数':
          this.setSingleItemFilterData({
            dataForBack: {
              layerNumber1: this.value1,
              layerNumber2: this.value2
            },
            dynamicTags: {
              layerNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '总层数':
          this.setSingleItemFilterData({
            dataForBack: {
              totalFloors1: this.value1,
              totalFloors2: this.value2
            },
            dynamicTags: {
              totalFloorsSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '车位数':
          this.setSingleItemFilterData({
            dataForBack: {
              numberOfCars1: this.value1,
              numberOfCars2: this.value2
            },
            dynamicTags: {
              numberOfCarsSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '换乘通道个数':
          this.setSingleItemFilterData({
            dataForBack: {
              transferNumber1: this.value1,
              transferNumber2: this.value2
            },
            dynamicTags: {
              transferNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '收费通道数量':
          this.setSingleItemFilterData({
            dataForBack: {
              passNumber1: this.value1,
              passNumber2: this.value2
            },
            dynamicTags: {
              passNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '主跑通道数量':
          this.setSingleItemFilterData({
            dataForBack: {
              channelsNumber1: this.value1,
              channelsNumber2: this.value2
            },
            dynamicTags: {
              channelsNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '区间长度':
          this.setSingleItemFilterData({
            dataForBack: {
              intervalLength1: this.value1,
              intervalLength2: this.value2
            },
            dynamicTags: {
              intervalLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '总铺轨长度':
          this.setSingleItemFilterData({
            dataForBack: {
              layLength1: this.value1,
              layLength2: this.value2
            },
            dynamicTags: {
              layLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '其中正线铺轨长度':
          this.setSingleItemFilterData({
            dataForBack: {
              mainLength1: this.value1,
              mainLength2: this.value2
            },
            dynamicTags: {
              mainLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '线路长度':
          this.setSingleItemFilterData({
            dataForBack: {
              lineLength1: this.value1,
              lineLength2: this.value2
            },
            dynamicTags: {
              lineLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '桥梁长度':
        case '区间桥梁(含高架)总长':
          this.setSingleItemFilterData({
            dataForBack: {
              bridgeLength1: this.value1,
              bridgeLength2: this.value2
            },
            dynamicTags: {
              bridgeLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '区间隧道总长':
          this.setSingleItemFilterData({
            dataForBack: {
              passLength1: this.value1,
              passLength2: this.value2
            },
            dynamicTags: {
              passLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '桥梁宽度':
          this.setSingleItemFilterData({
            dataForBack: {
              bridgeWidth1: this.value1,
              bridgeWidth2: this.value2
            },
            dynamicTags: {
              bridgeWidthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '管道长度':
          this.setSingleItemFilterData({
            dataForBack: {
              pipelineLength1: this.value1,
              pipelineLength2: this.value2
            },
            dynamicTags: {
              pipelineLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '围墙总长':
          this.setSingleItemFilterData({
            dataForBack: {
              wallLength1: this.value1,
              wallLength2: this.value2
            },
            dynamicTags: {
              wallLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '隧道长度':
          this.setSingleItemFilterData({
            dataForBack: {
              tunnelLength1: this.value1,
              tunnelLength2: this.value2
            },
            dynamicTags: {
              tunnelLengthSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '檐高(或建筑高度)':
          this.setSingleItemFilterData({
            dataForBack: {
              eavesHeight1: this.value1,
              eavesHeight2: this.value2
            },
            dynamicTags: {
              eavesHeightSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '供电电压等级':
        case '电压等级':
        case '送出电压等级':
          this.setSingleItemFilterData({
            dataForBack: {
              voltageGrade1: this.value1,
              voltageGrade2: this.value2
            },
            dynamicTags: {
              voltageGradeSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '项目容量':
          this.setSingleItemFilterData({
            dataForBack: {
              projectCapacity1: this.value1,
              projectCapacity2: this.value2
            },
            dynamicTags: {
              projectCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '本期容量':
          this.setSingleItemFilterData({
            dataForBack: {
              currentCapacity1: this.value1,
              currentCapacity2: this.value2
            },
            dynamicTags: {
              currentCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '单项工程规划容量':
          this.setSingleItemFilterData({
            dataForBack: {
              planCapacity1: this.value1,
              planCapacity2: this.value2
            },
            dynamicTags: {
              planCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '本期台数':
          this.setSingleItemFilterData({
            dataForBack: {
              periodNumber1: this.value1,
              periodNumber2: this.value2
            },
            dynamicTags: {
              periodNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '站内充电设施数量':
          this.setSingleItemFilterData({
            dataForBack: {
              stationNumber1: this.value1,
              stationNumber2: this.value2
            },
            dynamicTags: {
              stationNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '设计生产能力':
          this.setSingleItemFilterData({
            dataForBack: {
              designProductCapacity1: this.value1,
              designProductCapacity2: this.value2
            },
            dynamicTags: {
              designProductCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '储油总容积':
          this.setSingleItemFilterData({
            dataForBack: {
              gasCapacity1: this.value1,
              gasCapacity2: this.value2
            },
            dynamicTags: {
              gasCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '存储容量':
          this.setSingleItemFilterData({
            dataForBack: {
              storageCapacity1: this.value1,
              storageCapacity2: this.value2
            },
            dynamicTags: {
              storageCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '年运输能力':
          this.setSingleItemFilterData({
            dataForBack: {
              transCapacity1: this.value1,
              transCapacity2: this.value2
            },
            dynamicTags: {
              transCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '管道直径':
          this.setSingleItemFilterData({
            dataForBack: {
              pipeDiameter1: this.value1,
              pipeDiameter2: this.value2
            },
            dynamicTags: {
              pipeDiameterSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '床位数':
          this.setSingleItemFilterData({
            dataForBack: {
              bedNumber1: this.value1,
              bedNumber2: this.value2
            },
            dynamicTags: {
              bedNumberSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '年生产能力':
          this.setSingleItemFilterData({
            dataForBack: {
              productCapacity1: this.value1,
              productCapacity2: this.value2
            },
            dynamicTags: {
              productCapacitySel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
        case '污水处理能力':
          this.setSingleItemFilterData({
            dataForBack: {
              sewageTreatment1: this.value1,
              sewageTreatment2: this.value2
            },
            dynamicTags: {
              sewageTreatmentSel: !this.value1 && !this.value2 ? '' : this.title + '：' + this.value1 + ' - ' + this.value2
            }
          })
          break
      }
    },
    initData() {
      this.value1 = this.value2 = ''
      this.handleConfirm()
    }
  },
  mounted() {
    this.$on('childMethod', res => {
      if (res === 'reset') this.initData()
    })
  },
  destroyed() {
    this.initData()
  }
}
</script>
<style lang="less" scoped>
@import '../filter-option.less';
</style>