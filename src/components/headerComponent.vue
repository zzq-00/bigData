<template>
  <div>

    <div class="header">
      <div class="container">
        <div class="logo">
          <router-link to="/cloudPlatform">青矩数据-企业版</router-link>
        </div>
        <div class="navs">
          <el-menu :default-active="defaultActive" router mode="horizontal" @select="handleSelect" background-color="#293040" text-color="rgba(255, 255, 255, 0.8)" active-text-color="#4474CF">
            <el-menu-item index="/cloudPlatform" v-has="['Vuvo']">首页</el-menu-item>
            <el-menu-item index="/projectManage" v-has="['0CTi']">我的项目</el-menu-item>
            <el-menu-item index="/projectLibrary" v-has="['qx50']">企业项目库</el-menu-item>
            <el-submenu index="/indicatorLibrary" :show-timeout="100" :hide-timeout="100" v-has="['92bn']">
              <template slot="title" v-has="['92bn']">经济指标库</template>
              <el-menu-item index="/indicatorLibrary/singleItemList" v-has="['SZMwV']">单项工程指标库</el-menu-item>
              <el-menu-item index="/indicatorLibrary/comprehensive" v-has="['eqtUF']">综合单价库</el-menu-item>
            </el-submenu>
            <el-submenu index="/controlPanel" :show-timeout="100" :hide-timeout="100" v-has="['ywWY']">
              <template slot="title" v-has="['ywWY']">控制台</template>
              <!-- <el-menu-item index="/controlPanel/organization">组织架构</el-menu-item> -->
              <el-menu-item index="/controlPanel/usercontrol" v-has="['JTFGQ']">用户管理</el-menu-item>
              <el-menu-item index="/controlPanel/rolesMain" v-has="['o4xNn']">角色权限</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="/monitorCenter" :show-timeout="100" :hide-timeout="100" v-has="['Vz6x']">
              <template slot="title" v-has="['Vz6x']">监测中心</template>
              <el-menu-item index="/monitorCenter/feedback" v-has="['QtEgN']">反馈建议</el-menu-item>
              <el-menu-item index="/monitorCenter/dynamicCenter" v-has="['zSsMZ']">动态中心</el-menu-item>
              <el-menu-item index="/monitorCenter/projectData" v-has="['d5g4d']">项目数据</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </div>
        <ul class="right-nav">
          <li>
            <router-link to="/helpCenter"><img src="@/assets/img/help.png" alt=""><span>帮助中心</span></router-link>
          </li>
          <li><a href="javascript:;"><img src="@/assets/img/avatar.png" alt="="><span>欢迎，{{realName}}</span></a></li>
          <li><a href="javascript:;" @click="logout"><img src="@/assets/img/quit.png" alt=""><span>退出</span></a></li>
        </ul>
      </div>
    </div>
    <div style="height: 60px;"></div>
  </div>
</template>
<script>
import api from '@/fetch/api.js'
import axios from 'axios'

export default {
  data() {
    return {
      realName: window.localStorage.realName || window.localStorage.userName
    }
  },
  computed: {
    defaultActive() {
      if (this.$route.path.includes('/indicatorLibrary/singleDetails')) return '/indicatorLibrary/singleItem'
      switch (this.$route.path.split('/')[1]) {
        case 'projectManage':
        case 'projectLibrary':
        case 'cloudPlatform':
          return '/' + this.$route.path.split('/')[1]
        case 'monitorCenter':
        case 'indicatorLibrary':
          return '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        default:
          return this.$route.path
      }
    }
  },

  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      api.logout().then(res => {
        axios.get(process.env.VUE_APP_LOGIN_ROOT + '/login/SignoutPortal?subsystemUrl=http://data.tzecc.com')
        localStorage.removeItem('responseParams')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        // 后台的权限验证值
        localStorage.removeItem('ROLES')
        // 用户所有的路由权限
        localStorage.removeItem('roleInfo')
        this.$message({
          showClose: true,
          message: '注销成功',
          type: 'success'
        })
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1000)
        // window.location.href='http://47.93.22.19:9002/login/index?subsystemUrl=http://localhost:8089/cloudPlatform'
      })
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  color: rgba(255, 255, 255, 0.8);
  background-color: #293040;
  position: fixed;
  z-index: 10;
  a {
    color: rgba(255, 255, 255, 0.8);
  }
  .container {
    display: flex;
    align-items: center;
    font-size: 14px;
    min-width: 1200px;
    height: 100%;
    background-color: #293040;
    .logo {
      width: 220px;
      height: 41px;
      background: url(~@/assets/logo.png) no-repeat;
      > a {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-indent: -20000px;
      }
    }
    .navs {
      flex: 1;
      height: 100%;
      margin-left: 55px;
      > ul {
        height: 100%;
        > li {
          font-size: 14px;
          height: 100%;
          line-height: 60px;
        }
      }
    }
    .right-nav {
      height: 100%;
      > li {
        float: left;
        height: 100%;
        line-height: 60px;
        > a {
          display: block;
          height: 100%;
          box-sizing: border-box;
          padding: 0 12px;
          box-sizing: border-box;
          > img {
            vertical-align: middle;
            margin-right: 6px;
          }
          > span {
            vertical-align: middle;
          }
          &:hover {
            background-color: rgb(33, 38, 51);
          }
          &.router-link-active {
            border-bottom: 3px solid #4474cf;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.header .navs >>> .el-menu-item.is-active {
  color: #fff !important;
  border-bottom-width: 3px;
}
.header .navs >>> .el-submenu.is-active .el-submenu__title {
  color: #fff !important;
  border-bottom-width: 3px;
}
.header .navs >>> .el-menu--horizontal {
  border-bottom: 0 none;
}
</style>
