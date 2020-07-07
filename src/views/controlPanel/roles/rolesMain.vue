<template>
  <div>
    <headerComponent></headerComponent>
    <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
    <div class="roles-container">
      <p class="roles-title">
        <!-- <span class="title-01">角色列表</span> -->
        <button class="btn-add" @click="rolesClick" v-has="['uPPnCf']">新增</button>
      </p>
      <div class="table-roles-container">
        <div class="table_user-roles">
          <el-table :data="tableData" border stripe :header-cell-class-name="'table-header'">
            <el-table-column label="编号" width="60" prop="sort">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="name" width="150">
            </el-table-column>
            <el-table-column label="角色描述" prop="description" width="530">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i class="icon-font" title="权限维护" v-if="permissionset" @click="setRolesClick(scope.$index)">权限维护</i>
                <i class="icon-font gray-icon" title="权限维护" v-else>权限维护</i>
                <i class="icon-font" title="编辑角色" v-if="permissionedit" @click="editBtnClick(scope.$index)">编辑角色</i>
                <i class="icon-font gray-icon" title="编辑角色" v-else>编辑角色</i>
                <i class="icon-font" title="删除角色" v-if="permissiondelete" @click="deleteClick(scope.$index)">删除角色</i>
                <i class="icon-font gray-icon" title="删除角色" v-else>删除角色</i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 添加角色 -->
    <el-dialog :visible="dialog.addBtn || dialog.editBtn" :title="dialog.addBtn ? '新建角色' : '编辑角色'" width="500px" @close="cancelClick">
      <div class="block">
        <span class="title require-right">角色名称</span>
        <el-input type="text" v-model="roles.name" @input="addNameInput"></el-input>
        <p class="tip-text" v-show="tipText.addName">请填写角色名称</p>
      </div>
      <div class="block">
        <span class="title">角色描述</span>
        <el-input type="textarea" :rows="3" v-model="roles.description"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="onroleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 判断权限 没有权限改变颜色 -->
    <span class="J-set" v-has="['HPpj3o']"></span>
    <span class="J-edit" v-has="['TzSxHF']"></span>
    <span class="J-delete" v-has="['HH0rRI']"></span>
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
import { isDisplay } from '@/assets/js/Utils'
export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '控制台' }, { name: '用户权限' }],
      permissionset: false,
      permissionedit: false,
      permissiondelete: false,
      dialog: {
        addBtn: false,
        editBtn: false
      },
      tableData: [],
      roles: {
        name: '',
        description: ''
      },
      tipText: {
        addName: false
      },
      currentIndex: -1
    }
  },
  methods: {
    getRoleList() {
      api.getRoleList().then(res => {
        this.tableData = res.data
      })
    },
    rolesClick() {
      this.dialog.addBtn = true
    },
    onroleSubmit() {
      if (this.roles.name) {
        this.tipText.addName = false
        let id = ''
        if (this.currentIndex > -1) {
          id = this.tableData[this.currentIndex].id
        }
        let data = {
          id: id,
          description: this.roles.description,
          name: this.roles.name
        }
        api.saveOrUpdateRole(data).then(res => {
          if (this.dialog.addBtn) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '创建成功'
            })
          } else if (this.dialog.editBtn) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '保存成功'
            })
          }
          this.cancelClick()
          this.getRoleList()
        })
      } else {
        this.tipText.addName = true
      }
    },
    addNameInput() {
      this.tipText.addName = !this.roles.name
    },
    editBtnClick(index) {
      this.roles.name = this.tableData[index].name
      this.roles.description = this.tableData[index].description
      this.dialog.editBtn = true
      this.currentIndex = index
    },
    cancelClick() {
      this.dialog.addBtn = false
      this.dialog.editBtn = false
      this.roles.name = ''
      this.roles.description = ''
      this.currentIndex = -1
    },
    deleteClick(index) {
      this.$confirm('是否删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = this.tableData[index].id
        if (id) {
          api.deleteRole(id).then(res => {
            this.$message({
              showClose: true,
              type: 'success',
              message: '删除成功'
            })
            this.getRoleList()
          })
        } else {
          console.log('角色id为空，不能删除')
        }
      })
    },
    setRolesClick(index) {
      let id = this.tableData[index].id
      let name = this.tableData[index].name
      this.$router.push({ path: '/controlPanel/editRoles/' + id, query: { name: name } })
    }
  },
  mounted() {
    // 所有用户
    this.getRoleList()
    isDisplay(this, 'J-set', 'permissionset')
    isDisplay(this, 'J-edit', 'permissionedit')
    isDisplay(this, 'J-delete', 'permissiondelete')
  }
}
</script>
<style lang="less" scoped>
.roles-container {
  // background-color: #fff;
  // padding: 20px;
  width: 1000px;
  margin: 0 auto;
  .roles-title {
    .title-01 {
      font-size: 16px;
      color: #3e8da7;
    }
    .btn-add {
      font-size: 14px;
      // font-weight: bold;
      padding: 5px 20px;
      background-color: #4474cf;
      // border-radius: 5px;
      color: #fff;
      // margin-left: 20px;
      margin: 10px 0;
      cursor: pointer;
    }
  }
}
.table_user {
  // padding-top: 12px;
  // width: 50%;
  font-size: 12px;
  min-height: e('calc(100vh - 170px)');
  background-color: #fff;
  td,
  th {
    // height: 40px;
    padding: 0;
    .cell {
      font-weight: normal;
      color: #666;
    }
  }
  // .iconfont {
  //   color: #a8afba;
  //   cursor: pointer;
  //   &:hover{
  //     color: rgba(251, 152, 0, 1);
  //   }
  // }
  .gray-icon {
    cursor: not-allowed;
    color: #ddd;
  }
  .icon + .icon {
    margin-left: 10px;
  }
}
.block {
  position: relative;
  .title {
    display: inline-block;
    width: 80px;
  }
  .require-right {
    &:after {
      content: '*';
      color: red;
    }
  }
  .el-input,
  .el-textarea {
    width: 375px;
    vertical-align: top;
  }
  .tip-text {
    position: absolute;
    font-size: 12px;
    left: 80px;
    bottom: -20px;
    color: red;
  }
}
.block + .block {
  margin-top: 25px;
}
.icon-font {
  font-size: 12px;
  color: #69789e;
  cursor: pointer;
  &:hover {
    color: #4474cf;
  }
}
.icon-font + .icon-font {
  &:before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 9px;
    background-color: #dfdfdf;
    margin: 0 10px;
  }
}
.table-roles-container {
  min-height: e('calc(100vh - 170px)');
  background-color: #fff;
}
</style>
<style>
.table_user-roles .table-header {
  background: #fafafb;
}
.table_user-roles .el-table {
  font-size: 12px;
}
.table_user-roles .el-table td,
.table_user-roles .el-table th {
  padding: 3px 0;
}
</style>
