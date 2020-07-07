<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container">
      <div class="side-menu" :class="{ sideMenus: isActive }" v-drag ref="sides">
        <el-menu ref="elMenu" :default-openeds="defaultsOpen" :default-active="defaultPath" @open="handleOpen" @close="handleClose" @select="handleSelect" :unique-opened="true" collapse-transition>
          <el-menu-item :index='"/monitorCenter/projectData/detail/projectInfo/"+projectId'>
            <i class="iconfont icon-projectInformation"></i>
            <span slot="title">项目信息</span>
          </el-menu-item>
          <el-menu-item :index="'/monitorCenter/projectData/detail/singleInfo/'+projectId" v-if="directoryList">
            <i class="iconfont icon-dantixinxi"></i>
            <span slot="title">单项工程信息</span>
          </el-menu-item>
          <el-submenu index="/monitorCenter/projectData/detail/IndexData" v-if="directoryList">
            <template slot="title">
              <i class="iconfont icon-IndexData"></i>
              <span>指标数据</span>
            </template>
            <el-submenu :index="idx1+''" v-for="(item1,idx1) in directoryList" :key="idx1" v-if="!isActive">
              <template slot="title">
                <div style="margin-left:14px;margin-right:22px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;" :title="item1.productName">{{item1.productName}}</div>
              </template>
              <el-submenu :index="idx1+'-'+idx2" v-for="(item2,idx2) in item1.indicatorNameList" :key="idx2" v-if="item2.monomerMessage">
                <template slot="title">
                  <div style="margin-left:14px;margin-right:22px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;" :title="item2.indicatorName">{{item2.indicatorName}}</div>
                </template>
                <el-menu-item :index="indicatorType(item2, item3,item1)" v-for="(item3,idx3) in item2.monomerMessage" :key="idx3">
                  <template slot="title">
                    <div style="margin-left:14px;" class="levelThree" :title="item3.monomerName">{{item3.monomerName}}</div>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="indicatorType(item2, $route.query,item1)" v-for="(item2,idx2) in item1.indicatorNameList" :key="idx2" v-if="!item2.monomerMessage" style="padding-left:73px;">{{item2.indicatorName}}</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item :index="'/monitorCenter/projectData/detail/fileInfo/'+projectId">
            <i class="iconfont icon-projectDocuments"></i>
            <span slot="title">项目文件</span>
          </el-menu-item>
        </el-menu>
        <div class="shrink-btn" title="展开/收起" v-show="!isActive" @click="Retract"></div>
        <div class="shrink-btn" title="展开/收起" v-show="isActive" @click="Open"></div>
        <div class="sliders"></div>
      </div>
      <div class="white-solid"></div>
      <router-view class="right-content" :projectData='projectData' />
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import breadcrumb from '@/components/breadcrumb'

