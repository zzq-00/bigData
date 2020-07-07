<template>
  <div class="cloud_platform">
    <headerComponent></headerComponent>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <!-- <div class="section"> -->
      <div class="main">
        <div class="mainleft" ref="sides">
          <h3 class="lifirst" @click='allprople'><img src="../../assets/img/zuzhi.png" alt="">
            <span class="first_col">{{tzeccTitle.name}}</span>
            <!-- <em class="blue_line"></em> -->
          </h3>
          <div class="side-menu">
             <el-scrollbar wrap-class="list" :native="true" style='height:100%;'>
                <el-tree v-loading="loading" :load="loadNode" lazy="" :data="setTree" highlight-current node-key="id" ref="tree" :props="defaultProps" @node-click="handleNodeClick">
                  <span slot-scope="{node,data}">
                    <span id="addColor" class="add_color">
                      <i v-if='data.level===-1 ? false : true' class="el-icon-caret-right"></i>
                      <span class="color_title" :title="data.name">{{data.name}}</span>
                      <em class="blue_line"></em>
                    </span>
                  </span>
                </el-tree>
            </el-scrollbar>
          </div>
            <div class="white-solid"></div>
            <div class="shrink-btn" title="展开/收起" v-show="!isActive" @click="Retract"></div>
            <div class="shrink-btn" title="展开/收起" v-show="isActive" @click="Open"></div>
            <div class="sliders"></div>
        </div>
        <div class="mainright">
          <router-view></router-view>
        </div>
      </div>
    <!-- </div> -->
    <!-- <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-input placeholder="请输入" suffix-icon="el-icon-search" v-model="search_control" @input="depSearch">
            </el-input>
            <el-option v-for='item in section' :key='item.deptId' :label="item.deptStr" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogAddUser">
      <el-form>
        <el-form-item label="部门名称1" :label-width="formLabelWidth">
          <el-input v-model="departmentA" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称2" :label-width="formLabelWidth">
          <el-input v-model="departmentB" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称3" :label-width="formLabelWidth">
          <el-input v-model="departmentC" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import api from '../../fetch/api.js'
