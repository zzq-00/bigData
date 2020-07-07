<template>
  <div class='engineering-menu'>
    <div class="single-project">
      <div class="single-title">
        <h5 class='flex' @click="expandFolder(aloneData.ind)">
          <span class="project-name">{{aloneData.name}}</span>
        </h5>
      </div>
      <el-collapse-transition>
        <div v-show="projectKey===activeProject" class="single-content">
          <exhibitionData :ruleForm='ruleForm' :activeProject='activeProject' :ifVersions='ifVersions'></exhibitionData>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import t043 from '@/views/indexAnalysis/components/t043'
import t044 from '@/views/indexAnalysis/components/t044'
import t046 from '@/views/indexAnalysis/components/t046'
import t004 from '@/views/indexAnalysis/components/t004'
import t005 from '@/views/indexAnalysis/components/t005'
import t047 from '@/views/indexAnalysis/components/t047'
import t045 from '@/views/indexAnalysis/components/t045'
import t023 from '@/views/indexAnalysis/components/t023'
import t031 from '@/views/indexAnalysis/components/t031'
import t048 from '@/views/indexAnalysis/components/t048'
import t049 from '@/views/indexAnalysis/components/t049'
import t050 from '@/views/indexAnalysis/components/t050'
import t051 from '@/views/indexAnalysis/components/t051'
import t052 from '@/views/indexAnalysis/components/t052'
import t053 from '@/views/indexAnalysis/components/t053'
import t054 from '@/views/indexAnalysis/components/t054'
import t033 from '@/views/indexAnalysis/components/t033'
import t037 from '@/views/indexAnalysis/components/t037'
import t038 from '@/views/indexAnalysis/components/t038'
import exhibitionData from '@/views/indexAnalysis/components/exhibitionData'
export default {
  props: {
    projectKey: Number,
    activeProject: Number,
    listData: Array,
    aloneData: Object
  },
  components: {
    t043,
    t044,
    t046,
    t004,
    t005,
    t047,
    t045,
    t023,
    t048,
    t049,
    t050,
    t051,
    t052,
    t053,
    t054,
    t031,
    t033,
    t037,
    t038,
    exhibitionData
    // t001
  },
  data() {
    return {
      projectId: this.$route.params.projectId, //项目id
      stageId: this.$route.params.stageId, //阶段id
      ifVersions: true,
      showContent: false,
      ifredact: false,
      arr: [],
      oldData: true,
      ruleForm: {
        id: null,
        firstradio: 1,
        secondradio: 1,
        thirdradio: 1,
        indexCode: 'T043',
        type1Other: null, //类别 第一级输入的其他
        version: '1.0.0', //版本号
        oldBasicId: null,
        oldIndexCode: null,
        typeStr: '',
        name: this.aloneData.name ? this.aloneData.name : '', //单项工程名称
        //分割线
        ifZhuangji: null, //有无桩基工程
        selectedDate: '', // 价格信息取定时间
        structureTypeId: '', //结构类型
        structureTypeStr: '', //其他结构类型
        groundArea: '', //占地面积(㎡)
        monomerArea: '', //地上建筑面积(㎡)
        undergroundArea: '', //地下建筑面积(㎡)
        groundFloors: '', //地上层数
        undergroundFloors: '', //地下层数
        commercialArea: '', //商业面积(㎡)
        workArea: '', //办公面积(㎡)
        style: '', //建筑风格
        buildArea: '', //建筑面积
        floors: '', //层数
        numberOfCars: '', //车位数
        totalRooms: '', //总客房数
        lobbyArea: '', //大堂面积
        ifSingleToilet: null, //独立卫生间
        assemblyRate: '', //装配率
        ifDishang: null, //底层商铺

        outpatientArea: '', //门诊面积
        operatingArea: '', //手术室面积
        educationalSystem: [], //学制
        classSize: null, //班级人数
        residentialArea: '', //住宅面积
        stationNumber: '', //站内充电设施数量
        stationClass: '', //充电站等级
        chargeType: '', //充电桩类别
        stadiumUse: [], //体育场用途
        groundPractice: '', //地面做法
        sewageTreatment: '', //污水处理能力
        wallType: '', //围墙类型
        wallLenght: '', //围墙总长
        eavesHeight: '', //檐高(或建筑高度)
        bedNumber: '', //床位数
        afforestedArea: '', //绿化面积
        districtsGroundArea: '', //小区占地面积
        hardAreaRatio: '' //硬景面积占比
      },
      firstLeveData: [],
      secondLevelData: [],
      thirdLevelData: [],
      structureType: [],
      data1: [],
      data2: [],
      data3: [],
      exhibitionCode: [
        {
          forOrder: 1,
          id: 1,
          indexCode: 'T043',
          name: '联排别墅',
          parentId: '1'
        }
      ] //点击第三级获取coed码
    }
  },
  mounted() {
    this.agreeChange()
    this.thirdLeveChange()
    this.structureTypeFn()
    this.getFirstLeveData()
    this.StartersChange()
  },
  methods: {
    expandFolder(val) {
      if (localStorage.getItem('ifredact')) {
        this.saveFn(val)
      } else {
        this.$emit('openCurrent', val)
        if (this.aloneData.tag) {
          this.getDetailsFn(this.aloneData.id)
        }
      }
    },
    saveFn(index) {
      this.$confirm('是否保存当前单项工程信息?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          this.$emit('affirmFn', JSON.parse(localStorage.getItem('ifredact')), index)
          //this.$emit('openCurrent', index)
        })
        .catch(() => {
          let ind = JSON.parse(localStorage.getItem('ifredact'))
          this.listData[ind.ind].save = true
          this.$emit('openCurrent', index)
          if (this.aloneData.tag) {
            this.getDetailsFn(this.aloneData.id)
          }
          localStorage.removeItem('ifredact')
          //this.ifredact = false;
        })
    },
    //更改获取到的参数格式
    detailsChangeData(data) {
      this.ruleForm.name = data.name
      this.ruleForm.oldBasicId = data.basicId
      this.ruleForm.oldIndexCode = data.indexCode
      this.ruleForm.version = data.version
      this.ruleForm.firstradio = data.type1
      this.ruleForm.secondradio = data.type2
      this.ruleForm.thirdradio = data.type3
      this.ruleForm.id = data.deitail.id
      this.ruleForm.ifZhuangji = data.deitail.ifZhuangji //有无桩基工程
      this.ruleForm.selectedDate = data.deitail.selectedDate // 价格信息取定时间
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
    //获取详情的
    getDetailsFn(id) {
      api.monomerGetMonomer(id, this.projectId).then(res => {
        this.detailsChangeData(res.data)
        this.secondLevelData = []
        this.thirdLevelData = []
        this.data2.forEach((item, index) => {
          if (item.parentId == this.ruleForm.firstradio) {
            this.secondLevelData.push(item)
            this.ruleForm.secondradio = res.data.type2
          }
        })
        this.data3.forEach((item, index) => {
          if (item.parentId == this.ruleForm.secondradio) {
            this.thirdLevelData.push(item)
            this.ruleForm.thirdradio = res.data.type3
          }
        })
        this.ruleForm.indexCode = res.data.indexCode
      })
    },
    //结构类型数据
    structureTypeFn() {
      //框架/框架剪力墙/剪力墙/筒体/砖混/砖木/木结构/钢结构/钢排架/钢筋混凝土+钢结构/其他（手动填写）
      api.getDicCommon(9).then(res => {
        this.structureType = res.data
      })
    },
    getFirstLeveData() {
      //   let data = {
      //     commonId:this.projectId,
      //     id: null,
      //     level: 1,
      //     typeId: ''
      //   }
      //   api.monomerGetMonomerType(data).then(res => {
      //      this.firstLeveData = res.data;
      //   })
      this.secondLevelData = []
      this.thirdLevelData = []
      api.monomerGetMonomerTypeAll().then(res => {
        this.firstLeveData = res.data[Object.keys(res.data)[0]]
        this.data2 = res.data[Object.keys(res.data)[1]]
        res.data[Object.keys(res.data)[1]].forEach((item, index) => {
          if (item.parentId == 1) {
            this.secondLevelData.push(item)
            this.ruleForm.secondradio = this.secondLevelData[0].id
          }
        })
        this.data3 = res.data[Object.keys(res.data)[2]]
        res.data[Object.keys(res.data)[2]].forEach((item, index) => {
          if (item.parentId == 1) {
            this.thirdLevelData.push(item)
            this.ruleForm.thirdradio = this.thirdLevelData[0].id
          }
        })
      })
    },
    //一级
    StartersChange() {
      if (this.ifredact) {
        this.$confirm('单项工程类别切换可能会导致指标数据重新计算，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('wipeCache', this.aloneData)
            this.ifredact = false
            this.oldData = false
          })
          .catch(() => {
            this.getDetailsFn(this.aloneData.id)
          })
      }
      this.$emit('wipeCache', this.aloneData)
      this.secondLevelData = []
      this.data2.forEach((item, index) => {
        if (item.parentId == this.ruleForm.firstradio) {
          this.secondLevelData.push(item)
          this.ruleForm.secondradio = this.secondLevelData[0].id
          this.ifredact = false
          this.agreeChange()
        }
      })

      //   let data = {
      //     commonId:this.projectId,
      //     id: null,
      //     level: 2,
      //     typeId: this.ruleForm.firstradio
      //   }
      //   api.monomerGetMonomerType(data).then(res => {
      //      this.secondLevelData = res.data
      //      this.ruleForm.secondradio = res.data[0].id
      //      this.ifredact = false
      //      this.agreeChange();
      //   })
    },
    //单项工程类别：三级单选数据
    agreeChange(formName) {
      if (this.ifredact) {
        this.$confirm('单项工程类别切换可能会导致指标数据重新计算，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('wipeCache', this.aloneData)
            this.ifredact = false
            this.oldData = false
          })
          .catch(() => {
            this.getDetailsFn(this.aloneData.id)
          })
      }
      this.$emit('wipeCache', this.aloneData)
      this.thirdLevelData = []
      this.data3.forEach((item, index) => {
        if (item.parentId == this.ruleForm.secondradio) {
          this.thirdLevelData.push(item)
          this.ruleForm.thirdradio = this.thirdLevelData[0].id
          this.ifredact = false
          this.thirdLeveChange(this.ruleForm.thirdradio)
        }
      })
      //let data = {
      //  commonId:this.projectId,
      //  id: null,
      //  level: 3,
      //  typeId: this.ruleForm.secondradio
      // }
      // api.monomerGetMonomerType(data).then(res => {
      //   this.thirdLevelData = res.data
      //    this.ruleForm.thirdradio = res.data[0].id
      //    this.ifredact = false
      //    this.thirdLeveChange(this.ruleForm.thirdradio);
      // })
    },
    thirdLeveChange(value = 1) {
      if (this.ifredact) {
        this.$confirm('单项工程类别切换可能会导致指标数据重新计算，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('wipeCache', this.aloneData)
            this.ifredact = false
            this.oldData = false
          })
          .catch(() => {
            this.getDetailsFn(this.aloneData.id)
          })
      }
      this.$emit('wipeCache', this.aloneData)
      this.thirdLevelData.forEach((item, index) => {
        if (item.id == value) {
          this.exhibitionCode = item
          this.ruleForm.indexCode = item.indexCode
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.engineering-menu {
}
.single-project {
  border: 1px solid #e0e3eb;
  &.active {
    border-color: #4474cf;
  }
  &:not(.active):hover {
    border-color: #4474cf;
    .project-name {
      color: #4474cf;
      text-decoration: underline;
    }
  }
  .single-title {
    height: 30px;
    background-color: #fafafb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
    padding-left: 6px;
    cursor: pointer;
    .flex {
      flex: 1;
      > span:last-child {
        padding-left: 6px;
      }
    }
    > h5 {
      font-weight: normal;
    }
  }
  .single-content {
    border-top: 1px solid #e0e3eb;
    padding: 10px 20px;
  }
}
.child-radio {
  background-color: #fafafb;
  padding: 10px 20px 10px 10px;
  > div + div {
    border-top: 1px solid #e0e3eb;
  }
}
.short-input {
  width: 200px;
  margin-right: 8px;
}
</style>
<style scoped>
.single-project >>> .el-radio-group .el-radio {
  line-height: 24px;
}
.single-project >>> #time label {
  width: 240px !important;
}
.single-project >>> #time .el-form-item__content {
  margin-left: 240px !important;
}
.single-project >>> #toilet > label {
  width: 150px !important;
}
.single-project >>> #toilet .el-form-item__content {
  margin-left: 150px !important;
}
</style>