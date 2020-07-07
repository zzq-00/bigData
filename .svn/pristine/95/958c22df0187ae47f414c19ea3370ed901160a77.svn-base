<template>
  <div class="search">
    <div class="clearfix">
      <el-input class="fl" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="search(keyWord)" v-model="keyWord"></el-input>
      <el-button class="fl" type="primary" @click="search(keyWord)">搜索</el-button>
    </div>
    <dl class="clearfix">
      <dt>搜索热词：</dt>
      <dd v-for="(item,index) in hotList" :key="index" @click="search(item)">{{item}}</dd>
    </dl>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data () {
    return {
      hotList: [],
      keyWord: ''
    }
  },
  methods: {
    search (keyWord) {
      if (!keyWord) {
        this.$message({
          showClose: true,
          message: '请输入搜索内容',
          type: 'info'
        })
        return false
      }
      this.$router.push('/knowledgeBase/searchResult/?keyWord=' + keyWord)
    },
    // 获取搜索热词
    getNewSearchList () {
      api.getNewSearchList().then(res => {
        this.hotList = res.data
      })
    }
  },
  mounted () {
    this.getNewSearchList()
  }
}
</script>
<style lang="less" scoped>
.search {
  .el-input {
    width: 600px;
  }
  .el-button {
    padding: 12px 55px;
  }
  > dl {
    font-size: 12px;
    color: #999999;
    padding: 10px;
    > dt,
    > dd {
      float: left;
    }
    dd {
      cursor: pointer;
      margin-right: 15px;
    }
  }
}
</style>
