<template>
  <div class="individual">

    <div class="core-content">
      <div class="dataTables" v-if="isSee">
        <el-table :data="tableData" stripe ref="multipleTable" border style="width: 100%" size='mini' :max-height="tableHeight" align="center" v-loading="loading">
          <el-table-column prop="productName" label="产品名称" width="160" align="center">
          </el-table-column>
          <el-table-column prop="indicatorName" label="指标名称" width="120" align="center">
          </el-table-column>
          <el-table-column prop="monomerName" label="单项工程名称" width="232" align="center">
          </el-table-column>
          <el-table-column prop="groundArea" label="地上建筑面积（㎡）" width="130" align="center">
          </el-table-column>
          <el-table-column prop="undergroundArea" label="地下建筑面积（㎡）" width="130" align="center">
          </el-table-column>
          <el-table-column prop="baseArea" label="基础建筑面积（㎡）" width="130" align="center">
          </el-table-column>
          <el-table-column prop="groundFloors" label="地上建筑层数（层）" width="130" align="center">
          </el-table-column>
          <el-table-column prop="undergroundFloors" label="地下建筑层数（层）" width="130" align="center">
          </el-table-column>
          <el-table-column label="楼梯体积系数" width="114" align="center" :render-header="explain">
            <template slot-scope="scope">
              <span v-if="scope.row.floorVolumeCoefficient">{{scope.row.floorVolumeCoefficient}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="楼梯模板面积系数" width="146" align="center" :render-header="explains">
            <template slot-scope="scope">
              <span v-if="scope.row.floorAreaCoefficient">{{scope.row.floorAreaCoefficient}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="建筑业态" width="220" align="center">
            <template slot-scope="scope">
              <div class="block">
                <span>{{scope.row.structureForm1}}</span>
                <span>{{scope.row.structureForm2}}</span>
                <span v-if="scope.row.handWrittenStructForm">{{scope.row.handWrittenStructForm}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="结构类型" align="center">
            <template slot-scope="scope">
              <div class="block">
                <span>{{scope.row.structType}}</span>
                <span v-if="scope.row.handWrittenStructType">{{scope.row.handWrittenStructType}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tables" v-show="!isSee">
        <el-table :data="tableData" stripe ref="multipleTable" border size='mini' style="width: 100%" :max-height="tableHeight">
          <el-table-column prop="productName" label="产品名称" width="168">
          </el-table-column>
          <el-table-column prop="indicatorName" label="指标名称" width="157">
          </el-table-column>
          <el-table-column label="单项工程名称" width="232">
            <template slot-scope="scope">
              <el-input v-model="scope.row.monomerName" placeholder="请输入名称" @blur="noEditor(scope.row)" v-if="scope.row.isEditor"></el-input>
              <el-tooltip class="item" effect="dark" content="双击修改名称" placement="top-start" v-if="!scope.row.isEditor">
                <span @dblclick="modifyStatus(scope.row)" class="editorSpan">{{scope.row.monomerName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="" label="地上建筑面积（㎡）" width="135">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.groundArea" placeholder="" @blur="noEditorM1(scope.row)" v-enter-number2 v-if="scope.row.isEditorM1"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorM1">
                <span @dblclick="modifyStatusM1(scope.row)" class="editorSpan">{{scope.row.groundArea}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="" label="地下建筑面积（㎡）" width="136">
            <template slot-scope="scope">
              <el-input v-model="scope.row.undergroundArea" placeholder="" type="number" @blur="noEditorM2(scope.row)" v-enter-number2 v-if="scope.row.isEditorM2"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorM2">
                <span @dblclick="modifyStatusM2(scope.row)" class="editorSpan">{{scope.row.undergroundArea}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="基础建筑面积（㎡）" width="135">
            <template slot-scope="scope">
              <el-input v-model="scope.row.baseArea" placeholder="" type="number" @blur="noEditorJ1(scope.row)" v-enter-number2 v-if="scope.row.isEditorJ1"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorJ1">
                <span @dblclick="modifyStatusJ1(scope.row)" class="editorSpan">{{scope.row.baseArea}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="地上建筑层数（层）" width="135">
            <template slot-scope="scope">
              <el-input v-model="scope.row.groundFloors" type="number" placeholder="" @blur="noEditorC1(scope.row)" @keyup.native="proving1(scope,scope.row.groundFloors)" v-enter-number2 v-if="scope.row.isEditorC1"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorC1">
                <span @dblclick="modifyStatusC1(scope.row)" class="editorSpan">{{scope.row.groundFloors}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="地下建筑层数（层）" width="135">
            <template slot-scope="scope">
              <el-input v-model="scope.row.undergroundFloors" type="number" placeholder="" @blur="noEditorC2(scope.row)" @keyup.native="proving2(scope,scope.row.undergroundFloors)" v-enter-number2 v-if="scope.row.isEditorC2"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorC2">
                <span @dblclick="modifyStatusC2(scope.row)" class="editorSpan">{{scope.row.undergroundFloors}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <!-- 楼梯面积系数 -->
          <el-table-column label="楼梯体积系数" width="114" v-if="coefficient" :render-header="explain">
            <template slot-scope="scope">
              <el-input v-model="scope.row.floorVolumeCoefficient" type="number" placeholder="" @blur="noEditorX1(scope.row)" v-enter-number2 v-if="scope.row.isEditorX1&&scope.row.indicatorName=='土建算量指标'"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorX1&&scope.row.indicatorName=='土建算量指标'">
                <span @dblclick="modifyStatusX1(scope.row)" class="editorSpan">{{scope.row.floorVolumeCoefficient}}</span>
              </el-tooltip>
              <span v-if="scope.row.indicatorName!='土建算量指标'" class="bar-span">--</span>
            </template>
          </el-table-column>
          <el-table-column label="楼梯模板面积系数" width="146" v-if="coefficient" :render-header="explains">
            <template slot-scope="scope">
              <el-input v-model="scope.row.floorAreaCoefficient" type="number" placeholder="" @blur="noEditorX2(scope.row)" v-enter-number2 v-if="scope.row.isEditorX2&&scope.row.indicatorName=='土建算量指标'"></el-input>
              <el-tooltip class="item" effect="dark" content="双击编辑" placement="top-start" v-if="!scope.row.isEditorX2&&scope.row.indicatorName=='土建算量指标'">
                <span @dblclick="modifyStatusX2(scope.row)" class="editorSpan">{{scope.row.floorAreaCoefficient}}</span>
              </el-tooltip>
              <span class="bar-span" v-if="scope.row.indicatorName!='土建算量指标'">--</span>
            </template>
          </el-table-column>
          <el-table-column label="建筑业态" width="250">
            <template slot-scope="scope">
              <div class="block">
                <div class="block">
                  <div style="float:left;min-width:110px;">
                    <el-select v-model="scope.row.structureForm1Code1" placeholder="请选择" @change="handleChange(scope.$index,scope.row,scope)" style="display:inline-block;width:110px;margin-right:5px;height:30px;">
                      <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id" class="els-input" style="height:30px;">
                      </el-option>
                    </el-select>
                  </div>
                  <div style="float:left;min-width:110px;">
                    <el-select v-model="scope.row.structureFormCode2" placeholder="请选择" @change="handleChange2(scope.$index,scope.row)" style="display:inline-block;width:110px;height:30px;">
                      <el-option v-for="item in scope.row.option2s" :key="item.id" :label="item.name" :value="item.id" style="display:inline-block;height:30px;">
                      </el-option>
                    </el-select>
                    <el-input v-if="scope.row.structureForm3Status" v-model="scope.row.handWrittenStructForm" placeholder="请输入内容" style="display:inline-block;width:110px;height:30px;"></el-input>
                  </div>
                </div>

              </div>
            </template>
          </el-table-column>
          <el-table-column label="结构类型" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.structTypeCode" placeholder="请选择" @change="handleChangeType(scope.$index,scope.row)">
                <el-option v-for="(item,index) in typeList" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-input v-if="scope.row.structTypeStatus" v-model="scope.row.handWrittenStructType" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData,scope.row)" type="text" size="small">
                删除
              </el-button>
              <el-button @click.native.prevent="copyRow(scope.$index,scope.row)" type="text" size="small">
                复制此行
              </el-button>
              <el-button @click.native.prevent="pasteRow(scope.$index,scope.row)" type="text" size="small">
                粘贴
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <!-- 系数提示框 -->
    <div class="Hint-box" :style="{top: hintData.pos.y - posSreen.y + 'px',left: hintData.pos.x +'px'}" v-show="hintData.show">
      <div class="Hint-box1" v-if="hintInfo == '楼梯体积系数'">
        楼梯体积<br>= 楼梯面积 * 楼梯体积系数（默认值为0.325）
      </div>
      <div class="Hint-box2" v-if="hintInfo == '楼梯模板面积系数'">
        楼梯模板面积<br>=楼梯面积 * 楼梯模板面积系数（默认值为1.3）
      </div>
    </div>
  </div>
</template>
<script >
import tool from '@/assets/js/useMoreTool'
import api from '@/fetch/api'
export default {
  data () {
    return {
      loading: true,
      isSee: true,
      projectId: (() => this.$route.params.projectId)(),
      copyData: [],
      tableData: [],
      options: [], // 建筑业态列表1
      option2s: [], // 建筑业态列表2
      typeList: [], // 结构类型
      delArr: [], // 要删除的单体idl列表
      AlreadyCopy: false, // 是否复制
      tableHeight: window.innerHeight - 161,
      coefficient: false, // 是否存在土建算量指标,默认不存在
      // 系数提示
      hintData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      hintInfo: ''
    }
  },
  methods: {
    // 查看系数信息
    explain (createElement, { column, $index, store, _self }) {
      return createElement(
        'p',
        {
          class: 'cell-box'
        },
        [
          createElement(
            'span',
            {
              class: {
                spans: true
              }
            },
            [column.label]
          ),
          createElement('i', {
            class: {
              'icon-info': true
            },
            on: {
              mouseenter: this.explainEnter.bind(this, store, _self),
              mouseleave: this.explainLeave.bind()
            }
          })
        ]
      )
    },
    explains (createElement, { column, $index, store, _self }) {
      return createElement(
        'p',
        {
          class: 'cell-box'
        },
        [
          createElement(
            'span',
            {
              class: {
                spans: true
              }
            },
            [column.label]
          ),
          createElement('i', {
            class: {
              'icon-info': true
            },
            on: {
              mouseenter: this.explainEnters.bind(this, store, _self),
              mouseleave: this.explainLeave.bind()
            }
          })
        ]
      )
    },
    explainEnter (a, store, events) {
      let _this = this
      this.hintInfo = '楼梯体积系数'
      _this.hintData.show = true
      _this.hintData.pos = tool.getMousePos(events) // 弹出框位置
      var screenWidth = window.screen.width
      if (tool.getMousePos(events).x + 50 > 130 && screenWidth - tool.getMousePos(events).x - 20 > 130) {
        _this.hintData.pos.x = tool.getMousePos(events).x - 130
      }
      if (tool.getMousePos(events).x + 50 > 130 && screenWidth - tool.getMousePos(events).x - 20 < 130) {
        _this.hintData.pos.x = tool.getMousePos(events).x - (265 - (screenWidth - tool.getMousePos(events).x)) - 60
      }
      _this.hintData.pos.y = tool.getMousePos(events).y + 50
    },
    explainEnters (a, store, events) {
      let _this = this
      this.hintInfo = '楼梯模板面积系数'
      _this.hintData.show = true
      _this.hintData.pos = tool.getMousePos(events) // 弹出框位置
      var screenWidth = window.screen.width
      if (tool.getMousePos(events).x + 50 > 132 && screenWidth - tool.getMousePos(events).x - 20 > 132) {
        _this.hintData.pos.x = tool.getMousePos(events).x - 132
      }
      if (tool.getMousePos(events).x + 50 > 132 && screenWidth - tool.getMousePos(events).x - 20 < 132) {
        _this.hintData.pos.x = tool.getMousePos(events).x - (265 - (screenWidth - tool.getMousePos(events).x)) - 60
      }
      _this.hintData.pos.y = tool.getMousePos(events).y + 50
    },
    explainLeave () {
      let _this = this
      _this.hintData.show = false
    },

    // 地上 验证只能输入正整数
    proving1 (scope, val) {
      if (val) {
        val = val.replace(/\./g, '')
        this.$set(this.tableData[scope.$index], 'groundFloors', val)
      }
    },
    // 地下建筑层数 验证只能输入正整数
    proving2 (scope, val) {
      if (val) {
        val = val.replace(/\./g, '')
        this.$set(this.tableData[scope.$index], 'undergroundFloors', val)
      }
    },
    // 建筑业态1
    DicMonomerStructureForm1 () {
      api.getDicCommon('DicMonomerStructureForm1').then(res => {
        this.options = res.data
      })
    },
    // 根据建筑业态1找建筑业态2
    getStructureForm2ByParentId (id) {
      api.getStructureForm2ByParentId(id).then(res => {
        this.option2s = res.data
      })
    },
    // 结构类型
    DicMonomerStructType () {
      api.getDicCommon('DicMonomerStructType').then(res => {
        this.typeList = res.data
      })
    },
    // 获取某个项目下已经解析出的所有单体
    getMonomerByProjectId4ProjectData () {
      let data = this.$route.params.projectId
      let arr = []
      api
        .getMonomerByProjectId4ProjectData(data)
        .then(res => {
          arr = res.data
          arr.map(item => {
            item.isEditor = false // 单体是否可编辑
            item.isEditorM1 = true // 地上建筑面积是否可编辑
            item.isEditorM2 = true // 地下建筑面积是否可编辑
            item.isEditorJ1 = true // 基础面积是否可编辑
            item.isEditorC1 = true // 地上层数是否可编辑
            item.isEditorC2 = true // 地下层数是否可编辑
            item.isEditorX1 = true // 楼梯体积系数是否可编辑
            item.isEditorX2 = true // 楼梯模板面积系数是否可编辑
            if (item.indicatorName == '土建算量指标') {
              if (item.floorVolumeCoefficient == null) {
                item.floorVolumeCoefficient = '0.325'
              }
              if (item.floorAreaCoefficient == null) {
                item.floorAreaCoefficient = '1.3'
              }
              this.coefficient = true
            }
          })
          this.tableData = arr
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    },
    functionA () {
      let arr = []
      this.tableData.map(item => {
        if (arr.indexOf(item.productName) == -1) {
          arr.push(item.productName)
        }
      })
    },
    // 切换编辑模式
    gotoEditor () {
      this.clearStyle() // 清除复制选中的样式
      this.tableData.map((item, index) => {
        if (item.structureForm1Code1) {
          api.getStructureForm2ByParentId(item.structureForm1Code1).then(res => {
            this.$set(this.tableData[index], 'option2s', res.data)
          })
        }
        if (item.structureForm2 == '其它') {
          item.structureForm3Status = true
        } else {
          item.structureForm3Status = false
        }
        if (item.handWrittenStructType) {
          item.structTypeStatus = true
        } else {
          item.structTypeStatus = false
        }
      })
      this.isSee = false
    },
    // 取消编辑
    cancel () {
      this.getMonomerByProjectId4ProjectData()
      this.isSee = true
      this.clearStyle()
    },
    // 删除
    deleteRow (index, tableData, row) {
      this.$confirm('单体删除，与之相关指标会同时删除，是否仍进行此步操作？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        tableData.splice(index, 1)
        this.delArr.push(row.id)
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!'
        })
        var result = this.tableData.some(item => {
          if (item.indicatorName == '土建算量指标') {
            return true
          }
        })
        if (result) {
          this.coefficient = true
        } else {
          this.coefficient = false
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 复制
    copyRow (index, row) {
      var anchors = document.getElementsByClassName('el-table__row')
      for (let i = 0; i < anchors.length; i++) {
        for (let a = 0; a < anchors[i].childNodes.length; a++) {
          anchors[i].childNodes[a].style.backgroundColor = '#fff'
        }
      }
      let nodeList = document.getElementsByClassName('el-table__row')[index].childNodes
      for (let b = 0; b < nodeList.length; b++) {
        nodeList[b].style.backgroundColor = '#FDF8F0'
      }
      row.isCopy = true
      this.copyData = row
      this.AlreadyCopy = true
    },
    // 清除复制选中的样式
    clearStyle () {
      let sele = document.getElementsByClassName('el-table__row')
      for (let i = 0; i < sele.length; i++) {
        for (let a = 0; a < sele[i].childNodes.length; a++) {
          sele[i].childNodes[a].style.backgroundColor = '#fff'
        }
      }
    },
    // 粘贴
    pasteRow (index, row) {
      // 已经复制成功可以进行粘贴
      if (this.AlreadyCopy) {
        row.groundArea = this.copyData.groundArea
        row.undergroundArea = this.copyData.undergroundArea
        row.baseArea = this.copyData.baseArea
        row.groundFloors = this.copyData.groundFloors
        row.undergroundFloors = this.copyData.undergroundFloors
        row.structureForm1 = this.copyData.structureForm1
        row.structureForm1Code1 = this.copyData.structureForm1Code1
        if (this.copyData.options) {
          this.$set(this.tableData[index], 'options', this.copyData.options)
        }
        if (this.copyData.option2s) {
          this.$set(this.tableData[index], 'option2s', this.copyData.option2s)
        }
        row.structureForm2 = this.copyData.structureForm2
        row.structureFormCode2 = this.copyData.structureFormCode2
        row.handWrittenStructForm = this.copyData.handWrittenStructForm // 其它手动输入
        row.structureForm3Status = this.copyData.structureForm3Status // 手动输入框状态
        row.structType = this.copyData.structType // 结构类型名称
        row.structTypeCode = this.copyData.structTypeCode // 结构类型code码
        row.structTypeStatus = this.copyData.structTypeStatus // 结构类型手动输入框状态
        row.handWrittenStructType = this.copyData.handWrittenStructType // 手动输入框状态
        row.isEditorM1 = this.copyData.isEditorM1
        row.isEditorM2 = this.copyData.isEditorM2
        row.isEditorJ1 = this.copyData.isEditorJ1
        row.isEditorC1 = this.copyData.isEditorC1
        row.isEditorC2 = this.copyData.isEditorC2
        if (this.copyData.floorVolumeCoefficient && row.indicatorName == '土建算量指标') {
          row.isEditorX1 = this.copyData.isEditorX1
          row.floorVolumeCoefficient = this.copyData.floorVolumeCoefficient
        }
        if (this.copyData.floorAreaCoefficient && row.indicatorName == '土建算量指标') {
          row.isEditorX2 = this.copyData.isEditorX2
          row.floorAreaCoefficient = this.copyData.floorAreaCoefficient
        }
      }
    },
    handleChange ($index, row) {
      row.structureForm2 = ''
      row.structureFormCode2 = ''
      row.handWrittenStructForm = ''
      row.structureForm3Status = false
      this.options.map(item => {
        if (item.id == row.structureForm1Code1) {
          row.structureForm1 = item.name
        }
      })
      api.getStructureForm2ByParentId(row.structureForm1Code1).then(res => {
        row.option2s = res.data
        this.$set(this.tableData[$index], 'option2s', res.data)
      })
    },
    handleChange2 ($index, row) {
      api.getStructureForm2ByParentId(row.structureForm1Code1).then(res => {
        this.$set(this.tableData[$index], 'option2s', res.data)
        row.option2s.map(item => {
          if (item.id == row.structureFormCode2) {
            row.structureForm2 = item.name
            this.$set(this.tableData[$index], 'structureForm2', item.name)
            if (row.structureForm2 == '其它') {
              // 如果建筑业态的第二个选项是其它，则多一个输入框
              row.structureForm3Status = true // 结构类型的输入框显示
            } else {
              row.structureForm3Status = false // 结构类型的输入框显示
              row.handWrittenStructForm = ''
            }
          }
        })
      })
    },
    // 结构类型选择其它
    handleChangeType ($index, row) {
      this.typeList.map((items, index) => {
        if (row.structTypeCode == items.id) {
          row.structType = items.name
          if (row.structType == '其它') {
            row.structTypeStatus = true // 结构类型的输入框显示
          } else {
            row.structTypeStatus = false // 结构类型的输入框显示
            row.handWrittenStructType = ''
          }
        }
      })
    },
    modifyStatus (row) {
      row.isEditor = true
    },
    modifyStatusM1 (row) {
      row.isEditorM1 = true
    },
    modifyStatusM2 (row) {
      row.isEditorM2 = true
    },
    modifyStatusJ1 (row) {
      row.isEditorJ1 = true
    },
    modifyStatusC1 (row) {
      row.isEditorC1 = true
    },
    modifyStatusC2 (row) {
      row.isEditorC2 = true
    },
    modifyStatusX1 (row) {
      row.isEditorX1 = true
    },
    modifyStatusX2 (row) {
      row.isEditorX2 = true
    },
    // 单项工程
    noEditor (row) {
      if (row.monomerName) {
        row.isEditor = false
      }
    },
    // 地上面积
    noEditorM1 (row) {
      if (row.groundArea) {
        row.isEditorM1 = false
      }
      if (row.groundArea == 0 && row.undergroundArea == 0) {
        row.groundArea = ''
        row.isEditorM1 = true
      } else {
        row.isEditorM1 = false
      }
    },
    // 地下
    noEditorM2 (row) {
      if (row.undergroundArea) {
        row.isEditorM2 = false
      }
      if (row.undergroundArea == 0 && row.groundArea == 0) {
        row.undergroundArea = ''
        row.isEditorM2 = true
      } else {
        row.isEditorM2 = false
      }
    },
    // 基础
    noEditorJ1 (row) {
      if (row.baseArea) {
        row.isEditorJ1 = false
      }
      if (row.baseArea == 0) {
        row.baseArea = ''
        row.isEditorJ1 = true
      }
    },
    // 地上层数
    noEditorC1 (row) {
      if (row.groundFloors) {
        row.isEditorC1 = false
      }
      if (row.groundFloors == 0) {
        row.groundFloors = 0
        row.isEditorC1 = false
      }
    },
    // 地下层数
    noEditorC2 (row) {
      if (row.undergroundFloors) {
        row.isEditorC2 = false
      }
      if (row.undergroundFloors == 0) {
        row.undergroundFloors = 0
        row.isEditorC2 = false
      }
    },
    // 楼梯体积系数
    noEditorX1 (row) {
      if (row.floorVolumeCoefficient) {
        if (row.floorVolumeCoefficient == 0) {
          row.floorVolumeCoefficient = ''
          row.isEditorX1 = true
        } else {
          row.isEditorX1 = false
        }
      }
    },
    // 楼梯模板面积系数
    noEditorX2 (row) {
      if (row.floorAreaCoefficient) {
        if (row.floorAreaCoefficient == 0) {
          row.floorAreaCoefficient = ''
          row.isEditorX2 = true
        } else {
          row.isEditorX2 = false
        }
      }
    },
    // 保存
    preservation () {
      this.$confirm('更新面积信息会导致相关指标重新计算，是否仍执行此操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let isTrue = true
          this.tableData.map(item => {
            item.groundArea = String(item.groundArea)
            item.undergroundArea = String(item.undergroundArea)
            item.groundFloors = String(item.groundFloors)
            item.undergroundFloors = String(item.undergroundFloors)
            if (!item.monomerName || !item.groundArea || !item.undergroundArea || !item.baseArea || !item.groundFloors || !item.undergroundFloors || !item.structureForm1 || !item.structureForm1Code1 || !item.structureForm2 || !item.structureFormCode2 || !item.structTypeCode) {
              this.$message({
                showClose: true,
                message: '请将信息填写完整',
                type: 'warning'
              })
              return (isTrue = false)
            }
          })
          this.tableData.map(item => {
            this.typeList.map(items => {
              if (item.structType == items.name) {
                item.structTypeCode = items.id
              }
            })
            delete item.option2s // 建筑业态2的列表
          })
          isTrue &&
            api
              .modifyMonomer(this.tableData)
              .then(res => {
                this.clearStyle()
                if (res.errorCode == '200') {
                  this.$message({
                    showClose: true,
                    type: 'success',
                    message: '保存成功'
                  })
                  api.delMonomer(this.delArr).then(res => { })
                  this.getMonomerByProjectId4ProjectData()
                  this.isSee = true
                }
              })
              .catch(res => {
                this.$message({
                  showClose: true,
                  type: 'warning',
                  message: '保存失败'
                })
                this.isSee = false
              })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消保存'
          })
        })
    }
  },
  mounted () {
    this.functionA()
    this.DicMonomerStructType() // 结构类型
    this.DicMonomerStructureForm1() // 建筑业态1
    this.getMonomerByProjectId4ProjectData() // 获取某个项目下已经解析出的所有单体
  }
}
</script>
<style lang="less" scoped>
.individual {
  .footers {
    margin: 10px 0 0 19px;
    .el-button--warning,
    .el-button--primary {
      width: 70px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      border-radius: 0;
      margin-left: 0;
    }
  }
  .core-content {
    margin: 11px 18px 20px 19px;
    background-color: #fff;
    height: e('calc(100vh - 161px)');
    .tables {
      .el-table th,
      .el-table tr {
        background-color: #a1a8b7;
      }
      .editorSpan {
        display: inline-block;
        width: 100%;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
  .Hint-box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2001;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #000;
    border: 1px solid rgba(225, 228, 233, 1);
    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
    opacity: 0.65;
    border-radius: 5px;
    padding: 10px 20px 13px 11px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    .Hint-box1 {
      width: 260px;
    }
    .Hint-box2 {
      width: 265px;
    }
  }
}
</style>
<style lang="less">
.individual {
  .el-table .cell,
  .el-table th div,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 10px;
  }
  .icon-info {
    position: absolute;
    top: 50%;
    margin-top: -7px;
    margin-left: 2px;
    width: 14px;
    height: 14px;
    background: url(~@/assets/img/normality.png);
    cursor: pointer;
  }
  .icon-info:hover {
    position: absolute;
    top: 50%;
    margin-left: 2px;
    margin-top: -7px;
    width: 14px;
    height: 14px;
    background: url(~@/assets/img/suspension.png);
    cursor: pointer;
  }
}
</style>
<style scoped>
.tables >>> .el-table th {
  background: #fafafb;
  color: #888888;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  padding: 0 !important;
}
.tables >>> .el-table__row td {
  padding: 0 !important;
  height: 30px;
}
.tables >>> .el-input__inner {
  height: 30px;
}
.tables >>> .el-input__icon {
  line-height: 30px;
}
.dataTables >>> .el-table th {
  background: #fafafb;
  color: #888888;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  padding: 0 !important;
}
.dataTables >>> .el-table__empty-block {
  min-height: 40px;
}
.dataTables >>> .el-table__row td {
  padding: 0 !important;
  height: 30px;
}
.dataTables,
.tables >>> .el-input__inner {
  height: 30px;
  line-height: 30px;
}
.dataTables >>> .el-input__icon {
  line-height: 30px;
}
.dataTables >>> .el-table th.gutter {
  display: table-cell !important;
}
.tables >>> .el-table th.gutter {
  display: table-cell !important;
}
.dataTables >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f5f6f8 !important;
}
.tables >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f5f6f8 !important;
}
.dataTables >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecf4ff;
}
.tables >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ecf4ff;
}
.dataTables >>> .el-table__row .el-table__row--striped {
  background-color: #f5f6f8 !important;
}
.dataTables >>> .el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  /* border-bottom: none !important; */
}
.tables >>> .el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  /* border-bottom: none !important; */
}
</style>