export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '项目数据', path: '/monitorCenter/projectData' }],
      projectId: (() => this.$route.params.projectId)(),
      projectData: {},
      dialogVisible: false,
      isActive: false,
      directoryList: [], // 指标数据列表
      defaultsOpen: [],
      widths: '',
      nameList: [],
      isPush: false,
      temporaryArr: []
    }
  },
  computed: {
    defaultPath: {
      get: function() {
        if (Object.keys(this.$route.query).length != 0) {
          if (!this.$route.query.name) {
            this.defaultPath =
              this.$route.path +
              '?id=' +
              this.$route.query.id +
              '&name=' +
              this.$route.query.name +
              '&productNameCode=' +
              this.$route.query.productNameCode +
              '&indicatorNameCode=' +
              this.$route.query.indicatorNameCode +
              '&ids=' +
              this.$route.query.ids +
              '&isActive=' +
              '1' +
              '&id2='
            return (
              this.$route.path +
              '?id=' +
              this.$route.query.id +
              '&name=' +
              this.$route.query.name +
              '&productNameCode=' +
              this.$route.query.productNameCode +
              '&indicatorNameCode=' +
              this.$route.query.indicatorNameCode +
              '&ids=' +
              this.$route.query.ids +
              '&isActive=' +
              '1' +
              '&id2='
            )
          } else {
            return (
              this.$route.path +
              '?id=' +
              this.$route.query.id +
              '&name=' +
              this.$route.query.name +
              '&productNameCode=' +
              this.$route.query.productNameCode +
              '&indicatorNameCode=' +
              this.$route.query.indicatorNameCode +
              '&ids=' +
              this.$route.query.ids +
              '&isActive=' +
              '1' +
              '&id2='
            )
          }
        } else {
          return this.$route.path
        }
      },
      set: function(newValue) {}
    }
  },
  watch: {},
  methods: {
    indicatorType(item2, item3, item1, open) {
      let type = 'quantityCalculation'
      let name = ''
      if (item2.indicatorName === '造价指标') {
        type = 'engineeringCost'
        return (
          '/monitorCenter/projectData/detail/IndexData/' +
          type +
          '/' +
          this.projectId +
          '?id=' +
          item3.id +
          '&name=' +
          name +
          '&productNameCode=' +
          item1.productNameCode +
          '&indicatorNameCode=' +
          item2.indicatorNameCode +
          '&ids=' +
          item3.id +
          '&isActive=' +
          '1' +
          '&id2='
        )
      } else {
        if (item2.indicatorName.includes('安装')) {
          name = '4'
        } else if (item2.indicatorName.includes('钢筋')) {
          item3.id = ''
          name = '6'
        } else if (item2.indicatorName.includes('土建')) {
          item3.id = ''
          name = '5'
        }
        return (
          '/monitorCenter/projectData/detail/IndexData/' +
          type +
          '/' +
          this.projectId +
          '?id=' +
          item3.id +
          '&name=' +
          name +
          '&productNameCode=' +
          item1.productNameCode +
          '&indicatorNameCode=' +
          item2.indicatorNameCode +
          '&ids=' +
          item2.sourceFileId +
          '&isActive=' +
          '1' +
          '&id2='
        )
      }
    },
    // 点击指标数据 默认展开一个数据 安装和造价
    clickOpen(item2, item3, item1, indexs) {
      indexs
      if (this.isPush) {
        let type = 'quantityCalculation'
        let name = ''
        var indexCost // 造价
        var indexInstall
        if (item2.indicatorName.includes('造价')) {
          indexCost = indexs
        }
        if (item2.indicatorName.includes('安装')) {
          indexInstall = indexs
        }
        if ((indexCost || indexCost == 0) && (indexInstall || indexInstall == 0)) {
          if (indexCost < indexInstall) {
            type = 'engineeringCost'
          }
          if (indexCost > indexInstall) {
            name = '4'
          }
          this.$router.push(
            '/monitorCenter/projectData/detail/IndexData/' +
              type +
              '/' +
              this.projectId +
              '?id=' +
              item3.id +
              '&name=' +
              name +
              '&productNameCode=' +
              item1.productNameCode +
              '&indicatorNameCode=' +
              item2.indicatorNameCode +
              '&ids=' +
              item2.sourceFileId +
              '&isActive=' +
              '1' +
              '&id2='
          )
        }
        if ((indexCost || indexCost == 0) && !indexInstall) {
          type = 'engineeringCost'
          this.$router.push(
            '/monitorCenter/projectData/detail/IndexData/' +
              type +
              '/' +
              this.projectId +
              '?id=' +
              item3.id +
              '&name=' +
              name +
              '&productNameCode=' +
              item1.productNameCode +
              '&indicatorNameCode=' +
              item2.indicatorNameCode +
              '&ids=' +
              item2.monomerMessage[0].id +
              '&isActive=' +
              '1' +
              '&id2='
          )
        }
        if (!indexCost && (indexInstall || indexInstall == 0)) {
          name = '4'
          this.$router.push(
            '/monitorCenter/projectData/detail/IndexData/' +
              type +
              '/' +
              this.projectId +
              '?id=' +
              item3.id +
              '&name=' +
              name +
              '&productNameCode=' +
              item1.productNameCode +
              '&indicatorNameCode=' +
              item2.indicatorNameCode +
              '&ids=' +
              item2.sourceFileId +
              '&isActive=' +
              '1' +
              '&id2='
          )
        }
        this.isPush = false
      }
    },
    // 点击指标数据 默认展开一个数据 钢筋和土建
    clickOpens(item2, item3, item1, indexs) {
      if (this.isPush) {
        let type = 'quantityCalculation'
        let name = ''
        if (!item2.indicatorName.includes('造价') && !item2.indicatorName.includes('安装')) {
          if (item1.indicatorNameList[0].indicatorName.includes('钢筋')) {
            item3.id = ''
            name = '6'
          }
          if (item1.indicatorNameList[0].indicatorName.includes('土建')) {
            item3.id = ''
            name = '5'
          }
          this.$router.push(
            '/monitorCenter/projectData/detail/IndexData/' +
              type +
              '/' +
              this.projectId +
              '?id=' +
              item3.id +
              '&name=' +
              name +
              '&productNameCode=' +
              item1.productNameCode +
              '&indicatorNameCode=' +
              item3.indicatorNameCode +
              '&ids=' +
              item2.sourceFileId +
              '&isActive=' +
              '1' +
              '&id2='
          )
        }
        this.isPush = false
      }
    },
    // 指标数据层级目录
    sidebarDirectory() {
      api.sidebarDirectory(this.projectId).then(res => {
        this.directoryList = res.data
        if (this.directoryList) {
          this.directoryList[0].indicatorNameList.map(item => {
            this.temporaryArr.push(item.indicatorName)
          })
        }
      })
    },
    // 收起
    Retract() {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '55px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '55px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    },
    // 展开
    Open() {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    },

    handleOpen(key, keyPath) {
      this.isPush = true
      var namea = ''
      if (key == '/monitorCenter/projectData/detail/IndexData') {
        let type = 'quantityCalculation'
        if (this.directoryList) {
          this.directoryList.map(item => {
            if (item.indicatorNameList) {
              item.indicatorNameList.map((items, indexs) => {
                if (items.indicatorName) {
                  if (items.monomerMessage) {
                    items.monomerMessage.map((itemss, indexss) => {
                      if (items.indicatorName.includes('造价')) {
                        this.clickOpen(items, itemss, item, indexs)
                      }
                      if (items.indicatorName.includes('安装')) {
                        this.clickOpen(items, itemss, item, indexs)
                      }
                    })
                  } else {
                    if (this.temporaryArr.indexOf('造价指标') == -1 && this.temporaryArr.indexOf('安装算量指标') == -1) {
                      this.clickOpens(items, items, item, indexs)
                    }
                  }
                }
              })
            }
          })
        }
      }
    },
    handleClose(key, keyPath) {
      if (key == '/monitorCenter/projectData/detail/IndexData') {
        this.$router.push('/monitorCenter/projectData/detail/projectInfo/' + this.projectId)
      }
    },
    handleSelect(key, keyPath) {
      this.defaultsOpen = keyPath
      this.isActive = false
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
      if (key.indexOf('singleInfo') == -1 && key.indexOf('projectInfo') == -1 && key.indexOf('fileInfo') == -1) {
        // 等于-1表示这个字符串中没有o这个字符
        var url = key
        var theRequest = new Object()
        if (url.indexOf('?') != -1) {
          var str = url.substr(1)
          let strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
          }
        }
        let params = {
          indicatorCode: theRequest.indicatorNameCode,
          productCode: theRequest.productNameCode,
          projectId: this.projectId,
          sourceFileId: theRequest.ids
        }
        api.monomerInformation(params).then(res => {
          this.nameList = res.data
          if (this.nameList) {
            let type = ''
            if (theRequest.name == 4 || theRequest.name == 5 || theRequest.name == 6) {
              type = 'quantityCalculation'
              if (theRequest.name == 5 || theRequest.name == 6) {
                this.$router.push(
                  '/monitorCenter/projectData/detail/IndexData/' +
                    type +
                    '/' +
                    this.projectId +
                    '?id=' +
                    '&name=' +
                    theRequest.name +
                    '&productNameCode=' +
                    theRequest.productNameCode +
                    '&indicatorNameCode=' +
                    theRequest.indicatorNameCode +
                    '&ids=' +
                    theRequest.ids +
                    '&isActive=' +
                    '1'
                )
              }
              if (theRequest.name == 4) {
                this.$router.push(
                  '/monitorCenter/projectData/detail/IndexData/' +
                    type +
                    '/' +
                    this.projectId +
                    '?id=' +
                    theRequest.ids +
                    '&name=' +
                    theRequest.name +
                    '&productNameCode=' +
                    theRequest.productNameCode +
                    '&indicatorNameCode=' +
                    theRequest.indicatorNameCode +
                    '&ids=' +
                    theRequest.ids +
                    '&isActive=' +
                    '1'
                )
              }
            } else {
              type = 'engineeringCost'
              this.$router.push(
                '/monitorCenter/projectData/detail/IndexData/' +
                  type +
                  '/' +
                  this.projectId +
                  '?id=' +
                  theRequest.ids +
                  '&name=' +
                  theRequest.name +
                  '&productNameCode=' +
                  theRequest.productNameCode +
                  '&indicatorNameCode=' +
                  theRequest.indicatorNameCode +
                  '&ids=' +
                  theRequest.ids +
                  '&isActive=' +
                  '1' +
                  '&id2=' +
                  this.nameList[0].id
              )
            }
          }
        })
      } else {
        this.$router.push(key)
      }
    },

    // 获取项目详情
    getProjectDetail4ProjectData() {
      api.getProjectDetail4ProjectData(this.projectId).then(res => {
        this.projectData = res.data
        this.breadcrumbs.push({ name: res.data.projectName, path: this.$route.fullPath })
      })
    }
  },
  mounted() {
    this.sidebarDirectory()
    this.getProjectDetail4ProjectData()
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
    width: 240px;
    background-color: #e7eaee;
    position: relative;
    border: 1px solid #e2e8f7;
    border-left: none;
    border-top: none;
    border-bottom: none;
    // box-shadow: 10px 0px 22px -10px #ced2dc;
    border-right: 1px solid #f6f8fa;
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
    .levelThree {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .sideMenus {
    width: 55px;
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
  .add-btn {
    display: inline-block;
    box-sizing: border-box;
    width: 100px;
    height: 36px;
    line-height: 36px;
    color: #4574d0;
    text-align: center;
    position: absolute;
    right: 47px;
    top: 50%;
    transform: translateY(-50%);
  }
  .el-menu-item.is-active {
    color: #4474cf;
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
  .iconfont {
    margin-right: 15px;
  }
}
</style>
<style scoped>
.side-menu >>> .el-menu {
  border: none !important;
  background-color: #e7eaee;
  width: 240px;
  font-size: 14px;
  border: none !important;
}
.side-menu .el-dropdown-menu__item--divided:before,
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #e7eaee;
}
.side-menu .el-dropdown-menu__item--divided:before,
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #e7eaee;
}
.sideMenus >>> .el-menu {
  width: 55px;
  overflow: hidden;
}
.side-menu >>> .el-menu-item:focus,
.el-menu-item:hover {
  background-color: #e7eaee !important;
  color: #4474cf;
}
.side-menu >>> .el-submenu__title:hover {
  color: #4474cf;
  background-color: #e7eaee;
}
.side-menu >>> .el-menu-item:hover::after {
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
</style>
