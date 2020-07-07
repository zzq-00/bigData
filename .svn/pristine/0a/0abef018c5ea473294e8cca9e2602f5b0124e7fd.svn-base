<template>
  <div class="pop-box" :style="{top: pos.y - posSreen.y + 'px',left: pos.x - posSreen.x +'px'}">
    <ul class="list-ul J-list" v-if="needType=='2'">
      <!-- item 的键值没处理 直接在这儿调用 -->
      <li v-for="(item, index) in listData" :key="index" class="list-li" @click="filtersData(item,index, listData)" :class="{'is-active': (index === selected) || (index === hasIndex)}" :title="item.text || item.key">
        {{item.text || item.key}}
      </li>
    </ul>
    <!-- 多选框 -->
    <el-checkbox-group v-model="checkList" class="list-ul J-list" v-if="needType=='1'|| needType=='3'||needType=='4'||needType=='5'">
      <el-checkbox v-for="(item) in listData" :label="item.value" :key="item.value" class="list-li" @change="changeCheck('1')" v-if="needType=='4'||needType=='5'">{{item.name}}</el-checkbox>
      <el-checkbox v-for="(item) in listData" :label="item.id || item.key ||item.name" :key="item.text || item.key ||item.value" class="list-li" @change="changeCheck('2')" v-if="needType=='1'|| needType=='3'">{{item.value}}</el-checkbox>
      <span class="list-li" style="text-align:center" @click="handleCheckedCitiesChange">筛选</span>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    listData: Array, // 数据
    pos: Object, // 小弹窗的坐标点
    hasIndex: '', // 上一次选中的元素
    type: '',
    thisObjBox: Object
    // chosen: '',
  },
  data() {
    return {
      posSreen: {
        // x: 245,
        x: 115,
        y: 25
      },
      selected: '',
      checkList: [],
      needType: ''
    }
  },
  watch: {
    listData: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (oldValue[i] != newValue[i]) {
            console.log(newValue)
          }
        }
      }
      // deep: true
    }
  },
  methods: {
    // listdata
    changeCheck(val) {},
    filtersData(item, index, listData) {
      this.selected = index
      // 可优化 - index可能会被覆盖
      if (listData[0].type === 'duetype') {
        item.twoIndex = index
        item.index = index
      } else if (listData[0].type === 'realName') {
        item.oneIndex = index
        item.index = index
      } else {
        item.index = index
      }
      this.thisObjBox.currentPage1 = 1
      this.$emit('filtersData', item)
    },
    handleCheckedCitiesChange() {
      if (this.checkList.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择筛选条件',
          type: 'warning'
        })
      } else {
        if (this.needType === '1') {
          this.$emit('filtersData', this.checkList)
        }
        if (this.needType === '3') {
          this.$emit('filtersDatas', this.checkList)
        }
        if (this.needType === '4') {
          this.$emit('filtersDatas', this.checkList)
        }
        if (this.needType === '5') {
          this.$emit('filtersDatass', this.checkList)
        }
      }
    }
  },
  mounted() {
    // console.log(this.listData);
    // console.log(this.chosen, '?????');
    // this.checkList = this.chosen

    // let domWid = document.getElementsByClassName('qj-nav')[0].clientWidth
    // if (domWid === 170) {
    //   this.posSreen.x = 351
    // }
    // 默认的type -- 因为有些没有type值，所以设置默认值
    this.needType = this.type || '2'
  }
}
</script>

<style lang="less" scoped>
.pop-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.list-ul {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  .list-li {
    padding: 5px 30px;
    color: #666;
    background-color: #fff;
    font-size: 14px;
    display: block;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    // display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      background-color: #ddd;
      color: #fff;
    }
  }
  /* .list-li + .list-li{
    border-top: 1px solid #ccc;
  } */
  .is-active {
    background-color: #0066cc;
    color: #fff;
    &:hover {
      background-color: #0066cc;
      color: #fff;
    }
  }
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
</style>
