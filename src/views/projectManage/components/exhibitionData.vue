<template>
  <div class='single-exhibition'>
    <p><span>单项工程类别</span><span>{{ruleForm.typeStr}}</span></p>
    <p v-if='ruleForm.name'><span>单项工程名称</span><span>{{ruleForm.name}}</span></p>
    <p v-if='ruleForm.ifZhuangji!=null'><span>有无桩基工程</span><span>{{ruleForm.ifZhuangji ? '有' : '无'}}</span></p>
    <p v-if='ruleForm.selectedDate'><span>价格取定时间</span><span>{{ruleForm.selectedDate}}</span></p>
    <p v-if='ruleForm.monomerArea'><span>占地面积</span><span>{{ruleForm.monomerArea}}㎡</span></p>
    <p v-if='ruleForm.structureTypeId'><span>结构类型</span><span>{{structureTypeId}}</span></p>
    <div v-if='ruleForm.groundArea || ruleForm.undergroundArea'><span>建筑面积</span>
      <p v-if='ruleForm.groundArea'><span>地上:</span><span>{{ruleForm.groundArea}}㎡</span></p>
      <p v-if='ruleForm.undergroundArea'><span>地下:</span><span>{{ruleForm.undergroundArea}}㎡</span></p>
    </div>
    <div v-if='ruleForm.groundFloors || ruleForm.groundFloors'><span>层数</span>
      <p v-if='ruleForm.groundFloors'><span>地上:</span><span>{{ruleForm.groundFloors}}层</span></p>
      <p v-if='ruleForm.undergroundFloors'><span>地下:</span><span>{{ruleForm.undergroundFloors}}层</span></p>
    </div>
    <p v-if='ruleForm.floors'><span>层数</span><span>{{ruleForm.floors}}</span></p>
    <p v-if='ruleForm.assemblyRate'><span>装配率</span><span>{{ruleForm.assemblyRate}}</span></p>
    <p v-if='ruleForm.ifDishang!=null'><span>是否含底层商铺</span><span>{{ruleForm.ifDishang ? '有' : '无'}}</span></p>
    <p v-if='ruleForm.workArea'><span>办公面积</span><span>{{ruleForm.workArea}}㎡</span></p>
    <P v-if='ruleForm.style'><span>建筑风格</span><span>{{ruleForm.style}}</span></p>
    <p v-if='ruleForm.numberOfCars'><span>车位数</span><span>{{ruleForm.numberOfCars}}</span></p>
    <p v-if='ruleForm.totalRooms'><span>总客房数</span><span>{{ruleForm.totalRooms}}</span></p>
    <p v-if='ruleForm.lobbyArea'><span>大堂面积</span><span>{{ruleForm.lobbyArea}}</span></p>
    <p v-if='ruleForm.ifSingleToilet!=null'><span>有无独立卫生间</span><span>{{ruleForm.ifSingleToilet ? '有' : '无'}}</span></p>

    <p v-if='ruleForm.lobbyArea'><span>门诊面积</span><span>{{ruleForm.outpatientArea}}㎡</span></p>
    <p v-if='ruleForm.operatingArea'><span>手术室面积</span><span>{{ruleForm.operatingArea}}㎡</span></p>
    <p v-if='ruleForm.educationalSystem'><span>学制</span><span v-for='(item,index) in educationalSystemData' :key='index'>{{item}}、</span></p>
    <p v-if='ruleForm.classSize'><span>班级人数</span><span>{{ruleForm.classSize}}人</span></p>
    <p v-if='ruleForm.residentialArea'><span>住宅面积</span><span>{{ruleForm.residentialArea}}㎡</span></p>
    <p v-if='ruleForm.stationNumber'><span>站内充电设施数量</span><span>{{ruleForm.stationNumber}}台</span></p>
    <p v-if='ruleForm.stationClass'><span>充电站等级</span>
      <span v-if='ruleForm.stationClass==1'>大型充电站</span>
      <span v-if='ruleForm.stationClass==2'>中型充电站</span>
      <span v-if='ruleForm.stationClass==3'>小型充电站</span>
    </p>
    <p v-if='ruleForm.chargeType'><span>充电桩类别</span>
      <span v-if='ruleForm.chargeType==1'>直流充电桩</span>
      <span v-if='ruleForm.chargeType==2'>交流充电桩</span>
      <span v-if='ruleForm.chargeType==3'>交直流一体充电桩</span>
    </p>
    <p v-if='ruleForm.stadiumUse'><span>体育场用途</span><span v-for='(item,index) in stadiumUseData' :key='index'>{{item}}、</span></p>
    <p v-if='ruleForm.groundPractice'><span>地面做法</span><span>{{ruleForm.groundPractice}}</span></p>
    <p v-if='ruleForm.sewageTreatment'><span>污水处理能力</span><span>{{ruleForm.sewageTreatment}}</span></p>
    <p v-if='ruleForm.wallType'><span>围墙类型</span>
      <span v-if='ruleForm.wallType==1'>砖墙</span>
      <span v-if='ruleForm.wallType==2'>钢筋混凝土墙</span>
      <span v-if='ruleForm.wallType==3'>铁质围墙</span>
    </p>
    <p v-if='ruleForm.wallLenght'><span>围墙总长</span><span>{{ruleForm.wallLenght}}m</span></p>
    <p v-if='ruleForm.eavesHeight'><span>檐高(或建筑高度)</span><span>{{ruleForm.eavesHeight}}m</span></p>
    <p v-if='ruleForm.bedNumber'><span>床位数</span><span>{{ruleForm.bedNumber}}位</span></p>
    <p v-if='ruleForm.afforestedArea'><span>绿化面积</span><span>{{ruleForm.afforestedArea}}㎡</span></p>
    <p v-if='ruleForm.districtsGroundArea'><span>小区占地面积</span><span>{{ruleForm.districtsGroundArea}}㎡</span></p>
    <p v-if='ruleForm.hardAreaRatio'><span>硬景面积占比</span><span>{{ruleForm.hardAreaRatio}}%</span></p>
    <p v-if='ifVersions'><span>单项工程信息版本</span><span>{{ruleForm.version}}<img src='~@/assets/img/normality.png' @click='open' /></span></p>

  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: {
    ruleForm: Object,
    activeProject: Number,
    ifVersions: Boolean
  },
  data() {
    return {
      stageId: (() => this.$route.params.stageId)(),
      projectId: (() => this.$route.params.projectId)(),
      structureTypeId: '框架', //结构类型
      stadiumUseData: [],
      educationalSystemData: [],
      arrLength: 0,
      getDetialData: []
    }
  },
  watch: {
    $props: {
      handler: function(val, oldVal) {
        this.rendering()
      },
      deep: true
    }
  },
  mounted() {
    //结构类型
    switch (this.ruleForm.structureTypeId) {
      case 1:
        this.structureTypeId = '框架'
        break
      case 2:
        this.structureTypeId = '框架剪力墙'
        break
      case 3:
        this.structureTypeId = '剪力墙'
        break
      case 4:
        this.structureTypeId = '筒体'
        break
      case 5:
        this.structureTypeId = '砖混'
        break
      case 6:
        this.structureTypeId = '砖木'
        break
      case 7:
        this.structureTypeId = '木结构'
        break
      case 8:
        this.structureTypeId = '钢结构'
        break
      case 9:
        this.structureTypeId = '钢排架'
        break
      case 10:
        this.structureTypeId = '钢筋混凝土+排架'
        break
      case 11:
        this.structureTypeId = `其他(${this.ruleForm.structureTypeStr})`
        break
    }
    this.getDetialDataFn()
  },
  methods: {
    getDetialDataFn() {
      if(this.$route.path.indexOf("/projectManage/detail/singleInfo")!=-1){//我的项目 单项工程信息
       api.monomerGetAllMonomer(this.projectId, this.stageId).then(res => {
        this.arrLength = 0
        res.data.forEach((item, index) => {
          if (item.tag) {
            this.arrLength++
          }
        })
        if (this.arrLength == res.data.length) {
          api.monomerGetMonomer(res.data[res.data.length - 1].id, this.projectId).then(resd => {
            this.detailsChangeData(resd.data)
          })
        } else if (res.data[this.activeProject].id && res.data[this.activeProject].tag) {
          api.monomerGetMonomer(res.data[this.activeProject].id, this.projectId).then(resd => {
            this.detailsChangeData(resd.data)
          })
        }
        })
      }else{
        api.monomerGetAllMonomerTmp(this.projectId, this.stageId).then(res => {
        this.arrLength = 0
        res.data.forEach((item, index) => {
          if (item.tag) {
            this.arrLength++
          }
        })
        if (this.arrLength == res.data.length) {
          api.monomerGetMonomer(res.data[res.data.length - 1].id, this.projectId).then(resd => {
            this.detailsChangeData(resd.data)
          })
        } else if (res.data[this.activeProject].id && res.data[this.activeProject].tag) {
          api.monomerGetMonomer(res.data[this.activeProject].id, this.projectId).then(resd => {
            this.detailsChangeData(resd.data)
          })
        }
        })
      }
    },
    detailsChangeData(data) {
      this.ruleForm.name = data.name
      this.ruleForm.secondradio = data.type2
      this.ruleForm.thirdradio = data.type3
      this.ruleForm.id = data.deitail.id
      this.ruleForm.version = data.version
      this.ruleForm.ifZhuangji = data.deitail.ifZhuangji //有无桩基工程
      this.ruleForm.selectedDate = data.selectedDate // 价格信息取定时间
      this.ruleForm.structureTypeId = data.deitail.structureTypeId //结构类型
      this.ruleForm.structureTypeStr = data.deitail.structureTypeStr //其他结构类型
      this.ruleForm.groundArea = data.deitail.groundArea //占地面积(㎡)
      this.ruleForm.monomerArea = data.deitail.monomerArea //地上建筑面积(㎡)
      this.ruleForm.undergroundArea = data.deitail.undergroundArea //地下建筑面积(㎡)
      this.ruleForm.groundFloors = data.deitail.groundFloors //地上层数
      this.ruleForm.undergroundFloors = data.deitail.undergroundFloors //地下层数
      this.ruleForm.commercialArea = data.deitail.commercialArea //商业面积(㎡)
      this.ruleForm.workArea = data.deitail.workArea //办公面积(㎡)
      this.ruleForm.style = data.deitail.style //建筑风格
      this.ruleForm.buildArea = data.deitail.buildArea //建筑面积
      this.ruleForm.floors = data.deitail.floors //层数
      this.ruleForm.numberOfCars = data.deitail.numberOfCars //车位数
      this.ruleForm.totalRooms = data.deitail.totalRooms //总客房数
      this.ruleForm.lobbyArea = data.deitail.lobbyArea //大堂面积
      this.ruleForm.ifSingleToilet = data.deitail.ifSingleToilet //独立卫生间
      this.ruleForm.assemblyRate = data.deitail.assemblyRate //装配率
      this.ruleForm.ifDishang = data.deitail.ifDishang //底层商铺
      this.ruleForm.typeStr = data.typeStr
      this.ruleForm.outpatientArea = data.deitail.outpatientArea //门诊面积
      this.ruleForm.operatingArea = data.deitail.operatingArea //手术室面积
      this.ruleForm.educationalSystem = data.deitail.educationalSystem && data.deitail.educationalSystem.split(',').map(Number) //学制
      this.ruleForm.classSize = data.deitail.classSize //班级人数
      this.ruleForm.residentialArea = data.deitail.residentialArea //住宅面积
      this.ruleForm.stationNumber = data.deitail.stationNumber //站内充电设施数量
      this.ruleForm.stationClass = data.deitail.stationClass //充电站等级
      this.ruleForm.chargeType = data.deitail.chargeType //充电桩类别
      this.ruleForm.stadiumUse = data.deitail.stadiumUse && data.deitail.stadiumUse.split(',').map(Number) //体育场用途
      this.ruleForm.groundPractice = data.deitail.groundPractice //地面做法
      this.ruleForm.sewageTreatment = data.deitail.sewageTreatment //污水处理能力
      ;(this.ruleForm.wallType = data.deitail.wallType), //围墙类型
        (this.ruleForm.wallLenght = data.deitail.wallLenght) //围墙总长
      this.ruleForm.eavesHeight = data.deitail.eavesHeight //檐高(或建筑高度)
      this.ruleForm.bedNumber = data.deitail.bedNumber //床位数
      this.ruleForm.afforestedArea = data.deitail.afforestedArea //绿化面积
      this.ruleForm.districtsGroundArea = data.deitail.districtsGroundArea //小区占地面积
      this.ruleForm.hardAreaRatio = data.deitail.hardAreaRatio //硬景面积占比
    },
    rendering() {
      this.stadiumUseData = []
      this.educationalSystemData = []
      //体育场
      this.$props.ruleForm.stadiumUse &&
        this.$props.ruleForm.stadiumUse.forEach((item, index) => {
          if (item == 1) {
            this.stadiumUseData.push('足球场')
          } else if (item == 2) {
            this.stadiumUseData.push('篮球场')
          } else if (item == 3) {
            this.stadiumUseData.push('羽毛球场')
          } else if (item == 4) {
            this.stadiumUseData.push('网球场')
          } else if (item == 5) {
            this.stadiumUseData.push('乒乓球场')
          }
        })
      //学制
      this.$props.ruleForm.educationalSystem &&
        this.$props.ruleForm.educationalSystem.forEach((item, index) => {
          if (item == 1) {
            this.educationalSystemData.push('幼儿园')
          } else if (item == 2) {
            this.educationalSystemData.push('小学')
          } else if (item == 3) {
            this.educationalSystemData.push('初中')
          } else if (item == 4) {
            this.educationalSystemData.push('高中')
          } else if (item == 5) {
            this.educationalSystemData.push('大学')
          }
        })
    },
    open() {
      this.$alert(
        <div>
          <p>A:当单项工程信息属性增、删、改时，A+1；</p>
          <p>B:当单项工程属性填写内容变更时，B+1；</p>
          <p>C:当单项工程匹配关系变更并且此单项工程指标数据变化时，C+1.</p>
        </div>,
        '版本组成为A.B.C',
        {
          confirmButtonText: '确定'
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.single-exhibition {
  > p,
  > div {
    line-height: 35px;
    color: #606266;
    display: flex;
    > span,
    > p {
      vertical-align: middle;
      &:nth-child(1) {
        width: 120px;
      }
      &:nth-child(2) {
        padding-left: 10px;
      }
      img {
        width: auto;
        height: auto;
        padding-left: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  > div {
    > p {
      width: 200px;
      span {
        &:nth-child(2) {
          padding-left: 8px;
        }
      }
    }
  }
}
</style>