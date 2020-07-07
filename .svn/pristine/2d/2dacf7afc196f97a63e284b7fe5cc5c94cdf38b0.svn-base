<template>
  <div class='engineering-menu'>
    <div class="single-project">
      <div class="single-title">
        <h5 class='flex' @click="expandFolder(aloneData.ind)">
          <span style="color: #DD4444;" v-if='!aloneData.tag && !ifredact'>（待完成）</span>
          <span class="project-name">{{aloneData.name}}</span>
        </h5>
        <div class="right-operate">
          <span @click='duplicateFn' v-if='aloneData.tag && aloneData.tag==aloneData.save'>复制</span>
          <span @click='stickupFn' v-if='!aloneData.tag || projectKey===activeProject'>粘贴</span>
          <span @click='callOfFn' v-if='aloneData.tag && aloneData.tag!=aloneData.save'>取消</span>
          <!--  :class="{'disabled': !aloneData.tag && !ifSave }" -->
          <span :class="{'disabled': projectKey !=activeProject }" v-if='!aloneData.tag || aloneData.tag!=aloneData.save' @click.stop='submitForm("ruleForm")'>保存</span>
          <span @click='redactFn()' v-if='aloneData.tag'>编辑</span>
          <span @click='deleteFn' v-if='!aloneData.tag || projectKey===activeProject'>删除</span>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="projectKey===activeProject" class="single-content">
          <el-form :model="ruleForm" :rules="rules" v-if='!aloneData.save' ref="ruleForm" label-width="130px" size="mini" label-position="left">
            <el-form-item label="单项工程类别：">
              <el-radio-group v-model="ruleForm.firstradio" @change="StartersChange">
                <el-radio v-for='(item,index) in firstLeveData' :key='index' :label="item.id">{{item.name}}</el-radio>
                <!--<input type="text" v-model='ruleForm.type1Other' style="border: 0;border-bottom: 1px solid #dcdfe6;width: 100px;color: #606266;position:relative;bottom:6px;left:-25px;"></el-radio>-->
              </el-radio-group>

              <div class="child-radio">
                <div>
                  <el-radio-group v-model="ruleForm.secondradio" @change="agreeChange">
                    <el-radio v-for='(item,index) in secondLevelData' :key='index' :label="item.id">{{item.name}}</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <el-radio-group v-model="ruleForm.thirdradio" @change="thirdLeveChange">
                    <el-radio v-for='(item,index) in thirdLevelData' :key='index' :label="item.id">{{item.name}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-form-item>
            <t043 v-if='ruleForm.indexCode=="T043"' :ruleForm='ruleForm'></t043>
            <t044 v-if='ruleForm.indexCode=="T044"' :ruleForm='ruleForm'></t044>
            <t046 v-if='ruleForm.indexCode=="T046"' :ruleForm='ruleForm'></t046>
            <t004 v-if='ruleForm.indexCode=="T004"' :ruleForm='ruleForm'></t004>
            <t005 v-if='ruleForm.indexCode=="T005"' :ruleForm='ruleForm'></t005>
            <t047 v-if='ruleForm.indexCode=="T047"' :ruleForm='ruleForm'></t047>
            <t045 v-if='ruleForm.indexCode=="T045"' :ruleForm='ruleForm'></t045>
            <t023 v-if='ruleForm.indexCode=="T023"' :ruleForm='ruleForm'></t023>
            <t048 v-if='ruleForm.indexCode=="T048"' :ruleForm='ruleForm'></t048>
            <t049 v-if='ruleForm.indexCode=="T049"' :ruleForm='ruleForm'></t049>
            <t050 v-if='ruleForm.indexCode=="T050"' :ruleForm='ruleForm'></t050>
            <t051 v-if='ruleForm.indexCode=="T051"' :ruleForm='ruleForm'></t051>
            <t052 v-if='ruleForm.indexCode=="T052"' :ruleForm='ruleForm'></t052>
            <t053 v-if='ruleForm.indexCode=="T053"' :ruleForm='ruleForm'></t053>
            <t054 v-if='ruleForm.indexCode=="T054"' :ruleForm='ruleForm'></t054>
            <t031 v-if='ruleForm.indexCode=="T031"' :ruleForm='ruleForm'></t031>
            <t033 v-if='ruleForm.indexCode=="T033"' :ruleForm='ruleForm'></t033>
            <t037 v-if='ruleForm.indexCode=="T037"' :ruleForm='ruleForm'></t037>
            <t038 v-if='ruleForm.indexCode=="T038"' :ruleForm='ruleForm'></t038>
            <!-- <t001 v-if='ruleForm.indexCode=="T001"' :ruleForm='ruleForm'></t001> -->
          </el-form>
          <exhibitionData :ruleForm='ruleForm' :activeProject='activeProject' v-if='aloneData.save' :ifVersions='ifVersions'></exhibitionData>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import t043 from './t043'
import t044 from './t044'
import t046 from './t046'
import t004 from './t004'
import t005 from './t005'
import t047 from './t047'
import t045 from './t045'
import t023 from './t023'
import t031 from './t031'
import t048 from './t048'
import t049 from './t049'
import t050 from './t050'
import t051 from './t051'
import t052 from './t052'
import t053 from './t053'
import t054 from './t054'
import t033 from './t033'
import t037 from './t037'
import t038 from './t038'
// import t001 from './t001'
import exhibitionData from './exhibitionData'
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
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入单项工程名称'))
      } else {
        let data = {
          name: value,
          param: 2,
          pid: this.projectId,
          sid: this.stageId,
          monomerId: this.aloneData.id
        }

        api
          .monomerNameIsRepeat(data)
          .then(res => {
            res.data == true ? callback('该名称已存在') : callback()
          })
          .catch(res => {
            callback(new Error(res.data.errorMsg))
          })
      }
    }
    return {
      stageId: this.$route.params.stageId,
      projectId: this.$route.params.projectId,
      fid: this.$route.query.fid,
      ifVersions: false,
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
        groundArea: '', //地上建筑面积(㎡)
        monomerArea: '', //占地面积(㎡)
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
      ], //点击第三级获取coed码
      rules: {
        //单项工程名称
        name: [
           { required: true, message: '请输入单项工程名称', trigger: 'blur' },
        ],
        selectedDate: [
          {
            type: 'string',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        //有无桩基工程
        ifZhuangji: [{ required: true, message: '请选择桩基工程', trigger: 'change' }],
        //结构类型
        structureTypeId: [{ required: true, message: '请选择结构类型', trigger: 'change' }],
        //地上建筑面积
        groundArea: [
          { required: true, message: '请输入地上建筑面积 ', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //占地面积
        monomerArea: [
          { required: true, message: '请输入占地面积 ', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //地下建筑面积
        undergroundArea: [
          { required: true, message: '请输入地下建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //地上层数
        groundFloors: [
          { required: true, message: '请输入地上层数', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '非负整数' }
        ],
        //地下层数
        undergroundFloors: [
          { required: true, message: '请输入地下层数', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '非负整数' }
        ],
        //商业面积
        commercialArea: [
          { required: true, message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //办公面积
        workArea: [
          { required: true, message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //建筑面积 保留2位小数
        buildArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //层数 非负整数
        floors: [
          { required: true, message: '请输入层数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //车位数
        numberOfCars: [
          { required: true, message: '请输入车位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //大堂面积
        lobbyArea: [
          { required: true, message: '请输入大堂面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //独立卫生间
        ifSingleToilet: [{ required: true, message: '请选择独立卫生间', trigger: 'change' }],
        //装配率
        assemblyRate: [
          { required: true, message: '请输入装配率 ', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //学制
        educationalSystem: [{ type: 'array', required: true, message: '请至少选择一个学制', trigger: 'change' }],
        //住宅面积
        residentialArea: [
          { required: true, message: '请输入住宅面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //站内充电设施数量
        stationNumber: [
          { required: true, message: '请输入站内充电设施数量', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //充电站等级
        stationClass: [{ required: true, message: '请选择充电站等级', trigger: 'change' }],
        //充电桩类别
        chargeType: [{ required: true, message: '请选择充电桩类别', trigger: 'change' }],
        //污水处理能力
        sewageTreatment: [
          { required: true, message: '请输入污水处理能力', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //围墙类型
        wallType: [{ required: true, message: '请选择围墙类型', trigger: 'change' }],
        //围墙总长
        wallLenght: [
          { required: true, message: '请输入围墙总长', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //檐高(或建筑高度)
        eavesHeight: [
          { required: true, message: '请输入檐高(或建筑高度)', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //床位数
        bedNumber: [
          { required: true, message: '请输入床位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //绿化面积
        afforestedArea: [
          { required: true, message: '请输入绿化面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //小区占地面积
        districtsGroundArea: [
          { required: true, message: '请输入小区占地面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.agreeChange()
    this.thirdLeveChange()
    this.structureTypeFn()
    this.getFirstLeveData()
    this.StartersChange()
    //if (
    // this.$props.activeProject == this.$props.listData.length - 1 &&
    // this.$props.listData[this.$props.activeProject].tag
    // ) {
    //  this.expandFolder(this.$props.listData[this.$props.listData.length - 1].ind);
    // }
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
      // this.aloneData.name = this.ruleForm.name
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
    //编辑
    redactFn(id = this.aloneData.id) {
      this.$emit('openCurrent', this.aloneData.ind)
      localStorage.setItem('ifredact', JSON.stringify(this.aloneData))
      //this.ifredact = true;
      this.ifredact = true
      let ind = JSON.parse(localStorage.getItem('ifredact'))
      this.listData.forEach((item, index) => {
        item.save = item.tag
      })
      this.listData[ind.ind].save = false
      this.getDetailsFn(this.aloneData.id)
    },
    //取消按钮
    callOfFn() {
      if (localStorage.getItem('ifredact')) {
        let ind = JSON.parse(localStorage.getItem('ifredact'))
        this.listData[ind.ind].save = true
        localStorage.removeItem('ifredact')
        this.getDetailsFn(this.aloneData.id)
      }
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
    //获取详情的
    getDetailsFn(id) {
      api.monomerGetMonomerTmp(id, this.projectId).then(res => {
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
    //删除
    deleteFn() {
      //判断当前指标是否有数据
      if (
        this.ruleForm.name ||
        this.ruleForm.secondradio ||
        this.ruleForm.thirdradio ||
        this.ruleForm.firstradio ||
        this.ruleForm.selectedDate
      ) {
        this.$confirm('操作会将已分析过指标数据一并删除，是否确定删除此单项工程？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //确定删除
            let data = {
              monomerId: this.aloneData.id,
              indexCode: this.ruleForm.indexCode,
              commonId: this.projectId
            }
            api.monomerDelMonomer(data).then(res => {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.$emit('updateFn', this.listData)
            })
          })
          .catch(() => {})
      } else {
        this.$confirm('是否删除当前单项工程信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //确定删除
            api.monomerDelMonomer(this.aloneData.id, this.ruleForm.indexCode).then(res => {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.$emit('updateFn', this.listData)
            })
          })
          .catch(() => {})
      }
    },
    //复制
    duplicateFn() {
      api.monomerGetMonomerTmp(this.aloneData.id, this.projectId).then(res => {
        this.detailsChangeData(res.data)
        this.$message({
          showClose: true,
          message: '复制成功',
          type: 'success'
        })
        localStorage.setItem('NewData', JSON.stringify(this.ruleForm))
      })
    },
    //粘贴
    stickupFn() {
      let data = JSON.parse(localStorage.getItem('NewData'))
      if (data != null) {
        let name = this.ruleForm.name
        if (this.aloneData.tag) {
          if (
            this.ruleForm.firstradio != data.firstradio ||
            this.ruleForm.secondradio != data.secondradio ||
            this.ruleForm.thirdradio != data.thirdradio
          ) {
            this.$confirm('与被覆盖单项工程类别不同，是否执行此操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                let id = data.id
                this.secondLevelData = []
                this.thirdLevelData = []
                this.data2.forEach((item, index) => {
                  if (item.parentId == this.ruleForm.firstradio) {
                    this.secondLevelData.push(item)
                    this.ruleForm.secondradio = data.secondradio
                    this.ifredact = false
                  }
                })
                this.data3.forEach((item, index) => {
                  if (item.parentId == this.ruleForm.secondradio) {
                    this.thirdLevelData.push(item)
                    this.ruleForm.thirdradio = data.thirdradio
                    this.ifredact = false
                  }
                })
                //改变了类别 清id oldBasicId 留着 当前点击的id oldIndexCode 也是当前选择的
                this.ruleForm = data
                this.ruleForm.name = name
                this.ruleForm.id = ''
                this.ruleForm.oldBasicId = this.aloneData.id
                this.ruleForm.secondradio = data.secondradio
                this.ruleForm.thirdradio = data.thirdradio
                this.ruleForm.indexCode = data.oldIndexCode
                this.ruleForm.oldIndexCode = this.ruleForm.indexCode
                this.ruleForm.version = this.aloneData.version
                this.oldData = false
              })
              .catch(() => {
                this.ruleForm = this.ruleForm
                this.ruleForm.version = this.aloneData.version
              })
          } else {
            //delete data.id;
            let ids = this.ruleForm.id
            //没有改变
            this.ruleForm = data
            this.ruleForm.name = name
            this.ruleForm.id = ids
            this.ruleForm.indexCode = data.oldIndexCode
            this.ruleForm.typeStr = ''
            this.ruleForm.version = this.aloneData.version
            this.ruleForm.baseId = this.aloneData.id
          }
        } else {
          this.secondLevelData = []
          this.thirdLevelData = []
          this.data2.forEach((item, index) => {
            if (item.parentId == this.ruleForm.firstradio) {
              this.secondLevelData.push(item)
              this.ruleForm.secondradio = data.secondradio
              this.ifredact = false
            }
          })
          this.data3.forEach((item, index) => {
            if (item.parentId == this.ruleForm.secondradio) {
              this.thirdLevelData.push(item)
              this.ruleForm.thirdradio = data.thirdradio
              this.ifredact = false
            }
          })
          this.ruleForm = data
          this.ruleForm.name = this.aloneData.name
          this.ruleForm.id = ''
          this.ruleForm.oldBasicId = ''
          this.ruleForm.indexCode = data.oldIndexCode
          this.ruleForm.oldIndexCode = ''
          this.ruleForm.typeStr = ''
          this.ruleForm.version = this.aloneData.version
        }
        this.$emit('openCurrent', this.aloneData.ind)
      }
    },
    //保存的数据和本地的数据不一样
    separateData(listId, newVersion) {
      let that = this
      var newDetail = {}
      Object.keys(this.ruleForm).forEach(function(key) {
        if (that.ruleForm[key] !== '' && that.ruleForm[key] !== null) {
          newDetail[key] = that.ruleForm[key]
        }
      })
      delete newDetail.firstradio
      delete newDetail.secondradio
      delete newDetail.thirdradio
      delete newDetail.indexCode
      delete newDetail.typeStr
      delete newDetail.name
      delete newDetail.version
      delete newDetail.selectedDate
      newDetail.id = this.ruleForm.id
      newDetail.baseId = listId
      if (this.ruleForm.indexCode === 'T043') {
        newDetail.style = this.ruleForm.style
      } else if (this.ruleForm.indexCode === 'T046') {
        newDetail.totalRooms = this.ruleForm.totalRooms
      } else if (this.ruleForm.indexCode === 'T048') {
        newDetail.outpatientArea = this.ruleForm.outpatientArea //门诊面积
        newDetail.operatingArea = this.ruleForm.operatingArea //手术室面积
      } else if (this.ruleForm.indexCode === 'T049') {
        newDetail.classSize = this.ruleForm.classSize ? this.ruleForm.classSize : null
      } else if (this.ruleForm.indexCode === 'T053') {
        newDetail.stadiumUse = this.ruleForm.stadiumUse ? this.ruleForm.stadiumUse : '' //体育场用途
        newDetail.groundPractice = this.ruleForm.groundPractice //地面做法
      } else if (this.ruleForm.indexCode === 'T038') {
        newDetail.hardAreaRatio = this.ruleForm.hardAreaRatio
      }
      if (this.ruleForm.stadiumUse && this.ruleForm.stadiumUse.length != 0) {
        newDetail.stadiumUse = this.ruleForm.stadiumUse ? this.ruleForm.stadiumUse.join(',') : '' //体育场用途
      } else {
        newDetail.stadiumUse = ''
      }
      if (this.ruleForm.educationalSystem && this.ruleForm.educationalSystem.length != 0) {
        newDetail.educationalSystem = this.ruleForm.educationalSystem ? this.ruleForm.educationalSystem.join(',') : '' //学制
      } else {
        newDetail.educationalSystem = ''
      }
      let data = {
        basicId: listId,
        deitail: newDetail,
        indexCode: this.ruleForm.indexCode,
        name: this.ruleForm.name,
        projectId: this.projectId,
        stageId: this.stageId,
        type1: 1,
        type2: this.ruleForm.secondradio,
        type3: this.ruleForm.thirdradio,
        selectedDate:this.ruleForm.selectedDate,
        version: newVersion ? newVersion : this.ruleForm.version //版本号
      }
      return { data }
    },
    //保存
    submitForm(formName, id = this.aloneData.id) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.oldData) {
            //为fasle时 执行清空数据库里的重复的数据
            api
              .monomerDelMonomerDetail({
                indexCode: this.ruleForm.oldIndexCode,
                monomerId: this.ruleForm.oldBasicId
              })
              .then(res => {
                let str = this.aloneData.version
                let newStr1 = str.split('.')[0]
                let newStr2 = Number(str.split('.')[1]) + 1
                let newStr3 = str.split('.')[2]
                let newVersion = newStr1 + '.' + newStr2 + '.' + newStr3
                api.monomerSaveMonomers(this.separateData(id, newVersion).data).then(res => {
                  this.ruleForm.id = res.data
                  this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                  })

                  api
                    //monomerGetFileCorrespondenceMonomerTmp(this.projectId, this.stageId,JSON.parse(this.fid)).then(resd => {
                    .monomerGetAllMonomerTmp(this.projectId, this.stageId)
                    .then(resd => {
                      this.$emit('updateFn', resd.data)
                      this.ifredact = false
                      resd.data.forEach((item, index) => {
                        if (!item.tag) {
                          this.arr.push(index)
                        }
                      })
                      //最后一个 不展开下一个
                      if (this.$props.activeProject != resd.data.length - 1) {
                        this.expandFolder(this.$props.activeProject + 1)
                        this.getDetailsFn(this.$props.listData[this.$props.activeProject].id)
                      } else {
                        if (this.arr.length != 0) {
                          this.expandFolder(this.arr[0])
                        }
                      }
                    })
                  this.$refs[formName].resetFields()
                  localStorage.removeItem('ifredact')
                })
              })
          } else {
            if (this.aloneData.tag) {
              api.monomerGetMonomerTmp(this.aloneData.id, this.projectId).then(res => {
                let data = res.data
                if (
                  data.type1 != this.ruleForm.firstradio ||
                  data.type2 != this.ruleForm.secondradio ||
                  data.type3 != this.ruleForm.thirdradio ||
                  data.indexCode != this.ruleForm.indexCode ||
                  data.name != this.ruleForm.name ||
                  data.deitail.type1Other != this.ruleForm.type1Other ||
                  data.deitail.ifZhuangji != this.ruleForm.ifZhuangji ||
                  data.selectedDate != this.ruleForm.selectedDate ||
                  data.deitail.structureTypeId != this.ruleForm.structureTypeId ||
                  data.deitail.structureTypeStr != this.ruleForm.structureTypeStr ||
                  data.deitail.groundArea != this.ruleForm.groundArea ||
                  data.deitail.monomerArea != this.ruleForm.monomerArea ||
                  data.deitail.monomerArea != this.ruleForm.monomerArea ||
                  data.deitail.groundFloors != this.ruleForm.groundFloors ||
                  data.deitail.undergroundFloors != this.ruleForm.undergroundFloors ||
                  data.deitail.commercialArea != this.ruleForm.commercialArea ||
                  data.deitail.workArea != this.ruleForm.workArea ||
                  data.deitail.style != this.ruleForm.style ||
                  data.deitail.buildArea != this.ruleForm.buildArea ||
                  data.deitail.floors != this.ruleForm.floors ||
                  data.deitail.numberOfCars != this.ruleForm.numberOfCars ||
                  data.deitail.totalRooms != this.ruleForm.totalRooms ||
                  data.deitail.lobbyArea != this.ruleForm.lobbyArea ||
                  data.deitail.ifSingleToilet != this.ruleForm.ifSingleToilet ||
                  data.deitail.assemblyRate != this.ruleForm.assemblyRate ||
                  data.deitail.ifDishang != this.ruleForm.ifDishang ||
                  data.deitail.outpatientArea != this.ruleForm.outpatientArea ||
                  data.deitail.operatingArea != this.ruleForm.operatingArea ||
                  (data.deitail.educationalSystem != this.ruleForm.educationalSystem &&
                    this.ruleForm.educationalSystem.join(',')) ||
                  data.deitail.classSize != this.ruleForm.classSize ||
                  data.deitail.residentialArea != this.ruleForm.residentialArea ||
                  data.deitail.tationNumber != this.ruleForm.tationNumber ||
                  data.deitail.stationClass != this.ruleForm.stationClass ||
                  data.deitail.chargeType != this.ruleForm.chargeType ||
                  (data.deitail.stadiumUse != this.ruleForm.stadiumUse && this.ruleForm.stadiumUse.join(',')) ||
                  data.deitail.groundPractice != this.ruleForm.groundPractice ||
                  data.deitail.sewageTreatment != this.ruleForm.sewageTreatment ||
                  data.deitail.wallType != this.ruleForm.wallType ||
                  data.deitail.wallLenght != this.ruleForm.wallLenght ||
                  data.deitail.eavesHeight != this.ruleForm.eavesHeight ||
                  data.deitail.bedNumber != this.ruleForm.bedNumber ||
                  data.deitail.afforestedArea != this.ruleForm.afforestedArea ||
                  data.deitail.districtsGroundArea != this.ruleForm.districtsGroundArea ||
                  data.deitail.hardAreaRatio != this.ruleForm.hardAreaRatio
                ) {
                  let str = data.version
                  let newStr1 = str.split('.')[0]
                  let newStr2 = Number(str.split('.')[1]) + 1
                  let newStr3 = str.split('.')[2]
                  let newVersion = newStr1 + '.' + newStr2 + '.' + newStr3
                  //1.0.0 中间的加一
                  api.monomerSaveMonomers(this.separateData(id, newVersion).data).then(res => {
                    this.ruleForm.id = res.data
                    this.$message({
                      showClose: true,
                      message: '保存成功',
                      type: 'success'
                    })
                    api
                      //monomerGetFileCorrespondenceMonomerTmp(this.projectId, this.stageId,JSON.parse(this.fid)).then(resd => {
                      .monomerGetAllMonomerTmp(this.projectId, this.stageId)
                      .then(resd => {
                        this.$emit('updateFn', resd.data)
                        this.ifredact = false
                        resd.data.forEach((item, index) => {
                          if (!item.tag) {
                            this.arr.push(index)
                          }
                        })
                        //最后一个 不展开下一个
                        if (this.$props.activeProject != resd.data.length - 1) {
                          this.expandFolder(this.$props.activeProject + 1)
                          this.getDetailsFn(this.$props.listData[this.$props.activeProject].id)
                        } else {
                          if (this.arr.length != 0) {
                            this.expandFolder(this.arr[0])
                          }
                        }
                      })
                    this.$refs[formName].resetFields()
                    localStorage.removeItem('ifredact')
                  })
                } else {
                  let newVersion = data.version
                  api.monomerSaveMonomers(this.separateData(id, newVersion).data).then(res => {
                    this.ruleForm.id = res.data
                    this.$message({
                      showClose: true,
                      message: '保存成功',
                      type: 'success'
                    })
                    api
                      //monomerGetFileCorrespondenceMonomerTmp(this.projectId, this.stageId,JSON.parse(this.fid)).then(resd => {
                      .monomerGetAllMonomerTmp(this.projectId, this.stageId)
                      .then(resd => {
                        this.$emit('updateFn', resd.data)
                        this.ifredact = false
                        resd.data.forEach((item, index) => {
                          if (!item.tag) {
                            this.arr.push(index)
                          }
                        })
                        //最后一个 不展开下一个
                        if (this.$props.activeProject != resd.data.length - 1) {
                          this.expandFolder(this.$props.activeProject + 1)
                          this.getDetailsFn(this.$props.listData[this.$props.activeProject].id)
                        } else {
                          if (this.arr.length != 0) {
                            this.expandFolder(this.arr[0])
                          }
                        }
                      })
                    this.$refs[formName].resetFields()
                    localStorage.removeItem('ifredact')
                  })
                }
              })
            } else {
              api.monomerSaveMonomers(this.separateData(id).data).then(res => {
                this.ruleForm.id = res.data
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success'
                })
                api
                  //monomerGetFileCorrespondenceMonomerTmp(this.projectId, this.stageId,JSON.parse(this.fid)).then(resd => {
                  .monomerGetAllMonomerTmp(this.projectId, this.stageId)
                  .then(resd => {
                    this.$emit('updateFn', resd.data)
                    this.ifredact = false
                    resd.data.forEach((item, index) => {
                      if (!item.tag) {
                        this.arr.push(index)
                      }
                    })
                    //最后一个 不展开下一个
                    if (this.$props.activeProject != resd.data.length - 1) {
                      this.expandFolder(this.$props.activeProject + 1)
                      this.getDetailsFn(this.$props.listData[this.$props.activeProject].id)
                    } else {
                      if (this.arr.length != 0) {
                        this.expandFolder(this.arr[0])
                      }
                    }
                  })
                this.$refs[formName].resetFields()
                localStorage.removeItem('ifredact')
              })
            }
          }

          this.oldData = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
      this.firstLeveData = [];
      this.secondLevelData = []
      this.thirdLevelData = []
      api.monomerGetMonomerTypeAll().then(res => {
        this.firstLeveData.push(res.data[Object.keys(res.data)[0]][0])
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
    .right-operate {
      > span {
        color: #69789e;
        padding: 0 8px;
        position: relative;
        & + span::before {
          content: '|';
          display: block;
          position: absolute;
          left: 0px;
          top: -1px;
          color: #69789e;
        }
        &.disabled {
          color: #cccccc;
        }
      }
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