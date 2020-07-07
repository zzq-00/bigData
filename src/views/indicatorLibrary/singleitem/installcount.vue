<template>
  <div class="self-table">
    <!-- <button class="btn" @click="ExcelCommon">导出</button> -->
    <el-table :data="indexData" class="scroll-table" border v-loading="loading" stripe :class="{'fixedHeader': headerFixed}">
      <el-table-column label align="center" width="350">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col levelO">
              <span class="table-cell">
                <input type="button" v-model="status1[scope.row.indexs]" class="inputBtn" @click="changestatus(scope.row,scope.row.indexs)">
                <span class="colFrist-name">{{scope.row.buildingName}}</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col levelS">
                  <span class="table-cell">
                    <input type="button" v-model="item.inputValue" class="inputBtn" @click="changestatus2(item,scope.row.indexs,index)">
                    <span class="colFrist-name">{{item.unitProjectName}}</span>
                  </span>
                </p>
                <div v-for="(items,indexs) in item.installationQuantitySpecialityList" :key="indexs">
                  <template v-if="item.isshow">
                    <p class="col levelT">
                      <span class="table-cell">
                        <input type="button" v-model="items.inputValue" class="inputBtn" @click="changestatus3(items,scope.row.indexs,index,indexs)">
                        <span class="colFrist-name">{{items.specialityName}}</span>
                      </span>
                    </p>
                    <div v-for="(itemss,indexss) in items.subdivisionList" :key="indexss">
                      <template v-if="items.isshow">
                        <p class="col levelF">
                          <span class="table-cell">
                            <input type="button" v-model="itemss.inputValue" class="inputBtn" @click="changestatus4(itemss,scope.row.indexs,index,indexs,indexss)">
                            <span class="colFrist-name">{{itemss.subdivision}}</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,indexsss) in itemss.installationQuantityList" :key="indexsss">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col levelFi">
                              <span class="table-cell">
                                <span class="colFrist-name">{{itemsss.code}}</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>

                </div>
              </template>

            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="left" :render-header="rendername" filter-placement="bottom-end">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name">--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name">--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name">--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name">--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name">{{itemsss.name}}</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>

                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="材质" align="left" :render-header="rendermaterial" filter-placement="bottom-end">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name">--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name">--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name">--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name">--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name" v-if="itemsss.material||itemsss.material==0">{{itemsss.material}}</span>
                                <span class="colFrist-name" v-else>--</span>
                              </span>
                            </p>
                          </template>

                        </div>
                      </template>

                    </div>
                  </template>

                </div>
              </template>

            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="规格" align="left" :render-header="renderspecification" filter-placement="bottom-end">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name">--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name">--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name">--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name">--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name namelimit" :title="itemsss.specification">{{itemsss.specification}}</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="left" :render-header="renderunit" filter-placement="bottom-end">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name">--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name">--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name">--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name">--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name">{{itemsss.unit}}</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="left">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name" v-if="scope.row.count||scope.row.count==0">{{scope.row.count}}</span>
                <span class="colFrist-name" v-else>--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name" v-if="item.count||item.count==0">{{item.count}}</span>
                    <span class="colFrist-name" v-else>--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name" v-if="items.count||items.count==0">{{items.count}}</span>
                        <span class="colFrist-name" v-else>--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name" v-if="itemss.count||itemss.count==0">{{itemss.count}}</span>
                            <span class="colFrist-name" v-else>--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name" v-if="itemsss.quantity||itemsss.quantity==0">{{itemsss.quantity}}</span>
                                <span class="colFrist-name" v-else>--</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单方含量(/㎡)" align="left">
        <template slot-scope="scope">
          <div class="frist-title">
            <p class="col centers">
              <span class="table-cell">
                <span class="colFrist-name" v-if="scope.row.content||scope.row.content==0">{{scope.row.content}}</span>
                <span class="colFrist-name" v-else>--</span>
              </span>
            </p>
            <div class="second-title" v-for="(item,index) in scope.row.installationQuantityUnitProjectList" :key="index">
              <template v-if="scope.row.isshow">
                <p class="col centers">
                  <span class="table-cell">
                    <span class="colFrist-name" v-if="item.content||item.content==0">{{item.content}}</span>
                    <span class="colFrist-name" v-else>--</span>
                  </span>
                </p>
                <div v-for="(items,index) in item.installationQuantitySpecialityList" :key="index">
                  <template v-if="item.isshow">
                    <p class="col centers">
                      <span class="table-cell">
                        <span class="colFrist-name" v-if="items.content||items.content==0">{{items.content}}</span>
                        <span class="colFrist-name" v-else>--</span>
                      </span>
                    </p>
                    <div v-for="(itemss,index) in items.subdivisionList" :key="index">
                      <template v-if="items.isshow">
                        <p class="col centers">
                          <span class="table-cell">
                            <span class="colFrist-name" v-if="itemss.content||itemss.content==0">{{itemss.content}}</span>
                            <span class="colFrist-name" v-else>--</span>
                          </span>
                        </p>
                        <div v-for="(itemsss,index) in itemss.installationQuantityList" :key="index">
                          <template v-if="itemss.isshow&&itemsss.matchingName&&itemsss.matchingTexture&&itemsss.matchingSpecification&&itemsss.matchingUnit">
                            <p class="col centers">
                              <span class="table-cell">
                                <span class="colFrist-name" v-if="itemsss.quantityPerSquare||itemsss.quantityPerSquare==0">{{itemsss.quantityPerSquare}}</span>
                                <span class="colFrist-name" v-else>--</span>
                              </span>
                            </p>
                          </template>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pop-box" :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x - posSreen.x +'px'}" v-show="renderData.show">
      <div class="filter_div" v-show="condition==1">
        <el-input placeholder="请输入关键字搜索" v-model="inputName" clearable></el-input>
        <p class="cancelchoose" v-if="filterDataParams.name.length>0||storage.names.length>0" @click.stop="calcelHavechosen('name')">取消已选项
        </p>
        <ul class="filterUl">
          <li @click.stop="changeFilterName(item,index)" v-for="(item,index) in filterContions.filterNameList" :key="index" :class="{'name_filter':item.checked}">{{item.name}}</li>
        </ul>
        <p class="sure-btn" v-if="filterContions.filterNameList.length>0">
          <button @click.stop="sureHavechosen('name')">确定</button>
        </p>
      </div>
      <div class="filter_div" v-show="condition==2">
        <el-input placeholder="请输入关键字搜索" v-model="inputMaterial" clearable></el-input>
        <p class="cancelchoose" v-if="filterDataParams.texture.length>0||storage.textures.length>0" @click.stop="calcelHavechosen('texture')">取消已选项
        </p>
        <ul class="filterUl">
          <li @click.stop="changeFilterMat(item,index)" v-for="(item,index) in filterContions.filterTextureList" :key="index" :class="{'name_filter':item.checked}">{{item.texture}}</li>
        </ul>
        <p class="sure-btn" v-if="filterContions.filterTextureList.length>0">
          <button @click.stop="sureHavechosen('texture')">确定</button>
        </p>
      </div>
      <div class="filter_div" v-show="condition==3">
        <el-input placeholder="请输入关键字搜索" v-model="inputspe" clearable></el-input>
        <p class="cancelchoose" v-if="filterDataParams.specification.length>0||storage.specifications.length>0" @click.stop="calcelHavechosen('specification')">取消已选项
        </p>
        <ul class="filterUl">
          <li @click.stop="changeFilterSpe(item,index)" v-for="(item,index) in filterContions.filterSpecificationList" :key="index" :class="{'name_filter':item.checked}">{{item.specification}}</li>
        </ul>
        <p class="sure-btn" v-if="filterContions.filterSpecificationList.length>0">
          <button @click.stop="sureHavechosen('specification')">确定</button>
        </p>
      </div>
      <div class="filter_div" v-show="condition==4">
        <el-input placeholder="请输入关键字搜索" v-model="inputUnit" clearable></el-input>
        <p class="cancelchoose" v-if="filterDataParams.unit.length>0||storage.units.length>0" @click.stop="calcelHavechosen('unit')">取消已选项
        </p>
        <ul class="filterUl">
          <li @click.stop="changeFilterUnit(item,index)" v-for="(item,index) in filterContions.filterUnitList" :key="index" :class="{'name_filter':item.checked}">{{item.unit}}</li>
        </ul>
        <p class="sure-btn" v-if="filterContions.filterUnitList.length>0">
          <button @click.stop="sureHavechosen('unit')">确定</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import tool from '@/assets/js/useMoreTool'
