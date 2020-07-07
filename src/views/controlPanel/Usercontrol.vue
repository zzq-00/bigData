
<template>
  <div class="mainright">
    <div class="userBox">
      <div class="marnright_nav">
        <div class="navuser">
          <el-input v-model.trim="input1" placeholder=" 工号 / 姓名" @input="userInput" @keyup.enter.native='userSearch'></el-input>
          <button class="search" @click="userSearch">搜索</button>
          <!-- <button class="adduser" @click="addUser">新增用户</button> -->
        </div>
        <div class="proRig">
          <p>
            <span>共有 {{count}} 条记录。</span>
            <a href="javascript:;" class="el-icon-arrow-left" @click="paging('-')"></a>
            <b>{{currentPage4}}/{{Math.ceil(count/sizes)}}</b>
            <a href="javascript:;" class="el-icon-arrow-right" @click="paging('+')"></a>
          </p>
        </div>
      </div>
      <div id="table_user" v-has="['rrF5a1']">
        <el-table :data="tableData" stripe border height="calc(100vh - 230px)" style="width: 100%" :header-cell-style="{background:'#FAFAFB'}" @sort-change='sortChange'>
          <el-table-column type="index" label="编号" width="68">
            <template slot-scope="scope">
              <span>{{scope.$index+(currentPage4 - 1) * sizes + 1}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="工号" sortable width="150">
            <!-- <el-table-column prop="userName" label="工号" width="150" :render-header="renderHeader"> -->
          </el-table-column>
          <el-table-column prop="realName" label="姓名" width="155">
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="上次登录时间" sortable width="180">
          </el-table-column>
          <el-table-column prop="creatTime" label="加入时间" sortable width="180">
          </el-table-column>
          <!--     <el-table-column prop="telephone" label="手  机" width="120">
          </el-table-column>
          <el-table-column prop="email" label="邮  箱" width="160">
          </el-table-column> -->
          <el-table-column label="部门(职位)" width="300" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-for='(item,index) in scope.row.deptPositionList' :key='index'>
                <p :data-id='item.depId' class='place' ref='showdata'>
                  <em>{{item.position}}</em>
                  <!-- <span v-show='hide'>{{item.deptStr}}</span> -->
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <!-- <i class="icon iconfont" @click='settingUser(scope.row.id, scope.row)' v-if="permissionset" title="设置角色">&#xe63b;</i>
              <i class="icon iconfont gray-icon" v-else title="设置角色">&#xe63b;</i>
              <i class="icon iconfont" @click='redactUser(scope.row.id, scope.row)' v-if="permissionredact" title="编辑角色">&#xe638;</i> -->
              <span id='set-user' @click='settingUser(scope.row.id, scope.row)'>设置角色</span>
              <!-- <em id='line'></em> -->
              <!-- <span id='set-user' @click='redactUser(scope.row.id, scope.row)'>编辑角色</span> -->
              <!-- <i class="icon iconfont gray-icon" v-else title="编辑角色">&#xe638;</i> -->
              <!-- <i class="icon iconfont" @click='resetPassword(scope.row.id)'>&#xe63c;</i> -->
              <!-- <i class="icon iconfont" @click="deletetable(scope.row.id)">&#xe639;</i> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <!-- <p class="reveal">当前页显示{{20}}条，共{{count}}条；</p> -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage4" :page-sizes="[30, 40,50]" :page-size="30" layout="sizes,prev, pager, next, total,jumper" :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 设置角色的弹层 -->
    <el-dialog :visible.sync="setUser">
      <h3 style='margin-left:10px;'>设置角色</h3>
      <el-checkbox-group v-model='check' class="checkgroup">
        <el-checkbox v-for="(mpb,index) in queryData" :key='index' :value="mpb.id" :label="mpb.id" border style='margin:10px'>{{mpb.name}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setUser = false">取 消</el-button>
        <el-button type="primary" @click="setUserSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增用户的弹层 -->
    <!-- <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForms">
        <el-form-item label="上级部门" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" @input="depSearch" v-model="search_control">
            </el-input>
            <el-option v-for='item in section' :key='item.deptId' :label="item.deptStr" :value="item.deptId"></el-option>
            <el-option v-if='!section.length' value=''>暂无数据</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="tel" :label-width="formLabelWidth">
          <el-input v-model="form.tel" @input='searchName'></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname" :label-width="formLabelWidth">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.worker" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('ruleForms')">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 编辑的弹层 -->
    <!-- <el-dialog :visible.sync="redact" @close="cancelClick">
      <el-form :model="redactContent" :rules="rules" ref="redactContent"> -->
    <!-- <el-form-item label="手机号" prop="telephone" :label-width="formLabelWidth">
          <el-input v-model.number="redactContent.telephone"></el-input>
        </el-form-item> -->
    <!-- <el-form-item label="工号" prop="telephone" :label-width="formLabelWidth"> -->
    <!-- <el-input v-model="redactContent.telephone"></el-input> -->
    <!-- {{redactContent.telephone}} -->
    <!-- </el-form-item>
        <el-form-item label="真实姓名" prop="realName" :label-width="formLabelWidth">
          <el-input v-model="redactContent.realName"></el-input>
        </el-form-item>
        <template v-for='(item,ind) in redactContent.deptPositionList'>
          <div :key="ind"> -->
    <!-- 编辑时需要有一个所属部门 -->
    <!-- <el-form-item :label="('所属部门'+(ind+1))" :label-width="formLabelWidth" :required="ind == 0">
              <el-select v-model="item.deptId" placeholder="请选择" @change="selectGet">
                <el-input placeholder="请输入" suffix-icon="el-icon-search" v-model="search_control" @input="depSearch">
                </el-input>
                <el-option v-for='ites in section' :key='ites.deptId' :label="ites.deptStr" :value="ites.deptId"></el-option>
                <el-option v-if='section.length==0' value=''>暂无数据</el-option>
              </el-select>
              <i class="el-icon-delete" v-if='ifshowBtn && redactContent.deptPositionList.length > 1' @click='delDepartment(item,ind)'></i>
            </el-form-item>
             <el-form-item :label="('所属部门'+(ind+1)+'(职位)')" :label-width="formLabelWidth">
              <el-input v-model="item.position" auto-complete="off"></el-input>
            </el-form-item> -->
    <!-- </div>
        </template>
        <el-button type="primary" plain @click='showBranch'>
          <i class="el-icon-plus"></i>添加部门</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">返 回</el-button>
        <el-button type="primary" @click="onSubmitEditing('ruleForm')">保 存</el-button>
      </div>
    </el-dialog> -->
    <!-- 判断权限 没有权限改变颜色 -->
    <span class="J-set" v-has="['yJo4Of']"></span>
    <span class="J-redact" v-has="['7DPAIK']"></span>
  </div>
</template>

<script>
import api from '@/fetch/api.js'
import { isDisplay } from '@/assets/js/Utils'
import Bus from '@/assets/js/bus.js'
export default {
  data () {
    // var CheckTel = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("请输入电话号码"));
    //   } else if (!Number.isInteger(value)) {
    //     callback(new Error("电话号码必须是数字"));
    //   } else if (value.toString().length != 11) {
    //     callback(new Error("电话号码必须是11位"));
    //   } else {
    //     callback();
    //   }
    // };
    // let checkTel2 = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("请输入正确手机号"));
    //   }
    //   setTimeout(() => {
    //     //验证手机号
    //     if (!/^[0-9]{11}$/.test(value)) {
    //       return callback(new Error("手机号错误！"));
    //     } else {
    //       callback();
    //     }
    //   }, 500);
    // };
    return {
      permissionset: false,
      permissionredact: false,
      check: [],
      queryData: [],
      input1: '',
      currentPage4: 1,
      current_page: 1,
      tableData: [],
      dialogFormVisible: false, // 新增用户
      redact: false, // 编辑的弹层
      editArr: [],
      redactId: '',
      setUser: false, // 设置角色弹层
      setUserid: '',
      ifshowBtn: true,
      useroleId: [],
      search_control: '',
      formLabelWidth: '120px',
      section: [],
      realArr: [],
      redactflag: false,
      count: 1,
      sizes: 30,
      hide: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // form: {
      //   name: "",
      //   region1: "",
      //   region2: "",
      //   region3: "",
      //   date1: "",
      //   date2: "",
      //   delivery: false,
      //   type: [],
      //   resource: "",
      //   desc: "",
      //   tel: "",
      //   realname: "",
      //   worker: ""
      // },
      // rules: {
      //   telephone: [
      //     {
      //       required: true,
      //       // validator: CheckTel,
      //       message: "请输入工号",
      //       trigger: "blur"
      //     }
      //   ],
      //   tel: [
      //     {
      //       required: true,
      //       validator: checkTel2,
      //       trigger: "blur"
      //     }
      //   ],
      //   region: [
      //     { required: true, message: "请选择活动区域", trigger: "change" }
      //   ],
      //   realName: [
      //     { required: true, message: "请输入真实姓名", trigger: "blur" }
      //   ],
      //   realname: [
      //     { required: true, message: "请输入真实姓名", trigger: "blur" }
      //   ]
      // },
      redactContent: {
        deptPositionList: [],
        realName: '',
        telephone: '',
        userId: ''
      },
      dataForJava: {
        deptId: '',
        keyword: '',
        orderField: 'lastLoginTime',
        orderType: 'desc',
        page: 1,
        size: 30
      }
    }
  },
  created () {
    let that = this
    // 获取所有的角色
    api
      .getRoleList()
      .then(function (res) {
        res.data.map(item => {
          that.queryData.push(item)
        })
      })
      .catch(function (err) {
        console.log(err)
      })
    api
      .getDepartmentList({
        deptId: '',
        searchContent: ''
      })
      .then(function (res) {
        // that.dataForJava.deptId = res.data[0].deptId;
        that.dataPageList()
        that.section = res.data
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    let that = this
    isDisplay(this, 'J-set', 'permissionset')
    isDisplay(this, 'J-redact', 'permissionredact')
    // 面包屑
    Bus.$on('clickId', e => {
      that.dataForJava.deptId = e
      // that.current_page = 1;
      that.dataForJava.keyword = ''
      that.dataPageList()
      // api
      // .getSingleDeptList(e)
      // .then(function(res) {
      //   res.data.map((item, index) => {
      //     that.controlBread.push({ name: item.name, ind: index });
      //   });
      // })
      // .catch(function(err) {
      //   console.log(err);
      // });
      // Bus.$emit("controlBread", that.controlBread);
    })
    //  this.dataPageList()
    //  let column2 = document.querySelector('.el-table_1_column_2');
    //  let cell2 = column2.querySelector('.cell');
  },
  methods: {
    // renderHeader (h,{column}) {
    //   return h(
    //       'div',
    //       [
    //         h('span', column.label),
    //         h('i', {
    //           class:'el-icon-location',
    //           style:'color:#409eff;margin-left:5px;'
    //         })
    //       ],
    //     );
    // },
    dataPageList () {
      let that = this
      // this.dataForJava.page = this.current_page;
      api // 获取表格的数据
        .getUserList(this.dataForJava)
        .then(function (res) {
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    searchName () {
      let that = this
      api
        .getUserInfoByTelephone(that.form.tel)
        .then(function (res) {
          if (res.data) {
            that.form.realname = res.data.realName
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // depSearch() {
    //   let that = this;
    //   if (that.search_control) {
    //     let obj = {
    //       deptId: "",
    //       searchContent: that.search_control
    //     };
    //     api
    //       .getDepartmentList(obj)
    //       .then(function(res) {
    //         that.section = res.data;
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       });
    //   } else {
    //     api
    //       .getDepartmentList({
    //         deptId: "",
    //         searchContent: ""
    //       })
    //       .then(function(res) {
    //         that.section = res.data;
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       });
    //   }
    // },
    // 重置密码
    // resetPassword(id) {
    //   let that = this;
    //   this.$confirm("您是否要重置该用户的密码?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       api
    //         .resetPassword(id)
    //         .then(function(res) {
    //           if (res.errorCode === "200") {
    //             that.$message({
    //               showClose: true,
    //               type: "success",
    //               message: "该用户密码已经成功重置!"
    //             });
    //           }
    //         })
    //         .catch(function(err) {
    //           console.log(err);
    //         });
    //     })
    // },
    // 用户角色
    settingUser (id, row) {
      let that = this
      that.setUser = true
      that.setUserid = id
      that.useroleId = []
      this.check.splice(0, this.check.length)
      api
        .getRoleByUserId(id)
        .then(function (res) {
          res.data.map((item, index) => {
            that.useroleId.push(item.id) // 获取到的用户角色
            that.check.push(item.id)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 设置角色
    setUserSure () {
      let that = this
      let obj = {
        roleIdList: that.check,
        userId: that.setUserid
      }
      api
        .setRole4User(obj)
        .then(function (res) {
          that.setUser = false
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // showBranch() {
    //   if (this.redactContent.deptPositionList.length < 10) {
    //     this.redactContent.deptPositionList.push({
    //       deptId: "",
    //       deptStr: "",
    //       position: ""
    //     });
    //   } else {
    //     this.$message({
    //       showClose: true,
    //       type: "error",
    //       message: "仅限10个部门"
    //     });
    //   }
    // },
    // 编辑部门的删除
    // delDepartment(item, ind) {
    //   this.redactContent.deptPositionList.splice(ind, 1);
    //   if (this.redactContent.deptPositionList.length == 1) {
    //     this.ifshowBtn = false;
    //   } else {
    //     this.ifshowBtn = true;
    //   }
    // },
    // selectGet(vId) {
    //   let obj = {};
    //   obj = this.section.find(item => {
    //     //这里的userList就是上面遍历的数据源
    //     return item.deptId === vId; //筛选出匹配数据
    //   });
    //   this.redactContent.deptPositionList.map((item, index) => {
    //     if (item.deptId === obj.deptId) {
    //       item.deptStr = obj.deptStr;
    //     }
    //   });
    // },
    cancelClick () {
      this.redact = false
      this.$refs['redactContent'].resetFields()
    },
    // 编辑提交
    // onSubmitEditing(formName) {
    //   let that = this;
    //   if (
    //     //.toString().length == 11
    //     that.redactContent.telephone &&
    //     that.redactContent.realName &&
    //     that.redactContent.deptPositionList[0].deptId
    //   ) {
    //     let obj = {
    //       deptPositionStrInfoList: [],
    //       realName: that.redactContent.realName,
    //       telephone: that.redactContent.telephone,
    //       userId: that.redactContent.id
    //     };
    //     obj.deptPositionStrInfoList = that.redactContent.deptPositionList;
    //     api
    //       .updateUserInfo(obj)
    //       .then(function(res) {
    //         that.redact = false;
    //         // that.$router.go(0);
    //         that.userInput();
    //         that.$refs["redactContent"].resetFields();
    //       })
    //   } else {
    //       this.$message({
    //          showClose: true,
    //          type: 'error',
    //          message: '请完成必填选项，如果没有工号请联系管理人员'
    //        })
    //   }
    // },
    // 编辑用户
    // redactUser(id, row) {
    //   let that = this;
    //   that.redactContent.deptPositionList = [];
    //   that.redact = true;
    //   that.redactId = id;
    //   api
    //     .getUserInfo(id)
    //     .then(function(res) {
    //       that.redactContent = res.data;
    //       // 现在的telephone 是工号
    //       that.redactContent.telephone = row.userName;
    //       that.redactContent.realName = row.realName;
    //       let length = that.redactContent.deptPositionList.length;
    //       if (length == 1) {
    //         that.ifshowBtn = false;
    //       } else if (length === 0) {
    //         // 必须要显示一个
    //         that.redactContent.deptPositionList = [
    //           {
    //             deptId: "",
    //             deptStr: "",
    //             position: ""
    //           }
    //         ];
    //       } else {
    //         that.ifshowBtn = true;
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },
    // addUser() {
    //   let that = this;
    //   that.dialogFormVisible = true;
    //   let obj = {
    //     deptId: "",
    //     searchContent: that.search_control
    //   };
    //   api
    //     .getDepartmentList(obj)
    //     .then(function(res) {
    //       that.section = res.data;
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },
    userInput () {
      let that = this
      if (!that.input1) {
        // let obj = {
        //   keyword: "",
        //   orderField: "id",
        //   orderType: "",
        //   page: that.current_page,
        //   size: 10
        // };
        // this.dataForJava.page = this.current_page;
        api // 获取表格的数据
          .getUserList(this.dataForJava)
          .then(function (res) {
            that.tableData = res.data.list
            that.count = res.data.count
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    userSearch () {
      let that = this
      this.dataForJava.deptId = ''
      this.dataForJava.page = 1
      // this.currentPage4 = 1;
      // this.current_page = 1;
      let treeCol = document.getElementsByClassName('side-menu')[0]
      let treeCol_child = treeCol.getElementsByClassName('color_title')

      for (let i = 0; i < treeCol_child.length; i++) {
        treeCol_child[i].style.color = '#727273'
        treeCol_child[i].nextElementSibling.style.display = 'none'
      }
      this.dataForJava.keyword = this.input1
      api
        .getUserList(this.dataForJava)
        .then(function (res) {
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 新增用户
    onSubmit (formName) {
      let that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.dialogFormVisible = false
          if (that.form.region) {
            if (that.form.tel) {
              let obj = {
                deptId: that.form.region,
                position: that.form.worker,
                realName: that.form.realname,
                telephone: that.form.tel
              }
              api
                .addUser(obj)
                .then(function (res) {
                  that.$router.go(0)
                })
                .catch(function (err) {
                  console.log(err)
                })
            }
          } else {
            that.$message({
              showClose: true,
              type: 'error',
              message: '请选择上级部门'
            })
          }
        } else {
          return false
        }
      })
    },
    // 每个页面有多少条数据
    handleSizeChange (val) {
      let that = this
      that.sizes = val
      // this.currpage = val;
      this.dataForJava.size = val
      api // 获取表格的数据
        .getUserList(this.dataForJava)
        .then(function (res) {
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 筛选
    sortChange (column, prop, order) {
      var that = this
      this.dataForJava.page = 1
      this.currentPage4 = 1
      if (column.order == 'descending') {
        this.dataForJava.orderType = 'desc'
      } else {
        this.dataForJava.orderType = 'asc'
      }
      switch (column.column.label) {
        case '工号':
          this.dataForJava.orderField = column.prop
          break
        case '上次登录时间':
          this.dataForJava.orderField = 'lastLoginTime'
          break
        case '加入时间':
          this.dataForJava.orderField = 'createAt'
          break
        default:
      }
      api // 获取表格的数据
        .getUserList(this.dataForJava)
        .then(function (res) {
          // res.data.list.sort(function compareFunction(param1, param2) {
          //   return param1.realName.localeCompare(param2.realName);
          // });
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 分页的数字点击事件
    handleCurrentChange (val) {
      let that = this
      // this.current_page = val;
      this.currentPage4 = val
      this.dataForJava.page = val
      api // 获取表格的数据
        .getUserList(this.dataForJava)
        .then(function (res) {
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    paging (val) {
      let that = this
      if (val === '+') {
        if (this.currentPage4 === Math.ceil(that.count / 30)) {
          this.currentPage4 = Math.ceil(that.count / 30)
        } else {
          this.currentPage4 = this.currentPage4 + 1
        }
      } else {
        if (this.currentPage4 === 1) {
          this.currentPage4 = 1
        } else {
          this.currentPage4 = this.currentPage4 - 1
        }
      }
      that.current_page = this.currentPage4
      this.dataForJava.page = this.currentPage4
      api // 获取表格的数据
        .getUserList(this.dataForJava)
        .then(function (res) {
          that.tableData = res.data.list
          that.count = res.data.count
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    deletetable (id) {
      let userId = id
      let that = this
      // 删除的弹框要出来
      that
        .$confirm('是否删除？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          api
            .deleteUserById(userId)
            .then(function (res) {
              that.$message({
                showClose: true,
                type: 'success',
                message: '删除成功'
              })
              that.$router.go(0)
            })
        })
        .catch(() => {
          return false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

.mainright {
  width: 100%;
  box-sizing: border-box;
  .el-table_1_column_4 {
    .place {
      em {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      // span {
      //   display: none;
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   font-size: 10px;
      //   background: rgba(0, 0, 0, 0.2);
      //   color: #fff;
      //   width: 200px;
      //   z-index: 999;
      //   text-align: center;
      // }
    }
  }
}
.proRig {
  position: relative;
  display: flex;
  height: 20px;
  p {
    position: absolute;
    right: 0px;
    button {
      border: 0;
      background: none;
      font-size: 16px;
    }
  }
}
#set-user {
  color: #69789e;
}
#set-user:hover {
  cursor: pointer;
}
// #line {
//   border-left: 1px solid #ccc;
//   display: inline-block;
//   height: 9px;
//   padding-left: 10px;
//   margin-left: 10px;
// }
</style>
<style lang='less'>
.mainright {
  .el-dialog {
    width: 40%;
    .el-icon-delete {
      color: #a8afba;
    }
  }
  .cell {
    // text-align: center;
    box-sizing: border-box;
    font-size: 12px;
    i {
      margin: 0 10px;
      font-size: 14px;
    }
  }
  .block {
    height: 120px;
    padding-top: 10px;
    position: relative;
    .el-pagination {
      right: 0;
    }
  }
  .reveal {
    position: absolute;
    left: 20px;
  }
  .el-pagination {
    position: absolute;
    right: 35px;
  }
  .el-input__inner {
    color: #bebebe;
    font-size: 12px;
  }
  // .has-gutter{
  //   background:red !important;
  // }
}
.navuser {
  display: flex;
  .el-input {
    width: 200px;
    height: 30px;
  }
  .el-input__inner {
    height: 30px;
  }
  button {
    box-sizing: border-box;
    width: 70px;
    height: 30px;
    background: #4474cf;
    font-size: 14px;
    color: #fff;
    border: 0;
    margin-left: 5px;
    font-weight: 400;
    cursor: pointer;
  }
  .adduser {
    background: #4474cf;
    width: 120px;
    margin-left: 10px;
  }
}
#table_user {
  margin-top: 7px;
  width: 100%;
  height: calc(100vh - 70px);
  td,
  th {
    height: 30px;
    padding: 0 !important;
    .cell {
      font-weight: normal;
    }
  }
  .iconfont {
    color: #a8afba;
    cursor: pointer;
  }
  .gray-icon {
    cursor: not-allowed;
    color: #ddd;
  }
}
// .marnright_head {
//   .el-breadcrumb {
//     line-height: 41px;
//     background: #a9acb3;
//     padding-left: 21px;
//     color: #fff;
//     font-size: 14px;
//     box-sizing: border-box;
//     vertical-align: middle;
//   }
//    img {
//     width: 14px;
//     height: 14px;
//     display: inline-block;
//     vertical-align: middle;
//   }
//   .el-breadcrumb__inner {
//     color: #fff;
//     font-size: 14px;
//     img {
//       padding-right: 10px;
//     }
//   }
//   .el-breadcrumb__item:last-child .el-breadcrumb__inner {
//     color: #fff;
//   }
//   .el-breadcrumb__separator[class*="icon"] {
//     font-weight: 400;
//     color: #fff;
//   }
// }
</style>
