<template>
  <div class="place-box">
    <div class="place-input" :class="{'borderBottom': show.place}" @click.stop="placeMouseOver($event)">
      <template v-if="addressName.length">{{addressName.join('/')}}</template>
      <template v-else-if="multipleSel.length">
        <el-tag disable-transitions size="mini" closable v-for="(item,index) in multipleSel" :key="index" @close="handleTag(item)">{{item}}</el-tag>
      </template>
      <template v-else class="holder"></template>
      <b class="el-icon-arrow-down"></b>
    </div>
    <!--  @mousemove="placeMouseOver($event)" @mouseout="placeMouseOut" -->
    <div class="place-container" v-show="show.place" v-loading="loading" @click.stop="show.place = true">
      <div class="tabs">
        <a class="tab-item el-icon-arrow-down" v-for="(tab, tabIndex) in addressTabName" :key="tabIndex" @click.stop="tabClick($event, tabIndex)" :class="{'item-active': selected.tab === tabIndex}">{{tab}}</a>
      </div>
      <div class="area-content">
        <!-- 省 -->
        <ul class="content-list" v-show="show.province">
          <li v-for="(item, index) in optionsPlace" :key="index">
            <span @click.stop="provinceClick($event, index)" :class="{'active-list': selected.province === index}">{{item.name}}</span>
          </li>
        </ul>
        <ul class="content-list" v-show="show.city">
          <li v-for="(item, index) in citysPlace" :key="index">
            <span @click.stop="cityClick($event, index)" :class="{'active-list': selected.city === index}">{{item.name}}</span>
          </li>
        </ul>
        <ul class="content-list" v-show="show.town">
          <li v-for="(item, index) in townsPlace" :key="index">
            <span @click.stop="townClick($event, index)" :class="{'active-list': selected.town === index}">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="area-close" @click.stop="placeClose"></div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: {
    placeName: Array,
    placeCode: Array,
    importantCities: String,
    selType: String
  },
  data() {
    return {
      selected: {
        tab: 0,
        province: 0,
        city: 0,
        town: 0
      },
      /* 是否展示当前页面 */
      show: {
        place: false,
        province: true,
        city: false,
        town: false
      },
      // 提交的值
      address: [],
      // 显示框中值
      addressName: [],
      // 标签中的值不和提交，显示马上响应
      addressTab: [],
      addressTabName: [],
      // 常量
      optionsPlace: [],
      citysPlace: [],
      townsPlace: [],
      loading: false,
      multipleSel: []
    }
  },
  methods: {
    placeMouseOver(event) {
      if (!this.show.place) {
        this.show.place = true
        if (!this.addressTabName[1]) {
          this.selected.province = -1
          // this.address[0] = this.optionsPlace[0].code
          this.addressTabName[0] = '请选择'
        }
      } else {
        this.show.place = false
      }
    },
    placeMouseOut() {
      this.show.place = false
    },
    provinceClick(event, index) {
      // 加载状态
      this.loading = true
      this.selected.province = index
      this.addressTab[0] = this.optionsPlace[index].code
      this.addressTabName[0] = this.optionsPlace[index].name
      // 点击第一个标签页会关闭区
      this.addressTab.splice(2, 1)
      this.addressTabName.splice(2, 1)
      api.citiesOfProvince(this.optionsPlace[index].code).then(res => {
        this.loading = false
        this.citysPlace = res.data
        this.show.province = false
        this.show.city = true
        this.selected.city = -1
        this.selected.tab = 1
        // this.address[1] = this.citysPlace[0].code
        this.addressTabName[1] = '请选择'
        this.townsPlace = []
      })
    },
    cityClick(event, index) {
      this.loading = true
      this.selected.city = index
      this.addressTab[1] = this.citysPlace[index].code
      this.addressTabName[1] = this.citysPlace[index].name
      if (this.selType === 'twoLevel') {
        // 项目途经重要节点城市只有两级，并且为多选
        this.show.place = false
        let data = this.addressTabName.join('/')
        this.handleTag(data)
        return
      }
      api.getDistrictByParentCode(this.citysPlace[index].code).then(res => {
        this.loading = false
        this.townsPlace = res.data
        if (res.data && res.data.length) {
          res.data.unshift({ name: '不限', code: '' })
          this.show.city = false
          this.show.town = true
          this.selected.town = -1
          this.selected.tab = 2
          // this.address[2] = this.townsPlace[0].code
          this.addressTabName[2] = '请选择'
        } else {
          this.show.place = false
          // this.address = this.addressTab
          this.addressName = JSON.parse(JSON.stringify(this.addressTabName))
          this.address = JSON.parse(JSON.stringify(this.addressTab))
          this.$emit('getValue', this.addressName, this.address)
        }
      })
    },
    townClick(event, index) {
      this.selected.town = index
      this.addressTab[2] = this.townsPlace[index].code
      this.addressTabName[2] = this.townsPlace[index].name
      // 关闭时赋值
      // this.address = this.addressTab
      this.show.place = false
      this.addressName = JSON.parse(JSON.stringify(this.addressTabName))
      this.address = JSON.parse(JSON.stringify(this.addressTab))
      this.$emit('getValue', this.addressName, this.address)
    },
    placeClose() {
      this.show.place = false
    },
    tabClick(event, index) {
      this.selected.tab = index
      this.show.province = false
      this.show.city = false
      this.show.town = false
      switch (index) {
        case 0:
          this.show.province = true
          break
        case 1:
          this.show.city = true
          break
        case 2:
          this.show.town = true
          break

        default:
          break
      }
    },
    setName(name) {
      if (name.length) {
        if (name[0]) {
          this.loading = true
          api.allProvinces().then(res => {
            this.loading = false
            this.optionsPlace = res.data
            for (let index = 0, len = res.data.length; index < len; index++) {
              if (res.data[index].name === name[0]) {
                // 当前位置
                this.selected.province = index
                // 内容主体
                this.show.province = true
                break
              }
            }
          })
        }
        if (name[1]) {
          let provinceCode = this.address[0]
          this.loading = true
          api.citiesOfProvince(provinceCode).then(res => {
            this.loading = false
            if (res.data) {
              this.citysPlace = res.data
              for (let index = 0, len = res.data.length; index < len; index++) {
                if (res.data[index].name === name[1]) {
                  // 当前位置
                  this.selected.city = index
                  // 内容主体
                  this.show.province = false
                  this.show.city = true
                  // 标签
                  break
                }
              }
            } else {
              this.selected.tab = 1
            }
          })
        }
        if (name[2]) {
          let cityCode = this.address[1]
          this.loading = true
          api.getDistrictByParentCode(cityCode).then(res => {
            this.loading = false
            if (res.data) {
              res.data.unshift({ name: '不限', code: '' })
              this.townsPlace = res.data
              for (let index = 0, len = res.data.length; index < len; index++) {
                if (res.data[index].name === name[2]) {
                  this.selected.town = index
                  this.show.province = false
                  this.show.city = false
                  this.show.town = true
                  // 标签显示
                  this.selected.tab = 2
                  break
                }
              }
            }
          })
        }
      }
    },
    handleTag(data) {
      let index = this.multipleSel.findIndex(item => item === data)
      if (index === -1) {
        this.multipleSel.push(data)
      } else {
        this.multipleSel.splice(index, 1)
      }
      this.$emit('getValue', this.multipleSel)
    }
  },
  mounted() {
    if (!this.optionsPlace.length) {
      this.loading = true
      api.allProvinces().then(res => {
        this.loading = false
        this.optionsPlace = res.data
      })
    }
    window.onclick = event => {
      var e = event || window.event
      let self = e.target
      if (this.show.place) {
        this.show.place = false
      }
    }
  },
  watch: {
    placeName: {
      handler: function(val) {
        if (!val) return
        val = val.filter(item => !!item)
        this.addressName = val
        this.addressTabName = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    },
    placeCode: {
      handler: function(val) {
        if (!val) return
        this.address = val
        this.addressTab = JSON.parse(JSON.stringify(val))
        this.setName(this.addressName)
      },
      deep: true,
      immediate: true
    },
    importantCities: {
      handler: function(val) {
        if (!val) return
        this.multipleSel = val.split('，')
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.place-input {
  position: relative;
  z-index: 2;
  width: 520px;
  min-height: 40px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 14px;
  padding-left: 20px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .holder {
    color: #c0c4cc;
  }
  .el-tag {
    margin: 5px 10px 5px 0;
  }
  b {
    position: absolute;
    right: 10px;
    top: 12px;
  }
}
.borderBottom {
  border-bottom: none;
}
.place-container {
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 5px #ddd;
  width: 499px;
  background-color: #fff;
  margin-top: -1px;
  padding: 5px 10px;
  position: absolute;
  z-index: 10;
  .tabs {
    border-bottom: 2px solid #4574d0;
    height: 35px;
    .tab-item {
      height: 25px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-bottom: 0;
      padding: 0 25px 0 6px;
      line-height: 22px;
      text-decoration: none;
      position: relative;
      font-size: 12px;
      color: #606266;
      cursor: pointer;
      &:before {
        position: absolute;
        right: 5px;
      }
    }
    .tab-item + .tab-item {
      margin-left: 5px;
    }
    .item-active {
      border: 2px solid #4574d0;
      border-bottom: 0;
      height: 27px;
    }
  }
  .area-content {
    padding-top: 5px;
    .content-list {
      font-size: 12px;
      color: #606266;
      li {
        float: left;
        min-width: 80px;
        padding: 0 0 0 15px;
        line-height: 22px;
      }
      span {
        cursor: pointer;
        &:hover {
          color: #4574d0;
        }
      }
      .active-list {
        color: #4574d0;
      }
    }
  }
  .area-close {
    position: absolute;
    right: 10px;
    top: 13px;
    width: 15px;
    height: 15px;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
    background: url('../assets/img/close.png') no-repeat;
    background-size: contain;
  }
}
</style>
