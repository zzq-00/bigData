<template>
  <div class="member_dialog">
    <div class="left">
      <el-tag v-for="(tag, index) in $store.state.memberList.memberData" :key="index" :closable="tag.id !== creatorId&&tag.id !== userId" @close="handleClose(tag)">
        {{tag.realName}}
      </el-tag>
      <el-popover trigger="manual" v-model="popoverVisible" placement="bottom-start" popper-class="member-popover" v-loading="loading">
        <div class="result-block" v-for="item in searchData" :key="item.code" @click="getUser(item)">
          <!-- <img :src="item.headPortraits" :onerror="errIcon" class="icon-head"/> -->
          <div class="result-right">
            <p>账号：{{item.telephone}}</p>
            <p>用户名：{{item.realName}}</p>
            <p>部门：{{item.deptPositionList[0].position || item.deptPositionList[0].deptStr}}</p>
            <!-- <p>
              {{$store.state.userInfo.companyName}} - 
              <span v-for="role in item.firmBaseRole" :key="role.id">{{role.name}}</span>
            </p> -->
          </div>
        </div>
        <div v-if="!searchData.length" class="no-result-block">
          没有匹配到任何结果
        </div>
        <input slot="reference" ref="searchInput" v-model="searchUser" class="search-input" placeholder="搜索" />
      </el-popover>
      <div class="btn-box">
        <button class="btn-common" :class="{'btn-submit': $store.state.memberList.memberData.length}" @click="handleSubmit">确定</button>
        <button class="btn-cancel" @click="handleCancel">取消</button>
      </div>
    </div>
    <div class="right">
      <p class="title" @click="handleTitle">{{companyData.fullName}}</p>
      <tree-component :departDataTree="departDataTree" :currentLevel="1"></tree-component>
    </div>
  </div>
</template>

<script>
import treeComponent from './tree'
import api from '@/fetch/api'
export default {
  components: { treeComponent },
  data() {
    return {
      errIcon: '',
      searchData: [],
      popoverVisible: false,
      searchUser: '', // 搜索框值
      departDataTree: [], // 第一级部门
      companyData: '',
      loading: false,
      params: {
        deptId: '',
        keyword: '',
        orderField: 'lastLoginTime', // 删除会报错
        orderType: 'desc',
        page: 1,
        size: 10000
      },
      creatorId: localStorage.getItem('creatorProjectId') * 1,
      userId: localStorage.getItem('userId') * 1
    }
  },
  watch: {
    '$store.state.memberList.dialogMemberVisible': {
      handler: function(value) {
        if (!value) {
          this.popoverVisible = false
        }
      }
    }
  },
  methods: {
    getUser(item) {
      let res = true
      res = this.$store.state.memberList.memberData.every(data => {
        if (item.id === data.id) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '不能重复添加数据'
          })
          this.popoverVisible = false
          return false
        } else {
          return true
        }
      })
      if (res) {
        this.searchUser = ''
        this.$store.commit('PUSHUSER', item)
      }
      this.popoverVisible = false
    },
    // 搜索框 input
    getSearchData() {
      this.popoverVisible = true
      this.params.keyword = this.searchUser
      if (this.params.keyword) {
        this.loading = true
        api.getUserList(this.params).then(res => {
          this.searchData = res.data.list
          this.loading = false
        })
      }
    },
    debounce(fn, delay) {
      var timer = null
      return function() {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay)
      }
    },
    // 提交
    handleSubmit() {
      let arrId = this.$store.state.memberList.memberData.filter(item => item.id)
      let params = {
        projectId: '',
        projectMemberIds: arrId
      }
      this.popoverVisible = false
      // 关闭弹窗
      this.$store.commit('HIDEDIALOG')
    },
    handleCancel() {
      this.$store.commit('CLEARBREAD')
      let breamData = {
        name: this.companyData.fullName,
        level: 1
      }
      this.$store.commit('PUSHBREAD', breamData)
      this.$store.commit('SETLEVEL', 1)
      // 关闭弹窗
      this.$store.commit('HIDEDIALOG')
      this.popoverVisible = false
    },

    handleTitle() {
      this.$store.commit('POPBREAD', 1)
      this.$store.commit('SETLEVEL', 1)
    },
    handleClose(tag) {
      this.$store.commit('SPLICEUSER', tag)
    }
  },
  mounted() {
    api
      .getInitDeptResult({
        deptId: '',
        searchContent: ''
      })
      .then(res => {
        this.companyData = res.data.tzecc
        this.departDataTree = res.data.sonList
        this.$store.commit('SETLEVEL', 1)
        let breamData = {
          name: this.companyData.fullName,
          level: 1
        }
        this.$store.commit('PUSHBREAD', breamData)
      })
    // 防抖
    this.$refs.searchInput.addEventListener('input', this.debounce(this.getSearchData, 500))
  },
  beforeDestroy() {
    this.$refs.searchInput.addEventListener('input', this.debounce(this.getSearchData, 500))
  }
}
</script>


<style lang="less" scoped>
.member_dialog {
  position: relative;
  overflow: hidden;
  height: 550px;
}

.left {
  float: left;
  width: 45%;
  min-height: 500px;
}
.right {
  float: left;
  width: 54%;
  border-left: 1px solid #ccc;

  .title {
    padding-left: 20px;
    display: block;
    height: 40px;
    line-height: 40px;
    margin-right: 30px;
    font-size: 32px;
    padding-bottom: 20px;
    cursor: pointer;
    &:hover {
      color: #4474cf;
    }
  }
}

/* popover */
.search-input {
  width: 100%;
  outline: none;
  height: 32px;
  line-height: 24px;
  border: none;
}
.icon-head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: top;
  margin-right: 10px;
  background-color: #ccc;
}
.result-right {
  display: inline-block;
  width: 250px;
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.result-block {
  padding: 5px 0;
  width: 255px;
}
.no-result-block {
  height: 50px;
  line-height: 50px;
  width: 255px;
}
.result-block + .result-block {
  border-top: 1px solid #d4d5d6;
}

/* btn */
.btn-box {
  padding-left: 20px;
  position: absolute;
  bottom: 0;
}
.btn-common {
  width: 100px;
  height: 30px;
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
  cursor: pointer;
}
.btn-submit {
  background-color: #44cf96;
}
.btn-cancel {
  .btn-common();
  margin-left: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<style>
.member-popover {
  max-height: 300px;
  overflow-y: auto;
}
</style>
