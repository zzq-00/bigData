<template>
  <div>
    <searchBar :placeholder="placeholder" />
    <div class="switch-btn">
      <span @click="filterStatus = !filterStatus" :class="{'active':filterStatus}">{{filterStatus?'收起过滤':'过滤查询'}}</span>
    </div>
    <el-collapse-transition>
      <div class="filter-option" v-show="filterStatus">
        <!-- 项目筛选 -->
        <projectIndustryBelong ref="industryBelongSel" key="1" />
        <addressList ref="commonAddressSel" title="项目地点" v-if="projectFilterInclude.includes('项目地点')" key="2" />
        <commonSingleChoice ref="commonAreaTypeSel" title="项目地区类别" v-if="projectFilterInclude.includes('项目地区类别')" key="3" />
        <commonMultipleChoice ref="natureSel" title="建设性质" key="4" />
        <commonMultipleChoice ref="hospitalRankSel" title="医院规划等级" v-if="projectFilterInclude.includes('医院规划等级')" key="5" />
        <commonMultipleChoice ref="schoolTypeSel" title="学校类别" v-if="projectFilterInclude.includes('学校类别')" key="6" />
        <commonInterval ref="projectScaleSel" title="建设规模" v-if="projectFilterInclude.includes('建设规模')" key="7" />
        <commonInterval ref="handleCapacitySel" title="日处理量" v-if="projectFilterInclude.includes('日处理量')" key="8" />
        <commonInterval ref="commonPlanCapacitySel" title="项目规划容量" v-if="projectFilterInclude.includes('项目规划容量')" key="9" />
        <commonMultipleChoice ref="railwayRankSel" title="铁路等级" v-if="projectFilterInclude.includes('铁路等级')" key="10" />
        <commonInterval ref="transportVolumSel" title="年客货运量" v-if="projectFilterInclude.includes('年客货运量')" key="11" />
        <commonSingleChoice ref="trafficTypeSel" title="城市轨道交通类别" v-if="projectFilterInclude.includes('城市轨道交通类别')" key="12" />
        <commonMultipleChoice ref="highwayRankSel" title="项目公路等级" v-if="projectFilterInclude.includes('项目公路等级')" key="13" />
        <commonMultipleChoice ref="starRankSel" title="酒店星级" v-if="projectFilterInclude.includes('酒店星级')" key="14" />
        <!-- 工程筛选 -->
        <monomerType ref="MonomerTypeSel" key="15" />
        <commonMultipleChoice ref="stageSel" title="单项工程编制阶段" key="16" v-if="monomerFilterInclude.includes('单项工程编制阶段')" />
        <commonSingleChoice ref="ifZhuangjiSel" title="有无桩基工程" key="17" v-if="monomerFilterInclude.includes('有无桩基工程')" />
        <monomerSelectedDate ref="selectedDateSel" key="18" />
        <commonMultipleChoice ref="structureTypeIdSel" title="结构类型" key="19" v-if="monomerFilterInclude.includes('结构类型')" />
        <commonInterval ref="buildAreaSel" title="建筑面积" key="20" v-if="monomerFilterInclude.includes('建筑面积')" />
        <commonInterval ref="floorsSel" title="层数" key="21" v-if="monomerFilterInclude.includes('层数')" />
        <commonInterval ref="numberOfCarsSel" title="车位数" key="22" v-if="monomerFilterInclude.includes('车位数')" />
        <commonInterval ref="groundAreaSel" title="地上建筑面积" key="23" v-if="monomerFilterInclude.includes('地上建筑面积')" />
        <commonInterval ref="undergroundAreaSel" title="地下建筑面积" key="24" v-if="monomerFilterInclude.includes('地下建筑面积')" />
        <commonInterval ref="groundFloorsSel" title="地上层数" key="25" v-if="monomerFilterInclude.includes('地上层数')" />
        <commonInterval ref="undergroundFloorsSel" title="地下层数" key="26" v-if="monomerFilterInclude.includes('地下层数')" />
        <commonInterval ref="lobbyAreaSel" title="大堂面积" key="27" v-if="monomerFilterInclude.includes('大堂面积')" />
        <commonInterval ref="totalAreaSel" title="车站建筑面积(主体+附属)" key="28" v-if="monomerFilterInclude.includes('车站建筑面积(主体+附属)')" />
        <commonInterval ref="mainAreaSel" title="车站主体建筑面积" key="29" v-if="monomerFilterInclude.includes('车站主体建筑面积')" />
        <commonInterval ref="otherAreaSel" title="车站附属建筑面积" key="30" v-if="monomerFilterInclude.includes('车站附属建筑面积')" />
        <commonInterval ref="layerNumberSel" title="车站层数" key="31" v-if="monomerFilterInclude.includes('车站层数')" />
        <commonInterval ref="transferNumberSel" title="换乘通道个数" key="32" v-if="monomerFilterInclude.includes('换乘通道个数')" />
        <commonInterval ref="intervalLengthSel" title="区间长度" key="33" v-if="monomerFilterInclude.includes('区间长度')" />
        <commonInterval ref="layLengthSel" title="总铺轨长度" key="34" v-if="monomerFilterInclude.includes('总铺轨长度')" />
        <commonInterval ref="mainLengthSel" title="其中正线铺轨长度" key="35" v-if="monomerFilterInclude.includes('其中正线铺轨长度')" />
        <commonInterval ref="voltageGradeSel" title="供电电压等级" key="36" v-if="monomerFilterInclude.includes('供电电压等级')" />
        <!-- <commonInterval ref="viaCity" title="工程途经重要节点城市" key="37" v-if="monomerFilterInclude.includes('工程途经重要节点城市')" /> -->
        <commonInterval ref="voltageGradeSel" title="电压等级" key="38" v-if="monomerFilterInclude.includes('电压等级')" />
        <commonInterval ref="residentialAreaSel" title="住宅面积" key="39" v-if="monomerFilterInclude.includes('住宅面积')" />
        <commonInterval ref="planCapacitySel" title="单项工程规划容量" key="40" v-if="monomerFilterInclude.includes('单项工程规划容量')" />
        <commonInterval ref="projectCapacitySel" title="项目容量" key="41" v-if="monomerFilterInclude.includes('项目容量')" />
        <commonInterval ref="currentCapacitySel" title="本期容量" key="42" v-if="monomerFilterInclude.includes('本期容量')" />
        <commonInterval ref="periodNumberSel" title="本期台数" key="43" v-if="monomerFilterInclude.includes('本期台数')" />
        <addressList ref="addressSel" title="工程地点" key="44" v-if="monomerFilterInclude.includes('工程地点')" />
        <commonSingleChoice ref="areaTypeSel" title="单选工程地区类别" key="45" v-if="monomerFilterInclude.includes('单选工程地区类别')" />
        <commonInterval ref="passNumberSel" title="收费通道数量" key="46" v-if="monomerFilterInclude.includes('收费通道数量')" />
        <commonMultipleChoice ref="highwayGradeSel" title="单项工程公路等级" key="47" v-if="monomerFilterInclude.includes('单项工程公路等级')" />
        <commonInterval ref="lineLengthSel" title="线路长度" key="48" v-if="monomerFilterInclude.includes('线路长度')" />
        <commonMultipleChoice ref="surfaceCategorySel" title="面层类别" key="49" v-if="monomerFilterInclude.includes('面层类别')" />
        <commonInterval ref="bridgeLengthSel" title="区间桥梁(含高架)总长" key="50" v-if="monomerFilterInclude.includes('区间桥梁(含高架)总长')" />
        <commonInterval ref="passLengthSel" title="区间隧道总长" key="51" v-if="monomerFilterInclude.includes('区间隧道总长')" />
        <commonInterval ref="voltageGradeSel" title="送出电压等级" key="52" v-if="monomerFilterInclude.includes('送出电压等级')" />
        <commonInterval ref="totalAreaSel" title="总面积" key="53" v-if="monomerFilterInclude.includes('总面积')" />
        <commonInterval ref="monomerAreaSel" title="占地面积" key="54" v-if="monomerFilterInclude.includes('占地面积')" />
        <commonInterval ref="channelsNumberSel" title="主跑通道数量" key="55" v-if="monomerFilterInclude.includes('主跑通道数量')" />
        <commonMultipleChoice ref="chemicalProductsTypeSel" title="化工产品类别" key="56" v-if="monomerFilterInclude.includes('化工产品类别')" />
        <commonInterval ref="sewageTreatmentSel" title="污水处理能力" key="57" v-if="monomerFilterInclude.includes('污水处理能力')" />
        <commonMultipleChoice ref="gasStationGradeSel" title="加油站等级" key="58" v-if="monomerFilterInclude.includes('加油站等级')" />
        <commonInterval ref="gasCapacitySel" title="储油总容积" key="59" v-if="monomerFilterInclude.includes('储油总容积')" />
        <commonMultipleChoice ref="gasTypeSel" title="储油类别" key="60" v-if="monomerFilterInclude.includes('储油类别')" />
        <commonInterval ref="designProductCapacitySel" title="设计生产能力" key="61" v-if="monomerFilterInclude.includes('设计生产能力')" />
        <commonInterval ref="bridgeLengthSel" title="桥梁长度" key="62" v-if="monomerFilterInclude.includes('桥梁长度')" />
        <commonInterval ref="bridgeWidthSel" title="桥梁宽度" key="63" v-if="monomerFilterInclude.includes('桥梁宽度')" />
        <commonMultipleChoice ref="materialsTypeSel" title="原材料类别" key="64" v-if="monomerFilterInclude.includes('原材料类别')" />
        <commonMultipleChoice ref="productsTypeSel" title="产品类别" key="65" v-if="monomerFilterInclude.includes('产品类别')" />
        <commonInterval ref="pipelineLengthSel" title="管道长度" key="66" v-if="monomerFilterInclude.includes('管道长度')" />
        <commonInterval ref="pipeDiameterSel" title="管道直径" key="67" v-if="monomerFilterInclude.includes('管道直径')" />
        <commonMultipleChoice ref="wallTypeSel" title="围墙类型" key="68" v-if="monomerFilterInclude.includes('围墙类型')" />
        <commonInterval ref="wallLengthSel" title="围墙总长" key="69" v-if="monomerFilterInclude.includes('围墙总长')" />
        <commonInterval ref="tunnelLengthSel" title="隧道长度" key="70" v-if="monomerFilterInclude.includes('隧道长度')" />
        <commonInterval ref="eavesHeightSel" title="檐高(或建筑高度)" key="71" v-if="monomerFilterInclude.includes('檐高(或建筑高度)')" />
        <commonInterval ref="totalFloorsSel" title="总层数" key="72" v-if="monomerFilterInclude.includes('总层数')" />
        <commonSingleChoice ref="bedTypeSel" title="道床类型" key="73" v-if="monomerFilterInclude.includes('道床类型')" />
        <commonInterval ref="bedNumberSel" title="床位数" key="74" v-if="monomerFilterInclude.includes('床位数')" />
        <commonInterval ref="afforestedAreaSel" title="绿化面积" key="75" v-if="monomerFilterInclude.includes('绿化面积')" />
        <commonSingleChoice ref="storageMediumSel" title="储运介质" key="76" v-if="monomerFilterInclude.includes('储运介质')" />
        <commonMultipleChoice ref="storageModeSel" title="储存方式" key="77" v-if="monomerFilterInclude.includes('储存方式')" />
        <commonInterval ref="storageCapacitySel" title="存储容量" key="78" v-if="monomerFilterInclude.includes('存储容量')" />
        <commonMultipleChoice ref="shippingTypeSel" title="运输方式" key="79" v-if="monomerFilterInclude.includes('运输方式')" />
        <commonInterval ref="transCapacitySel" title="年运输能力" key="80" v-if="monomerFilterInclude.includes('年运输能力')" />
        <commonSingleChoice ref="miningTypeSel" title="开采类别" key="81" v-if="monomerFilterInclude.includes('开采类别')" />
        <commonMultipleChoice ref="miningAddressTypeSel" title="开采地址类型" key="82" v-if="monomerFilterInclude.includes('开采地址类型')" />
        <commonInterval ref="productCapacitySel" title="年生产能力" key="83" v-if="monomerFilterInclude.includes('年生产能力')" />
        <commonInterval ref="commercialAreaSel" title="商业面积" key="84" v-if="monomerFilterInclude.includes('商业面积')" />
        <commonInterval ref="workAreaSel" title="办公面积" key="85" v-if="monomerFilterInclude.includes('办公面积')" />
        <commonMultipleChoice ref="educationalSystemSel" title="学制" key="86" v-if="monomerFilterInclude.includes('学制')" />
        <commonMultipleChoice ref="stationClassSel" title="充电站等级" key="87" v-if="monomerFilterInclude.includes('充电站等级')" />
        <commonInterval ref="stationNumberSel" title="站内充电设施数量" key="88" v-if="monomerFilterInclude.includes('站内充电设施数量')" />
        <commonMultipleChoice ref="chargeTypeSel" title="充电桩类别" key="89" v-if="monomerFilterInclude.includes('充电桩类别')" />
      </div>
    </el-collapse-transition>
    <div class="all-result" v-show="Object.values(singleItemDynamicTags).some(val => val !== '' && !val.includes('不限'))">
      <span>全部结果：</span>
      <span class="clear-all" @click="closeAll">清空所有</span>
      <el-tag :key="key" v-for="(tag, key) in singleItemDynamicTags" closable @close="handleClose(key)" v-show="tag && !tag.includes('不限')">
        {{tag}}
      </el-tag>
    </div>
  </div>
