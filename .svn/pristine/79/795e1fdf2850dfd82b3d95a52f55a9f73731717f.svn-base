<template>
<div class="container-outer" v-loading="loading">
  <div class="ul-container" v-show="$store.state.memberList.currentLevel == currentLevel">
    <!-- 导航栏 -->
    <div class="my-breadcrumb">
      <span v-for="(breamItem, breamIndex) in $store.state.memberList.breadcrumbName" :key="breamItem.name" 
      @click="handleBream(breamItem.level)">
        <span :class="{'gray-title': breamIndex === $store.state.memberList.breadcrumbName.length -1}">
          / <span class="bream-name">{{ breamItem.name}}</span> 
        </span>
      </span>
    </div>
    <div v-if="(memberDataTree && memberDataTree.length) || (departDataTree && departDataTree.length)">
      <!-- 具体成员 -->
      <el-checkbox-group v-model="checkedItem" class="member-container">
        <el-checkbox v-for="(item, index) in memberDataTree" :key="index" :label="item.id" 
         @click.native.stop.prevent="memberListChange(item)">
          {{item.realName}}
        </el-checkbox>
      </el-checkbox-group>

      <!-- 部门列表 -->
      <div class="depart-list" 
        v-for="(node, index) in departDataTree" :key="index"  
        @click="getNextData(node)">
          {{node.name}}
          <span class="next">下级</span>
      </div>
    </div>
    <!-- 暂无数据 -->
    <p class="no-data" v-else>暂无数据</p>
  </div>

    <!-- 下一级 -->
    <tree-component v-if="departDataTree.length" 
    :departDataTree="currentDepartTree" 
    :memberDataTree="currentMemberTree"
    :currentLevel="currentLevel+1"></tree-component>
</div>
</template>

<script>
import api from '@/fetch/api';
export default {
  name: 'tree-component',
  props: {
    departDataTree: Array,
    required: true,
    memberDataTree: Array,
    currentLevel: Number // 当前显示在界面的层级
  },
  data () {
    return {
      checkedItem: [],
      currentMemberTree: [], // 当前成员信息
      currentDepartTree: [], // 当前部门信息
      params: {
        deptId: "",
        // keyword: "",
        orderField: "lastLoginTime", // 删除会报错
        orderType: "desc",
        page: 1,
        size: 10000
      },
      loading: false,
      creatorId: localStorage.getItem('creatorProjectId') * 1,
      userId: localStorage.getItem('userId') * 1
    }
  },
  methods: {
    getNextData (node) {
      this.getMemberList(node);
      this.getDepartData(node);
      this.$store.commit('SETLEVEL', this.currentLevel+1)
    },
    getMemberList (node) {
      this.params.deptId = node.id
      this.loading = true
      api.getUserList(this.params).then(res => {
        this.loading = false
        this.currentMemberTree = res.data.list.map(item => {
          item.checked = false
          return item
        })
      })
    },

    // 获取部门的数据
    getDepartData (node) {
      api.getDeptStructureByParentId(node.id).then(res => {
        this.currentDepartTree = res.data
        let breamData = JSON.parse(JSON.stringify(node))
        breamData.level = this.currentLevel + 1
        this.$store.commit('PUSHBREAD', breamData)
      })
    },

    handleBream (level) {
      this.$store.commit('POPBREAD', level)
      this.$store.commit('SETLEVEL', level)
    },

    memberListChange (node) {
      if (node.id === this.userId || node.id === this.creatorId) return this.$message.warning('不能移除创建人或者自己')
      let INDEX = this.checkedItem.indexOf(node.id)
      if (INDEX > -1) {
        node.checked = true
      }
      if (node.checked) {
        this.$store.commit('SPLICEUSER', node)
        if (INDEX > -1) {
          this.checkedItem.splice(INDEX, 1)
        }
      } else {
        this.$store.commit('PUSHUSER', node)
        this.checkedItem.push(node.id)
      }
      node.checked = !node.checked
    },

    init (val) {
      let ids = val.map(item => item.id)
      console.log(this.memberDataTree, 'this.memberDataTree')
      this.checkedItem = this.memberDataTree && this.memberDataTree.map(item => {
        if (ids.includes(item.id)) {
          return item.id
        }
      }).filter(item => !!item)
      console.log(this.checkedItem, 'this.checkedItem')
    }
  },
  watch: {
    // 实时响应数据 -- 问题： 嵌套越多，监听回调越多  
    '$store.state.memberList.memberData': {
      handler: function (value) {
        this.init(value)
      }
    },
    'memberDataTree': function() {
      this.init(this.$store.state.memberList.memberData)
    }
  },
  mounted () {
    // 回显数据
    // this.init(this.$store.state.memberList.memberData)
  }
}
</script>

<style lang="less" scoped>
  .ul-container{
    height: 480px;
    overflow: auto;
  }
  .next{
    float: right;
  }
  .el-checkbox, .depart-list{
    padding-left: 20px;
    display: block;
    height: 40px;
    line-height: 40px;
    padding-right: 30px;
    cursor: pointer;
    &:hover{
      background-color: aliceblue;
    }
  }
  .el-checkbox + .el-checkbox{margin-left: 0;}

  /* 导航 */
.my-breadcrumb{
  padding-left: 20px;
  padding-bottom: 10px;
  .bream-name{
    cursor: pointer;
    &:hover{
      color: #03B189;
    }
  }
}
.gray-title{
  color: #ccc;
  .bream-name{
    cursor: not-allowed;
    &:hover{
      color: #ccc;
    }
  }
}

.no-data{
  padding-left: 20px;
  margin-top: 20px;
}
</style>
