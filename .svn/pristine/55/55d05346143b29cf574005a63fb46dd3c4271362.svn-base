<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <!-- <div class="search-words">
        搜索项目
      </div> -->
      <div class="search clearfix">
        <input class="fl" type="text" v-model.trim="searchWord" placeholder="搜索项目编号 / 项目名称 / 建设单位 / 创建人" @change="searchResult">
        <button @click="searchResult">搜索</button>
      </div>

      <div class="tabulation">
        <div @click="filterStatus = !filterStatus">
          <span>{{filterStatus?'收起过滤':'过滤查询'}}
          </span>
          <img src="../../assets/img/Open.png" v-if="!filterStatus">
          <img src="../../assets/img/Retract.png" v-else>
        </div>
        <el-collapse-transition>
          <div class="chpro" v-show="filterStatus">
            <!-- <div class="clearfix">
              <span class="fl">项目范围：</span>
              <div class=" fl">
                <ul class="single-selection">
                  <li @click="changeRange('me')" :class="{classRange:isActive=='me'}">我的项目</li>
                  <li @click="changeRange('all')" :class="{classRange:isActive=='all'}">全部项目</li>
                </ul>
              </div>
            </div> -->
            <div class="clearfix">
              <span class="fl">项目地点：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in province" @click="changePro(item,index)" :class="{classPro:proFlag==index}" :key="index">{{item.name}}</li>
                </ul>
                <ul class="single-selection" v-if="cityShow">
                  <li v-for="(item,index) in cityList" @click="changeCity(item,index)" :class="{classCity:cityflag==index}" :key="index">{{item.name}}</li>
                </ul>
                <ul class="single-selection" v-if="couShow">
                  <li v-for="(item,index) in countyList" @click="changeCou(item,index)" :class="{classCounty:countyflag==index}" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">项目行业：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in industryList" @click="changeIndustry(item,index)" :class="{classIndustry:newIndustryList==index}" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="clearfix" v-if="engineering.length>0">
              <span class="fl">项目类别：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in engineering" @click="changeType(item,index)" :class="{classType:sortActiveFlag==index}" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">开工日期：</span>
              <div class="fl">
                <ul>
                  <li>
                    <el-date-picker v-model="projectStart" size="mini" type="daterange" value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </li>
                  <li class="sureBtn" @click="confirmStart('kai')">确定</li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">竣工日期：</span>
              <div class="fl">
                <ul>
                  <li>
                    <el-date-picker v-model="projectEnd" size="mini" type="daterange" value-format="yyyy/MM/dd" format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </li>
                  <li class="sureBtn" @click="confirmStart('jun')">确定</li>
                </ul>
              </div>
            </div>
            <!-- <div class="clearfix">
              <span class="fl">建筑面积：</span>
              <div class="fl">
                <ul>
                  <li style="width: 244px;">
                    <el-input v-model.number="builtupAreaS" placeholder="" style="width:90%;" size="small"></el-input>
                    <span>㎡</span>
                  </li>
                  <li>~</li>
                  <li style="width: 246px;">
                    <el-input v-model.number="builtupAreaB" placeholder="" style="width:90%;" size="small"></el-input>
                    <span>㎡</span>
                  </li>
                  <li @click="confirmStart('mian')">确定</li>
                </ul>
              </div>
            </div> -->
            <div class="clearfix">
              <span class="fl">建设性质：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in natureList" @click="changeNature(item,index)" :class="{classNature:natureFlag==index}" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
          </div>
        </el-collapse-transition>
        <div class="allResult" v-show="isShow">
          <span>全部结果：</span>
          <span class="clear-all" @click="emptying">清空所有</span>
          <el-tag :key="index" v-for="(tag,index) in dynamicTags" closable @close="handleClose(tag)" v-if="tag.name">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <div class="my_project">
        <!-- <div class="list-name">
          项目列表
        </div> -->
        <div class="proRig">
          <span>共有 {{tableData.totalElements}} 条项目。</span>
          <span v-show="tableData.totalPages">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="queryParameters.page==1" @click="paging('-')"></el-button>
            <span>{{queryParameters.page}}/{{tableData.totalPages}}</span>
            <el-button type="text" icon="el-icon-arrow-right  el-icon--right" :disabled="queryParameters.page==tableData.totalPages" @click="paging('+')"></el-button>
          </span>
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="project-tables">
        <el-table style="width: 100%" height="calc(100vh - 270px)" :data="tableData.content" border stripe size="mini" @sort-change='sortChange' @row-click="rowClick">
          <el-table-column label="序号" align="center" width="60px">
            <template slot-scope="scope">
              {{scope.$index+1+(queryParameters.page-1)*queryParameters.size}}
            </template>
          </el-table-column>
          <el-table-column label="项目编号" width="130px">
            <template slot-scope="scope">
              <div v-html="scope.row.projectCode"></div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="330px">
            <template slot-scope="scope">
              <div v-html="scope.row.projectName"></div>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="170px">
            <template slot-scope="scope">
              {{scope.row.chineseName?scope.row.chineseName+'('+scope.row.creatorName+')':scope.row.creatorName}}
            </template>
          </el-table-column>
          <el-table-column sortable='custom' prop="createAt" label="创建时间" width="130px">
            <template slot-scope="scope" v-if="scope.row.createAt">
              {{scope.row.createAt.slice(0, 16)}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="项目地点" min-width="250">
            <template slot-scope="scope">
              {{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.distinctName}}
            </template>
          </el-table-column>
          <el-table-column label="建设单位" width="230px">
            <template slot-scope="scope">
              <div v-html="scope.row.doSide"></div>
            </template>
          </el-table-column>
          <el-table-column prop="projectNature" label="建设性质" width="100px">
          </el-table-column>
          <el-table-column sortable='custom' prop="projectStart" label="开工日期" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.projectStart">{{scope.row.projectStart.replace(/\//g, '-')}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable='custom' prop="projectEnd" label="竣工日期" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.projectEnd">{{scope.row.projectEnd.replace(/\//g, '-')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指标类型" width="200" fixed="right">
            <template slot-scope="scope">
              <span v-for="(i,index) in outArr(scope.row.indicatorTypes)" :key="index" class="typeDiv" :class="{greens:i.indexOf('安装算量')!=-1,blues:i=='钢筋算量指标',oras:i=='土建算量指标',reds:i=='造价指标'}" @click="gotoIndexpage(scope.row,i)">
                {{i.substring(0,2)}}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="primary" width="50px" size="small" @click="gotoDetail('info',scope.row)" v-if="permissionlookProject">查看</el-button>
              <el-button type="gray" width="50px" size="small" v-else>查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- <p class="reveal">当前显示10条，共{{tableData.totalElements}}条；</p> -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryParameters.page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="queryParameters.size" layout="sizes, prev, pager, next, jumper" :total="tableData.totalElements">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="" :visible.sync="dialogVisible" width="350px" center>
      <span>您目前没有查看该项目指标数据的权限，请联系管理员更改权限。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogWait" width="350px" center>
      <span>指标分析可能需要几分钟的时间，请优查看其它项目信息。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogWait = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 判断权限 没有权限改变颜色 -->
    <span class="J-lookProject" v-has="['lK0ILB']"></span>
  </div>
</template>

<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import { isDisplay } from '@/assets/js/Utils'
export default {
  name: 'projectLibrary',
  components: {
    headerComponent,
    breadcrumb
  },
  data () {
    return {
      permissionlookProject: false,
      breadcrumbs: [{ name: '企业项目库', path: this.$route.fullPath }],
      searchWord: '', // 搜索的关键字
      filterStatus: false,
      province: [],
      cityList: [],
      countyList: [],
      dialogVisible: false, // 没有权限查看指标数据
      dialogWait: false, // 指标分析时间等待
      projectStart: '', // 开工日期
      projectEnd: '', // 竣工日期
      builtupAreaS: '', // 建筑面积小
      builtupAreaB: '', // 建筑面积大
      engineering: [], // 所有工程类型
      industryList: [], // 行业
      proFlag: 0, // 省份选择
      cityflag: 0, // 地市选择
      countyflag: 0, // 区县选择
      classflag: 0, // 项目分类
      detaflag: 0, // 项目分类下的详细
      newIndustryList: -1, // 高亮选择所属行业
      childrenList: [], // 项目分类下的第二类
      classify1: '', // 项目分类选的1
      classify2: '', // 项目分类选的2
      isActive: '',
      sortActiveFlag: 0, // 选择工程类别
      natureFlag: 0, // 选择建设性质
      dynamicTags: [
        // 筛选条件
        { name: '' }, // 项目范围0
        { name: '' }, // 省市区  1
        { name: '' }, // 工程类型2
        { name: '' }, // 所属行业3
        { name: '' }, // 项目分类4
        { name: '' }, // 开工时间5
        { name: '' }, // 竣工时间6
        { name: '' } // 建筑面积7
      ],
      provinceName: '', // 选中的省份名称
      cityName: '', // 选中的市名
      county: '', // 选中的县
      tableData: [], // 列表
      isClick: true,
      cityShow: false, // 地市列表
      couShow: false, // 县区列表
      newObj: {},
      queryParameters: {
        searchBox: false, // 是否来自于搜索框，当搜索框搜索时为true
        businessCategoryCode1: '', // 业务分类1编码
        businessCategoryCode2: '', // 业务分类2编码
        provinceCode: '',
        cityCode: '',
        distinctCode: '',
        createAtSort: true,
        // "doSide": "",                  //建设单位 ,
        // "projectCode": "",             //项目编号
        // "projectName": "",              //项目名称
        industryBelongCode: '', // 所属行业编码
        projectNatureCode: '', // 建设性质
        page: 1,
        projectEndFirst: null, // 竣工日期、起始时间
        projectEndLast: null, // 竣工日期、终止时间
        projectEndSort: true,
        projectStartFirst: null, // 开工日期、起始时间
        projectStartLast: null, // 开工日期、终止时间
        projectStartSort: true,
        projectTypeCode: '', // 工程类别编码
        size: 20,
        status: '',
        share: true,
        totalAreaFirst: '',
        totalAreaLast: '',
        userId: '', // 选择我的项目传，所有传空
        isIndicator: true
      },
      isShow: false, // 筛选条件
      natureList: [], // 建设性质列表
      directoryList: []
    }
  },
  watch: {
    dynamicTags: {
      handler (newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[0].name == '' && newValue[1].name == '' && newValue[2].name == '' && newValue[3].name == '' && newValue[4].name == '' && newValue[5].name == '' && newValue[6].name == '' && newValue[7].name == '') {
            this.isShow = false
          } else {
            this.isShow = true
          }
        }
      },
      deep: true
    }
  },
  mounted () {
    this.loop()
    this.allProvinces()
    this.getDicCommons() // 所属行业
    this.getDicCommonsss() // 建设性质
    isDisplay(this, 'J-lookProject', 'permissionlookProject')
  },
  activated () {
    this.getEnterpriseProjectByCondition()
  },
  methods: {
    outArr (arr) {
      var hash = []
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i])
        }
      }
      return hash
    },
    // 跳转指标页面
    gotoIndexpage (row, i) {
      let name
      let type = 'quantityCalculation'
      if (i.indexOf('安装算量') != -1) {
        name = '4'
      }
      if (i == '土建算量指标') {
        name = '5'
      }
      if (i == '钢筋算量指标') {
        name = '6'
      }
      if (i == '造价指标') {
        name = ''
        type = 'engineeringCost'
      }
      api.directory(row.id).then(res => {
        this.directoryList = res.data
        let arr = this.directoryList
        let isContinue = true
        if (this.directoryList) {
          for (let index1 = 0; index1 < arr.length; index1++) {
            if (arr[index1].indicatorNameList) {
              for (let index2 = 0; index2 < arr[index1].indicatorNameList.length; index2++) {
                if ((name == '6' && arr[index1].indicatorNameList[index2].indicatorName == '钢筋算量指标' && isContinue) || (name == '5' && arr[index1].indicatorNameList[index2].indicatorName == '土建算量指标' && isContinue)) {
                  this.$router.push('/projectLibrary/detail/IndexData/' + type + '/' + row.id + '?id=' + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1')
                  isContinue = false
                  break
                }
                if (name == '4' || name == '') {
                  if (arr[index1].indicatorNameList[index2].monomerMessage) {
                    for (let index3 = 0; index3 < arr[index1].indicatorNameList[index2].monomerMessage.length; index3++) {
                      if (name == '4' && arr[index1].indicatorNameList[index2].indicatorName.indexOf('安装算量') != -1 && isContinue) {
                        this.$router.push('/projectLibrary/detail/IndexData/' + type + '/' + row.id + '?id=' + arr[index1].indicatorNameList[index2].sourceFileId + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1')
                        isContinue = false
                        break
                      }
                      if (name == '' && arr[index1].indicatorNameList[index2].indicatorName == '造价指标' && isContinue) {
                        this.$router.push('/projectLibrary/detail/IndexData/' + type + '/' + row.id + '?id=' + arr[index1].indicatorNameList[index2].sourceFileId + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1' + '&id2=')
                        isContinue = false
                        break
                      }
                    }
                  }
                }
              }
            }
          }
          return false
        }
      })
    },
    // 获取项目类别
    getProjectTypeByIndustryBelongId (id) {
      api.getProjectTypeByIndustryBelongId(id).then(res => {
        this.engineering = res.data
        this.engineering.unshift({ id: '', name: '不限' })
      })
    },
    // 所属行业
    getDicCommons () {
      api.getDicCommon('DicIndustryBelong').then(res => {
        this.industryList = res.data
        this.industryList.unshift({ id: '', name: '不限' })
      })
    },
    // 建设性质
    getDicCommonsss () {
      api.getDicCommon('DicProjectNature').then(res => {
        this.natureList = res.data
        this.natureList.unshift({ id: '', name: '不限' })
      })
    },
    // 所有省
    allProvinces () {
      api.allProvinces().then(res => {
        if (res.data) {
          this.province = res.data
          this.province.unshift({ id: '', code: '', name: '不限' })
        }
      })
    },
    // 根据条件查询项目
    getEnterpriseProjectByCondition () {
      api.getEnterpriseProjectByCondition(this.queryParameters).then(res => {
        this.tableData = res.page
        if (this.tableData.content && this.searchWord) {
          let temp = this.searchWord
            .replace('\\', '\\\\')
            .replace('*', '\\*')
            .replace('+', '\\+')
            .replace('|', '\\|')
            .replace('{', '\\{')
            .replace('}', '\\}')
            .replace('(', '\\(')
            .replace(')', '\\)')
            .replace('^', '\\^')
            .replace('$', '\\$')
            .replace('[', '\\[')
            .replace(']', '\\]')
            .replace('?', '\\?')
            .replace(',', '\\,')
            .replace('.', '\\.')
            .replace('&', '\\&')
          let replaceReg = new RegExp(temp, 'g')
          let replaceString = '<span style="color: red;font-weight:bold;">' + this.searchWord + '</span>'
          this.tableData.content.forEach((item, index) => {
            this.tableData.content[index].projectCode = item.projectCode.replace(replaceReg, replaceString)
            this.tableData.content[index].projectName = item.projectName.replace(replaceReg, replaceString)
            this.tableData.content[index].doSide = item.doSide.replace(replaceReg, replaceString)
          })
        }
      })
    },
    loop () {
      this.proFlag = 0
      this.sortActiveFlag = 0
      this.natureFlag = 0
      this.newIndustryList = 0
      this.cityflag = 0
      this.countyflag = 0
      this.classflag = 0 // 项目分类
      this.isActive = ''
    },
    // 选择省份
    changePro (item, index) {
      let data
      if (item.name == '不限') {
        this.cityShow = false
        this.couShow = false
        data = null
        this.queryParameters.provinceCode = null // 省代码为null
        this.queryParameters.cityCode = null // 市代码为null
        this.queryParameters.distinctCode = null // 区代码为null
        this.dynamicTags[0].name = ''
      } else {
        this.cityShow = true
        this.provinceName = item.name
        this.queryParameters.provinceCode = item.code
        this.dynamicTags[0].name = this.provinceName
        data = item.code
      }
      this.queryParameters.page = 1
      api.citiesOfProvince(data).then(res => {
        this.cityList = res.data
        this.cityList.unshift({ id: '', code: '', name: '不限', parentCode: '' })
      })
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.getEnterpriseProjectByCondition()
      this.cityflag = 0
      this.countyflag = 0
      this.proFlag = index
      this.couShow = false
    },
    // 选择地市
    changeCity (item, index) {
      if (item.name == '不限') {
        this.couShow = false
        this.queryParameters.cityCode = null
        this.queryParameters.distinctCode = null
        this.dynamicTags[0].name = this.provinceName
      } else {
        this.couShow = true
        this.cityName = item.name
        this.queryParameters.cityCode = item.code
        this.dynamicTags[0].name = this.provinceName + '-' + this.cityName
        api.getDistrictByParentCode(item.code).then(res => {
          this.countyList = res.data
          this.countyList.unshift({ id: '', code: '', name: '不限', parentCode: '' })
        })
      }
      this.queryParameters.page = 1
      this.getEnterpriseProjectByCondition()
      this.countyflag = 0
      this.cityflag = index
    },
    // 选择区县
    changeCou (item, index) {
      if (item.name == '不限') {
        this.county = ''
        this.dynamicTags[0].name = this.provinceName + '-' + this.cityName
      } else {
        this.county = item.name
        this.dynamicTags[0].name = this.provinceName + '-' + this.cityName + '-' + this.county
      }
      this.queryParameters.distinctCode = item.code
      this.countyflag = index
      this.queryParameters.page = 1
      this.getEnterpriseProjectByCondition()
    },
    // 选择项目行业
    changeIndustry (item, index) {
      if (item.name == '不限') {
        this.dynamicTags[1].name = ''
      } else {
        this.dynamicTags[1].name = item.name
      }
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.queryParameters.page = 1
      this.newIndustryList = index
      this.queryParameters.industryBelongCode = item.id
      this.getProjectTypeByIndustryBelongId(item.id)
      this.getEnterpriseProjectByCondition()
    },
    // 选择类别
    changeType (item, index) {
      if (item.name == '不限') {
        this.dynamicTags[2].name = ''
      } else {
        this.dynamicTags[2].name = item.name
      }
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.queryParameters.page = 1
      this.sortActiveFlag = index
      this.queryParameters.projectTypeCode = item.id
      this.getEnterpriseProjectByCondition()
    },
    // 确定开工日期or竣工日期or建筑面积
    confirmStart (val) {
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.queryParameters.page = 1
      if (val == 'kai') {
        // 开工日期
        if (this.projectStart) {
          let str = '开工日期：' + this.projectStart[0] + ' - ' + this.projectStart[1]
          this.dynamicTags[3].name = str
          this.queryParameters.projectStartFirst = this.projectStart[0]
          this.queryParameters.projectStartLast = this.projectStart[1]
          this.getEnterpriseProjectByCondition()
        }
      }
      if (val == 'jun') {
        // 竣工日期
        if (this.projectEnd) {
          let str = '竣工日期：' + this.projectEnd[0] + ' - ' + this.projectEnd[1]
          this.dynamicTags[4].name = str
          this.queryParameters.projectEndFirst = this.projectEnd[0]
          this.queryParameters.projectEndLast = this.projectEnd[1]
          this.getEnterpriseProjectByCondition()
        }
      }
    },
    // 选择建设性质
    changeNature (item, index) {
      if (item.name == '不限') {
        this.dynamicTags[5].name = ''
      } else {
        this.dynamicTags[5].name = item.name
      }
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.natureFlag = index
      this.queryParameters.page = 1
      this.queryParameters.projectNatureCode = item.id
      this.getEnterpriseProjectByCondition()
    },
    // 搜索框查询项目
    searchResult () {
      this.queryParameters.page = 1
      this.queryParameters.projectCode = this.searchWord // 项目编号
      this.queryParameters.projectName = this.searchWord // 项目名称
      this.queryParameters.doSide = this.searchWord // 建设单位
      this.queryParameters.searchBoxWord = this.searchWord // 搜索框搜索时的关键字
      this.queryParameters.searchBox = true
      this.getEnterpriseProjectByCondition()
    },
    // 清空所有筛选条件
    emptying () {
      this.dynamicTags = [
        // { name: '' },       //项目范围0
        { name: '' }, // 省市区  0
        { name: '' }, // 项目行业1
        { name: '' }, // 类型2
        { name: '' }, // 开工时间3
        { name: '' }, // 竣工时间4
        { name: '' }, // 建设性质5
        { name: '' }, // 竣工时间6
        { name: '' } // 建筑面积7
      ]
      this.queryParameters.businessCategoryCode1 = '' // 项目分类1
      this.queryParameters.businessCategoryCode2 = '' // 项目分类2
      this.queryParameters.industryBelongCode = '' // 所属行业编码
      this.queryParameters.projectEndFirst = null
      this.queryParameters.projectEndLast = null
      this.queryParameters.projectStartFirst = null
      this.queryParameters.projectStartLast = null
      this.queryParameters.projectTypeCode = '' // 工程类别编码
      this.queryParameters.projectNatureCode = '' // 建设性质
      this.queryParameters.totalAreaFirst = ''
      this.queryParameters.totalAreaLast = ''
      this.queryParameters.provinceCode = '' // 省
      this.queryParameters.cityCode = '' // 市
      this.queryParameters.distinctCode = '' // 区
      this.queryParameters.userId = ''
      this.queryParameters.page = 1
      this.projectStart = '' // 开工日期
      this.projectEnd = '' // 竣工日期
      this.builtupAreaS = '' // 建筑面积小
      this.builtupAreaB = '' // 建筑面积大
      this.loop()
      this.getEnterpriseProjectByCondition()
    },
    // 翻页
    handleCurrentChange (val) {
      this.queryParameters.page = val
      this.getEnterpriseProjectByCondition()
    },
    handleSizeChange (val) {
      this.queryParameters.page = 1
      this.queryParameters.size = val
      this.getEnterpriseProjectByCondition()
    },
    // 列表上部翻页
    paging (val) {
      if (val == '-') {
        if (this.queryParameters.page + 1 > 1) {
          this.queryParameters.page = this.queryParameters.page - 1
          if (this.queryParameters.page >= 1) {
            this.getEnterpriseProjectByCondition()
          } else {
            this.queryParameters.page = 1
          }
        }
      }
      if (val == '+') {
        if (this.tableData.totalPages >= this.queryParameters.page + 1) {
          this.queryParameters.page = this.queryParameters.page + 1
          this.getEnterpriseProjectByCondition()
        }
      }
    },
    handleClose (tag) {
      // 删除项目地点省市区
      if (this.dynamicTags.indexOf(tag) == 0) {
        this.proFlag = 0 // 省份选择
        this.cityflag = 0 // 地市选择
        this.countyflag = 0 // 区县选择
        this.queryParameters.provinceCode = null
        this.queryParameters.cityCode = null
        this.queryParameters.distinctCode = null
      }
      // 删除项目行业
      if (this.dynamicTags.indexOf(tag) == 1) {
        this.newIndustryList = 0
        this.queryParameters.industryBelongCode = ''
      }
      // 删除类别
      if (this.dynamicTags.indexOf(tag) == 2) {
        this.sortActiveFlag = 0
        this.queryParameters.projectTypeCode = ''
      }
      // 删除开工日期
      if (this.dynamicTags.indexOf(tag) == 3) {
        this.projectStart = ''
        this.queryParameters.projectStartFirst = null
        this.queryParameters.projectStartLast = null
      }
      // 删除竣工日期
      if (this.dynamicTags.indexOf(tag) == 4) {
        this.projectEnd = ''
        this.queryParameters.projectEndFirst = null
        this.queryParameters.projectEndLast = null
      }
      // 删除建设性质
      if (this.dynamicTags.indexOf(tag) == 5) {
        this.natureFlag = 0
        this.queryParameters.projectNatureCode = ''
      }
      this.dynamicTags[this.dynamicTags.indexOf(tag)].name = ''
      if (this.searchWord) {
        this.queryParameters.searchBox = true
      } else {
        this.queryParameters.searchBox = false
      }
      this.getEnterpriseProjectByCondition()
    },
    // 排序
    sortChange (column, prop, order) {
      this.queryParameters.page = 1
      // 创建时间
      if (column.prop == 'createAt') {
        delete this.queryParameters.projectStartSort
        delete this.queryParameters.projectEndSort
        if (column.order == 'descending') {
          // 降序
          this.queryParameters.createAtSort = true // 降序
        } else {
          this.queryParameters.createAtSort = false
        }
      }
      // 开工日期
      if (column.prop == 'projectStart') {
        delete this.queryParameters.createAtSort
        delete this.queryParameters.projectEndSort
        if (column.order == 'descending') {
          // 降序
          this.queryParameters.projectStartSort = true
        } else {
          this.queryParameters.projectStartSort = false
        }
      }
      // 竣工日期
      if (column.prop == 'projectEnd') {
        delete this.queryParameters.createAtSort
        delete this.queryParameters.projectStartSort
        if (column.order == 'descending') {
          // 降序
          this.queryParameters.projectEndSort = true
        } else {
          this.queryParameters.projectEndSort = false
        }
      }
      this.getEnterpriseProjectByCondition()
    },
    // 打开详情页
    rowClick (row, column, event) {
      let typeDiv = new RegExp('typeDiv').test(event.target.className)
      if (!typeDiv && this.permissionlookProject) {
        this.$router.push('/projectLibrary/detail/projectInfo/' + row.id)
      }
    }
    // // 项目详情和造价指标跳转
    // gotoDetail(param, row) {
    //   if (param === 'info') {
    //     this.$router.push('/projectLibrary/detail/projectInfo/' + row.id)
    //   } else if (param === 'cost') {
    //     if (row.creatorId && row.creatorId == localStorage.userId) {
    //       this.$router.push({ path: '/projectLibrary/detail/IndexData/engineeringCost', query: { id: row.id } })
    //     } else {
    //       this.dialogVisible = true
    //     }
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.container {
  box-sizing: border-box;
  &.main {
    padding: 15px 0;
    min-height: e('calc(100vh - 90px)');
    .search-words {
      height: 18px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(68, 68, 68, 1);
      line-height: 18px;
      margin-bottom: 11px;
    }
    .search {
      height: 30px;
      input {
        width: 559px;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #d8e0f5;
        padding-left: 12px;
        &::placeholder {
          color: #bebebe;
          font-size: 12px;
        }
      }
      button {
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        width: 70px;
        box-sizing: border-box;
        color: #fff;
        background-color: #ffa21d;
        margin-left: 6px;
        padding: 0 12px 0 30px;
        background-image: url(~@/assets/img/searchPic.png);
        background-repeat: no-repeat;
        background-position: 9px center;
      }
    }
    .tabulation {
      > div:first-child {
        color: #666666;
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        > span {
          cursor: pointer;
          vertical-align: middle;
        }
        img {
          cursor: pointer;
          vertical-align: middle;
        }
      }
      .chpro {
        font-size: 12px;
        background-color: #f7f8f9;
        .sureBtn {
          cursor: pointer;
          width: 40px;
          height: 26px;
          line-height: 26px;
          color: #606266;
          background-color: #eee;
          border: 1px solid #e3e2e2;
          text-align: center;
        }
        > div {
          padding: 5px 15px;
          & + div {
            border-top: 1px solid #eff2f9;
          }
          > span {
            color: #bebebe;
            margin-right: 10px;
            margin-top: 7px;
          }
          > div {
            width: 94%;
            > ul {
              & + ul {
                margin-top: 5px;
              }
              li {
                cursor: pointer;
                display: inline-block;
                // margin-right: 10px;
                &.active {
                  background-color: #f2f7ff;
                }
              }
              &.single-selection {
                margin-left: -12px;
                li {
                  color: #444;
                  font-size: 12px;
                  font-weight: 400;
                  padding: 7px 10px;
                }
                .classPro {
                  color: #4474cf;
                }
                .classCity {
                  color: #4474cf;
                }
                .classCounty {
                  color: #4474cf;
                }
                .classType {
                  color: #4474cf;
                }
                .classNature {
                  color: #4474cf; //建设性质
                }
                .classIndustry {
                  color: #4474cf;
                }
                .classClassify {
                  color: #4474cf;
                }
                .classDetailed {
                  color: #4474cf;
                }
                .classRange {
                  color: #4474cf;
                }
              }
            }
          }
          &:nth-child(2) {
            i.icon {
              cursor: pointer;
              font-size: 24px;
              margin-top: 3px;
            }
          }
        }
      }
      .allResult {
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        > span:first-child {
          font-size: 12px;
          color: #666;
        }
        > .clear-all {
          cursor: pointer;
          display: inline-block;
          height: 100%;
          color: #ed4542;
          border: 1px #ed4542 dashed;
          border-radius: 4px;
          margin-left: 15px;
          padding: 0 10px;
        }
        .el-tag {
          margin-left: 10px;
        }
      }
    }
    .my_project {
      .list-name {
        float: left;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(68, 68, 68, 1);
      }
      .proRig {
        float: right;
        > span {
          margin-right: 20px;
        }
        > b {
          margin: 0 20px;
          font-size: 14px;
        }
        > a {
          display: inline-block;
          width: 35px;
          height: 18px;
          line-height: 18px;
          font-size: 16px;
          text-align: center;
        }
      }
    }
    .project-tables {
      .reveal {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        margin-left: 60px;
      }
      .block {
        text-align: right;
        margin-right: 40px;
        margin-top: 10px;
      }
    }
    .typeDiv {
      height: 20px;
      width: 34px;
      display: inline-block;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-weight: 400;
      margin-left: 5px;
      cursor: pointer;
      .typeDiv:last-child {
        margin-left: 0;
      }
    }
    .greens {
      background: #f3fff8;
      border: 1px solid rgba(100, 183, 132, 1);
      color: rgba(100, 183, 132, 1);
    }
    .blues {
      background: #f1f7fe;
      border: 1px solid rgba(56, 126, 197, 1);
      color: rgba(56, 126, 197, 1);
    }
    .oras {
      background: #fcf6ec;
      border: 1px solid rgba(254, 163, 19, 1);
      color: rgba(255, 156, 0, 1);
    }
    .reds {
      background: #fef2f0;
      border: 1px solid rgba(237, 71, 49, 1);
      color: rgba(237, 71, 49, 1);
    }
  }
}
.el-dialog__body {
  text-align: center;
}
</style>
<style scoped>
.project-tables >>> .el-table__row {
  cursor: pointer;
}
.project-tables >>> .el-table th {
  padding: 0;
}
</style>
