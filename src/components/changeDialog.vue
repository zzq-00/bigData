<template>
  <div class="dia-box" v-loading="loading">
    <p class="titles">对比单项工程</p>
    <div class="pro-info">
      <el-collapse v-model="active1">
        <el-collapse-item :title="proInfo.monomerAll.name" name="1">
          <div class="info-box">
            <ul>
              <li>
                <span>项目行业:</span>
                <span>{{proInfo.projectCommon.industryBelong}}/{{proInfo.projectCommon.subIndustryBelong}}</span>
              </li>
              <li>
                <span>编制阶段:</span>
                <span>{{proInfo.stage}}</span>
              </li>
              <li>
                <span>建设性质:</span>
                <span>{{proInfo.projectCommon.nature}}</span>
              </li>
              <X001 v-if="ruleForm.flag=='X001'||'X002'||'X003'||'X004'||'X005'||'X006'||'X009'||'X010'||'X011'||'X014'||'X015'" :info="true" :ruleForm="proInfo"></X001>
              <li>
                <span>单项工程分类:</span>
                <span>{{proInfo.monomerAll.typeStr}}</span>
              </li>
              <li>
                <span>结构类型:</span>
                <span>{{proInfo.monomerAll.deitail.structureTypeName}}</span>
              </li>
              <li>
                <span>有无桩基工程:</span>
                <span>{{proInfo.monomerAll.deitail.ifZhuangji?'有':'无'}}</span>
              </li>
              <li>
                <span>主体建安工程价格信息取定时间:</span>
                <span>{{proInfo.monomerAll.selectedDate}}</span>
              </li>
              <t004 v-if="ruleForm.indexCode=='T004'" :info="'true'" :ruleForm="proInfo"></t004>
              <t005 v-if="ruleForm.indexCode=='T005'" :info="'true'" :ruleForm="proInfo"></t005>
              <t023 v-if="ruleForm.indexCode=='T023'" :info="'true'" :ruleForm="proInfo"></t023>
              <t033 v-if="ruleForm.indexCode=='T033'" :info="'true'" :ruleForm="proInfo"></t033>
              <t037 v-if="ruleForm.indexCode=='T037'" :info="'true'" :ruleForm="proInfo"></t037>
              <t043 v-if="ruleForm.indexCode=='T043'" :info="'true'" :ruleForm="proInfo"></t043>
              <t044 v-if="ruleForm.indexCode=='T044'" :info="'true'" :ruleForm="proInfo"></t044>
              <t045 v-if="ruleForm.indexCode=='T045'" :info="'true'" :ruleForm="proInfo"></t045>
              <t046 v-if="ruleForm.indexCode=='T046'" :info="'true'" :ruleForm="proInfo"></t046>
              <t047 v-if="ruleForm.indexCode=='T047'" :info="'true'" :ruleForm="proInfo"></t047>
              <t048 v-if="ruleForm.indexCode=='T048'" :info="'true'" :ruleForm="proInfo"></t048>
              <t049 v-if="ruleForm.indexCode=='T049'" :info="'true'" :ruleForm="proInfo"></t049>
              <t050 v-if="ruleForm.indexCode=='T050'" :info="'true'" :ruleForm="proInfo"></t050>
              <t052 v-if="ruleForm.indexCode=='T052'" :info="'true'" :ruleForm="proInfo"></t052>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <p class="titles">库内单项工程</p>
    <div class="pro-info">
      <el-collapse v-model="active2">
        <el-collapse-item title="筛选信息" name="1" class="info-title">
          <div class="screen-box">
            <ul>
              <li>
                <span>项目行业:</span>
                <el-select v-model="ruleForm.industry" placeholder="" @change="fristChange" class="combination">
                  <el-option v-for="(item,index) in industryList" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="ruleForm.industrySecond" placeholder="" @change="secondChange" class="combination">
                  <el-option v-for="(item,index) in industrySecondLevel" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>编制阶段:</span>
                <el-select v-model="ruleForm.stage" multiple collapse-tags placeholder="请选择编制阶段" @change="stageChange">
                  <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </li>
              <li>
                <span>建设性质:</span>
                <el-select v-model="ruleForm.nature" placeholder="请选择建设性质">
                  <el-option v-for="item in ProjectNature" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </li>
              <X001 v-if="ruleForm.flag=='X001'||'X002'||'X003'||'X004'||'X005'||'X006'||'X009'||'X010'||'X011'||'X014'||'X015'" :tabularData="tabularData" :ruleForm="ruleForm"></X001>
              <li class="classification">
                <span>单项工程分类:</span>
                <el-select v-model="ruleForm.type1" placeholder="" @change="classAChange" style="width:179px">
                  <el-option v-for="(item,index) in projectTypeFrist" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="ruleForm.type2" placeholder="" @change="classBChange" style="width:179px">
                  <el-option v-for="(item,index) in projectTypeSecond" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="ruleForm.type3" placeholder="" @change="classCChange" style="width:179px">
                  <el-option v-for="(item,index) in projectTypeThird" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="111.15px" class="info-from">
                <t004 v-if="ruleForm.indexCode=='T004'" :info="'false'" :ruleForm="ruleForm"></t004>
                <t005 v-if="ruleForm.indexCode=='T005'" :info="'false'" :ruleForm="ruleForm"></t005>
                <t023 v-if="ruleForm.indexCode=='T023'" :info="'false'" :ruleForm="ruleForm"></t023>
                <t031 v-if="ruleForm.indexCode=='T031'" :info="'false'" :ruleForm="ruleForm"></t031>
                <t033 v-if="ruleForm.indexCode=='T033'" :info="'false'" :ruleForm="ruleForm"></t033>
                <t037 v-if="ruleForm.indexCode=='T037'" :info="'false'" :ruleForm="ruleForm"></t037>
                <t043 v-if="ruleForm.indexCode=='T043'" :info="'false'" :ruleForm="ruleForm"></t043>
                <t044 v-if="ruleForm.indexCode=='T044'" :info="'false'" :ruleForm="ruleForm"></t044>
                <t045 v-if="ruleForm.indexCode=='T045'" :info="'false'" :ruleForm="ruleForm"></t045>
                <t046 v-if="ruleForm.indexCode=='T046'" :info="'false'" :ruleForm="ruleForm"></t046>
                <t047 v-if="ruleForm.indexCode=='T047'" :info="'false'" :ruleForm="ruleForm"></t047>
                <t048 v-if="ruleForm.indexCode=='T048'" :info="'false'" :ruleForm="ruleForm"></t048>
                <t049 v-if="ruleForm.indexCode=='T049'" :info="'false'" :ruleForm="ruleForm"></t049>
                <t050 v-if="ruleForm.indexCode=='T050'" :info="'false'" :ruleForm="ruleForm"></t050>
                <t052 v-if="ruleForm.indexCode=='T052'" :info="'false'" :ruleForm="ruleForm"></t052>
              </el-form>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="screen-results">
        <p>
          <span>筛选结果</span>
          <!-- 最多只能选20个 -->
          <span>已选择{{multipleSelection.length}}/20条；当前结果{{tableData.length}}条</span>
        </p>
        <el-table ref="multipleTable" border height="344px" v-loading="tableLoad" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column width="55" type="selection" :selectable="selectable" align="center">
            <template slot="header">选择</template>
          </el-table-column>
          <el-table-column label="项目名称" width="120" prop="projectName"></el-table-column>
          <el-table-column label="项目行业" width="120" prop="projectIndustry"></el-table-column>
          <el-table-column label="编制阶段" width="120" prop="stage"></el-table-column>
          <el-table-column label="建设性质" width="80" prop="nature"></el-table-column>
          <!-- 以上四个是肯定存在的 -->
          <el-table-column v-for="item in screeningResults[ruleForm.flag]" :key="item.label" :label="item.label" :width="item.label=='项目地点'?180:120" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[item.field] }}</template>
          </el-table-column>
          <!-- 上边两个不确定 -->
          <el-table-column label="单项工程分类" width="150" prop="monomerType"></el-table-column>
          <el-table-column label="单项工程名称" width="120" prop="monomerName"></el-table-column>
          <el-table-column v-for="(item,index) in screeningResults[ruleForm.indexCode]" :key="index" :label="item.label" :prop="item.field" width="120">
            <template slot-scope="scope">
              <span v-if="item.field=='ifZhuangji'">{{scope.row.ifZhuangji?'有':'无'}}</span>
              <span v-else>{{scope.row[item.field]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import placeComponent from '@/components/place'
import {
  areaTypeList //地区类别
} from '@/assets/dicData/dicOption.js'
import t001 from '@/views/compare/infoModule/t001'
import t004 from '@/views/compare/infoModule/t004'
import t005 from '@/views/compare/infoModule/t005'
import t023 from '@/views/compare/infoModule/t023'
import t031 from '@/views/compare/infoModule/t031'
import t033 from '@/views/compare/infoModule/t033'
import t037 from '@/views/compare/infoModule/t037'
import t038 from '@/views/compare/infoModule/t038'
import t043 from '@/views/compare/infoModule/t043'
import t044 from '@/views/compare/infoModule/t044'
import t045 from '@/views/compare/infoModule/t045'
import t046 from '@/views/compare/infoModule/t046'
import t047 from '@/views/compare/infoModule/t047'
import t048 from '@/views/compare/infoModule/t048'
import t049 from '@/views/compare/infoModule/t049'
import t050 from '@/views/compare/infoModule/t050'
import t051 from '@/views/compare/infoModule/t051'
import t052 from '@/views/compare/infoModule/t052'
import t053 from '@/views/compare/infoModule/t053'
import t054 from '@/views/compare/infoModule/t054'

import X001 from '@/views/compare/proInfoModule/X001'

export default {
  props: {
    proParamsInfo: Object,
    extract: Boolean
  },
  components: {
    placeComponent,
    t001,
    t004,
    t005,
    t023,
    t031,
    t033,
    t037,
    t038,
    t043,
    t044,
    t045,
    t046,
    t047,
    t048,
    t049,
    t050,
    t051,
    t052,
    t053,
    t054,
    X001
  },
  data() {
    return {
      loading: true,
      tableLoad: true, //表格的加载
      active1: '1',
      active2: '1',
      // 单项工程信息，只用来显示，不可更改
      proInfo: {
        monomerAll: {
          deitail: {
            structureTypeName: '' //结构类型名称
          }
        },
        objectX: {},
        projectCommon: {}
      },
      ruleForm: {
        flag: 'X001',
        indexCode: 'T043', //记得改
        industry: Number(), //行业
        industrySecond: Number(), //二级行业
        commonStage: '',
        stage: [], //编制阶段
        nature: '', //建设性质
        type1: '', //单项工程分类一级
        type2: '', //单项工程分类二级
        type3: '', //单项工程分类三级
        ifZhuangji: '', //有无桩基
        structureTypeId: '', //结构类型
        selectedDate: '', //价格信息取定时间
        monomerArea1: '', //占地面积
        monomerArea2: '', //占地面积
        groundArea: '', //地上建筑面积
        undergroundArea1: '', //地下建筑面积
        undergroundArea2: '', //地下建筑面积
        groundFloors1: '', //地上层数
        groundFloors2: '', //地上层数
        undergroundFloors1: '', //地下层数
        undergroundFloors2: '', //地下层数
        areaType: '', //地区类别
        style: '', //建筑风格,
        commercialArea: '', //商业面积
        workArea: '', //办公面积
        buildArea: '', //建筑面积
        floors: '', //层数
        numberOfCars: '', //车位数
        assemblyRate1: '', //装配率
        assemblyRate2: '', //装配率
        ifDishang: '', //是否含底层商铺
        wallLenght: '', //围墙总长
        bedNumber1: '', //床位数
        bedNumber2: '', //床位数
        districtsGroundArea: '', //小区占地面积
        afforestedArea: '', //绿化面积
        hardAreaRatio: '', //硬景面积占比
        totalRooms: '', //总客房数
        lobbyArea: '', //大堂面积
        ifSingleToilet: '', //是否位独立卫生间
        operatingArea: '', //手术室面积 没有验证
        outpatientArea: '', //门诊面积  没有验证
        classSize: '', //班级人数  没有验证
        educationalSystem: [], //学制
        residentialArea: '', //住宅面积
        sewageTreatment: '', //污水处理能力
        stationNumber: '', //站内充电设施数量
        page: 1,
        size: 20000
      },
      industryList: [], //项目行业列表
      industrySecondLevel: [], //行业二级列表
      stageList: [], //编制阶段
      ProjectNature: [], //建设性质
      projectTypeFrist: [], //单项工程类别
      projectTypeSecond: [], //单项工程类别二级
      projectTypeThird: [], //单项工程类别三级
      educationalSystemData: [], //学制
      threeLevel: [],
      tabularData: {
        regionalList: [], //省份列表
        areaTypeList: [] //地区类别
      },
      rules: {
        //有无桩基工程
        ifZhuangji: [{ message: '请选择桩基工程', trigger: 'change' }],
        //地下层数
        undergroundFloors1: [
          { message: '请输入地下层数', trigger: 'change' },
          { pattern: /^[0-9]\d*$/, message: '请输入非负整数' }
        ],
        //地下层数
        undergroundFloors2: [
          { message: '请输入地下层数', trigger: 'change' },
          { pattern: /^[0-9]\d*$/, message: '请输入非负整数' }
        ],
        //商业面积
        commercialArea1: [
          { message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //商业面积
        commercialArea2: [
          { message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //建筑面积
        buildArea1: [
          { message: '请输入建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        buildArea2: [
          { message: '请输入建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //办公面积
        workArea1: [
          { message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //办公面积
        workArea2: [
          { message: '请输入商业面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //建筑面积 保留2位小数
        buildArea1: [
          { message: '请输入建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //建筑面积 保留2位小数
        buildArea2: [
          { message: '请输入建筑面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //层数 非负整数
        floors1: [
          { message: '请输入层数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //层数 非负整数
        floors2: [
          { message: '请输入层数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //车位数
        numberOfCars1: [
          { message: '请输入车位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //车位数
        numberOfCars2: [
          { message: '请输入车位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //大堂面积
        lobbyArea1: [
          { message: '请输入大堂面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        lobbyArea2: [
          { message: '请输入大堂面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //班级人数
        classSize1: [
          { message: '请输入班级人数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        classSize2: [
          { message: '请输入班级人数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //独立卫生间
        ifSingleToilet: [{ message: '请选择独立卫生间', trigger: 'change' }],
        //装配率
        assemblyRate1: [
          { message: '请输入装配率 ', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        assemblyRate2: [
          { message: '请输入装配率 ', trigger: 'blur' },
          {
            pattern: /^(?!-1+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //学制
        educationalSystem: [{ type: 'array', message: '请至少选择一个学制', trigger: 'change' }],
        //住宅面积
        residentialArea1: [
          { message: '请输入住宅面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //住宅面积
        residentialArea2: [
          { message: '请输入住宅面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //站内充电设施数量
        stationNumber1: [
          { message: '请输入站内充电设施数量', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        stationNumber2: [
          { message: '请输入站内充电设施数量', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //充电站等级
        stationClass: [{ message: '请选择充电站等级', trigger: 'change' }],
        //充电桩类别
        chargeType: [{ message: '请选择充电桩类别', trigger: 'change' }],
        //污水处理能力
        sewageTreatment: [
          { message: '请输入污水处理能力', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //围墙类型
        wallType: [{ message: '请选择围墙类型', trigger: 'change' }],
        //围墙总长
        wallLenght: [
          { message: '请输入围墙总长', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //檐高(或建筑高度)
        eavesHeight1: [
          { message: '请输入檐高(或建筑高度)', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //檐高(或建筑高度)
        eavesHeight2: [
          { message: '请输入檐高(或建筑高度)', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //床位数
        bedNumber1: [
          { message: '请输入床位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //床位数
        bedNumber2: [
          { message: '请输入床位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        // 总客房数
        totalRooms1: [
          { message: '请输入床位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        // 总客房数
        totalRooms2: [
          { message: '请输入床位数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '非负整数并大于0' }
        ],
        //绿化面积
        afforestedArea: [
          { message: '请输入绿化面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ],
        //小区占地面积
        districtsGroundArea: [
          { message: '请输入小区占地面积', trigger: 'blur' },
          {
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
            message: '请输入正确的数值'
          }
        ]
      },
      tableData: [], //表格的数据
      tableCount: Number(),
      multipleSelection: [],
      screeningResults: {
        X001: [
          { label: '项目地点', field: 'commonProjectLocation' },
          { label: '地区类别', field: 'comminAreaType' }
        ],
        T004: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '有无桩基工程', field: 'ifZhuangji' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '建筑面积', field: 'buildArea' },
          { label: '层数', field: 'floors' }
        ],
        T005: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '有无桩基工程', field: 'ifZhuangji' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '建筑面积', field: 'buildArea' },
          { label: '层数', field: 'floors' },
          { label: '车位数', field: 'numberOfCars' }
        ],
        T023: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T033: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '有无桩基工程', field: 'ifZhuangji' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '檐高', field: 'eavesHeight' }
        ],
        T037: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T043: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T044: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T045: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T046: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T047: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T048: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T049: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T050: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '地上建筑面积', field: 'groundArea' },
          { label: '地下建筑面积', field: 'undergroundArea' },
          { label: '地上层数', field: 'groundFloors' },
          { label: '地下层数', field: 'undergroundFloors' }
        ],
        T052: [
          { label: '主体建安工程价格信息取定时间', field: 'selectedDate' },
          { label: '结构类型', field: 'structureTypeIdStr' },
          { label: '占地面积', field: 'monomerArea' },
          { label: '建筑面积', field: 'buildArea' },
          { label: '层数', field: 'floors' }
        ]
      },
      screenData: {},
      structureList: [] //结构类型列表
    }
  },
  watch: {
    $props: {
      handler: function(val, oldVal) {
        this.loading = true
        this.getDicCommon().then(res => {
          this.getLibraryMonomerDetail() //库内单项工程详情
        })
      },
      deep: true,
      immediate: true
    },
    ruleForm: {
      handler(newVal, oldVal) {
        console.log('????')
        this.getSingleProjectByCondition()
      },
      deep: true
    },
    extract(newVal, oldVal) {
      if (newVal) {
        let idArr = []
        this.multipleSelection.map(item => {
          idArr.push(item.monomerId)
        })
        this.$emit('screeningData', idArr)
      }
    }
  },
  methods: {
    fristChange(val) {
      this.getIndustrySecondByParentId(val, 'change')
    },
    secondChange(val) {
      let sameEle = this.industrySecondLevel.find(data => data.id == val)
      this.ruleForm.flag = sameEle ? sameEle.projectx : ''
    },
    classAChange(val) {
      api.getProjectMonomerType(2, val).then(res => {
        this.projectTypeSecond = res.data
        this.ruleForm.type2 = res.data[0].id
        api.getProjectMonomerType(3, this.ruleForm.type2).then(res => {
          this.projectTypeThird = res.data
          this.ruleForm.type3 = res.data[0].id
        })
      })
    },
    classBChange(val) {
      api.getProjectMonomerType(3, val).then(res => {
        this.projectTypeThird = res.data
        this.ruleForm.type3 = res.data[0].id
      })
    },
    classCChange(val) {
      let sameEle = this.projectTypeThird.find(data => data.id == val)
      this.ruleForm.indexCode = sameEle ? sameEle.indexCode : ''
    },

    // 弹框中的表格数据
    getSingleProjectByCondition() {
      this.ruleForm.selectedDate1 = this.ruleForm.selectedDate[0]
      this.ruleForm.selectedDate2 = this.ruleForm.selectedDate[1]
      let xxx = {
        industry_belong: this.ruleForm.industry, // 项目行业1
        sub_industry_belong: this.ruleForm.industrySecond, // 项目行业2
        stage: this.ruleForm.stage, // 编制阶段
        nature: this.ruleForm.nature, // 建设性质
        indexCode: this.ruleForm.indexCode, //单项工程indexCode
        flag: this.ruleForm.flag //项目xxx表
      }
      let proData = {}
      if (this.ruleForm.flag == 'X001' || 'X002' || 'X003' || 'X004' || 'X005' || 'X006' || 'X009' || 'X010' || 'X011' || 'X014' || 'X015') {
        proData.commonProvinceCode = this.ruleForm.commonProvinceCode
        proData.commonAreaType = this.ruleForm.areaType
      }
      let sharedata = {
        type1: this.ruleForm.type1, //单项工程分类1
        type2: this.ruleForm.type2, //单项工程分类2
        type3: this.ruleForm.type3, //单项工程分类3
        ifZhuangji: this.ruleForm.ifZhuangji, //有无桩基工程
        selectedDate1: this.ruleForm.selectedDate1, //主体建安工程价格信息取定时间1
        selectedDate2: this.ruleForm.selectedDate2, //主体建安工程价格信息取定时间2
        structureTypeId: this.ruleForm.structureTypeId, //结构类型
        monomerArea1: this.ruleForm.monomerArea1, //占地面积1
        monomerArea2: this.ruleForm.monomerArea2 //占地面积2
      }
      this.screenData = {
        T004: {
          buildArea1: this.ruleForm.buildArea1, //建筑面积1
          buildArea2: this.ruleForm.buildArea2, //建筑面积2
          floors1: this.ruleForm.floors1, //层数1
          floors2: this.ruleForm.floors2 //层数2
        },
        T005: {
          buildArea1: this.ruleForm.buildArea1, //建筑面积1
          buildArea2: this.ruleForm.buildArea2, //建筑面积2
          floors1: this.ruleForm.floors1, //层数1
          floors2: this.ruleForm.floors2, //层数2
          numberOfCars1: this.ruleForm.numberOfCars1, //车位数1
          numberOfCars2: this.ruleForm.numberOfCars2 //车位数2
        },
        T023: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          assemblyRate1: this.ruleForm.assemblyRate1, //装配率1
          assemblyRate2: this.ruleForm.assemblyRate2, //装配率2
          ifDishang: this.ruleForm.ifDishang //是否含底层商铺
        },
        T033: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          eavesHeight1: this.ruleForm.eavesHeight1, //檐高(或建筑高度)1
          eavesHeight2: this.ruleForm.eavesHeight2 //檐高(或建筑高度)2
        },
        T037: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          bedNumber1: this.ruleForm.bedNumber1, //床位数1
          bedNumber2: this.ruleForm.bedNumber2 //床位数2
        },
        T043: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          style: this.ruleForm.style //建筑风格
        },
        T044: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          commercialArea1: this.ruleForm.commercialArea1, //商业面积1
          commercialArea2: this.ruleForm.commercialArea2, //商业面积2
          workArea1: this.ruleForm.workArea1, //办公面积1
          workArea2: this.ruleForm.workArea2 //办公面积2
        },
        T045: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          workArea1: this.ruleForm.workArea1, //办公面积1
          workArea2: this.ruleForm.workArea2 //办公面积2
        },
        T046: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          totalRooms1: this.ruleForm.totalRooms1, //总客房数1
          totalRooms2: this.ruleForm.totalRooms2, //总客房数2
          lobbyArea1: this.ruleForm.lobbyArea1, //大堂面积1
          lobbyArea2: this.ruleForm.lobbyArea2 //大堂面积2
        },
        T047: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          assemblyRate1: this.ruleForm.assemblyRate1, //装配率
          assemblyRate2: this.ruleForm.assemblyRate2, //装配率
          ifSingleToilet: this.ruleForm.ifSingleToilet //是否为独立卫生间
        },
        T048: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          outpatientArea1: this.ruleForm.outpatientArea1, //门诊面积1
          outpatientArea2: this.ruleForm.outpatientArea1, //门诊面积2
          operatingArea1: this.ruleForm.operatingArea1, //手术室面积1
          operatingArea2: this.ruleForm.operatingArea2 //手术室面积2
        },
        T049: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          educationalSystem: this.ruleForm.educationalSystem, //学制id
          classSize1: this.ruleForm.classSize1, //班级人数1
          classSize2: this.ruleForm.classSize2 //班级人数2
        },
        T050: {
          groundArea1: this.ruleForm.groundArea1, //地上建筑面积1,
          groundArea2: this.ruleForm.groundArea2, //地上建筑面积2,
          undergroundArea1: this.ruleForm.undergroundArea1, //地下建筑面积1
          undergroundArea2: this.ruleForm.undergroundArea2, //地下建筑面积2
          groundFloors1: this.ruleForm.groundFloors1, //地上层数1
          groundFloors2: this.ruleForm.groundFloors2, //地上层数2
          undergroundFloors1: this.ruleForm.undergroundFloors1, //地下层数1
          undergroundFloors2: this.ruleForm.undergroundFloors2, //地下层数2
          commercialArea1: this.ruleForm.commercialArea1, //商业面积1
          commercialArea2: this.ruleForm.commercialArea2, //商业面积2
          workArea1: this.ruleForm.workArea1, //办公面积1
          workArea2: this.ruleForm.workArea2, //办公面积2
          residentialArea1: this.ruleForm.residentialArea1, //住宅面积
          residentialArea2: this.ruleForm.residentialArea2 //住宅面积
        },
        T052: {
          buildArea1: this.ruleForm.buildArea1, //建筑面积1
          buildArea2: this.ruleForm.buildArea2, //建筑面积2
          floors1: this.ruleForm.floors1, //层数
          floors2: this.ruleForm.floors2 //层数
        }
      }
      let pramasdatas = {
        page: this.ruleForm.page,
        size: 20000
      }
      Object.assign(pramasdatas, xxx, sharedata, proData, this.screenData[this.ruleForm.indexCode])
      api
        .getSingleProjectByCondition(pramasdatas)
        .then(res => {
          this.tableData = res.data
          this.tableCount = res.count
          this.tableData.map(item => {
            item.checked = true
          })
          this.tableLoad = false
        })
        .catch(res => {
          this.tableLoad = false
        })
    },
    // 库内单项工程详情
    getLibraryMonomerDetail() {
      let data = {
        monomerId: this.$props.proParamsInfo.basicId,
        sid: this.$props.proParamsInfo.stageId,
        pid: this.$props.proParamsInfo.commonId
      }
      api
        .getLibraryMonomerDetail(data)
        .then(res => {
          // monomerAll:单项工程信息的 ,objectX:项目信息,projectCommon:项目信息
          this.proInfo = res.data
          let structure
          structure = this.structureList.find(data => data.id == this.proInfo.monomerAll.deitail.structureTypeId)
          this.proInfo.monomerAll.deitail.structureTypeName = structure.name
          let sameIndex = this.industryList.findIndex(data => data.id == this.proInfo.projectCommon.industryBelongCode)
          let monomerAll = {}
          Object.assign(monomerAll, res.data.monomerAll) //为了不影响原对象
          let deitail = monomerAll.deitail
          delete monomerAll.deitail
          Object.assign(this.ruleForm, monomerAll, deitail, res.data.objectX, res.data.projectCommon)
          this.$set(this.ruleForm, 'structureTypeId', [deitail.structureTypeId])
          // 主体建安工程价格信息取定时间
          let years = monomerAll.selectedDate.split('-')[0]
          let timesStart = years - 3 + '-' + monomerAll.selectedDate.split('-')[1] + '-' + monomerAll.selectedDate.split('-')[2]
          let timesEnd = Number(years) + 3 + '-' + monomerAll.selectedDate.split('-')[1] + '-' + monomerAll.selectedDate.split('-')[2]
          this.ruleForm.selectedDate = [timesStart, timesEnd]
          // 占地面积
          this.ruleForm.monomerArea1 = this.rounding(deitail.monomerArea * 0.9)
          this.ruleForm.monomerArea2 = this.rounding(deitail.monomerArea * 1.1)
          // 地上建筑面积
          this.ruleForm.groundArea1 = this.rounding(deitail.groundArea * 0.9)
          this.ruleForm.groundArea2 = this.rounding(deitail.groundArea * 1.1)
          // 地下建筑面积
          this.ruleForm.undergroundArea1 = this.rounding(deitail.undergroundArea * 0.9)
          this.ruleForm.undergroundArea2 = this.rounding(deitail.undergroundArea * 1.1)
          // 地上层数
          this.ruleForm.groundFloors1 = this.rounding(deitail.groundFloors - 10)
          this.ruleForm.groundFloors2 = this.rounding(deitail.groundFloors + 10)
          // 地下层数
          this.ruleForm.undergroundFloors1 = this.rounding(deitail.undergroundFloors - 3)
          this.ruleForm.undergroundFloors2 = this.rounding(deitail.undergroundFloors + 3)
          // 装配率
          this.ruleForm.assemblyRate1 = this.rounding(deitail.assemblyRate * 0.9)
          this.ruleForm.assemblyRate2 = this.rounding(deitail.assemblyRate * 1.1)
          //层数
          this.ruleForm.floors1 = this.rounding(deitail.floors - 3)
          this.ruleForm.floors2 = this.rounding(deitail.floors + 3)
          // 建筑面积
          this.ruleForm.buildArea1 = this.rounding(deitail.buildArea * 0.9)
          this.ruleForm.buildArea2 = this.rounding(deitail.buildArea * 1.1)
          // 车位数
          this.ruleForm.numberOfCars1 = this.rounding(deitail.numberOfCars - 10)
          this.ruleForm.numberOfCars2 = this.rounding(deitail.numberOfCars + 10)
          // 檐高(或建筑高度)
          this.ruleForm.eavesHeight1 = this.rounding(deitail.eavesHeight - 5)
          this.ruleForm.eavesHeight2 = this.rounding(deitail.eavesHeight + 5)
          // 床位数
          this.ruleForm.bedNumber1 = this.rounding(deitail.bedNumber - 30)
          this.ruleForm.bedNumber2 = this.rounding(deitail.bedNumber + 30)
          // 商业面积
          this.ruleForm.commercialArea1 = this.rounding(deitail.commercialArea * 0.9)
          this.ruleForm.commercialArea2 = this.rounding(deitail.commercialArea * 1.1)
          // 办公面积
          this.ruleForm.workArea1 = this.rounding(deitail.workArea * 0.9)
          this.ruleForm.workArea2 = this.rounding(deitail.workArea * 1.1)
          // 总客房数
          this.ruleForm.totalRooms1 = this.rounding(deitail.totalRooms - 10)
          this.ruleForm.totalRooms2 = this.rounding(deitail.totalRooms + 10)
          // 大堂面积
          this.ruleForm.lobbyArea1 = this.rounding(deitail.lobbyArea * 0.9)
          this.ruleForm.lobbyArea2 = this.rounding(deitail.lobbyArea * 1.1)
          // 门诊面积
          this.ruleForm.outpatientArea1 = this.rounding(deitail.outpatientArea * 0.9)
          this.ruleForm.outpatientArea2 = this.rounding(deitail.outpatientArea * 1.1)
          // 手术室面积
          this.ruleForm.operatingArea1 = this.rounding(deitail.operatingArea * 0.9)
          this.ruleForm.operatingArea2 = this.rounding(deitail.operatingArea * 1.1)
          // 班级人数
          this.ruleForm.classSize1 = this.rounding(deitail.classSize - 10)
          this.ruleForm.classSize2 = this.rounding(deitail.classSize + 10)
          // 住宅面积
          this.ruleForm.residentialArea1 = this.rounding(deitail.residentialArea * 0.9)
          this.ruleForm.residentialArea2 = this.rounding(deitail.residentialArea * 1.1)

          this.ruleForm.stage = [res.data.monomerAll.stageId]
          this.ruleForm.commonStage = this.proInfo.projectCommon.stage
          this.ruleForm.ifZhuangji = String(this.ruleForm.ifZhuangji)
          this.ruleForm.commonProvinceCode = [this.ruleForm.provinceCode]
          this.ruleForm.industry = Number(this.proInfo.projectCommon.industryBelongCode) //筛选信息项目行业回显
          this.ruleForm.industrySecond = Number(this.proInfo.projectCommon.subIndustryBelongCode) //筛选信息项目行业回显
          let sameEle = this.ProjectNature.find(data => this.ruleForm.nature == data.name)
          this.ruleForm.nature = sameEle.id
          api.getProjectMonomerType(2, this.ruleForm.type1).then(res => {
            this.projectTypeSecond = res.data
            api.getProjectMonomerType(3, this.ruleForm.type2).then(res => {
              this.projectTypeThird = res.data
            })
          })
          this.loading = false
        })
        .catch(res => {
          this.loading = false
        })
    },
    rounding(val) {
      if (val || val == 0) {
        if (val > 0) {
          return Number(val.toFixed(2))
        } else if (val == 0 || val < 0) {
          return 0
        }
      }
    },
    selectable(row) {
      if (row.checked) {
        return true
      } else {
        return false
      }
    },
    // 表格选择超过20条不让选择
    handleSelectionChange(val) {
      if (val.length == 20) {
        this.tableData.map(item => {
          item.checked = false
        })
        val.map(item => {
          let sames = this.tableData.find(data => data == item)
          sames.checked = true
        })
      } else {
        this.tableData.map(item => {
          item.checked = true
        })
      }
      this.multipleSelection = val
    },
    // 选择编制阶段
    stageChange(val) {
      if (val[val.length - 1] == '') {
        this.ruleForm.stage = ['']
      } else {
        let nullIndex = this.ruleForm.stage.findIndex(data => data == '')
        nullIndex > -1 ? this.ruleForm.stage.splice(nullIndex, 1) : ''
      }
    },
    //单项工程类别
    monomerGetMonomerTypeAll() {
      api.monomerGetMonomerTypeAll().then(res => {
        this.projectTypeFrist = [res.data['1'][0]]
        this.threeLevel = res.data['3']
      })
    },
    // 获取项目行业
    getIndustryBelongFirst() {
      api.getIndustryBelongFirst().then(res => {
        res.data.map(item => {
          item.leaf = false
        })
        res.data.unshift({ id: '-1', name: '不限', leaf: true })
        this.industryList = res.data
        this.getIndustrySecondByParentId(this.industryList[1].id)
      })
    },
    getIndustrySecondByParentId(val, purpose) {
      api.getIndustrySecondByParentId(val).then(res => {
        this.industrySecondLevel = res.data
        if (purpose == 'change') {
          this.ruleForm.industrySecond = Number(this.industrySecondLevel[0].id)
          this.ruleForm.flag = this.industrySecondLevel[0].projectx
        }
      })
    },
    // 获取省份
    allProvinces() {
      api.allProvinces().then(res => {
        this.tabularData.regionalList = res.data
      })
    },
    // 获取编制阶段
    getStages() {
      api.getStages().then(res => {
        // res.data.unshift({ id: '', name: '不限' })
        // this.stageList = res.data
        // 朗越要求只显示招标控制价和结算价两个选项
        res.data.map(item => {
          if (item.name == '招标控制价' || item.name == '结算价') {
            this.stageList.push(item)
          }
        })
        this.stageList.unshift({ id: '', name: '不限' })
      })
    },
    // 建设性质
    getProjectNature() {
      api.getProjectNature().then(res => {
        res.data.unshift({ id: -1, name: '不限', for_order: null })
        this.ProjectNature = res.data
      })
    },
    // 结构类型
    getDicCommon() {
      return new Promise((resolve, relect) => {
        // 9结构类型、17学制
        api.getDicCommon(9).then(res => {
          this.structureList = res.data
          resolve(this.structureList)
        })
        api.getDicCommon(17).then(res => {
          this.educationalSystemData = res.data
          resolve(this.educationalSystemData)
        })
      })
    }
  },
  mounted() {
    this.getIndustryBelongFirst() //项目行业
    this.allProvinces() //获取省份
    this.tabularData.areaTypeList = ['不限', ...areaTypeList]
    this.getStages() //编制阶段
    this.getProjectNature() //建设性质
    this.monomerGetMonomerTypeAll() //单项工程类别
  }
}
</script>

<style lang="less" scoped>
.dia-box {
  max-height: calc(80vh - 104px);
  overflow-y: scroll;
  .titles {
    background: #eff1f7;
    height: 30px;
    line-height: 30px;
    border-left: 3px solid #91a2e8;
    padding-left: 17px;
    color: #666666;
  }
  .pro-info {
    padding: 14px 20px 20px 20px;
    .info-box {
      background: #f3f4f5;
      margin-top: 10px;
      padding-top: 20px;
      ul {
        /deep/li {
          display: inline-block;
          height: 29px;
          width: 320px;
          margin-left: 10px;
          margin-bottom: 3px;
          span:nth-child(1) {
            color: #999999;
            float: left;
            line-height: 16px;
            text-align: right;
            margin-right: 17px;
            width: 101.15px;
          }
          span:nth-child(2) {
            color: #666666;
            line-height: 16px;
            text-align: left;
            width: 170px;
            float: left;
          }
        }
      }
    }
    .screen-box {
      background: #f3f4f5;
      padding-top: 10px;
      ul {
        /deep/li {
          display: inline-block;
          height: 30px;
          width: 320px;
          margin: 0px 20px 20px 10px;
          margin-right: 0;
          > span:nth-child(1) {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-right: 10px;
            width: 101.15px;
            text-align: right;
          }
          /deep/.el-select,
          /deep/.el-cascader {
            width: 208px;
            line-height: 30px;
            .el-input__inner {
              height: 30px;
              line-height: 30px;
            }
            .el-input__icon {
              line-height: 30px;
            }
          }
          .combination {
            display: inline-block;
            width: 104px;
            .el-input {
              width: 104px;
              display: inline-block;
              .el-input__inner {
                padding: 0 5px;
                padding-right: 20px;
              }
              .el-input__icon {
                width: 12px;
              }
            }
          }
        }
        .classification {
          width: auto;
        }
        /deep/.info-from {
          .special-item {
            /deep/.el-form-item__label {
              line-height: 14px;
            }
          }
          .el-form-item__content {
            line-height: 30px;
            height: 30px;
            width: 208px;
          }
          .el-col {
            .el-form-item__content {
              width: auto;
            }
          }
          .el-col-2 {
            text-align: center;
          }
          .el-input__inner {
            height: 30px;
            line-height: 30px;
          }
          .el-input__icon {
            line-height: 30px;
          }
          .el-form-item__label {
            padding: 0;
            padding-right: 10px;
            line-height: 30px;
          }
          .el-textarea {
            width: 270px;
            .el-textarea__inner {
              line-height: 30px;
              height: 30px;
              padding: 0 10px;
            }
            .el-input__count {
              bottom: 1px;
              right: 10px;
            }
          }
        }
        .li-box {
          display: inline-block;
        }
        /deep/.el-time {
          .el-input--prefix .el-input__inner {
            padding: 0px 5px !important;
          }
          /deep/.el-input__prefix {
            display: none !important;
          }
        }
        /deep/.el-range-editor.el-input__inner {
          padding: 0 2px;
        }
        /deep/.el-date-editor--daterange {
          width: auto;
        }
        /deep/.el-range-editor .el-range-input {
          line-height: 28px;
        }
        /deep/.el-date-editor .el-range-separator {
          line-height: 26px;
        }
      }
    }
    /deep/.el-collapse {
      border: none;
      .el-collapse-item__arrow {
        margin: 0 0 0 5px;
      }
    }
    .info-title {
      /deep/.el-collapse-item__header {
        margin-bottom: 10px;
      }
    }
    /deep/.el-collapse-item__header {
      border: none;
      height: 13px;
      line-height: 13px;
      font-size: 12px;
    }
    /deep/.el-collapse-item__wrap {
      border: none;
    }
    .screen-results {
      > p {
        font-size: 12px;
        height: 13px;
        line-height: 13px;
        margin-bottom: 10px;
        span:nth-child(2) {
          float: right;
        }
      }
      /deep/.el-table {
        th {
          color: #888888;
          background: #fafafb;
          .el-checkbox {
            display: none;
          }
        }
        th:nth-child(1) {
          .cell::after {
            content: '选择';
          }
        }
      }
    }
  }
}
/*修改滚动条样式*/
.dia-box::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  /**/
}
// 滚动条的轨道
.dia-box::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
// 滚动条里面的小方块
.dia-box::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
</style>