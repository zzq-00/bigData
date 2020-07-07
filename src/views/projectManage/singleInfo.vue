<!-- 项目详情-单项工程信息 -->
<template>
  <div class="single-page">
    <button class="new-btn" @click="newBuild">新建单项工程</button>
    <div class="stage-content">
      <el-scrollbar tag="ul" viewClass="scroll-list" class="scroll-wrap">
        <li v-for="(item,index) in listData" :key="index">
          <span>{{index+1}}.</span>
          <singleProject ref="lis" :projectKey="index" :listData='listData' :aloneData='item' :activeProject="activeProject" @openCurrent="currentFn" @updateFn='updatelistData' @affirmFn='affirmFn' @wipeCache='wipeCache' />
        </li>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import singleProject from './components/singleProject'
export default {
  components: {
    singleProject
  },
  watch: {},
  data() {
    return {
      projectId: this.$route.params.projectId, //项目id
      stageId: this.$route.params.stageId, //阶段id
      activeProject: 0,
      index: 2,
      listData: [],
      arr: [],
      count: 0,
      addCount: null,
      allSave: null,
      listarr: []
    }
  },
  methods: {
    currentFn(index) {
      this.activeProject = index
    },
    updatelistData(data) {
      this.controlledBiddingPrice()
      this.$router.go(0)
    },
    //清空数据
    wipeCache(val) {
      this.$nextTick(() => {
        //this.$refs.lis[val.ind].$refs['ruleForm'].validate(valid => {
        let ruleForm = this.$refs.lis[val.ind].ruleForm
        //ruleForm.name = ''
        ruleForm.id = ''
        //   ruleForm.secondradio = 1;
        //   ruleForm.thirdradio = 1;
        //   ruleForm.indexCode = "T043";
        ruleForm.ifZhuangji = null //有无桩基工程
        ruleForm.selectedDate = '' // 价格信息取定时间
        ruleForm.structureTypeId = '' //结构类型
        ruleForm.structureTypeStr = '' //其他结构类型
        ruleForm.groundArea = '' //占地面积(㎡)
        ruleForm.monomerArea = '' //地上建筑面积(㎡)
        ruleForm.undergroundArea = '' //地下建筑面积(㎡)
        ruleForm.groundFloors = '' //地上层数
        ruleForm.undergroundFloors = '' //地下层数
        ruleForm.commercialArea = '' //商业面积(㎡)
        ruleForm.workArea = '' //办公面积(㎡)
        ruleForm.style = '' //建筑风格
        ruleForm.buildArea = '' //建筑面积
        ruleForm.floors = '' //层数
        ruleForm.numberOfCars = '' //车位数
        ruleForm.totalRooms = '' //总客房数
        ruleForm.lobbyArea = '' //大堂面积
        ruleForm.ifSingleToilet = null //独立卫生间
        ruleForm.assemblyRate = '' //装配率
        ruleForm.ifDishang = null //底层商铺
        ruleForm.typeStr = ''
        ruleForm.outpatientArea = '' //门诊面积
        ruleForm.operatingArea = '' //手术室面积
        ruleForm.educationalSystem = [] //学制
        ruleForm.classSize = '' //班级人数
        ruleForm.residentialArea = '' //住宅面积
        ruleForm.stationNumber = '' //站内充电设施数量
        ruleForm.stationClass = '' //充电站等级
        ruleForm.chargeType = '' //充电桩类别
        ruleForm.stadiumUse = [] //体育场用途
        ruleForm.groundPractice = '' //地面做法
        ruleForm.sewageTreatment = '' //污水处理能力
        ruleForm.wallType = '' //围墙类型
        ruleForm.wallLenght = '' //围墙总长
        ruleForm.eavesHeight = '' //檐高(或建筑高度)
        ruleForm.bedNumber = '' //床位数
        ruleForm.afforestedArea = '' //绿化面积
        ruleForm.districtsGroundArea = '' //小区占地面积
        ruleForm.hardAreaRatio = '' //硬景面积占比
        //})
      })
    },
    newBuild() {
      let data = { name: '', id: '', tag: false, save: false, ind: this.listData.length }
      this.listData.push(data)
      this.activeProject = this.listData.length - 1
    },
    //保存的数据和本地的数据不一样
    cseparateData(val, ruleForm) {
      var newDetail = {}
      Object.keys(ruleForm).forEach(function(key) {
        if (ruleForm[key] !== '' && ruleForm[key] !== null && ruleForm[key] != undefined) {
          newDetail[key] = ruleForm[key]
        }
      })
      delete newDetail.firstradio
      delete newDetail.secondradio
      delete newDetail.thirdradio
      delete newDetail.indexCode
      delete newDetail.typeStr
      delete newDetail.name
      delete newDetail.selectedDate
      newDetail.baseId = val.id
      if (ruleForm.indexCode === 'T043') {
        newDetail.style = ruleForm.style
      } else if (ruleForm.indexCode === 'T046') {
        newDetail.totalRooms = ruleForm.totalRooms
      } else if (ruleForm.indexCode === 'T048') {
        newDetail.outpatientArea = ruleForm.outpatientArea //门诊面积
        newDetail.operatingArea = ruleForm.operatingArea //手术室面积
      } else if (ruleForm.indexCode === 'T049') {
        newDetail.classSize = ruleForm.classSize === null || ruleForm.classSize === '' ? 0 : ruleForm.classSize
      } else if (ruleForm.indexCode === 'T053') {
        newDetail.stadiumUse = ruleForm.stadiumUse //体育场用途
        newDetail.groundPractice = ruleForm.groundPractice //地面做法
      } else if (ruleForm.indexCode === 'T038') {
        newDetail.hardAreaRatio = ruleForm.hardAreaRatio
      }
      if (ruleForm.stadiumUse && ruleForm.stadiumUse.length != 0) {
        newDetail.stadiumUse = ruleForm.stadiumUse ? ruleForm.stadiumUse.join(',') : [] //体育场用途
      } else {
        newDetail.stadiumUse = ''
      }
      if (ruleForm.educationalSystem && ruleForm.educationalSystem.length != 0) {
        newDetail.educationalSystem = ruleForm.educationalSystem ? ruleForm.educationalSystem.join(',') : [] //学制
      } else {
        newDetail.educationalSystem = ''
      }
      let data = {
        basicId: val.id,
        deitail: newDetail,
        indexCode: ruleForm.indexCode,
        name: ruleForm.name,
        projectId: this.projectId,
        stageId: this.stageId,
        type1: 1,
        type2: ruleForm.secondradio,
        type3: ruleForm.thirdradio,
        selectedDate:ruleForm.selectedDate
      }
      return { data }
    },
    affirmFn(val, index) {
      this.$nextTick(() => {
        this.$refs.lis[val.ind].$refs['ruleForm'].validate(valid => {
          let ruleForm = this.$refs.lis[val.ind].ruleForm
          api.saveMonomersOfficial(this.cseparateData(val, ruleForm).data).then(res => {
            localStorage.removeItem('ifredact')
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            this.currentFn(index)
            api.monomerGetAllMonomer(this.projectId, this.stageId).then(resd => {
              resd.data.forEach((item, index) => {
                item.ind = index
                item.save = item.tag
              })
              this.listData = resd.data
            })
          })
        })
      })
    },
    //招标控制价的列表
    controlledBiddingPrice() {
      api
        .monomerGetAllMonomer(this.projectId, this.stageId)
        .then(res => {
           res.data.forEach((item, index) => {
            item.ind = index
            item.save = item.tag
            if (!item.tag) {
              this.arr.push(index)
            }
            if (item.tag) {
              this.allSave++
            }
          })
          this.listData = res.data
          //默认展开 第一个wei保存的 如果都保存了 就展示最后一个
          if (this.allSave != this.listData.length) {
            this.activeProject = this.arr[0] ? this.arr[0] : 0
          } else {
            this.activeProject = this.listData.length - 1
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.controlledBiddingPrice()
  }
}
</script>

<style lang="less" scoped>
.single-page {
  padding: 10px 20px 0 20px;
  .new-btn {
    width: 110px;
    height: 30px;
    line-height: 30px;
    background: #4474cf;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    cursor: pointer;
    margin-bottom: 12px;
  }
}
.stage-content {
  padding: 20px 60px 0px;
  height: calc(100% - 82px);
  box-sizing: border-box;
  background: #fff;
  .scroll-wrap {
    width: 100%;
    height: 100%;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .scroll-list {
    > li {
      display: flex;
      margin-bottom: 9px;
      > span {
        line-height: 30px;
        width: 30px;
      }
      > div {
        flex: 1;
        margin-right: 10px;
      }
    }
  }
}
</style>
