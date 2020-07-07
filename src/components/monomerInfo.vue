<!-- 不同类型单体 -->
<template>
  <div class="pop-box">
    <div class="pop-title">{{monomerInfo.name}}</div>
    <div class="pop-content" v-if='monomerInfo.indexCode=="T023"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li>
            <span>装配率(%)</span>
            <span>{{details.assemblyRate}}</span>
          </li>
          <li>
            <span>是否含底层商铺</span>
            <span>{{details.ifDishang?'是':'否'}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T043"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li v-if="details.style">
            <span>建筑风格</span>
            <span>{{details.style}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T044"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li>
            <span>商业面积</span>
            <span>{{details.commercialArea}}</span>
          </li>
          <li>
            <span>办公面积</span>
            <span>{{details.workArea}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T045"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li>
            <span>办公面积</span>
            <span>{{details.workArea}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T046"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li>
            <span>总客房数</span>
            <span>{{details.totalRooms}}</span>
          </li>
          <li>
            <span>大堂面积</span>
            <span>{{details.lobbyArea}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T047"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
          <li>
            <span>地上层数</span>
            <span>{{details.groundFloors}}</span>
          </li>
          <li>
            <span>地下层数</span>
            <span>{{details.undergroundFloors}}</span>
          </li>
          <li>
            <span>是否为独立卫生间</span>
            <span>{{details.ifSingleToilet?'是':'否'}}</span>
          </li>
          <li>
            <span>装配率</span>
            <span>{{details.assemblyRate}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T004"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="pop-content" v-if='monomerInfo.indexCode=="T005"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>

    <!-- 以下为优先级为第二级的 注释的地方需要显示的暂未修改-->
    <div class="pop-content" v-if='monomerInfo.indexCode=="T033"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>檐高(或建筑高度)(m)</span>
            <span>{{details.eavesHeight}}</span>
          </li>
          <li>
            <span>地上建筑面积(㎡)</span>
            <span>{{details.monomerArea}}</span>
          </li>
          <li>
            <span>地下建筑面积(㎡)</span>
            <span>{{details.undergroundArea}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T037"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T044"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T045"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T047"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T049"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <!-- 以下为优先级为第三级 -->
    <!-- <div class="pop-content" v-if='monomerInfo.indexCode=="T052"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>有无桩基工程</span>
            <span>{{details.ifZhuangji?'有':'无'}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>结构类型</span>
            <span>{{details.structureTypeStr}}</span>
          </li>

        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
          <li>
            <span>建筑面积(㎡)</span>
            <span>{{details.constructionArea}}</span>
          </li>
          <li>
            <span>层数</span>
            <span>{{details.numberOfLayers}}</span>
          </li>
          <li>
            <span>车位数</span>
            <span>{{details.numberOfCars}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div> -->
    <div class="pop-content" v-if='monomerInfo.indexCode=="T053"'>
      <div class="pop-left">
        <ul>
          <li>
            <span>单项工程分类</span>
            <span>{{monomerInfo.typeStr}}</span>
          </li>
          <li>
            <span>价格信息取定时间</span>
            <span>{{monomerInfo.selectedDate}}</span>
          </li>
          <li>
            <span>占地面积(㎡)</span>
            <span>{{details.groundArea}}</span>
          </li>
        </ul>
      </div>
      <div class="pop-right">
        <ul>
          <li>
            <span>地面做法</span>
            <span>{{details.groundPractice}}</span>
          </li>
          <li>
            <span>体育场用途</span>
            <span>{{details.stadiumUse}}</span>
          </li>
        </ul>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: ['monomerInfo'],
  watch: {},
  data() {
    return {
      details: {},
      stadiumUseData: []
    }
  },
  watch: {
    monomerInfo(val, old) {
      this.$nextTick(() => {
        this.details = val.deitail
        this.getDicCommon(this.details)
      })
    }
  },
  methods: {
    getDicCommon(data) {
      api.getDicCommon(9).then(res => {
        res.data.map(item => {
          if (data.structureTypeId == item.id) {
            data.structureTypeStr = item.name
          }
        })
      })
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.pop-box {
  position: absolute;
  top: 200px;
  left: 0;
  z-index: 2001;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #242424;
  border: 1px solid rgba(225, 228, 233, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
  opacity: 0.85;
  border-radius: 5px;
  width: 560px;
  font-size: 12px;
  .pop-title {
    width: 560px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 30px;
    line-height: 30px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    border-bottom: 1px solid #888888;
  }
  .pop-content {
    padding: 20px 0 29px 0;
    .pop-left,
    .pop-right {
      width: 253.5px;
      float: left;
      padding: 0 13px;
      ul {
        li {
          min-height: 29px;
          margin-bottom: 8px;
          span:nth-child(1) {
            color: #888888;
            float: left;
            line-height: 16px;
            text-align: right;
            margin-right: 17px;
            width: 51%;
          }
          span:nth-child(2) {
            color: #ffffff;
            line-height: 16px;
            display: inline-block;
            text-align: left;
            width: 42%;
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
    .pop-left {
      border-right: 1px solid #888888;
    }
  }
}
</style>
