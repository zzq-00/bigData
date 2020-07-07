<template>
  <div class="filter-list">
    <span>单项工程分类：</span>
    <div>
      <ul>
        <li v-for="(item,index) in MonomerTypeFirst" :key="index">
          <label>
            <input type="radio" v-model="type1" :value="item" @change="MonomerTypeFirstSel(item)">
            <span>{{item.name}}</span>
          </label>
        </li>
      </ul>
      <ul v-show="MonomerTypeSecond.length">
        <li v-for="(item,index) in MonomerTypeSecond" :key="index">
          <label>
            <input type="radio" v-model="type2" :value="item" @change="MonomerTypeSecondSel(item)">
            <span>{{item.name}}</span>
          </label>
        </li>
      </ul>
      <ul v-show="MonomerTypeThird.length">
        <li v-for="(item,index) in MonomerTypeThird" :key="index">
          <label>
            <input type="radio" v-model="type3" :value="item" @change="MonomerTypeThirdSel(item)">
            <span>{{item.name}}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      MonomerTypeFirstAll: [], // 单项工程分类第一级
      MonomerTypeSecondAll: [], // 单项工程分类第二级
      MonomerTypeThirdAll: [], // 单项工程分类第三级
      type1: {
        id: '',
        name: '不限'
      },
      type2: {
        id: '',
        name: '不限'
      },
      type3: {
        id: '',
        name: '不限'
      }
    }
  },
  computed: {
    MonomerTypeFirst() {
      return [{ id: '', name: '不限' }, ...this.MonomerTypeFirstAll]
    },
    MonomerTypeSecond() {
      let array = this.MonomerTypeSecondAll.filter(item => item.parentId === this.type1.id)
      return array.length ? [{ id: '', name: '不限' }, ...array] : []
    },
    MonomerTypeThird() {
      let array = this.MonomerTypeThirdAll.filter(item => item.parentId === this.type2.id)
      return array.length ? [{ id: '', name: '不限', indexCode: '' }, ...array] : []
    }
  },
  methods: {
    ...mapMutations(['setSingleItemFilterData']),
    // 获取所有的单项工程分类
    monomerGetMonomerTypeAll() {
      api.monomerGetMonomerTypeAll().then(res => {
        this.MonomerTypeFirstAll = res.data['1']
        this.MonomerTypeSecondAll = res.data['2']
        this.MonomerTypeThirdAll = res.data['3']
      })
    },
    // 选择单项工程分类一级
    MonomerTypeFirstSel(item) {
      this.type2 = { id: '', name: '不限' }
      this.MonomerTypeSecondSel(this.type2)
    },
    // 选择单项工程二级
    MonomerTypeSecondSel(item) {
      this.type3 = { id: '', name: '不限', indexCode: '' }
      this.MonomerTypeThirdSel(this.type3)
    },
    MonomerTypeThirdSel(item) {
      let MonomerTypeSel = item.id ? this.type1.name + '-' + this.type2.name + '-' + item.name : this.type2.id ? this.type1.name + '-' + this.type2.name : this.type1.name
      this.setSingleItemFilterData({
        dataForBack: {
          type1: this.type1.id,
          type2: this.type2.id,
          type3: item.id,
          indexCode: item.indexCode
        },
        dynamicTags: { MonomerTypeSel }
      })
    },
    initData() {
      this.type1= { id: '', name: '不限' }
      this.MonomerTypeFirstSel(this.type1)
    }
  },
  mounted() {
    this.monomerGetMonomerTypeAll()
    this.$on('childMethod', res => {
      if (res === 'reset') this.initData()
    })
  }
}
</script>
<style lang="less" scoped>
@import './filter-option.less';
</style>