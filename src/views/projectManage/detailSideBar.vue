<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container">
      <div class="side-menu" :class="{ sideMenus: isActive }" v-drag ref="sides">
        <el-menu :default-openeds="defaultsOpen" :default-active="defaultPath" @open="handleOpen" @close="handleClose" @select="handleSelect" :unique-opened="true" collapse-transition>
          <el-menu-item :index="`/projectManage/detail/projectInfo/${projectId}`" class="single-menu">
            <i class="iconfont icon-projectInformation"></i>
            <span class="titles" slot="title">项目信息</span>
          </el-menu-item>
          <el-submenu index="/projectManage/detail/singleInfo" class="index-menu single" v-if="stageList.length>0">
            <template slot="title">
              <i class="iconfont icon-dantixinxi"></i>
              <span class="titles">单项工程信息</span>
            </template>
            <el-menu-item :index="`/projectManage/detail/singleInfo/${projectId}/${item.stageId}`" v-for="(item,id) in stageList" :key="id" v-if="!isActive">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/projectManage/detail/newIndexData" v-if="directoryList.length>0" class="index-menu">
            <template slot="title">
              <i class="iconfont icon-IndexData"></i>
              <span class="titles">指标数据</span>
            </template>
            <el-submenu :index="idx1+''" v-for="(item1,idx1) in directoryList" :key="idx1" v-if="!isActive">
              <template slot="title">
                <div class="levelFrist level-index" :title="item1.preparationStageName">{{item1.preparationStageName}}</div>
              </template>
              <el-submenu :index="idx1+'-'+idx2" v-for="(item2,idx2) in item1.indicatorName" :key="idx2">
                <template slot="title">
                  <div class="levelSecond level-index" :title="item2.indicatorName">{{item2.indicatorName}}</div>
                </template>
                <el-menu-item :index="indicatorType(item2.indicatorName,item3)" v-for="(item3,idx3) in item2.monomerMessage" :key="idx3" v-if="item2.indicatorName=='算量指标'">
                  <template slot="title">
                    <div class="levelThree level-index" :title="item3.monomerName">{{item3.monomerName}}</div>
                  </template>
                </el-menu-item>
                <el-menu-item-group v-for="(item3,idx3) in item2.projectIndex" :key="idx3" v-if="item2.indicatorName=='造价指标'">
                  <template slot="title">
                    <el-menu-item :index="indicatorType('项目指标',item3)" class="pro-menu-item">项目指标</el-menu-item>
                  </template>
                  <el-menu-item :index="indicatorType(item2.indicatorName,item4)" v-for="(item4,idx4) in item3.monomerMessage" :key="idx4" class="four-menu-item">
                    <template slot="title">
                      <div class="levelThrees level-index" :title="item4.monomerName">{{item4.monomerName}}</div>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-submenu>
          </el-submenu>
          <el-menu-item :index="`/projectManage/detail/fileInfo/${projectId}`" class="single-menu">
            <i class="iconfont icon-projectDocuments"></i>
            <span class="titles" slot="title">项目文件</span>
          </el-menu-item>
        </el-menu>
        <div class="shrink-btn" title="展开/收起" v-show="!isActive" @click="Retract"></div>
        <div class="shrink-btn" title="展开/收起" v-show="isActive" @click="Open"></div>
        <div class="sliders"></div>
      </div>
      <div class="white-solid"></div>
      <router-view class="right-content" :projectData='projectData' @editClick="handleEditClick" />
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'