import Bus from '../../assets/js/bus.js'
export default {
  components: {
    headerComponent,
    breadcrumb
  },
  created () {
    const that = this
    // api
    //   .getOrganizeStructureList()
    //   .then(function(res) {
    //     that.setTree = res.data;
    //     that.loading = false;
    //   })
    // 左侧列表数据
    // api.getDeptStructureFromRemote().then(function(res){
    //     api.getOrganizeStructureList().then(function(res){
    //         that.setTree = res.data;
    //         that.loading = false;
    //     })
    // })
    api.getInitDeptResult().then(function (res) {
      that.setTree = res.data.sonList
      that.loading = false
      that.tzeccTitle = res.data.tzecc
    })
  },
  data () {
    return {
      // children: [],
      breadcrumbs: [
        { name: '控制台', path: this.$route.fullPath }
      ],
      isActive: false,
      // controlBread: [
      //   { name: "天职工程咨询有限公司", className: "el-icon-location-outline" }
      // ],
      tzeccTitle: '',
      isLoadingTree: false, // 是否加载节点树
      setTree: [], // 节点树数据
      defaultProps: {
        label: 'name',
        children: [],
        isLeaf: 'leaf'
      },
      defaultExpandKeys: ['deptInfoList'], // 默认展开节点列表
      // latername: [],
      // deptId:'',
      // dialogFormVisible: false,
      // search_control: "",
      // form: {
      //   name: "",
      //   region: "",
      //   id: null
      // },
      loading: true
      // formLabelWidth: "120px",
      // section: [],
      // orgbread: [],
      // dialogAddUser: false,
      // departmentA: "",
      // departmentB: "",
      // departmentC: "",
      // addtemp: {
      //   deptId: "",
      //   deptInfoList: []
      // }
    }
  },
  watch: {
    // 监听路由变化
    $route (to, from) {
      if (to.fullPath === '/controlPanel/organization') {
        this.$router.go(0)
      } else if (to.fullPath === '/controlPanel/usercontrol') {
        this.$router.go(0)
      }
    }
  },
  mounted () {
    if (this.$router.history.current.path == '/controlPanel/organization') {
      this.breadcrumbs.push({ name: '组织架构' })
    } else if (
      this.$router.history.current.path == '/controlPanel/usercontrol'
    ) {
      this.breadcrumbs.push(
        { name: '用户管理' }
      )
    }
    // Bus.$on("controlBread", e => {
    //   this.orgbread = e;
    // });
  },
  updated () {
    /* let that = this;
    let creatdom = document.createElement("p");
    creatdom.className = "appendpor";
    if (this.$router.history.current.path == "/controlPanel/organization") {
      creatdom.innerHTML = `
           <span class="icon iconfont edituser">&#xe638;</span>
           <i class="icon iconfont delete">&#xe639;</i>
            `;
    } else if (
      this.$router.history.current.path == "/controlPanel/usercontrol"
    ) {
      creatdom.innerHTML = `
           <b class="el-icon-plus"></b>
           <span class="icon iconfont edituser">&#xe638;</span>
           <i class="icon iconfont delete">&#xe639;</i>
            `;
    } */
    // creatdom.addEventListener("click", this.click);
    // let doms = document.getElementsByClassName("el-tree-node__content");
    // let doms = document.getElementsByClassName("color_title");
    // let addc = doms.getElementsByTagName('span')
    // for (let k = 0; k < doms.length; k++) {
    //   doms[k].onmouseover = function(e) {
    //     if (this.innerHTML.length > 9) {
    //       e.target.title = e.target.innerHTML;
    //     }
    //   };
    // }
    // //划过左侧出现icon
    // for (let i = 0; i < childdoms.length; i++) {
    //   let content = childdoms[i].getElementsByClassName("el-tree-node__content");
    //   let tree = document.querySelector('.el-tree');
    //   var emDom = document.createElement("em");
    //   emDom.className = 'blue_line';
    //   for(let j=0; j<content.length; j++){
    //       content[j].onmouseover = function(e) {
    //           if(this.children[1].innerHTML.length>9){
    //                e.target.title = e.target.innerHTML
    //           }
    //           let blueDom = this.parentNode.parentNode.parentNode.getElementsByClassName("el-tree-node__content")[0];
    //           blueDom.style.color = '#4474CF';
    //             this.appendChild(emDom);
    //       }
    //       content[j].onmouseleave = function() {
    //           let blueDom = this.parentNode.parentNode.parentNode.getElementsByClassName("el-tree-node__content")[0];
    //           blueDom.style.color = '#727273'
    //       }
    //   }
    // doms[i].onmouseover = function() {
    // el-tree-node
    // doms[i].appendChild(creatdom);
    // let inner_html = doms[i].querySelector('.el-tree-node__label').innerHTML;
    // };
    // if(doms[i].querySelector('.el-tree-node__label').innerHTML.length>15){
    //     doms[i].querySelector('.el-tree-node__label').style.width = '150px';
    // }
    // }
  },
  methods: {
    // loadNode1(node, resolve) {
    //   if (node.level === 0) {
    //     return resolve([{ name: 'region' }]);
    //   }
    //   if (node.level > 1) return resolve([]);

    // },
    Retract () {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '60px'
      this.$refs.sides.style.transition = 'width 0.4s'
    },
    // 展开
    Open () {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
    },
    allprople () {
      Bus.$emit('clickId', '')
      //  let changeCol = document.getElementsByClassName('first_col')[0];
      //  changeCol.style.color = '#4474CF';
      //  changeCol.nextElementSibling.style.display = 'block';
      let treeCol = document.getElementsByClassName('side-menu')[0]
      let treeCol_child = treeCol.getElementsByClassName('color_title')

      for (let i = 0; i < treeCol_child.length; i++) {
        treeCol_child[i].style.color = '#727273'
        treeCol_child[i].nextElementSibling.style.display = 'none'
      }
    },
    loadNode (node, resolve) {
      if (node.level == 1) {
        // 注！把resolve传到你自己的异步中去
        this.getUser(node.data.id, resolve)
      } else if (node.level === 0) {
        return resolve(this.setTree)
      }
    },
    getUser (id, resolve) {
      api.getDeptStructureByParentId(id).then(function (res) {
        resolve(res.data)
      })
    },
    // click(e) {
    //   let that = this;
    //   if (e.target.nodeName.toLowerCase() === "span") {
    //     //编辑
    //     that.dialogFormVisible = true;
    //     Bus.$on("clickId", e => {
    //       let obj = {
    //         deptId: e,
    //         searchContent: ""
    //       };
    //       api
    //         .getDepartmentList(obj)
    //         .then(function(res) {
    //           that.section = res.data;
    //         })
    //     });
    //   } else if (e.target.nodeName.toLowerCase() === "i") {
    //     //删除节点
    //     that
    //       .$confirm("是否删除此节点？", "提示", {
    //         confirmButtonText: "确认",
    //         cancelButtonText: "取消",
    //         type: "warning"
    //       })
    //       .then(() => {
    //         api
    //           .deleteDeptById(that.form.id)
    //           .then(function(res) {
    //             res.errorCode == "200"
    //               ? that.$message({
    //                   showClose: true,
    //                   message: "删除成功！",
    //                   type: "success"
    //                 })
    //               : "";
    //             that.$router.go(0);
    //           })
    //       })
    //   } else if (e.target.nodeName.toLowerCase() === "b") {
    //     //添加
    //     that.dialogAddUser = true;
    //     Bus.$on("clickId", e => {
    //       that.addtemp.deptId = e;
    //     });
    //   }
    // },
    // 点击编辑搜索部门
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
    //   } else {
    //     let obj = {
    //       deptId: that.form.id,
    //       searchContent: ""
    //     };
    //     api
    //       .getDepartmentList(obj)
    //       .then(function(res) {
    //         that.section = res.data;
    //       })
    //   }
    // },
    // 编辑
    // onSubmit() {
    //   let that = this;
    //   let obj = {
    //     id: that.form.id,
    //     name: that.form.name,
    //     parentId: that.form.region
    //   };
    //   api
    //     .updateDepartments(obj)
    //     .then(function(res) {})
    //   that.dialogFormVisible = false;
    //   that.$router.go(0);
    // },
    // addSubmit() {
    //   let that = this;
    //   that.addtemp.deptInfoList = [];
    //   if (that.departmentA) {
    //     that.addtemp.deptInfoList.push({
    //       id: "",
    //       name: that.departmentA
    //     });
    //   }
    //   if (that.departmentB) {
    //     that.addtemp.deptInfoList.push({
    //       id: "",
    //       name: that.departmentB
    //     });
    //   }
    //   if (that.departmentC) {
    //     that.addtemp.deptInfoList.push({
    //       id: "",
    //       name: that.departmentC
    //     });
    //   }
    //   api
    //     .addDepartment(that.addtemp)
    //     .then(function(res) {
    //       that.$router.go(0);
    //     })
    //   that.dialogAddUser = false;
    // },
    handleNodeClick (d, s, n) {
      // 左侧的点击获取子集
      // let breard = {};
      // let that = this;
      // breard.name = d.name;
      // let deptId = d.id;
      // let delName = d.name;
      // that.deptId = d.id;
      // that.form.name = delName;
      // that.form.id = deptId;
      // that.children = d.deptInfoList;
      // that.form.region = n.node.parent.data.id;
      Bus.$emit('clickId', d.id)
      // let changeCol = document.getElementsByClassName('first_col')[0];
      // changeCol.style.color = '#727273';
      // changeCol.nextElementSibling.style.display = 'none';
      let treeCol = document.getElementsByClassName('side-menu')[0]
      let treeCol_child = treeCol.getElementsByClassName('color_title')
      for (let i = 0; i < treeCol_child.length; i++) {
        treeCol_child[i].style.color = '#727273'
        treeCol_child[i].nextElementSibling.style.display = 'block'
      }
      n.$el.getElementsByClassName('color_title')[0].style.color = '#4474CF'
      // 旋转小三角 icon
      // if (d.level === 0) {
      // !n.$el.getAttribute("class").split(" ")[3]?  n.$el
      //     .getElementsByClassName("el-tree-node__content")[0]
      //     .getElementsByClassName("el-icon-caret-right")[1].style.transform =
      //     "rotate(90deg)" :  n.$el
      //     .getElementsByClassName("el-tree-node__content")[0]
      //     .getElementsByClassName("el-icon-caret-right")[1].style.transform =
      //     "rotate(0deg)";
      // }
      // n.$el.getElementsByClassName('color_title')[0].style.color='#4474CF'
      // that.orgbread.splice(1, that.orgbread.length); //删除面包屑
      // Bus.$emit("orgbread", that.orgbread);
      // let appendpor = document.getElementsByClassName("appendpor");
      // for (let i = 0; i < appendpor.length; i++) {
      //   appendpor[i].innerHTML = "";
      // }
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
// .cloud_platform {
//   width: 100%;
//   height: 100%;
//   background: #e7eaee;
//   box-sizing: border-box;
//   overflow: hidden;
// }
// .section {
//   width: 100%;
//   height: auto;
//   background: #e7eaee;
// }
// .el-breadcrumb__item {
//   line-height: 55px;
// }
// .el-breadcrumb {
//   font-size: 16px;
//   color: #444444;
// }
// .el-breadcrumb__inner a,
// .el-breadcrumb__inner.is-link {
//   font-weight: normal;
// }
// .el-breadcrumb {
//   height: 35px;
//   line-height: 35px;
//   font-size: 12px;
// }
.main {
  width: 100%;
  height: calc(100vh - 100px);
  box-sizing: border-box;
  display: flex;
  margin: 0 auto;
  overflow: hidden;
}
.mainright {
  width: 100%;
  box-sizing: border-box;
  min-width: calc(100% - 240px);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}
.mainleft {
  width: 240px;
  box-sizing: border-box;
  position: relative;
  padding-top: 10px;
  .white-solid {
    background: #ced2dc;
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -2px;
  }
      .shrink-btn {
      position: absolute;
      right: -10px;
      bottom: 0;
      top: 50%;
      margin-top: -25px;
      width: 5px;
      height: 50px;
      background: #c2c3c5;
      border-radius: 3px;
      cursor: pointer;
      z-index: 4;
    }
    .sliders {
      width: 5px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      cursor: e-resize;
    }
}
.el-tree {
  padding-bottom: 30px;
}
  .white-solid {
    background: #ced2dc;
    width: 1px;
    height: 100%;
  }
// .mainleft > div::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   border-radius: 5px;
// }
// .mainleft > div::-webkit-scrollbar-thumb {
//   background-color: rgba(50, 65, 87, 0.5);
//   outline: 1px solid slategrey;
//   border-radius: 5px;
// }
// .mainleft > div::-webkit-scrollbar {
//   width: 10px;
// }
// .expand-tree {
//   border: none;
//   margin-top: 10px;
// }
// .expand-tree .el-tree-node.is-current,
// .expand-tree .el-tree-node:hover {
//   overflow: hidden;
// }
// .tree-expand .tree-btn i {
//   font-size: 16px;
//   padding-right: 40px;
// }
// .expand-tree .is-current > .el-tree-node__content .tree-btn,
// .expand-tree .el-tree-node__content:hover .tree-btn {
//   display: inline-block;
//   padding-right: 0;
// }
// .expand-tree .is-current > .el-tree-node__content .tree-label {
//   font-weight: 600;
//   white-space: normal;
// }
// .tree-expand .tree-btn {
//   display: none;
//   float: none;
//   position: absolute;
//   right: 56px;
// }
// .tree-expand .tree-label .edit {
//   width: auto !important;
// }
// .department {
//   margin-bottom: 20px;
//   box-sizing: border-box;
//   .el-input {
//     width: 300px;
//     margin-left: 10px;
//   }
// }
</style>
<style lang="less">
// .marnright_head {
//   .el-breadcrumb__inner {
//     color: #fff;
//     font-size: 18px;
//   }
//   .el-breadcrumb__item:last-child .el-breadcrumb__inner {
//     color: #fff;
//   }
// }
.el-scrollbar__wrap{
  height: 100%;
  overflow-x: hidden;
  margin-bottom:10px;
}
.mainleft {
  box-sizing: border-box;
  padding-left: 20px;
  border-right:1px solid #f6f8fa;
  .lifirst {
    color: #727273;
    padding-bottom: 15px;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    span {
      padding-left: 10px;
    }
    // > .blue_line{
    //       border:2px solid #4474CF;
    //       height: 15px;
    //       position: absolute;
    //       right:10px;
    //       top:1px;
    //   }
    &:hover{
      cursor: pointer;
      // >span:hover{
      //   color:#4474CF;
      // }
    }
  }
  .el-tree {
    background: none;
  }
  .el-tree-node {
    position: relative;
  }
  // .appendpor {
  //   position: absolute;
  //   right: 20px;
  //   float: left;
  //   line-height: 16px;
  //   i,
  //   span,
  //   b {
  //     display: inline-block;
  //     font-size: 14px;
  //     margin-left: 14px;
  //     color: #a8afba;
  //   }
  // }
  // .el-tree > .el-tree-node > .el-tree-node__content {
  //   padding-left: 20px !important;
  // }
  .el-tree-node__content {
    color: #727273;
    background: #e7eaee !important;
    position: relative;
    box-sizing: border-box;
    // line-height: 38px;
    // height: 38px;
    // border-bottom: 1px #eff2f9 dashed;
    // .el-tree-node__label {

    // }
    &:hover {
      .el-tree-node__label {
        color: #4474cf;
        background: #e7eaee !important;
        // width: 150px;
      }
      .blue_line{
        border:2px solid #4474CF;
        height: 15px;
        position: absolute;
        right:0px;
        top:1px;
      }
    }
  }
  #addColor {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 190px;
    box-sizing: border-box;
    display: inline-block;
    &:hover {
      color: #4474cf;
      background: #e7eaee !important;
      // width: 150px;
    }
  }
  .side-menu {
    padding-left: 30px;
    box-sizing: border-box;
    // height: calc(100vh - 200px);
    height: 100%;
  }
  // .is-expanded {
  //   line-height: 30px;
  // }
  .el-tree-node__children {
    padding-left: 14px;
    box-sizing: border-box;
    .el-icon-caret-right {
      display: none;
    }
  }
  .el-tree,.el-tree-node__children{
    > .is-current {
      > .el-tree-node__content {
        > span {
          > #addColor {
            .color_title {
              color: #4474cf;
            }
          }
           .blue_line{
            border:2px solid #4474CF;
            height: 15px;
            position: absolute;
            top:1px;
            right:0px;
          }
        }
      }
    }
  }
  .color_title {
    line-height: 30px;
  }
  .el-icon-loading,
  .el-tree-node__expand-icon {
    display: none;
  }
}
</style>