</template>
<script>
import commonSingleChoice from './components/commonSingleChoice'
import commonMultipleChoice from './components/commonMultipleChoice'
import commonInterval from './components/commonInterval'
import { projectFilterList, monomerFilterList } from '@/assets/dicData/singleItemFilter.js'
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['placeholder'],
  components: {
    commonSingleChoice, // 单选
    commonMultipleChoice, // 多选
    commonInterval, // 区间筛选
    searchBar: () => import('./searchBar'), // 搜索框
    projectIndustryBelong: () => import('./projectIndustryBelong'), // 项目行业
    addressList: () => import('./addressList'), // 地点
    monomerType: () => import('./monomerType'), // 单项工程分类
    monomerSelectedDate: () => import('./monomerSelectedDate') // 主体建安工程价格信息取定时间
  },
  data() {
    return {
      filterStatus: true,
      dataForBackstage: {},
      projectFilterInclude: [],
      monomerFilterInclude: [],
      projectFilterList,
      monomerFilterList
    }
  },
  computed: mapState(['singleItemFilterData', 'singleItemDynamicTags']),
  watch: {
    singleItemFilterData: {
      handler: function(value) {
        // TODO 还要清空之前选中的值
        this.projectFilterInclude = !!value.flag ? this.projectFilterList[value.flag] : []
        this.monomerFilterInclude = !!value.indexCode ? this.monomerFilterList[value.indexCode] : []
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['setSingleItemFilterData']),
    // 关闭
    closeAll() {
      this.setSingleItemFilterData({order: 'clearAll'})
    },
    handleClose(key) {
      this.$refs[key].$emit('childMethod', 'reset')
      // this.setSingleItemFilterData({
      //   // dataForBack: {
      //   //   provinceCode: this.provinceObj.code,
      //   //   cityCode: this.cityObj.code,
      //   //   distinctCode: item.code
      //   // },
      //   dynamicTags: { [key]: '' }
      // })
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.switch-btn {
  color: #666666;
  font-size: 14px;
  height: 36px;
  line-height: 36px;

  > span {
    cursor: pointer;
    padding-right: 18px;
    background: url('~@/assets/img/Retract.png') right no-repeat;

    &.active {
      background-image: url('~@/assets/img/Open.png');
    }
  }
}
.all-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 5px;
  > span:first-child {
    font-size: 12px;
    color: #666;
  }
  > .clear-all {
    cursor: pointer;
    font-size: 12px;
    height: 30px;
    line-height: 28px;
    color: #ed4542;
    padding: 0 10px;
    margin-left: 15px;
    box-sizing: border-box;
    border: 1px #ed4542 dashed;
    border-radius: 4px;
  }
  .el-tag {
    margin-left: 10px;
  }
}
.filter-option {
  font-size: 12px;
  color: #606266;
  background-color: #f7f8f9;
}
</style>