export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '我的项目', path: '/projectManage' }],
      projectId: this.$route.params.projectId,
      dialogVisible: false,
      isActive: false,
      directoryList: [], // 指标数据列表
      defaultsOpen: [],
      widths: '',
      stageList: [],
      stageIdList: [],
      projectData: {
        common: {},
        projectX: {},
        members: []
      }
    }
  },
  computed: {
    defaultPath: {
      get: function() {
        return this.$route.fullPath
      },
      set: function(newValue) {}
    }
  },
  methods: {
    getProjectDocumentsStage() {
      api
        .getProjectDocumentsStage(this.projectId)
        .then(res => {
          this.stageList = res.data
        })
        .catch(res => {})
    },
    indicatorType(type, path) {
      let indexType //指标类型
      let buildingId
      let stageId //阶段id
      switch (type) {
        case '算量指标':
          indexType = 'operandIndex'
          buildingId = path.buildingId
          break
        case '造价指标':
          indexType = 'costIndex'
          buildingId = path.buildingId
          break
        case '项目指标':
          indexType = 'proIndex'
          buildingId = '' //用buildingId替换项目id
          stageId = path.stageId
          break
        default:
          break
      }
      return `/projectManage/detail/newIndexData/${indexType}/${this.projectId}${buildingId ? '/' + buildingId : ''}${
        stageId ? '/' + stageId : ''
      }`
    },
    // 指标数据层级目录
    sidebarDirectory() {
      api.sidebarDirectory(this.projectId).then(res => {
        this.directoryList = res.data
      })
    },
    // 收起
    Retract() {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '55px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '55px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].childNodes[1].childNodes[0].childNodes[2].style.display = 'none'
      this.$refs.sides.childNodes[0].childNodes[2].childNodes[0].childNodes[2].style.display = 'none'
    },
    // 展开
    Open() {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].childNodes[1].childNodes[0].childNodes[2].style.display = 'block'
      this.$refs.sides.childNodes[0].childNodes[2].childNodes[0].childNodes[2].style.display = 'block'
    },
    handleOpen(key, keyPath) {
      this.isActive = false
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    },
    handleClose(key, keyPath) {
      if (key == '/projectManage/detail/newIndexData') {
        this.$router.push(`/projectManage/detail/projectInfo/${this.projectId}`)
      }
    },
    handleSelect(key, keyPath) {
      this.defaultsOpen = keyPath
      this.isActive = false
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
      this.$router.push(key)
    },
    handleEditClick(value) {
      if (value) {
        this.getProjectDetail()
      }
    },
    // 获取项目详情
    getProjectDetail() {
      api.getProjectDetail({ projectId: this.projectId }).then(res => {
        this.projectData = res.data
        if (this.breadcrumbs.length === 1) {
          this.breadcrumbs.push({ name: res.data.common.projectName, path: this.$route.fullPath })
        }
      })
    }
  },
  mounted() {
    this.getProjectDetail()
    this.sidebarDirectory()
    this.getProjectDocumentsStage()
    this.widths = this.$refs.sides.style.width
  }
}
</script>
<style scoped lang="less">
.container {
  width: 100%;
  display: flex;
  height: e('calc(100vh - 90px)');
  background-color: #e7eaee;
  .side-menu {
    /deep/.el-menu {
      border: none !important;
      background-color: #e7eaee;
      width: 240px;
      border: none !important;
      .el-submenu__icon-arrow {
        margin-top: -6.5px !important;
      }
      .el-submenu__title:hover {
        color: #4474cf;
        background-color: #e7eaee;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        background-color: #e7eaee !important;
        color: #4474cf;
      }
      .el-menu-item:hover::after {
        display: block;
        content: '';
        width: 3px;
        height: 15px;
        background-color: #4474cf;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      > .el-menu-item,
      > .el-submenu__title {
        color: #727273;
        line-height: 32px;
        height: 32px;
        font-size: 12px;
        font-weight: 400;
      }
      .el-menu-item.is-active {
        color: #4474cf !important;
        &::after {
          display: block;
          content: '';
          width: 3px;
          height: 15px;
          background-color: #4474cf;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      > .is-opened {
        > .el-submenu__title {
          color: #4474cf !important;
          line-height: 32px;
          height: 32px;
          font-size: 12px;
          font-weight: 400;
        }
      }
      > .el-submenu {
        > .el-submenu__title {
          font-size: 12px;
          color: #727273;
          line-height: 32px;
          height: 32px;
        }
      }
    }
    width: 240px;
    background-color: #e7eaee;
    position: relative;
    border: 1px solid #e2e8f7;
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right: 1px solid #f6f8fa;
    .index-menu {
      font-size: 12px;
      /deep/.el-menu {
        .el-menu-item,
        .el-submenu__title {
          color: #727273;
          height: 25px;
          line-height: 25px;
          font-weight: 400;
          font-size: 12px;
        }
      }
      /deep/.is-opened {
        > .el-menu {
          .is-opened {
            .el-submenu__title {
              color: #4474cf !important;
            }
          }
        }
      }
    }
    .single {
      /deep/.el-menu {
        .el-menu-item {
          padding-left: 57px !important;
        }
      }
    }
    .sliders {
      width: 5px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      cursor: e-resize;
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
    .level-index {
      margin-left: 14px;
      margin-right: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .levelFrist {
      margin-left: 17px;
    }
    .levelThree {
      width: 100%;
    }
    .levelThrees {
      margin-left: 0;
      margin-right: 0;
    }
    .pro-menu-item {
      min-width: 0;
      padding-left: 14px !important;
      padding-right: 0px !important;
    }
    .four-menu-item {
      padding-left: 94px !important;
      padding-right: 28px;
    }
    /deep/.el-menu-item-group__title {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .sideMenus {
    width: 55px;
    /deep/.el-menu {
      width: 55px;
      overflow: hidden;
    }
  }
  .white-solid {
    background: #ced2dc;
    width: 1px;
    height: 100%;
  }
  .right-content {
    flex: 1;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .iconfont {
    margin-right: 20px;
    vertical-align: middle;
  }
  .titles {
    vertical-align: middle !important;
    height: 100% !important;
    line-height: 32px !important;
  }
  .single-menu {
    line-height: 0 !important;
  }
}
</style>
<style scoped>
.side-menu .el-dropdown-menu__item--divided:before,
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #e7eaee;
}
</style>