import api from '@/fetch/api'
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'
export default {
  props: ['fixTabs'],
  data () {
    return {
      headerFixed: false,
      projectId: this.$route.query.projectId,
      indexData: [], // 请求到的数据
      status1: [], // 一级折叠
      loading: true, // 加载动画
      options: [],
      monoData: [], // 请求到的单体数据
      request: {
        // 单体详情请求数据
        subdivisionId: '',
        unitProjectId: ''
      },
      filterParams: {
        name: '',
        names: [],
        projectId: '', // 获取筛选条件的项目ID
        specification: '', // 规格
        specifications: [],
        texture: '', // 材质
        textures: [],
        unit: '', // 单位
        units: [],
        monomerId: (() => this.$route.params.monomerId)()
      },
      filterContions: {
        filterNameList: [], // 名称
        filterTextureList: [], // 材质
        filterSpecificationList: [], // 规格
        filterUnitList: [] // 单位
      }, // 筛选条件
      // render函数的数据
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      inputName: '', // 筛选名称输入关键字
      inputMaterial: '', // 筛选材质输入关键字
      inputspe: '', // 筛选规格输入关键字
      inputUnit: '', // 筛选单位输入关键字
      condition: '',
      ExportParams: {
        // 导出excel需要的参数
        flag: '4',
        monomerId: (() => this.$route.params.monomerId)()
      },
      params: {
        classId: '',
        indicatorCode: '',
        monomerId: (() => this.$route.params.monomerId)(),
        productCode: '',
        projectId: '',
        subdivisionId: '',
        unitProjectId: ''
      },
      oneDataList: [], // 安装指标第一层数据
      screeningModel: false, // 筛选模式
      filterDataParams: {
        texture: [], // 材质
        monomerId: (() => this.$route.params.monomerId)(),
        name: [], // 名称
        specification: [], // 规格
        unit: [] // 单位
      },
      filteredData: [], // 筛选之后的数据
      storage: {
        names: [],
        textures: [],
        specifications: [],
        units: []
      },
      firstChoice: null, // 第一次选择的筛选条件是什么 名称？材质？规格还是单位？
      secondChoice: null,
      threeChoice: null,
      fourChoice: null,
      lastChoice: null, // 最后一次选择的筛选条件
      newFilterArr: {
        // 当筛选条件为空时，得到的筛选列表数据
        filterNameList: [], // 名称
        filterTextureList: [], // 材质
        filterSpecificationList: [], // 规格
        filterUnitList: [] // 单位
      }
    }
  },
  watch: {
    // 名称
    inputName (val, oldVal) {
      this.filterParams.name = val
      this.getFilter()
      if (val == '') {
        this.functions('1')
      }
    },
    // 材质
    inputMaterial (val, oldVal) {
      this.filterParams.texture = val
      this.getFilter()
      if (val == '') {
        this.functions('2')
      }
    },
    // 规格
    inputspe (val, oldVal) {
      this.filterParams.specification = val
      this.getFilter()
      if (val == '') {
        this.functions('3')
      }
    },
    // 单位
    inputUnit (val, oldVal) {
      this.filterParams.unit = val
      this.getFilter()
      if (val == '') {
        this.functions('4')
      }
    },
    fixTabs (val) {
      this.headerFixed = val
    },
    // 监听筛选条件 如果筛选条件存在 筛选ICON高亮
    storage: {
      handler (newValue, oldValue) {
        // 材质
        if (newValue.textures.length > 0) {
          document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        } else {
          document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        }
        // 名称
        if (newValue.names.length > 0) {
          document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        } else {
          document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        }
        // 规格
        if (newValue.specifications.length > 0) {
          document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        } else {
          document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        }
        // 单位
        if (newValue.units.length > 0) {
          document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        } else {
          document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        }
      },
      deep: true
    },
    renderData: {
      handler (val, oldVal) {
        if (!val.show) {
          if (this.storage.names.length == 0) {
            document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconN.png')})`
          } else {
            document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconY.png')})`
          }
          if (this.storage.textures.length == 0) {
            document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconN.png')})`
          } else {
            document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconY.png')})`
          }
          if (this.storage.specifications.length == 0) {
            document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconN.png')})`
          } else {
            document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconY.png')})`
          }
          if (this.storage.units.length == 0) {
            document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconN.png')})`
          } else {
            document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconY.png')})`
          }
        }
        if (val.show) {
          this.getFilter()
        }
      },
      deep: true
    }
  },
  methods: {
    // 取消名称的选择
    calcelHavechosen (val) {
      if (val == 'name') {
        this.filterDataParams.name = []
        this.filterContions.filterNameList.map(item => {
          item.checked = false
        })
      }
      if (val == 'texture') {
        this.filterDataParams.texture = []
        this.filterContions.filterTextureList.map(item => {
          item.checked = false
        })
      }
      if (val == 'specification') {
        this.filterDataParams.specification = []
        this.filterContions.filterSpecificationList.map(item => {
          item.checked = false
        })
      }
      if (val == 'unit') {
        this.filterDataParams.unit = []
        this.filterContions.filterUnitList.map(item => {
          item.checked = false
        })
      }
    },
    // 确定筛选
    sureHavechosen (val) {
      this.renderData.show = false
      if (val == 'name') {
        // 如果 名称的筛选条件是在所有的筛选条件里第一个点击，那么做个标记 名称的筛选列表要全部展示出来
        if (this.filterDataParams.name.length > 0 && this.filterDataParams.specification.length == 0 && this.filterDataParams.texture.length == 0 && this.filterDataParams.unit.length == 0) {
          this.firstChoice = 'name'
        }
        if (this.filterDataParams.name.length > 0 && this.firstChoice != 'name' && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = 'name'
        } else if (this.filterDataParams.name.length == 0 && this.firstChoice != 'name' && this.secondChoice == 'name' && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = ''
        }
        if (this.filterDataParams.name.length > 0 && this.firstChoice != 'name' && this.secondChoice != 'name' && !this.threeChoice && !this.fourChoice) {
          this.threeChoice = 'name'
        } else if (this.filterDataParams.name.length == 0 && this.firstChoice != 'name' && this.secondChoice != 'name' && this.threeChoice == 'name' && !this.fourChoice) {
          this.threeChoice = ''
        }
        if (this.filterDataParams.name.length > 0 && this.firstChoice != 'name' && this.secondChoice != 'name' && this.threeChoice != 'name' && !this.fourChoice) {
          this.fourChoice = 'name'
        } else if (this.filterDataParams.name.length == 0 && this.firstChoice != 'name' && this.secondChoice != 'name' && this.threeChoice != 'name' && this.fourChoice == 'name') {
          this.fourChoice = ''
        }
        this.storage.names = []
        this.filterContions.filterNameList.map(item => {
          if (item.checked) {
            this.storage.names.push(item)
          }
        })
        let names = []
        if (this.storage.names) {
          this.storage.names.map(item => {
            names.push(item.name)
          })
        }
        this.filterParams.names = names
      }
      if (val == 'texture') {
        if (this.filterDataParams.texture.length > 0 && this.filterDataParams.name.length == 0 && this.filterDataParams.specification.length == 0 && this.filterDataParams.unit.length == 0) {
          this.firstChoice = 'texture'
        }
        if (this.filterDataParams.texture.length > 0 && this.firstChoice != 'texture' && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = 'texture'
        } else if (this.filterDataParams.texture.length == 0 && this.firstChoice != 'texture' && this.secondChoice == 'texture' && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = ''
        }
        if (this.filterDataParams.texture.length > 0 && this.firstChoice != 'texture' && this.secondChoice != 'texture' && !this.threeChoice && !this.fourChoice) {
          this.threeChoice = 'texture'
        } else if (this.filterDataParams.texture.length == 0 && this.firstChoice != 'texture' && this.secondChoice != 'texture' && this.threeChoice == 'texture' && !this.fourChoice) {
          this.threeChoice = ''
        }
        if (this.filterDataParams.texture.length > 0 && this.firstChoice != 'texture' && this.secondChoice != 'texture' && this.threeChoice != 'texture' && !this.fourChoice) {
          this.fourChoice = 'texture'
        } else if (this.filterDataParams.texture.length == 0 && this.firstChoice != 'texture' && this.secondChoice != 'texture' && this.threeChoice != 'texture' && this.fourChoice == 'texture') {
          this.fourChoice = ''
        }
        this.storage.textures = []
        this.filterContions.filterTextureList.map(item => {
          if (item.checked) {
            this.storage.textures.push(item)
          }
        })
        let textures = []
        if (this.storage.textures) {
          this.storage.textures.map(item => {
            textures.push(item.texture)
          })
        }
        this.filterParams.textures = textures
      }
      if (val == 'specification') {
        if (this.filterDataParams.specification.length > 0 && this.filterDataParams.name.length == 0 && this.filterDataParams.texture.length == 0 && this.filterDataParams.unit.length == 0) {
          this.firstChoice = 'specification'
        }
        if (this.filterDataParams.specification.length > 0 && this.firstChoice != 'specification' && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = 'specification'
        } else if (this.filterDataParams.specification.length == 0 && this.firstChoice != 'specification' && this.secondChoice == 'specification' && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = ''
        }
        if (this.filterDataParams.specification.length > 0 && this.firstChoice != 'specification' && this.secondChoice != 'specification' && !this.threeChoice && !this.fourChoice) {
          this.threeChoice = 'specification'
        } else if (this.filterDataParams.specification.length == 0 && this.firstChoice != 'specification' && this.secondChoice != 'specification' && this.threeChoice == 'specification' && !this.fourChoice) {
          this.threeChoice = ''
        }
        if (this.filterDataParams.specification.length > 0 && this.firstChoice != 'specification' && this.secondChoice != 'specification' && this.threeChoice != 'specification' && !this.fourChoice) {
          this.fourChoice = 'specification'
        } else if (this.filterDataParams.specification.length == 0 && this.firstChoice != 'specification' && this.secondChoice != 'specification' && this.threeChoice != 'specification' && this.fourChoice == 'specification') {
          this.fourChoice = ''
        }
        this.storage.specifications = []
        this.filterContions.filterSpecificationList.map(item => {
          if (item.checked) {
            this.storage.specifications.push(item)
          }
        })
        let specifications = []
        if (this.storage.specifications) {
          this.storage.specifications.map(item => {
            specifications.push(item.specification)
          })
        }
        this.filterParams.specifications = specifications
      }
      if (val == 'unit') {
        if (this.filterDataParams.unit.length > 0 && this.filterDataParams.name.length == 0 && this.filterDataParams.texture.length == 0 && this.filterDataParams.specification.length == 0) {
          this.firstChoice = 'unit'
        }
        if (this.filterDataParams.unit.length > 0 && this.firstChoice != 'unit' && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = 'unit'
        } else if (this.filterDataParams.unit.length == 0 && this.firstChoice != 'unit' && this.secondChoice == 'unit' && !this.threeChoice && !this.fourChoice) {
          this.secondChoice = ''
        }
        if (this.filterDataParams.unit.length > 0 && this.firstChoice != 'unit' && this.secondChoice != 'unit' && !this.threeChoice && !this.fourChoice) {
          this.threeChoice = 'unit'
        } else if (this.filterDataParams.unit.length == 0 && this.firstChoice != 'unit' && this.secondChoice != 'unit' && this.threeChoice == 'unit' && !this.fourChoice) {
          this.threeChoice = ''
        }
        if (this.filterDataParams.unit.length > 0 && this.firstChoice != 'unit' && this.secondChoice != 'unit' && this.threeChoice != 'unit' && !this.fourChoice) {
          this.fourChoice = 'unit'
        } else if (this.filterDataParams.unit.length == 0 && this.firstChoice != 'unit' && this.secondChoice != 'unit' && this.threeChoice != 'unit' && this.fourChoice == 'unit') {
          this.fourChoice = ''
        }
        this.storage.units = []
        this.filterContions.filterUnitList.map(item => {
          if (item.checked) {
            this.storage.units.push(item)
          }
        })
        let units = []
        if (this.storage.units) {
          this.storage.units.map(item => {
            units.push(item.unit)
          })
        }
        this.filterParams.units = units
      }
      if (this.fourChoice) {
        switch (this.fourChoice) {
          case 'name':
            this.lastChoice = 'name'
            break
          case 'texture':
            this.lastChoice = 'texture'
            break
          case 'specification':
            this.lastChoice = 'specification'
            break
          case 'unit':
            this.lastChoice = 'unit'
          default:
            break
        }
      }
      if (!this.fourChoice && this.threeChoice) {
        switch (this.threeChoice) {
          case 'name':
            this.lastChoice = 'name'
            break
          case 'texture':
            this.lastChoice = 'texture'
            break
          case 'specification':
            this.lastChoice = 'specification'
            break
          case 'unit':
            this.lastChoice = 'unit'
          default:
            break
        }
      }
      if (!this.fourChoice && !this.threeChoice && this.secondChoice) {
        switch (this.secondChoice) {
          case 'name':
            this.lastChoice = 'name'
            break
          case 'texture':
            this.lastChoice = 'texture'
            break
          case 'specification':
            this.lastChoice = 'specification'
            break
          case 'unit':
            this.lastChoice = 'unit'
          default:
            break
        }
      }
      if (this.filterDataParams.name.length == 0 && this.filterDataParams.texture.length == 0 && this.filterDataParams.specification.length == 0 && this.filterDataParams.unit == 0) {
        this.installIndicatorOne().then(res => {
          this.installIndicatorTwo().then(res => {})
        })
      } else {
        this.installFilters()
      }
      this.getFilter()
    },
    // 当筛选框为空时的函数
    functions (val) {
      this.indexData.map((it, index1) => {
        if (it.installationQuantityUnitProjectList) {
          it.installationQuantityUnitProjectList.map((its, index2) => {
            if (its.installationQuantitySpecialityList) {
              its.installationQuantitySpecialityList.map((itss, index3) => {
                if (itss.subdivisionList) {
                  itss.subdivisionList.map((itsss, index4) => {
                    if (itsss.installationQuantityList) {
                      itsss.installationQuantityList.map((itemssss, index5) => {
                        if (val == '1') {
                          itemssss.matchingName = true // 这个是为了筛选条件设置
                        }
                        if (val == '2') {
                          itemssss.matchingTexture = true // 这个是为了筛选条件设置
                        }
                        if (val == '3') {
                          itemssss.matchingSpecification = true // 这个是为了筛选条件设置
                        }
                        if (val == '4') {
                          itemssss.matchingUnit = true // 这个是为了筛选条件设置
                        }
                        this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3].subdivisionList[index4].installationQuantityList[index5] = itemssss
                        this.$set(this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3].subdivisionList[index4].installationQuantityList, 5, itemssss)
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },

    ExcelCommon () {
      api
        .ExcelCommon(this.ExportParams)
        .then(res => {
          downloadBlob(res, '安装算量指标')
          this.$message({
            showClose: true,
            message: '导出成功',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message({
            showClose: true,
            message: '导出文件失败',
            type: 'error'
          })
        })
    },
    // 控制一级折叠
    changestatus (item, index) {
      if (this.status1[index] == '+') {
        this.$set(this.status1, index, '-')
        item.isshow = true
        return
      }
      if (this.status1[index] == '-') {
        this.$set(this.status1, index, '+')
        item.isshow = false
      }
    },
    // 控制二级折叠
    changestatus2 (item, index1, index2) {
      if (item.inputValue == '+') {
        item.inputValue = '-'
        item.isshow = true
        if (!this.screeningModel) {
          this.installIndicatorThree(item.buildingId, item.unitProjectId).then(res => {
            this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList = this.threeDataList
            this.$set(this.indexData, index1, this.indexData[index1])
          })
        } else {
          this.indexData[index1].installationQuantityUnitProjectList[index2] = item
          this.$set(this.indexData, index1, this.indexData[index1])
        }
        return
      }
      if (item.inputValue == '-') {
        item.inputValue = '+'
        item.isshow = false
        this.indexData[index1].installationQuantityUnitProjectList[index2] = item
        this.$set(this.indexData, index1, this.indexData[index1])
      }
    },
    // 控制三级折叠
    changestatus3 (items, index1, index2, index3) {
      if (items.inputValue == '+') {
        items.inputValue = '-'
        if (!this.screeningModel) {
          this.installIndicatorFour(items.buildingId, items.unitProjectId, items.specialityId).then(res => {
            this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3].subdivisionList = this.fourDataList
            this.$set(this.indexData, index1, this.indexData[index1])
            items.isshow = true
          })
        } else {
          this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3] = items
          this.$set(this.indexData, index1, this.indexData[index1])
          items.isshow = true
        }
        return
      }
      if (items.inputValue == '-') {
        items.inputValue = '+'
        this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3] = items
        this.$set(this.indexData, index1, this.indexData[index1])
        items.isshow = false
      }
    },
    // 控制四级折叠
    changestatus4 (itemss, index1, index2, index3, index4) {
      if (itemss.inputValue == '+') {
        itemss.inputValue = '-'
        this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3].subdivisionList[index4] = itemss
        this.$set(this.indexData, index1, this.indexData[index1])
        itemss.isshow = true
        this.request.subdivisionId = itemss.subdivisionId
        this.request.unitProjectId = itemss.unitProjectId
        if (!this.screeningModel) {
          this.getProjectForDetails().then(res => {
            itemss.installationQuantityList = this.monoData
          })
        }
        return
      }
      if (itemss.inputValue == '-') {
        itemss.inputValue = '+'
        this.indexData[index1].installationQuantityUnitProjectList[index2].installationQuantitySpecialityList[index3].subdivisionList[index4] = itemss
        this.$set(this.indexData, index1, this.indexData[index1])
        itemss.isshow = false
      }
    },
    // 名称筛选   多选
    rendername (createElement, { column }) {
      return createElement(
        'div',
        {
          class: 'cell-box'
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskNameShow
            }
          })
        ]
      )
    },
    // 名称点击收放
    maskNameShow (event) {
      this.condition = 1
      let _this = this
      _this.renderData.show = !_this.renderData.show
      _this.renderData.pos = tool.getMousePos(event) // 弹出框位置
      _this.renderData.pos.x = tool.getMousePos(event).x + 200
      _this.renderData.pos.y = tool.getMousePos(event).y - 250
      if (_this.renderData.show) {
        document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconY.png')})`
      } else {
        if (_this.filterDataParams.name.length == 0) {
          document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        } else {
          document.getElementsByClassName('icon-top')[0].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        }
      }
    },
    // 材质筛选   多选
    rendermaterial (createElement, { column }) {
      return createElement(
        'div',
        {
          class: 'cell-box'
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskMaterialShow
            }
          })
        ]
      )
    },
    maskMaterialShow (event) {
      this.condition = 2
      let _this = this
      _this.renderData.show = !_this.renderData.show
      _this.renderData.pos = tool.getMousePos(event) // 弹出框位置
      _this.renderData.pos.x = tool.getMousePos(event).x + 200
      _this.renderData.pos.y = tool.getMousePos(event).y - 250
      if (_this.renderData.show) {
        document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconY.png')})`
      } else {
        if (_this.filterDataParams.texture.length == 0) {
          document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        } else {
          document.getElementsByClassName('icon-top')[1].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        }
      }
    },
    // 规格筛选   多选
    renderspecification (createElement, { column }) {
      return createElement(
        'div',
        {
          class: 'cell-box'
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskSpecificationShow
            }
          })
        ]
      )
    },
    maskSpecificationShow (event) {
      this.condition = 3
      let _this = this
      _this.renderData.show = !_this.renderData.show
      _this.renderData.pos = tool.getMousePos(event) // 弹出框位置
      _this.renderData.pos.x = tool.getMousePos(event).x + 200
      _this.renderData.pos.y = tool.getMousePos(event).y - 250
      if (_this.renderData.show) {
        document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconY.png')})`
      } else {
        if (_this.filterDataParams.specification.length == 0) {
          document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        } else {
          document.getElementsByClassName('icon-top')[2].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        }
      }
    },
    // 单位筛选   单选
    renderunit (createElement, { column }) {
      return createElement(
        'div',
        {
          class: 'cell-box'
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskUnitShow
            }
          })
        ]
      )
    },
    maskUnitShow (event) {
      this.condition = 4
      let _this = this
      _this.renderData.show = !_this.renderData.show
      _this.renderData.pos = tool.getMousePos(event) // 弹出框位置
      _this.renderData.pos.x = tool.getMousePos(event).x + 200
      _this.renderData.pos.y = tool.getMousePos(event).y - 250
      if (_this.renderData.show) {
        document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconY.png')})`
      } else {
        if (_this.filterDataParams.unit.length == 0) {
          document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconN.png')})`
        } else {
          document.getElementsByClassName('icon-top')[3].style.background = `url(${require('@/assets/img/screenIconY.png')})`
        }
      }
    },
    // 名称筛选     方法是给matching
    changeFilterName (item, index) {
      this.filterFuntion(item, index)
    },
    // 材质筛选
    changeFilterMat (item, index) {
      this.filterFuntion(item, index)
    },
    // 规格筛选
    changeFilterSpe (item, index) {
      this.filterFuntion(item, index)
    },
    // 单位
    changeFilterUnit (item, index) {
      this.filterFuntion(item, index)
    },
    // 筛选函数
    filterFuntion (item, index) {
      let filterArr = []
      let obj = {}
      if (item.name) {
        filterArr = this.filterContions.filterNameList
        obj.name = item.name
      }
      if (item.texture) {
        filterArr = this.filterContions.filterTextureList
        obj.texture = item.texture
      }
      if (item.specification) {
        filterArr = this.filterContions.filterSpecificationList
        obj.specification = item.specification
      }
      if (item.unit) {
        filterArr = this.filterContions.filterUnitList
        obj.unit = item.unit
      }
      var check = filterArr[index].checked
      item.checked = !check
      obj.checked = !check
      if (item.unit) {
        filterArr.map(item => {
          item.checked = false
        })
      }
      this.$set(filterArr, index, obj)
      filterArr.map(child => {
        if (child.checked) {
          if (child.name) {
            this.filterDataParams.name.push(child.name)
          }
          if (child.texture) {
            this.filterDataParams.texture.push(child.texture)
          }
          if (child.specification) {
            this.filterDataParams.specification.push(child.specification)
          }
          if (child.unit) {
            this.filterDataParams.unit.push(child.unit)
          }
        }
      })
    },
    installIndicatorOne () {
      return new Promise((resolve, relect) => {
        this.indexData = []
        api
          .installIndicatorOne(this.params)
          .then(res => {
            this.screeningModel = false // 正常请求数据 筛选模式关闭
            this.oneDataList = res.data
            this.options = []
            this.status1 = []
            if (res.data) {
              this.oneDataList.map((item, index) => {
                this.options.push({
                  buildingName: item.buildingName,
                  id: item.id,
                  disabled: false
                })
                item.filter = true // 这个地方是为了上部的筛选 显示全部
                item.isshow = true
                item.indexs = index
                this.status1.push('-')
              })
            }
            this.loading = false
            this.indexData = this.oneDataList
            resolve(this.oneDataList)
          })
          .catch(res => {
            this.loading = false
          })
      })
    },
    installIndicatorTwo () {
      return new Promise((resolve, relect) => {
        if (this.oneDataList) {
          this.oneDataList.map((item, index) => {
            let data = {
              monomerId: item.buildingId
            }
            api.installIndicatorTwo(data).then(res => {
              this.twoDataList = res.data
              if (res.data) {
                item.installationQuantityUnitProjectList = res.data
                item.installationQuantityUnitProjectList.map((items, indexs) => {
                  items.isshow = false
                  items.inputValue = '+'
                })
              }
              resolve(this.twoDataList)
            })
          })
        }
      })
    },
    installFilters () {
      this.filteredData = []
      this.loading = true
      this.screeningModel = true // 筛选模式
      api
        .installFilters(this.filterDataParams)
        .then(res => {
          if (res.errorCode == 200) {
            this.status1 = []
            this.filteredData = res.data
            this.filteredData.installationQuantityUnitProjectList = this.filteredData.unitProjectsDto
            this.filteredData.filter = true
            this.filteredData.isshow = true
            this.filteredData.indexs = 0
            delete this.filteredData.unitProjectsDto
            this.status1.push('-')
            this.filteredData.installationQuantityUnitProjectList.map((item, index) => {
              item.installationQuantitySpecialityList = item.specialityDtoList
              item.isshow = true
              item.inputValue = '-'
              delete item.specialityDtoList
              item.installationQuantitySpecialityList.map((items, indexs) => {
                items.subdivisionList = items.subdivisionDtoList
                items.isshow = true
                items.inputValue = '-'
                delete items.subdivisionDtoList
                items.subdivisionList.map((itemss, indexss) => {
                  itemss.subdivision = itemss.subdivisionName
                  itemss.isshow = true
                  itemss.inputValue = '-'
                  delete itemss.subdivisionName
                  itemss.installationQuantityList.map(itemsss => {
                    itemsss.matchingName = true // 这个是为了筛选条件设置  先全部设为true 点击条件的时候 全部为false  匹配的为真
                    itemsss.matchingTexture = true
                    itemsss.matchingSpecification = true
                    itemsss.matchingUnit = true
                  })
                })
              })
            })
            this.loading = false
            this.indexData = []
            this.indexData.push(this.filteredData)
          } else {
            this.loading = false
          }
        })
        .catch(res => {
          this.indexData = []
          this.loading = false
        })
    },
    // 请求第三级数据
    installIndicatorThree (monomerId, unitProjectId) {
      return new Promise((resolve, reject) => {
        let data = {
          monomerId: monomerId,
          unitProjectId: unitProjectId
        }
        api.installIndicatorThree(data).then(res => {
          this.threeDataList = res.data
          if (this.threeDataList) {
            this.threeDataList.map(item => {
              item.isshow = false
              item.inputValue = '+'
            })
          }
          resolve(this.threeDataList)
        })
      })
    },
    // 请求第四级数据
    installIndicatorFour (monomerId, unitProjectId, specialityId) {
      return new Promise((resolve, reject) => {
        let data = {
          monomerId: monomerId,
          unitProjectId: unitProjectId,
          specialityId: specialityId
        }
        api.installIndicatorFour(data).then(res => {
          this.fourDataList = res.data
          if (this.fourDataList) {
            this.fourDataList.map(item => {
              item.isshow = false
              item.inputValue = '+'
            })
          }
          resolve(this.fourDataList)
        })
      })
    },
    // 请求单体的详情
    getProjectForDetails () {
      return new Promise((resolve, reject) => {
        api.getProjectForDetails(this.request).then(res => {
          this.monoData = res.data
          this.monoData.map(item => {
            item.matchingName = true // 这个是为了筛选条件设置  先全部设为true 点击条件的时候 全部为false  匹配的为真
            item.matchingTexture = true
            item.matchingSpecification = true
            item.matchingUnit = true
          })
          resolve(this.monoData)
        })
      })
    },
    // 获取筛选条件的接口
    getFilter () {
      api.getFilter(this.filterParams).then(res => {
        this.filterContions = res.data
        if (this.filterParams.name == '' && this.filterParams.texture == '' && this.filterParams.specification == '' && this.filterParams.unit == '') {
          if (this.filterParams.names.length == 0 && this.filterParams.specifications.length == 0 && this.filterParams.textures.length == 0 && this.filterParams.units.length == 0) {
            this.newFilterArr = res.data
          }
          if (this.firstChoice && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
            this.firstObject = res.data
          }
          if (this.firstChoice && this.secondChoice && !this.threeChoice && !this.fourChoice) {
            this.secondObject = res.data
          }
          if (this.firstChoice && this.secondChoice && this.threeChoice && !this.fourChoice) {
            this.threeObject = res.data
          }
          if (this.firstChoice && this.secondChoice && this.threeChoice && this.fourChoice) {
            this.fourObject = res.data
          }
          if (this.firstChoice && !this.secondChoice && !this.threeChoice && !this.fourChoice) {
            switch (this.firstChoice) {
              case 'name':
                this.filterContions.filterNameList = this.newFilterArr.filterNameList
                break
              case 'texture':
                this.filterContions.filterTextureList = this.newFilterArr.filterTextureList
                break
              case 'specification':
                this.filterContions.filterSpecificationList = this.newFilterArr.filterSpecificationList
                break
              case 'unit':
                this.filterContions.filterUnitList = this.newFilterArr.filterUnitList
                break
              default:
                break
            }
          }
          if (this.lastChoice) {
            if (this.lastChoice == 'name' && this.filterDataParams.name.length > 0) {
              if (this.fourChoice) {
                this.filterContions.filterNameList = this.threeObject.filterNameList
              }
              if (!this.fourChoice && this.threeChoice) {
                this.filterContions.filterNameList = this.secondObject.filterNameList
              }
              if (!this.fourChoice && !this.threeChoice && this.secondChoice) {
                this.filterContions.filterNameList = this.firstObject.filterNameList
              }
            }
            if (this.lastChoice == 'texture' && this.filterDataParams.texture.length > 0) {
              if (this.fourChoice) {
                this.filterContions.filterTextureList = this.threeObject.filterTextureList
              }
              if (!this.fourChoice && this.threeChoice) {
                this.filterContions.filterTextureList = this.secondObject.filterTextureList
              }
              if (!this.fourChoice && !this.threeChoice && this.secondChoice) {
                this.filterContions.filterTextureList = this.firstObject.filterTextureList
              }
            }
            if (this.lastChoice == 'specification' && this.filterDataParams.specification.length > 0) {
              if (this.fourChoice) {
                this.filterContions.filterSpecificationList = this.threeObject.filterSpecificationList
              }
              if (!this.fourChoice && this.threeChoice) {
                this.filterContions.filterSpecificationList = this.secondObject.filterSpecificationList
              }
              if (!this.fourChoice && !this.threeChoice && this.secondChoice) {
                this.filterContions.filterSpecificationList = this.firstObject.filterSpecificationList
              }
            }
            if (this.lastChoice == 'unit' && this.filterDataParams.unit.length > 0) {
              if (this.fourChoice) {
                this.filterContions.filterUnitList = this.threeObject.filterUnitList
              }
              if (!this.fourChoice && this.threeChoice) {
                this.filterContions.filterUnitList = this.secondObject.filterUnitList
              }
              if (!this.fourChoice && !this.threeChoice && this.secondChoice) {
                this.filterContions.filterUnitList = this.firstObject.filterUnitList
              }
            }
          }
        }

        // 创建属性 checked
        // 名称
        if (this.filterContions.filterNameList) {
          this.filterContions.filterNameList.map(item => {
            item.checked = false
            if (this.storage.names.length > 0) {
              for (let a = 0; a < this.storage.names.length; a++) {
                if (item.name == this.storage.names[a].name) {
                  item.checked = true
                }
              }
            }
          })
        }
        // 材质
        if (this.filterContions.filterTextureList) {
          this.filterContions.filterTextureList.map(item => {
            item.checked = false
            if (this.storage.textures.length > 0) {
              for (let b = 0; b < this.storage.textures.length; b++) {
                if (item.texture == this.storage.textures[b].texture) {
                  item.checked = true
                }
              }
            }
          })
        }
        // 规格
        if (this.filterContions.filterSpecificationList) {
          this.filterContions.filterSpecificationList.map(item => {
            item.checked = false
            if (this.storage.specifications.length > 0) {
              for (let c = 0; c < this.storage.specifications.length; c++) {
                if (item.specification == this.storage.specifications[c].specification) {
                  item.checked = true
                }
              }
            }
          })
        }
        // 单位
        if (this.filterContions.filterUnitList) {
          this.filterContions.filterUnitList.map(item => {
            item.checked = false
            if (this.storage.units.length > 0) {
              for (let d = 0; d < this.storage.units.length; d++) {
                if (item.unit == this.storage.units[d].unit) {
                  item.checked = true
                }
              }
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getFilter()
    this.installIndicatorOne().then(res => {
      this.installIndicatorTwo().then(res => {})
    })
    let _this = this
    window.onclick = function (event) {
      let iconTop = new RegExp('icon-top').test(event.target.className)
      let popBox = new RegExp('pop-box').test(event.target.className)
      let elIinput = new RegExp('el-input__inner').test(event.target.className)
      if (!iconTop && !popBox && !elIinput) {
        _this.renderData.show = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  background-color: #4474cf;
  color: #fff;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.self-table {
  position: relative;
}
.inputBtn {
  width: 12px;
  height: 12px;
  line-height: 12px;
  vertical-align: middle;
  border: 1px solid #d8e0f5;
  text-align: center;
  margin: 3px 5px 0 0;
  cursor: pointer;
  float: left;
  color: #4474cf;
  background-color: #fff;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  max-height: 30px;
  height: 30px;
  padding: 0 10px;
  line-height: 13px;
  .colFrist-name {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #666;
    font-weight: 400;
  }
  .namelimit {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
  }
}
.col {
  border-bottom: 1px solid #ccc;
  max-height: 30px;
  overflow: hidden;
}
.centers {
  text-align: center;
  border-bottom: 1px solid #ccc;
  max-height: 30px;
  overflow: hidden;
}
.levelO {
  padding-left: 10px;
}
.levelS {
  padding-left: 30px;
}
.levelT {
  padding-left: 49px;
}
.levelF {
  padding-left: 79px;
}
.levelFi {
  padding-left: 118px;
}
.pop-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2001;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  width: 200px;
  .cancelchoose {
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
  }
  .filterUl {
    width: 100%;
    text-align: center;
    max-height: 200px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    .name_filter {
      color: #4474cf;
      background: #f2f5fb;
    }
    li {
      height: 30px;
      line-height: 30px;
      color: #444;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      white-space: nowrap;
    }
    li:hover {
      background: #f2f5fb;
      cursor: pointer;
      color: #409eff;
    }
  }
  .filterUl::-webkit-scrollbar {
    width: 8px;
    height: 16px;
    background-color: #fff;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .filterUl::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #fff;
  }

  /*定义滑块 内阴影+圆角*/
  .filterUl::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #e8f0f8;
  }
  .sure-btn {
    text-align: center;
    padding: 15px 0px 10px 0;
    button {
      background-color: #44cf96;
      color: #fff;
      width: 60px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
    }
  }
}
</style>
<style lang="less">
.fixedHeader .el-table__header-wrapper {
  position: fixed;
  top: 120px;
  z-index: 1;
}
.self-table .el-table .cell {
  line-height: 16px;
  padding: 0;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}
.self-table .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.self-table .el-table td,
.el-table th.is-leaf {
  // border-bottom: none;
}
.self-table .el-table td {
  padding: 0;
}
.self-table .el-table th {
  background: #fafafb;
  color: #888888;
  font-size: 12px;
}
.self-table .cell-box {
  position: relative;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.self-table .icon-top {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 35px;
  width: 16px;
  height: 16px;
  background: url(~@/assets/img/screenIconN.png);
  cursor: pointer;
}
</style>
<style scoped>
.self-table >>> .el-table th {
  background: #fafafb;
  color: #888;
  font-size: 12px;
  height: 30px;
  padding: 0 !important;
  font-weight: bold;
}
.self-table >>> .el-table th .cell {
  padding-left: 10px;
}
.self-table >>> .el-table__row td {
  padding: 0 !important;
  height: 30px;
}
.self-table >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff !important;
}
.self-table >>> .pop-box .el-input__inner {
  border: 1px solid #fff;
}
</style>
