<template>
  <div>
     <headerComponent></headerComponent>
     <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
     <div class="roles-container">
          <!-- <p class="roles-title">
            <span class="title-01">{{name}}</span>
            >
            <span class="title-01">所有权限</span>
          </p> -->
          <div class="btn">
            <button class="btn-return" @click="$router.push('/controlPanel/rolesMain')">取消</button>
            <button class="btn-save" @click="submitClick">保存</button>
          </div>
          <div class="list-sort">
            <div class="list-header">
              <div class="col col-01" >
                <el-checkbox :indeterminate="isIndeterminate" v-model="allRolesChecked" @change="handleAllSingleClick">模块名称</el-checkbox>
              </div>

              <div class="col col-02">权限</div>
            </div>
            <div class="list row-01" v-for="(firstList, firstListIndex) in authData" :key="firstList.name">
              <div class="col-01 col-css-01" :style="{'height': currentHeight.col01[firstListIndex] + 'px','line-height': currentHeight.col01[firstListIndex] + 'px'}">
                <el-checkbox class="row-inline" :indeterminate="indeterminateAll[firstListIndex]" v-model="checkAll[firstListIndex]"
                @change="handleCheckAllChange(checkAll[firstListIndex], firstList, firstListIndex)">{{firstList.name}}</el-checkbox>
              </div>
              <ul class="checkbox J-col-02">
                <li v-for="(secondList, secondListIndex) in firstList.secondFunctionList" :key="secondList.name" class="col-02">
                  <div class="col-01" :style="{'top': currentHeight.col02[firstListIndex][secondListIndex] + 'px'}">
                    <el-checkbox class="row-inline" :indeterminate="indeterminateAnyFun[firstListIndex][secondListIndex]"
                    v-model="checkAnyFun[firstListIndex][secondListIndex]" @change="handleCheckFunChange(firstList.secondFunctionList.length, checkAnyFun[firstListIndex][secondListIndex], secondList, firstListIndex, secondListIndex)">{{secondList.name}}</el-checkbox>
                  </div>
                  <!-- <div>{{secondList.name}}</div> -->
                  <div class="col-03 J-col-03">
                    <el-checkbox-group v-model="roleDataModelBaseAuth[firstListIndex][secondListIndex]"
                    @change="handleCheckedChange(firstList.secondFunctionList.length, secondList.functionList.length,firstListIndex,secondListIndex)">
                      <el-checkbox v-for="thridList in secondList.functionList" :key="thridList.id" :label="thridList.id">{{thridList.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
              </ul>
            </div>
            <!-- <div class="list-footer">
              <div class="col col-01" >
                <el-checkbox :indeterminate="isIndeterminate" v-model="allRolesChecked" @change="handleAllSingleClick">全选</el-checkbox>
              </div>
              <div class="col-02">
                <button class="submit-btn" @click="submitClick">保存</button>
                <button class="cancel-btn" @click="$router.push('/controlPanel/rolesMain')">返回</button>
              </div>
            </div> -->
          </div>
     </div>
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data () {
    return {
      id: this.$route.params.id,
      name: this.$route.query.name,
      allRolesChecked: false, // 全选
      isIndeterminate: false, // 全选中的横线
      breadcrumbs: [
        { name: '控制台' },
        { name: '用户权限' },
        { name: '权限维护' }
      ],
      title: {
        sub01: '',
        sub02: ''
      },
      checkAll: [],
      checkAnyFun: [],
      roleDataModelBaseAuth: [], // 参数数组
      indeterminateAll: [],
      indeterminateAnyFun: [],
      currentHeight: { // 高度问题
        col01: [],
        col02: []
      },
      authData: [],
      roleDataModel: {
        name: '', // 角色名称
        roleType: '', // 角色类型
        initEdit: false
      },
      // 角色类型
      roleTypeData: [],
      roleShow: {
        name: false,
        type: false
      },
      currentTop: 0, // 现在的高度
      allDataEnum: [], // 第三级id参数
      firstId: [],
      secondId: [],
      firstDataEnum: [],
      secondDataEnum: []
    }
  },
  methods: {
    getHeight () {
      // 第二栏
      this.currentHeight.col01 = []
      // this.currentHeight.col02 = []
      let Jc03 = document.getElementsByClassName('J-col-03')
      /* for (let i = 0; i < Jc03.length; i++) {
        this.currentHeight.col02[firstListIndex].push(Jc03[i].clientHeight/2 - 10)
      } */
      let arrJc03 = [].slice.call(Jc03)
      this.authData.forEach((firstList, firstListIndex) => {
        firstList.secondFunctionList.forEach((secondList, secondListIndex) => {
          let shift = arrJc03.shift()
          this.currentHeight.col02[firstListIndex].push(shift.clientHeight / 2 - 10)
        })
      })
      let Jc02 = document.getElementsByClassName('J-col-02')
      for (let i = 0; i < Jc02.length; i++) {
        this.currentHeight.col01.push(Jc02[i].clientHeight)
      }
    },
    handleAllSingleClick () {
      let flag
      if (this.allRolesChecked) {
        flag = true
      } else {
        flag = false
      }
      this.authData.forEach((item, index) => {
        this.checkAll[index] = flag
        this.handleCheckAllChange(flag, item, index)
      })
    },
    handleCheckFunChange (fLength, checked, list, firstListIndex, secondListIndex) {
      if (checked) {
        // 第二层循环
        list && list.functionList.forEach((item, itemIndex) => {
          this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(item.id)
          this.$set(this.checkAnyFun[firstListIndex], secondListIndex, true)
          this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, false)
        })
        /* // 第一层循环
        list&&list.secondFunctionList.forEach((item, index) => {
          item.functionList.forEach((secondItem, secondItemIndex) => {
            this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(secondItem.id)
          })
        }) */
      } else {
        list && list.functionList.forEach((item, itemIndex) => {
          this.$set(this.roleDataModelBaseAuth[firstListIndex], secondListIndex, [])
          this.$set(this.checkAnyFun[firstListIndex], secondListIndex, false)
          this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, false)
        })
      }
      this.hanleSecondChange(fLength, firstListIndex)
      // 需要判断第二层的选择框
      /*     let checkedCount = 0
          for (let i =0, len = this.checkAnyFun[firstListIndex].length; i < len; i++) {
            if (this.checkAnyFun[firstListIndex][i]) {
              ++checkedCount
            }
          }
          this.$set(this.checkAll, firstListIndex, (checkedCount === fLength))
          this.$set(this.indeterminateAll, firstListIndex, (checkedCount > 0 && checkedCount < fLength))
          this.hanleSecondChange(fLength, firstListIndex) */
    },
    hanleSecondChange (fLength, firstListIndex) {
      // 需要判断第二层的选择框
      let checkedCount = 0
      let checkedCountInder = 0
      for (let i = 0, len = this.checkAnyFun[firstListIndex].length; i < len; i++) {
        if (this.checkAnyFun[firstListIndex][i]) {
          ++checkedCount
        }
      }
      // 第二级不确定的多选框
      for (let i = 0, len = this.indeterminateAnyFun[firstListIndex].length; i < len; i++) {
        if (this.indeterminateAnyFun[firstListIndex][i]) {
          ++checkedCountInder
        }
      }
      this.$set(this.checkAll, firstListIndex, (checkedCount === fLength))
      this.$set(this.indeterminateAll, firstListIndex, (checkedCountInder > 0 && checkedCountInder < fLength) || (checkedCount > 0 && checkedCount < fLength))
      // 为第二级长度为0的增加hack
      if (checkedCountInder === 1 && this.indeterminateAnyFun[firstListIndex][0] && fLength === 1) {
        this.$set(this.indeterminateAll, firstListIndex, true)
      }
      this.handleClick()
    },
    // 全选选择
    handleClick () {
      let allIndex = -1
      let len = this.authData.length
      for (let index = 0; index <= len; index++) {
        this.isIndeterminate = true
        const element = this.checkAll[index]
        if (!element) {
          break
        }
        allIndex = index
      }
      if (allIndex === (len - 1)) {
        this.allRolesChecked = true
        this.isIndeterminate = false
      } else if (allIndex === -1) {
        this.isIndeterminate = false
      } else {
        this.allRolesChecked = false
      }
    },
    // 第一层选择
    handleCheckAllChange (checked, list, firstListIndex) {
      if (checked) {
        // 第一层循环
        // 第一层id的选择
        list && list.secondFunctionList.forEach((item, index) => {
          this.$set(this.checkAnyFun[firstListIndex], index, true)
          this.$set(this.indeterminateAll, firstListIndex, false)
          // 控制第二层的全选
          this.$set(this.indeterminateAnyFun[firstListIndex], index, false)
          item.functionList.forEach((secondItem, secondItemIndex) => {
            this.roleDataModelBaseAuth[firstListIndex][index].push(secondItem.id)
          })
        })
      } else {
        list.secondFunctionList.forEach((item, itemIndex) => {
          this.$set(this.checkAnyFun[firstListIndex], itemIndex, false)
          this.$set(this.indeterminateAll, firstListIndex, false)
          item.functionList.forEach((secondItem, secondItemIndex) => {
            this.$set(this.roleDataModelBaseAuth[firstListIndex], itemIndex, [])
          })
        })
      }
      this.handleClick()
    },
    // 第三栏的选择
    handleCheckedChange (fLength, sLength, firstListIndex, secondListIndex) {
      let checkedCount = this.roleDataModelBaseAuth[firstListIndex][secondListIndex].length
      this.$set(this.checkAnyFun[firstListIndex], secondListIndex, (checkedCount === sLength))
      this.$set(this.indeterminateAnyFun[firstListIndex], secondListIndex, (checkedCount > 0 && checkedCount < sLength))
      this.hanleSecondChange(fLength, firstListIndex)
      this.handleClick()
    },
    // 所有权限
    rolesAll () {
      api.getAllFunction().then(res => {
        this.authData = res.data
        // 生成二维数组
        res.data.forEach((firstList, firstListIndex) => {
          this.$set(this.roleDataModelBaseAuth, firstListIndex, [])
          this.$set(this.indeterminateAnyFun, firstListIndex, [])
          this.$set(this.checkAnyFun, firstListIndex, [])
          this.$set(this.currentHeight.col02, firstListIndex, [])
          this.$set(this.indeterminateAll, firstListIndex, false)
          //  第一级全部的id
          this.firstId.push(firstList.id)
          this.secondId[firstListIndex] = []
          firstList.secondFunctionList.forEach((secondList, secondListIndex) => {
            this.$set(this.checkAnyFun[firstListIndex], secondListIndex, false)
            this.$set(this.roleDataModelBaseAuth[firstListIndex], secondListIndex, [])
            // 第二级全部的id
            this.secondId[firstListIndex].push(secondList.id)
          })
        })
        if (this.id) {
          this.editRoles()
        }
        this.$nextTick(this.getHeight)
      })
      // this.rolesType()
    },
    rolesType () {
      api.rolesType().then(res => {
        this.roleTypeData = res.data
      })
    },
    getDataArr () {
      this.allDataEnum = []
      this.roleDataModelBaseAuth.forEach((firstItem, firstIndex) => {
        let secondLength = false
        firstItem.forEach((secondItem, secondIndex) => {
          if (secondItem.length > 0) {
            this.secondDataEnum.push(this.secondId[firstIndex][secondIndex])
            secondLength = true
          }
          secondItem.forEach((thirdItem) => {
            thirdItem && this.allDataEnum.push(thirdItem)
          })
        })
        if (firstItem.length > 0 && secondLength) {
          this.firstDataEnum.push(this.firstId[firstIndex])
        }
      })
    },
    // 提交按钮分为新建角色和编辑两类 后台给了两个接口
    submitClick () {
      this.getDataArr()
      if (this.id) {
        let data = {
          roleId: this.id,
          baseFunctionIdList: this.allDataEnum,
          baseFirstFunctionIdList: this.firstDataEnum,
          baseSecondFunctionIdList: this.secondDataEnum
        }
        api.setFunction4Role(data).then(res => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '保存成功!'
          })
          this.$router.push('/controlPanel/rolesMain')
        })
      }
    },
    editRoles () {
      let userId = this.id
      api.getFunctionByRoleId(userId).then(res => {
        if (res.data) {
          // this.roleDataModel.name = res.data[0].name
          this.roleDataModel.initEdit = true
          let data = res.data.baseFunctionList.map(item => item.id)
          this.authData.forEach((firstList, firstListIndex) => {
            firstList.secondFunctionList.forEach((secondList, secondListIndex) => {
              secondList.functionList.forEach((thridList, thirdListIndex) => {
                let rst = data.includes(thridList.id)
                rst && this.roleDataModelBaseAuth[firstListIndex][secondListIndex].push(thridList.id) && this.handleCheckedChange(firstList.secondFunctionList.length, secondList.functionList.length, firstListIndex, secondListIndex)
              })
            })
          })
        }
      })
    }
  },
  mounted () {
    this.rolesAll()
  }
}
</script>
<style lang="less" scoped>
.roles-container{
  // background-color: #fff;
  // padding: 20px;
  width: 1000px;
  margin: 0 auto;
  .roles-title{
    background-color: #fff;
    font-size: 16px;
    color: #3E8DA7;
  }
}
.btn{
  margin: 10px 0;
  .btn-common(@bg){
    padding: 5px 20px;
    color: #fff;
    font-size: 14px;
    background-color: @bg;
    cursor: pointer;
  }
  .btn-return{
    .btn-common(#4474CF);
  }
  .btn-save{
    .btn-common(#44CF96);
    margin-left: 8px;
  }
}
.list-sort {
  // border: 1px solid #e9e9e9;
  background-color: #fff;
   min-height: e('calc(100vh - 170px)');
  .list-header{
    height: 30px;
    line-height: 30px;
    color: #888;
    background-color: #f4f4f4;
    border: 1px solid #e9e9e9;
    border-bottom: none;
    font-size: 0;
    .col{
      display: inline-block;
      border-left: 1px solid #e9e9e9;
      padding-left: 10px;
      font-size: 12px;
      box-sizing: border-box;
    }
    .el-checkbox{color: #888;}
    .col-01{
      width: calc(~'15% + 140px');
      border-left: none;
    }
  }
  .list-footer{
    height: 30px;
    line-height: 30px;
    color: #3E8DA7;
    border: 1px solid #e9e9e9;
    border-top: none;
    .col{
      display: inline-block;
      border-left: 1px solid #e9e9e9;
      padding-left: 20px;
    }
    .col-01{
      // width: calc(~'15% -20px');
      border-left: none;
    }
    .col-02{
      width: 85%;
      position: relative;
      // left: -40px;
      float: right;
      border-left: 1px solid #e9e9e9;
      box-sizing: border-box;
    }
    .btn(@bg, @left){
      background-color: @bg;
      padding: 2px 10px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      margin-left: @left;
      cursor: pointer;
    }
    .submit-btn{
      .btn(rgba(185, 72, 70, 1), 12px);
    }
    .cancel-btn{
      .btn(rgba(57, 134, 172, 1), 20px);
    }
  }
  .list {
    overflow: hidden;
  }
  .list + .list {
    // margin-top: 5px;
    border-top: none;
  }
  .row-01 {
    border: 1px solid #e9e9e9;
    border-left: none;
    .col-01 {
      display: inline-block;
      position: relative;
    }
    .row-inline {
      display: inline;
    }
  }
  .col-css-01 {
    text-align: center;
    padding-left: 10px;
    background-color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: nowrap; /* 不换行 */
    vertical-align: top;
    .row-inline {
      display: inline;
    }
  }
  .checkbox {
    float: right;
    width: 85%;
    position: relative;
    left: -10px;
    .el-checkbox:first-child {
      margin-left: 10px;
    }
    .el-checkbox {
      width: 140px;
      font-weight: normal;
    }
    .el-checkbox+.el-checkbox{margin-left: 10px;}
    .col-02 {
      display: inline-block;
      border-left: 1px solid #e9e9e9;
      width: 105%;
    }
    .col-02 + .col-02 {
      border-top: 1px solid #e9e9e9;
    }
    .col-03 {
      border-left: 1px solid #e9e9e9;
      margin-top: -20px;
      padding: 10px 0;
      margin-left: 150px;
    }
  }
  .title {
    display: inline-block;
    margin-right: 30px;
    font-size: 12px;
    color: #666;
  }
  .tip {
    color: red;
    font-size: 12px;
    margin-left: 10px;
  }
  .require-right:before {
    right: -5px;
  }
  .submitBtn {
    margin: 30px 0 0 100px;
  }
}
@media screen and (max-width: 1550px) {
  .role-container {
    .checkbox {
      width: 75%;
    }
  }
}
</style>

<style>
.list-sort .el-checkbox__label{
  font-size: 12px;
  padding-left: 5px;
}
</style>
