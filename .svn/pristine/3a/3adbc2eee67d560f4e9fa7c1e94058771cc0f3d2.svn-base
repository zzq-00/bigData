<template>
  <div>
    <!-- <div class="mrHeader">
      <div class="target">
        <div class="btns">
          <div class="downBtn">
            <button @click="isul = !isul">导出</button>
            <ul v-show="isul">
              <li @click="exportFunc(5)">导出为excel</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->

    <div class="charts-box" v-show="charts">
      <div class="boxs">
        <p class="title">砌体单方含量走势图</p>
        <trendModular :data="trendData"></trendModular>
      </div>
      <div class="boxs">
        <p class="title">砌体各部分含量占比</p>
        <peiCharts :color='color' :data="peiData" :totalNmuber="totalNmuber"></peiCharts>
        <div class="total-money" v-show="totalNmuber">
          <p class="money">
            {{totalNmuber}}
          </p>
          <p class="word_tips">
            砌体总量(m³)</p>
        </div>
      </div>
      <div class="boxs">
        <p class="title">混凝土单方含量走势图</p>
        <trendModulars :data="trendDatas"></trendModulars>
      </div>
      <div class="boxs">
        <p class="title">混凝土各部分含量占比</p>
        <peiCharts1 :color='color' :data="peiDatas" :totalNmuber="totalNmuber2"></peiCharts1>
        <div class="total-money" v-show="totalNmuber2">
          <p class="money">
            {{totalNmuber2}}
          </p>
          <p class="word_tips">
            混凝土总量(m³)</p>
        </div>
      </div>
    </div>

    <div class="mrmain">
      <!-- 土建指标 -->
      <div class="civilTable scroll-table">
        <el-table ref="table5" :data="tableData" stripe v-loading="loading5" :span-method="arraySpanMethod" :class="{'fixedHeader': headerFixed}" style="width: 100%" border id="5">
          <el-table-column prop="date" label="土建指标 " min-width="200" align="center">
            <el-table-column prop="date" width="168"></el-table-column>
            <el-table-column width="207" fixed align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name1}}</span>
                <span class="icon-box" @mouseenter="displayHint(scope.row.name1,$event)" @mouseleave="closingHint" v-if="scope.row.name1=='楼梯体积'||scope.row.name1=='楼梯'">
                  <img src="@/assets/img/normality.png" alt="" class="" v-if="!hintStatus"> <!-- 常态 -->
                  <img src="@/assets/img/suspension.png" alt="" class="" v-if="hintStatus"> <!-- 悬浮状态 -->
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="name2" width="120" fixed align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column label="总量" min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="splitTotal(scope.row.cipcBase)!='null'&&splitTotal(scope.row.cipcBase)">{{scope.row.cipcBase}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column :prop="'cipcBaseContent'" label="指标1(总量/面积)" min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="splitTotal2(scope.row['cipcBaseContent'])!='null'&&splitTotal2(scope.row['cipcBaseContent'])">{{scope.row["cipcBaseContent"]}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column :prop="'cipcBaseContents'" label="指标2(总量/体积)" min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="splitTotal2(scope.row['cipcBaseContents'])!='null'&&splitTotal2(scope.row['cipcBaseContents'])">{{scope.row["cipcBaseContents"]}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="计算规则说明" min-width="180" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.rule1}}</span><br>
              <span>{{scope.row.rule2}}</span>
              <!-- <p>{{scope.row.rule1}}</p> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 系数提示框 -->
    <div class="Hint-box" :style="{top: hintData.pos.y - posSreen.y + 'px',left: hintData.pos.x +'px'}" v-show="hintData.show">
      <div class="Hint-box1" v-if="hintInfo == '楼梯体积'">
        当没有解析到【砼体积】时，计算方法为：
        楼梯体积 = 楼梯面积 * 楼梯体积系数
      </div>
      <div class="Hint-box2" v-if="hintInfo == '楼梯'">
        当没有解析到【模板面积】时，计算方法为：
        楼梯模板面积 = 楼梯面积 * 楼梯模板面积系数
      </div>
    </div>
  </div>
</template>
<script>
import trendModular from '@/components/trendModular' // 走势图
import trendModulars from '@/components/trendModulars' // 走势图
import peiCharts from '@/components/pieChart' // 饼图
import peiCharts1 from '@/components/pieCharts' // 饼图
import tool from '@/assets/js/useMoreTool'
import api from '@/fetch/api'
import { formatDate, downloadBlob, downloadSingle } from '@/assets/js/date-format'
export default {
  props: ['fixTabs', 'charts'],
  components: {
    trendModular,
    trendModulars,
    peiCharts,
    peiCharts1
  },
  data () {
    return {
      headerFixed: false,
      isul: false, // 导出按钮
      indexData: [], // 指标数据
      tableId: '5', // excel下载id
      excelName: '', // excel文件名
      loading5: false, // 土建
      contions: {
        flag: 5,
        monomerId: (() => this.$route.params.monomerId)()
      },
      tableData: [
        {
          date: '现浇砼',
          name1: '基础',
          name2: '垫层',
          rule1: '垫层现浇砼体积/基础面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '基础',
          name2: '其他',
          rule1: '基础其他现浇砼体积/基础面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '墙',
          name2: '地上',
          rule1: '（地上）墙体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '墙',
          name2: '地下',
          rule1: '（地下）墙体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '墙',
          name2: '地上+地下',
          rule1: '墙体积/建筑面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '柱',
          name2: '地上',
          rule1: '（地上）柱体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '柱',
          name2: '地下',
          rule1: '（地下）柱体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '柱',
          name2: '地上+地下',
          rule1: '柱体积/建筑面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '梁板',
          name2: '地上',
          rule1: '（地上）梁板体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '梁板',
          name2: '地下',
          rule1: '（地下）梁板体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '梁板',
          name2: '地上+地下',
          rule1: '梁板体积/建筑面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯面积',
          name2: '地上',
          rule1: '（地上）楼梯面积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯面积',
          name2: '地下',
          rule1: '（地下）楼梯面积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯面积',
          name2: '地上+地下',
          rule1: '楼梯体积/建筑面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯体积',
          name2: '地上',
          rule1: '（地上）楼梯体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯体积',
          name2: '地下',
          rule1: '（地下）楼梯体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '楼梯体积',
          name2: '地上+地下',
          rule1: '楼梯体积/建筑面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '节点',
          name2: '地上',
          rule1: '（地上）节点体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '节点',
          name2: '地下',
          rule1: '（地下）节点体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '节点',
          name2: '地上+地下',
          rule1: '节点体积/建筑面积',
          rule2: ''
        },

        {
          date: '现浇砼',
          name1: '其他',
          name2: '地上',
          rule1: '（地上）其他现浇砼体积/地上面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '其他',
          name2: '地下',
          rule1: '（地下）其他现浇砼体积/地下面积',
          rule2: ''
        },
        {
          date: '现浇砼',
          name1: '其他',
          name2: '地上+地下',
          rule1: '其它现浇砼体积/建筑面积',
          rule2: ''
        },

        {
          date: '现浇砼(模板)',
          name1: '墙',
          name2: '地上',
          rule1: '指标1=（地上）墙模板面积/地上面积',
          rule2: '指标2=（地上）墙模板面积/（地上）墙体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '墙',
          name2: '地下',
          rule1: '指标1=（地下）墙模板面积/地下面积',
          rule2: '指标2=（地下）墙模板面积/（地下）墙体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '墙',
          name2: '地上+地下',
          rule1: '指标1=墙模板面积/建筑面积',
          rule2: '指标2=墙模板面积/墙体积'
        },

        {
          date: '现浇砼(模板)',
          name1: '柱',
          name2: '地上',
          rule1: '指标1=（地上）柱模板面积/地上面积',
          rule2: '指标2=（地上）柱模板面积/（地上）柱体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '柱',
          name2: '地下',
          rule1: '指标1=（地下）柱模板面积/地下面积',
          rule2: '指标2=（地下）柱模板面积/（地下）柱体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '柱',
          name2: '地上+地下',
          rule1: '指标1=柱模板面积/建筑面积',
          rule2: '指标2=柱模板面积/柱体积'
        },

        {
          date: '现浇砼(模板)',
          name1: '梁板',
          name2: '地上',
          rule1: '指标1=（地上）梁板模板面积/地上面积',
          rule2: '指标2=（地上）梁板模板面积/（地上）梁板体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '梁板',
          name2: '地下',
          rule1: '指标1=（地下）梁板模板面积/地下面积',
          rule2: '指标2=（地下）梁板模板面积/（地下）梁板体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '梁板',
          name2: '地上+地下',
          rule1: '指标1=梁板模板面积/建筑面积',
          rule2: '指标2=梁板模板面积/梁板体积'
        },

        {
          date: '现浇砼(模板)',
          name1: '楼梯',
          name2: '地上',
          rule1: '指标1=（地上）楼梯模板面积/地上面积',
          rule2: '指标2=（地上）楼梯模板面积/（地上）楼梯体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '楼梯',
          name2: '地下',
          rule1: '指标1=（地下）楼梯模板面积/地下面积',
          rule2: '指标2=（地下）楼梯模板面积/（地下）楼梯体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '楼梯',
          name2: '地上+地下',
          rule1: '指标1=楼梯模板面积/建筑面积',
          rule2: '指标2=楼梯模板面积/楼梯体积'
        },

        {
          date: '现浇砼(模板)',
          name1: '其他',
          name2: '地上',
          rule1: '指标1=（地上）其他现浇砼模板面积/地上面积',
          rule2: '指标2=（地上）其他现浇砼模板面积/（地上）其他体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '其他',
          name2: '地下',
          rule1: '指标1=（地下）其他现浇砼模板面积/地下面积',
          rule2: '指标2=（地下）其他现浇砼模板面积/（地下）其他体积'
        },
        {
          date: '现浇砼(模板)',
          name1: '其他',
          name2: '地上+地下',
          rule1: '指标1=其他现浇砼模板面积/建筑面积',
          rule2: '指标2=其他现浇砼模板面积/其他体积'
        },

        {
          date: '二次结构',
          name1: '过梁',
          name2: '地上',
          rule1: '（地上）过梁体积/地上面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '过梁',
          name2: '地下',
          rule1: '（地下）过梁体积/地下面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '过梁',
          name2: '地上+地下',
          rule1: '过梁体积/建筑面积',
          rule2: ''
        },

        {
          date: '二次结构',
          name1: '圈梁',
          name2: '地上',
          rule1: '（地上）圈梁体积/地上面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '圈梁',
          name2: '地下',
          rule1: '（地下）圈梁体积/地下面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '圈梁',
          name2: '地上+地下',
          rule1: '圈梁体积/建筑面积',
          rule2: ''
        },

        {
          date: '二次结构',
          name1: '构造柱',
          name2: '地上',
          rule1: '（地上）构造柱体积/地上面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '构造柱',
          name2: '地下',
          rule1: '（地下）构造柱体积/地下面积',
          rule2: ''
        },
        {
          date: '二次结构',
          name1: '构造柱',
          name2: '地上+地下',
          rule1: '构造柱体积/建筑面积',
          rule2: ''
        },

        {
          date: '二次结构（模板）',
          name1: '过梁',
          name2: '地上',
          rule1: '指标1=（地上）过梁模板面积/地上面积',
          rule2: '指标2=（地上）过梁模板面积/（地上）过梁体积'
        },
        {
          date: '二次结构（模板）',
          name1: '过梁',
          name2: '地下',
          rule1: '指标1=（地下）过梁模板面积/地下面积',
          rule2: '指标2=（地下）过梁模板面积/（地下）过梁体积'
        },
        {
          date: '二次结构（模板）',
          name1: '过梁',
          name2: '地上+地下',
          rule1: '指标1=过梁模板面积/建筑面积',
          rule2: '指标2=过梁模板面积/过梁体积'
        },

        {
          date: '二次结构（模板）',
          name1: '圈梁',
          name2: '地上',
          rule1: '指标1=（地上）圈梁模板面积/地上面积',
          rule2: '指标2=（地上）圈梁模板面积/（地上）圈梁体积'
        },
        {
          date: '二次结构（模板）',
          name1: '圈梁',
          name2: '地下',
          rule1: '指标1=（地下）圈梁模板面积/地下面积',
          rule2: '指标2=（地下）圈梁模板面积/（地下）圈梁体积'
        },
        {
          date: '二次结构（模板）',
          name1: '圈梁',
          name2: '地上+地下',
          rule1: '指标1=圈梁模板面积/建筑面积',
          rule2: '指标2=圈梁模板面积/圈梁体积'
        },

        {
          date: '二次结构（模板）',
          name1: '构造柱',
          name2: '地上',
          rule1: '指标1=（地上）构造柱模板面积/地上面积',
          rule2: '指标2=（地上）构造柱模板面积/（地上）构造柱体积'
        },
        {
          date: '二次结构（模板）',
          name1: '构造柱',
          name2: '地下',
          rule1: '指标1=（地下）构造柱模板面积/地下面积',
          rule2: '指标2=（地下）构造柱模板面积/（地下）构造柱体积'
        },
        {
          date: '二次结构（模板）',
          name1: '构造柱',
          name2: '地上+地下',
          rule1: '指标1=构造柱模板面积/建筑面积',
          rule2: '指标2=构造柱模板面积/构造柱体积'
        },

        {
          date: '装饰',
          name1: '楼地面',
          name2: '地上',
          rule1: '楼地面面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '楼地面',
          name2: '地下',
          rule1: '楼地面面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '楼地面',
          name2: '地上+地下',
          rule1: '楼地面面积/建筑面积',
          rule2: ''
        },

        {
          date: '装饰',
          name1: '踢脚',
          name2: '地上',
          rule1: '踢脚抹灰面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '踢脚',
          name2: '地下',
          rule1: '踢脚抹灰面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '踢脚',
          name2: '地上+地下',
          rule1: '踢脚抹灰面积/建筑面积',
          rule2: ''
        },

        {
          date: '装饰',
          name1: '内墙面',
          name2: '地上',
          rule1: '内墙面抹灰面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '内墙面',
          name2: '地下',
          rule1: '内墙面抹灰面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '内墙面',
          name2: '地上+地下',
          rule1: '内墙面抹灰面积/建筑面积',
          rule2: ''
        },

        {
          date: '装饰',
          name1: '外墙面',
          name2: '地上',
          rule1: '外墙面抹灰面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '外墙面',
          name2: '地下',
          rule1: '外墙面抹灰面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '外墙面',
          name2: '地上+地下',
          rule1: '外墙面抹灰面积/建筑面积',
          rule2: ''
        },
        //
        {
          date: '装饰',
          name1: '天棚',
          name2: '地上',
          rule1: '天棚抹灰面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '天棚',
          name2: '地下',
          rule1: '天棚抹灰面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '天棚',
          name2: '地上+地下',
          rule1: '天棚抹灰面积/建筑面积',
          rule2: ''
        },

        {
          date: '装饰',
          name1: '吊顶',
          name2: '地上',
          rule1: '吊顶面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '吊顶',
          name2: '地下',
          rule1: '吊顶面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '装饰',
          name1: '吊顶',
          name2: '地上+地下',
          rule1: '吊顶面积/建筑面积',
          rule2: ''
        },

        {
          date: '保温',
          name1: '外墙保温',
          name2: '地上',
          rule1: '外墙保温面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '保温',
          name1: '外墙保温',
          name2: '地下',
          rule1: '外墙保温面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '保温',
          name1: '外墙保温',
          name2: '地上+地下',
          rule1: '外墙保温面积/建筑面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '门',
          name2: '地上',
          rule1: '门面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '门',
          name2: '地下',
          rule1: '门面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '门',
          name2: '地上+地下',
          rule1: '门面积/建筑面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '窗',
          name2: '地上',
          rule1: '窗面积（地上）/地上面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '窗',
          name2: '地下',
          rule1: '窗面积（地下）/地下面积',
          rule2: ''
        },
        {
          date: '门窗',
          name1: '窗',
          name2: '地上+地下',
          rule1: '窗面积/建筑面积',
          rule2: ''
        },

        {
          date: '汇总指标',
          name1: '地上部分砌体总量',
          name2: '',
          rule1: '地上部分砌体总量/地上面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '地下部分砌体总量',
          name2: '',
          rule1: '地下部分砌体总量/地下面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '砌体总量',
          name2: '',
          rule1: '砌体总量/建筑面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '地上部分混凝土总量',
          name2: '',
          rule1: '地上部分混凝土总量/地上面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '地下部分混凝土总量',
          name2: '',
          rule1: '地下部分混凝土总量/地下面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '混凝土总量',
          name2: '',
          rule1: '混凝土总量/建筑面积',
          rule2: ''
        },
        {
          date: '汇总指标',
          name1: '地上部分模板总量',
          name2: '',
          rule1: '指标1=地上模板面积总量/地上面积',
          rule2: '指标2=地上模板面积总量/地上部分混凝土总量'
        },
        {
          date: '汇总指标',
          name1: '地下部分模板总量',
          name2: '',
          rule1: '指标1=地下模板面积总量/地下面积',
          rule2: '指标2=地下模板面积总量/地下部分混凝土总量'
        },
        {
          date: '汇总指标',
          name1: '模板总量',
          name2: '',
          rule1: '指标1=模板面积总量/建筑面积',
          rule2: '指标2=模板面积总量/混凝土总量'
        }
      ],
      ExportParams: {
        // 导出excel需要的参数
        flag: '5',
        monomerId: (() => this.$route.params.monomerId)()
      },
      maxHeight: window.innerHeight - 460,
      // 系数提示
      hintData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      hintStatus: false, // 提示按钮是常态还是悬浮    ture 是悬浮状态
      hintInfo: '',
      totalNmuber: '', // 砌体总量
      totalNmuber2: '', // 混凝土总量
      peiData: [],
      peiDatas: [],
      color: ['#3AA5FF', '#8398F3', '#01D3AB', '#FFBE40', '#F67979'],
      trendData: {
        type: '土建1',
        data: {}
      },
      trendDatas: {}
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.change(val.query.name)
      },
      // 深度观察监听
      deep: true
    },
    fixTabs (val) {
      this.headerFixed = val
    }
  },
  mounted () {
    this.change(5)
    this.getCostIndicatorAnalyse()
    this.masonryChart() // 土建砌体单方含量走势图
    this.masonryContent() // 土建砌体各部分含量占比
    this.concreteChart() // 土建混凝土单方含量走势图
    this.concreteContent() // 土建混凝土各部分含量占比
    /* 删除表头的第二级 */
    this.$nextTick(() => {
      let group = document.getElementsByClassName('is-group')[0]
      let tr = group.getElementsByTagName('tr')
      if (tr.length === 2) {
        group.removeChild(tr[1])
      }
      let table5 = this.$refs.table5.$el
      let tbody = table5.getElementsByTagName('tbody')[0]
      let tbodyTr0 = tbody.getElementsByTagName('tr')[0]
      let tbodyTr0Td2 = tbodyTr0.getElementsByTagName('td')[2]
      let tbodyTr83 = tbody.getElementsByTagName('tr')[83]
      let tbodyTr83Td2 = tbodyTr83.getElementsByTagName('td')[2]
      let tbodyTr84 = tbody.getElementsByTagName('tr')[84]
      let tbodyTr84Td1 = tbodyTr84.getElementsByTagName('td')[1]
      let tbodyTr85 = tbody.getElementsByTagName('tr')[85]
      let tbodyTr85Td1 = tbodyTr85.getElementsByTagName('td')[1]
      let tbodyTr86 = tbody.getElementsByTagName('tr')[86]
      let tbodyTr86Td1 = tbodyTr86.getElementsByTagName('td')[1]
      let tbodyTr87 = tbody.getElementsByTagName('tr')[87]
      let tbodyTr87Td1 = tbodyTr87.getElementsByTagName('td')[1]
      let tbodyTr88 = tbody.getElementsByTagName('tr')[88]
      let tbodyTr88Td1 = tbodyTr88.getElementsByTagName('td')[1]
      let tbodyTr89 = tbody.getElementsByTagName('tr')[89]
      let tbodyTr89Td1 = tbodyTr89.getElementsByTagName('td')[1]
      let tbodyTr90 = tbody.getElementsByTagName('tr')[90]
      let tbodyTr90Td1 = tbodyTr90.getElementsByTagName('td')[1]
      let tbodyTr91 = tbody.getElementsByTagName('tr')[91]
      let tbodyTr91Td1 = tbodyTr91.getElementsByTagName('td')[1]
      tbodyTr83.removeChild(tbodyTr83Td2)
      tbodyTr84.removeChild(tbodyTr84Td1)
      tbodyTr85.removeChild(tbodyTr85Td1)
      tbodyTr86.removeChild(tbodyTr86Td1)
      tbodyTr87.removeChild(tbodyTr87Td1)
      tbodyTr88.removeChild(tbodyTr88Td1)
      tbodyTr89.removeChild(tbodyTr89Td1)
      tbodyTr90.removeChild(tbodyTr90Td1)
      tbodyTr91.removeChild(tbodyTr91Td1)
    })
    this.calculation()
    let vm = this
    window.addEventListener('resize', function () {
      // 注意此处的this指向window
      vm.calculation()
    })
  },
  methods: {
    // 土建砌体单方含量走势图
    masonryChart () {
      api
        .masonryChart(this.contions.monomerId)
        .then(res => {
          this.trendData.data = res.data
        })
        .catch(res => {})
    },
    // 土建砌体各部分含量占比
    masonryContent () {
      api
        .masonryContent(this.contions.monomerId)
        .then(res => {
          this.peiData = [{ value: res.data.masonryAboveProportion, name: '砌体地上部分' }, { value: res.data.masonryUnderProportion, name: '砌体地下部分' }]
          this.totalNmuber = res.data.totalRebar
        })
        .catch(res => {})
    },
    // 土建混凝土单方含量走势图
    concreteChart () {
      api
        .concreteChart(this.contions.monomerId)
        .then(res => {
          this.trendDatas = res.data
        })
        .catch(res => {})
    },
    // 土建混凝土各部分含量占比
    concreteContent () {
      api
        .concreteContent(this.contions.monomerId)
        .then(res => {
          this.peiDatas = [{ value: res.data.cipcAbove, name: '现浇砼地上' }, { value: res.data.cipcUnder, name: '现浇砼地下 ' }, { value: res.data.secAbove, name: '二次结构地上' }, { value: res.data.secUnder, name: '二次结构地下 ' }]
          this.totalNmuber2 = res.data.totalConcrete
        })
        .catch(res => {})
    },
    // 计算
    calculation () {
      let box = document.getElementsByClassName('boxs')
      for (let index = 0; index < box.length; index++) {
        if (index > 0) {
          box[index].style.height = box[index].offsetWidth * 0.755 - 42 + 'px'
        } else {
          box[index].style.height = box[index].offsetWidth * 0.755 - 21 + 'px'
        }
      }
    },
    // 显示土建系数
    displayHint (name, $event) {
      let _this = this
      if (name == '楼梯体积') {
        _this.hintInfo = '楼梯体积'
      }
      if (name == '楼梯') {
        _this.hintInfo = '楼梯'
      }
      _this.hintData.show = true
      _this.hintStatus = true
      _this.hintData.pos = tool.getMousePos($event) // 弹出框位置
      _this.hintData.pos.x = tool.getMousePos($event).x + 20
      _this.hintData.pos.y = tool.getMousePos($event).y
    },
    // 隐藏土建系数
    closingHint () {
      let _this = this
      _this.hintStatus = false
      _this.hintData.show = false
    },
    splitTotal (strings) {
      if (strings) {
        let arr = strings.split(' ')
        return arr[0]
      }
    },
    splitTotal2 (strings2) {
      var splitarr = []
      if (strings2) {
        if (strings2.toString().indexOf('m³') != -1 || strings2.toString().indexOf('㎡') != -1) {
          splitarr = strings2.split(' ')
          return splitarr[0]
        } else {
          return strings2
        }
      }
    },
    // 合并单元格 土建指标
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 23,
            colspan: 1
          }
        }
        if (rowIndex === 23) {
          return {
            rowspan: 15,
            colspan: 1
          }
        }
        if (rowIndex === 38) {
          return {
            rowspan: 9,
            colspan: 1
          }
        }
        if (rowIndex === 47) {
          return {
            rowspan: 9,
            colspan: 1
          }
        }
        if (rowIndex === 56) {
          return {
            rowspan: 18,
            colspan: 1
          }
        }
        if (rowIndex === 74) {
          return {
            rowspan: 3,
            colspan: 1
          }
        }
        if (rowIndex === 77) {
          return {
            rowspan: 6,
            colspan: 1
          }
        }
        if (rowIndex === 83) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 1) {
        if (rowIndex < 83 && rowIndex > 1) {
          if ((rowIndex + 1) % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            }
          }
        }
        if (rowIndex >= 83) {
          return {
            rowspan: 1,
            colspan: 2
          }
        }
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 导出Excel 接口
    ExcelCommon () {
      api
        .ExcelCommon(this.ExportParams)
        .then(res => {
          downloadBlob(res, '土建算量指标')
          this.$message({
            showClose: true,
            message: '导出成功',
            type: 'success'
          })
        })
        .catch(res => {
          this.$message({
            showClose: true,
            message: '导出文件失败',
            type: 'error'
          })
        })
    },
    // 导出为excel
    exportFunc (tableId) {
      this.isul = false
      this.excelName = '土建指标'
      this.ExportParams.flag = tableId
      this.ExcelCommon()
    },
    // 选择安装指标、土建指标或者钢筋指标
    change (val) {
      this.loading5 = true
      this.getCostIndicatorAnalyse().then(res => {
        this.loading5 = false
      })
    },
    getCostIndicatorAnalyse () {
      return new Promise((resolve, relect) => {
        api
          .getCostIndicatorAnalyse(this.contions)
          .then(res => {
            // 土建指标
            if (res.data.civilEngineeringQuantityList) {
              let item = res.data.civilEngineeringQuantityList
              this.$set(this.tableData[0], 'cipcBase', item.cipcCushion + ' m³') // 现浇砼-垫层
              this.$set(this.tableData[0], 'cipcBaseContent', item.cipcCushionContent + ' m³/㎡') // 现浇砼-垫层总量/面积

              this.$set(this.tableData[1], 'cipcBase', item.cipcBase + ' m³') // 现浇砼-其他
              this.$set(this.tableData[1], 'cipcBaseContent', item.cipcBaseContent + ' m³/㎡') // 现浇砼-其他总量/面积

              this.$set(this.tableData[2], 'cipcBase', item.cipcWallAbove + ' m³') // 现浇砼-墙-地上
              this.$set(this.tableData[2], 'cipcBaseContent', item.cipcWallAboveContent + ' m³/㎡') // 现浇砼-墙-地上-墙总量/面积

              this.$set(this.tableData[3], 'cipcBase', item.cipcWallUnder + ' m³') // 现浇砼-墙-地下
              this.$set(this.tableData[3], 'cipcBaseContent', item.cipcWallUnderContent + ' m³/㎡') // 现浇砼-墙-地下-墙总量/面积

              this.$set(this.tableData[4], 'cipcBase', item.cipcWall + ' m³') // 现浇砼-墙-地上+地下
              this.$set(this.tableData[4], 'cipcBaseContent', item.cipcWallContent + ' m³/㎡') // 现浇砼-墙-地上+地下-墙总量/面积

              this.$set(this.tableData[5], 'cipcBase', item.cipcPillarAbove + ' m³') // 现浇砼-柱-地上
              this.$set(this.tableData[5], 'cipcBaseContent', item.cipcPillarAboveContent + ' m³/㎡') // 现浇砼-柱-地上-柱总量/面积

              this.$set(this.tableData[6], 'cipcBase', item.cipcPillarUnder + ' m³') // 现浇砼-柱-地下
              this.$set(this.tableData[6], 'cipcBaseContent', item.cipcPillarUnderContent + ' m³/㎡') // 现浇砼-柱-地下-柱总量/面积

              this.$set(this.tableData[7], 'cipcBase', item.cipcPillar + ' m³') // 现浇砼-柱-地上+地下
              this.$set(this.tableData[7], 'cipcBaseContent', item.cipcPillarContent + ' m³/㎡') // 现浇砼-柱-地上+地下-柱总量/面积

              this.$set(this.tableData[8], 'cipcBase', item.cipcBeamPlateAbove + ' m³') // 现浇砼-梁板-地上
              this.$set(this.tableData[8], 'cipcBaseContent', item.cipcBeamPlateAboveContent + ' m³/㎡') // 现浇砼-梁板-地上-梁板总量/面积

              this.$set(this.tableData[9], 'cipcBase', item.cipcBeamPlateUnder + ' m³') // 现浇砼-梁板-地下
              this.$set(this.tableData[9], 'cipcBaseContent', item.cipcBeamPlateUnderContent + ' m³/㎡') // 现浇砼-梁板-地下-梁板总量/面积

              this.$set(this.tableData[10], 'cipcBase', item.cipcBeamPlate + ' m³') // 现浇砼-梁板-地上+地下
              this.$set(this.tableData[10], 'cipcBaseContent', item.cipcBeamPlateContent + ' m³/㎡') // 现浇砼-梁板-地上+地下-梁板总量/面积

              this.$set(this.tableData[11], 'cipcBase', item.cipcStairsAreaAbove + ' ㎡') // 现浇砼-楼梯面积-地上
              this.$set(this.tableData[11], 'cipcBaseContent', item.cipcStairsAboveIndex) // 现浇砼-楼梯面积-地上-楼梯面积总量/面积

              this.$set(this.tableData[12], 'cipcBase', item.cipcStairsAreaUnder + ' ㎡') // 现浇砼-楼梯面积-地下
              this.$set(this.tableData[12], 'cipcBaseContent', item.cipcStairsUnderIndex) // 现浇砼-楼梯面积-地下-楼梯面积总量/面积

              this.$set(this.tableData[13], 'cipcBase', item.cipcStairsArea + ' ㎡') // 现浇砼-楼梯面积-地上+地下
              this.$set(this.tableData[13], 'cipcBaseContent', item.cipcStairsIndex) // 现浇砼-楼梯面积-地上+地下-楼梯面积总量/面积

              // 这个地方是楼梯体积
              this.$set(this.tableData[14], 'cipcBase', item.cipcStairsVolumeAbove + ' m³') // 现浇砼-楼梯体积-地上
              this.$set(this.tableData[14], 'cipcBaseContent', item.cipcStairsVolumeAboveIndex) // 现浇砼-楼梯体积-地上-楼梯体积总量/面积

              this.$set(this.tableData[15], 'cipcBase', item.cipcStairsVolumeUnder + ' m³') // 现浇砼-楼梯体积-地下
              this.$set(this.tableData[15], 'cipcBaseContent', item.cipcStairsVolumeUnderIndex) // 现浇砼-楼梯体积-地下-楼梯体积总量/面积

              this.$set(this.tableData[16], 'cipcBase', item.cipcStairsVolume + ' m³') // 现浇砼-楼梯体积-地上+地下
              this.$set(this.tableData[16], 'cipcBaseContent', item.cipcStairsVolumeIndex) // 现浇砼-楼梯体积-地上+地下-楼梯体积总量/面积

              //
              this.$set(this.tableData[17], 'cipcBase', item.cipcCustomlineAbove + ' m³') // 现浇砼-节点-地上
              this.$set(this.tableData[17], 'cipcBaseContent', item.cipcCustomlineAboveContent + ' m³/㎡') // 现浇砼-节点-地上-节点总量/面积

              this.$set(this.tableData[18], 'cipcBase', item.cipcCustomlineUnder + ' m³') // 现浇砼-节点-地下
              this.$set(this.tableData[18], 'cipcBaseContent', item.cipcCustomlineUnderContent + ' m³/㎡') // 现浇砼-节点-地下-节点总量/面积

              this.$set(this.tableData[19], 'cipcBase', item.cipcCustomline + ' m³') // 现浇砼-节点-地上+地下
              this.$set(this.tableData[19], 'cipcBaseContent', item.cipcCustomlineContent + ' m³/㎡') // 现浇砼-节点-地上+地下-节点总量/面积

              this.$set(this.tableData[20], 'cipcBase', item.cipcOthersAbove + ' m³') // 现浇砼-其他-地上
              this.$set(this.tableData[20], 'cipcBaseContent', item.cipcOthersAboveContent + ' m³/㎡') // 现浇砼-其他-地上-其他总量/面积

              this.$set(this.tableData[21], 'cipcBase', item.cipcOthersUnder + ' m³') // 现浇砼-其他-地下
              this.$set(this.tableData[21], 'cipcBaseContent', item.cipcOthersUnderContent + ' m³/㎡') // 现浇砼-其他-地下-其他总量/面积

              this.$set(this.tableData[22], 'cipcBase', item.cipcOthers + ' m³') // 现浇砼-其他-地上+地下
              this.$set(this.tableData[22], 'cipcBaseContent', item.cipcOthersContent + ' m³/㎡') // 现浇砼-其他-地上+地下-其他总量/面积
              //  现浇砼（模板）    ////////
              this.$set(this.tableData[23], 'cipcBase', item.cipcWallTemplateAbove + ' ㎡') // 现浇砼（模板）-墙-地上
              this.$set(this.tableData[23], 'cipcBaseContent', item.cipcWallTemplateAboveContent) // 现浇砼（模板）-墙-地上-指标1
              this.$set(this.tableData[23], 'cipcBaseContents', item.cipcWallTemplateAboveIndex + ' ㎡/m³') // 现浇砼（模板）-墙-地上-指标2

              this.$set(this.tableData[24], 'cipcBase', item.cipcWallTemplateUnder + ' ㎡') // 现浇砼（模板）-墙-地下
              this.$set(this.tableData[24], 'cipcBaseContent', item.cipcWallTemplateUnderContent) // 现浇砼（模板）-墙-地下-指标1
              this.$set(this.tableData[24], 'cipcBaseContents', item.cipcWallTemplateUnderIndex + ' ㎡/m³') // 现浇砼（模板）-墙-地下-指标2

              this.$set(this.tableData[25], 'cipcBase', item.cipcWallTemplate + ' ㎡') // 现浇砼（模板）-墙-地上+地下
              this.$set(this.tableData[25], 'cipcBaseContent', item.cipcWallTemplateContent) // 现浇砼（模板）-墙-地上+地下-指标1
              this.$set(this.tableData[25], 'cipcBaseContents', item.cipcWallTemplateIndex + ' ㎡/m³') // 现浇砼（模板）-墙-地上+地下-指标2

              this.$set(this.tableData[26], 'cipcBase', item.cipcPillarTemplateAbove + ' ㎡') // 现浇砼（模板）-柱-地上
              this.$set(this.tableData[26], 'cipcBaseContent', item.cipcPillarTemplateAboveContent) // 现浇砼（模板）-柱-地上-指标1
              this.$set(this.tableData[26], 'cipcBaseContents', item.cipcPillarTemplateAboveIndex + ' ㎡/m³') // 现浇砼（模板）-柱-地上-指标2

              this.$set(this.tableData[27], 'cipcBase', item.cipcPillarTemplateUnder + ' ㎡') // 现浇砼（模板）-柱-地下
              this.$set(this.tableData[27], 'cipcBaseContent', item.cipcPillarTemplateUnderContent) // 现浇砼（模板）-柱-地下-指标1
              this.$set(this.tableData[27], 'cipcBaseContents', item.cipcPillarTemplateUnderIndex + ' ㎡/m³') // 现浇砼（模板）-柱-地下-指标2

              this.$set(this.tableData[28], 'cipcBase', item.cipcPillarTemplate + ' ㎡') // 现浇砼（模板）-柱-地上+地下
              this.$set(this.tableData[28], 'cipcBaseContent', item.cipcPillarTemplateContent) // 现浇砼（模板）-柱-地上+地下-指标1
              this.$set(this.tableData[28], 'cipcBaseContents', item.cipcPillarTemplateIndex + ' ㎡/m³') // 现浇砼（模板）-柱-地上+地下-指标2

              this.$set(this.tableData[29], 'cipcBase', item.cipcBeamPlateTemplateAbove + ' ㎡') // 现浇砼（模板）-梁板-地上
              this.$set(this.tableData[29], 'cipcBaseContent', item.cipcBeamPlateTemplateAboveContent) // 现浇砼（模板）-梁板-地上-指标1
              this.$set(this.tableData[29], 'cipcBaseContents', item.cipcBeamPlateTemplateAboveIndex + ' ㎡/m³') // 现浇砼（模板）-梁板-地上-指标2

              this.$set(this.tableData[30], 'cipcBase', item.cipcBeamPlateTemplateUnder + ' ㎡') // 现浇砼（模板）-梁板-地下
              this.$set(this.tableData[30], 'cipcBaseContent', item.cipcBeamPlateTemplateUnderContent) // 现浇砼（模板）-梁板-地下-指标1
              this.$set(this.tableData[30], 'cipcBaseContents', item.cipcBeamPlateTemplateUnderIndex + ' ㎡/m³') // 现浇砼（模板）-梁板-地下-指标2

              this.$set(this.tableData[31], 'cipcBase', item.cipcBeamPlateTemplate + ' ㎡') // 现浇砼（模板）-梁板-地上+地下
              this.$set(this.tableData[31], 'cipcBaseContent', item.cipcBeamPlateTemplateContent) // 现浇砼（模板）-梁板-地上+地下-指标1
              this.$set(this.tableData[31], 'cipcBaseContents', item.cipcBeamPlateTemplateIndex + ' ㎡/m³') // 现浇砼（模板）-梁板-地上+地下-指标2

              // 楼梯
              this.$set(this.tableData[32], 'cipcBase', item.cipcStairsTemplateAbove + ' ㎡') // 现浇砼（模板）-楼梯-地上
              this.$set(this.tableData[32], 'cipcBaseContent', item.cipcStairsTemplateAboveContent) // 现浇砼（模板）-楼梯-地上-指标1
              this.$set(this.tableData[32], 'cipcBaseContents', item.cipcStairsTemplateAboveIndex + ' ㎡/m³') // 现浇砼（模板）-楼梯-地上-指标2

              this.$set(this.tableData[33], 'cipcBase', item.cipcStairsTemplateUnder + ' ㎡') // 现浇砼（模板）-楼梯-地下
              this.$set(this.tableData[33], 'cipcBaseContent', item.cipcStairsTemplateUnderContent) // 现浇砼（模板）-楼梯-地下-指标1
              this.$set(this.tableData[33], 'cipcBaseContents', item.cipcStairsTemplateUnderIndex + ' ㎡/m³') // 现浇砼（模板）-楼梯-地下-指标2

              this.$set(this.tableData[34], 'cipcBase', item.cipcStairsTemplate + ' ㎡') // 现浇砼（模板）-楼梯-地上+地下
              this.$set(this.tableData[34], 'cipcBaseContent', item.cipcStairsTemplateContent) // 现浇砼（模板）-楼梯-地上+地下-指标1
              this.$set(this.tableData[34], 'cipcBaseContents', item.cipcStairsTemplateIndex + ' ㎡/m³') // 现浇砼（模板）-楼梯-地上+地下-指标2
              //

              this.$set(this.tableData[35], 'cipcBase', item.cipcOthersTemplateAbove + ' ㎡') // 现浇砼（模板）-其他-地上
              this.$set(this.tableData[35], 'cipcBaseContent', item.cipcOthersTemplateAboveContent) // 现浇砼（模板）-其他-地上-指标1
              this.$set(this.tableData[35], 'cipcBaseContents', item.cipcOthersTemplateAboveIndex + ' ㎡/m³') // 现浇砼（模板）-其他-地上-指标2

              this.$set(this.tableData[36], 'cipcBase', item.cipcOthersTemplateUnder + ' ㎡') // 现浇砼（模板）-其他-地下
              this.$set(this.tableData[36], 'cipcBaseContent', item.cipcOthersTemplateUnderContent) // 现浇砼（模板）-其他-地下-指标1
              this.$set(this.tableData[36], 'cipcBaseContents', item.cipcOthersTemplateUnderIndex + ' ㎡/m³') // 现浇砼（模板）-其他-地下-指标2

              this.$set(this.tableData[37], 'cipcBase', item.cipcOthersTemplate + ' ㎡') // 现浇砼（模板）-其他-地上+地下
              this.$set(this.tableData[37], 'cipcBaseContent', item.cipcOthersTemplateContent) // 现浇砼（模板）-其他-地上+地下-指标1
              this.$set(this.tableData[37], 'cipcBaseContents', item.cipcOthersTemplateIndex + ' ㎡/m³') // 现浇砼（模板）-其他-地上+地下-指标2

              // 二次结构      //////
              this.$set(this.tableData[38], 'cipcBase', item.secLintelAbove + ' m³') // 二次结构-过梁-地上
              this.$set(this.tableData[38], 'cipcBaseContent', item.secLintelAboveContent + ' m³/㎡') // 二次结构-过梁-地上-指标1

              this.$set(this.tableData[39], 'cipcBase', item.secLintelUnder + ' m³') // 二次结构-过梁-地下
              this.$set(this.tableData[39], 'cipcBaseContent', item.secLintelUnderContent + ' m³/㎡') // 二次结构-过梁-地下-指标1

              this.$set(this.tableData[40], 'cipcBase', item.secLintel + ' m³') // 二次结构-过梁-地上+地下
              this.$set(this.tableData[40], 'cipcBaseContent', item.secLintelContent + ' m³/㎡') // 二次结构-过梁-地上+地下-指标1

              this.$set(this.tableData[41], 'cipcBase', item.secRingBeamAbove + ' m³') // 二次结构-圈梁-地上
              this.$set(this.tableData[41], 'cipcBaseContent', item.secRingBeamAboveContent + ' m³/㎡') // 二次结构-圈梁-地上-指标1

              this.$set(this.tableData[42], 'cipcBase', item.secRingBeamUnder + ' m³') // 二次结构-圈梁-地下
              this.$set(this.tableData[42], 'cipcBaseContent', item.secRingBeamUnderContent + ' m³/㎡') // 二次结构-圈梁-地下-指标1

              this.$set(this.tableData[43], 'cipcBase', item.secRingBeam + ' m³') // 二次结构-圈梁-地上+地下
              this.$set(this.tableData[43], 'cipcBaseContent', item.secRingBeamContent + ' m³/㎡') // 二次结构-圈梁-地上+地下-指标1

              this.$set(this.tableData[44], 'cipcBase', item.secTieColumnAbove + ' m³') // 二次结构-构造柱-地上
              this.$set(this.tableData[44], 'cipcBaseContent', item.secTieColumnAboveContent + ' m³/㎡') // 二次结构-构造柱-地上-指标1

              this.$set(this.tableData[45], 'cipcBase', item.secTieColumnUnder + ' m³') // 二次结构-构造柱-地下
              this.$set(this.tableData[45], 'cipcBaseContent', item.secTieColumnUnderContent + ' m³/㎡') // 二次结构-构造柱-地下-指标1

              this.$set(this.tableData[46], 'cipcBase', item.secTieColumn + ' m³') // 二次结构-构造柱-地上+地下
              this.$set(this.tableData[46], 'cipcBaseContent', item.secTieColumnContent + ' m³/㎡') // 二次结构-构造柱-地上+地下-指标1

              //  二次结构（模板）
              this.$set(this.tableData[47], 'cipcBase', item.secLintelTemplateAbove + ' ㎡') // 二次结构（模板）-过梁-地上
              this.$set(this.tableData[47], 'cipcBaseContent', item.secLintelTemplateAboveContent) // 二次结构（模板）-过梁-地上-指标1
              this.$set(this.tableData[47], 'cipcBaseContents', item.secLintelTemplateAboveIndex + ' ㎡/m³') // 二次结构（模板）-过梁-地上-指标2

              this.$set(this.tableData[48], 'cipcBase', item.secLintelTemplateUnder + ' ㎡') // 二次结构（模板）-过梁-地下
              this.$set(this.tableData[48], 'cipcBaseContent', item.secLintelTemplateUnderContent) // 二次结构（模板）-过梁-地下-指标1
              this.$set(this.tableData[48], 'cipcBaseContents', item.secLintelTemplateUnderIndex + ' ㎡/m³') // 二次结构（模板）-过梁-地下-指标2

              this.$set(this.tableData[49], 'cipcBase', item.secLintelTemplate + ' ㎡') // 二次结构（模板）-过梁-地上+地下
              this.$set(this.tableData[49], 'cipcBaseContent', item.secLintelTemplateContent) // 二次结构（模板）-过梁-地上+地下-指标1
              this.$set(this.tableData[49], 'cipcBaseContents', item.secLintelTemplateIndex + ' ㎡/m³') // 二次结构（模板）-过梁-地上+地下-指标2
              // 2
              this.$set(this.tableData[50], 'cipcBase', item.secRingBeamTemplateAbove + ' ㎡') // 二次结构（模板）-圈梁-地上
              this.$set(this.tableData[50], 'cipcBaseContent', item.secRingBeamTemplateAboveContent) // 二次结构（模板）-圈梁-地上-指标1
              this.$set(this.tableData[50], 'cipcBaseContents', item.secRingBeamTemplateAboveIndex + ' ㎡/m³') // 二次结构（模板）-圈梁-地上-指标2

              this.$set(this.tableData[51], 'cipcBase', item.secRingBeamTemplateUnder + ' ㎡') // 二次结构（模板）-圈梁-地下
              this.$set(this.tableData[51], 'cipcBaseContent', item.secRingBeamTemplateUnderContent) // 二次结构（模板）-圈梁-地下-指标1
              this.$set(this.tableData[51], 'cipcBaseContents', item.secRingBeamTemplateUnderIndex + ' ㎡/m³') // 二次结构（模板）-圈梁-地下-指标2

              this.$set(this.tableData[52], 'cipcBase', item.secRingBeamTemplate + ' ㎡') // 二次结构（模板）-圈梁-地上+地下
              this.$set(this.tableData[52], 'cipcBaseContent', item.secRingBeamTemplateContent) // 二次结构（模板）-圈梁-地上+地下-指标1
              this.$set(this.tableData[52], 'cipcBaseContents', item.secRingBeamTemplateIndex + ' ㎡/m³') // 二次结构（模板）-圈梁-地上+地下-指标2
              // 3
              this.$set(this.tableData[53], 'cipcBase', item.secTieColumnTemplateAbove + ' ㎡') // 二次结构（模板）-构造柱-地上
              this.$set(this.tableData[53], 'cipcBaseContent', item.secTieColumnTemplateAboveContent) // 二次结构（模板）-构造柱-地上-指标1
              this.$set(this.tableData[53], 'cipcBaseContents', item.secTieColumnTemplateAboveIndex + ' ㎡/m³') // 二次结构（模板）-构造柱-地上-指标2

              this.$set(this.tableData[54], 'cipcBase', item.secTieColumnTemplateUnder + ' ㎡') // 二次结构（模板）-构造柱-地下
              this.$set(this.tableData[54], 'cipcBaseContent', item.secTieColumnTemplateUnderContent) // 二次结构（模板）-构造柱-地下-指标1
              this.$set(this.tableData[54], 'cipcBaseContents', item.secTieColumnTemplateUnderIndex + ' ㎡/m³') // 二次结构（模板）-构造柱-地下-指标2

              this.$set(this.tableData[55], 'cipcBase', item.secTieColumnTemplate + ' ㎡') // 二次结构（模板）-构造柱-地上+地下
              this.$set(this.tableData[55], 'cipcBaseContent', item.secTieColumnTemplateContent) // 二次结构（模板）-构造柱-地上+地下-指标1
              this.$set(this.tableData[55], 'cipcBaseContents', item.secTieColumnTemplateIndex + ' ㎡/m³') // 二次结构（模板）-构造柱-地上+地下-指标2

              // 装饰       /////////////
              this.$set(this.tableData[56], 'cipcBase', item.decoFloorAbove + ' ㎡') // 装饰-楼地面-地上
              this.$set(this.tableData[56], 'cipcBaseContent', item.decoFloorAboveContent) // 装饰-楼地面-地上-指标1

              this.$set(this.tableData[57], 'cipcBase', item.decoFloorUnder + ' ㎡') // 装饰-楼地面-地下
              this.$set(this.tableData[57], 'cipcBaseContent', item.decoFloorUnderContent) // 装饰-楼地面-地下-指标1

              this.$set(this.tableData[58], 'cipcBase', item.decoFloor + ' ㎡') // 装饰-楼地面-地上+地下
              this.$set(this.tableData[58], 'cipcBaseContent', item.decoFloorContent) // 装饰-楼地面-地上+地下-指标1
              // 2

              this.$set(this.tableData[59], 'cipcBase', item.decoSkirtingAbove + ' ㎡') // 装饰-踢脚-地上
              this.$set(this.tableData[59], 'cipcBaseContent', item.decoSkirtingAboveContent) // 装饰-踢脚-地上-指标1

              this.$set(this.tableData[60], 'cipcBase', item.decoSkirtingUnder + ' ㎡') // 装饰-踢脚-地下
              this.$set(this.tableData[60], 'cipcBaseContent', item.decoSkirtingUnderContent) // 装饰-踢脚-地下-指标1

              this.$set(this.tableData[61], 'cipcBase', item.decoSkirting + ' ㎡') // 装饰-踢脚-地上+地下
              this.$set(this.tableData[61], 'cipcBaseContent', item.decoSkirtingContent) // 装饰-踢脚-地上+地下-指标1

              // 3
              this.$set(this.tableData[62], 'cipcBase', item.decoInternalWallAbove + ' ㎡') // 装饰-内墙面-地上
              this.$set(this.tableData[62], 'cipcBaseContent', item.decoInternalWallAboveContent) // 装饰-内墙面-地上-指标1

              this.$set(this.tableData[63], 'cipcBase', item.decoInternalWallUnder + ' ㎡') // 装饰-内墙面-地下
              this.$set(this.tableData[63], 'cipcBaseContent', item.decoInternalWallUnderContent) // 装饰-内墙面-地下-指标1

              this.$set(this.tableData[64], 'cipcBase', item.decoInternalWall + ' ㎡') // 装饰-内墙面-地上+地下
              this.$set(this.tableData[64], 'cipcBaseContent', item.decoInternalWallContent) // 装饰-内墙面-地上+地下-指标1
              // 4

              this.$set(this.tableData[65], 'cipcBase', item.decoExternalWallAbove + ' ㎡') // 装饰-外墙面-地上
              this.$set(this.tableData[65], 'cipcBaseContent', item.decoExternalWallAboveContent) // 装饰-外墙面-地上-指标1

              this.$set(this.tableData[66], 'cipcBase', item.decoExternalWallUnder + ' ㎡') // 装饰-外墙面-地下
              this.$set(this.tableData[66], 'cipcBaseContent', item.decoExternalWallUnderContent) // 装饰-外墙面-地下-指标1

              this.$set(this.tableData[67], 'cipcBase', item.decoExternalWall + ' ㎡') // 装饰-外墙面-地上+地下
              this.$set(this.tableData[67], 'cipcBaseContent', item.decoExternalWallContent) // 装饰-外墙面-地上+地下-指标1

              // 5
              this.$set(this.tableData[68], 'cipcBase', item.decoCeilingAbove + ' ㎡') // 装饰-天棚-地上
              this.$set(this.tableData[68], 'cipcBaseContent', item.decoCeilingAboveContent) // 装饰-天棚-地上-指标1

              this.$set(this.tableData[69], 'cipcBase', item.decoCeilingUnder + ' ㎡') // 装饰-天棚-地下
              this.$set(this.tableData[69], 'cipcBaseContent', item.decoCeilingUnderContent) // 装饰-天棚-地下-指标1

              this.$set(this.tableData[70], 'cipcBase', item.decoCeiling + ' ㎡') // 装饰-天棚-地上+地下
              this.$set(this.tableData[70], 'cipcBaseContent', item.decoCeilingContent) // 装饰-天棚-地上+地下-指标1
              // 6
              this.$set(this.tableData[71], 'cipcBase', item.decoHangCeilingAbove + ' ㎡') // 装饰-吊顶-地上
              this.$set(this.tableData[71], 'cipcBaseContent', item.decoHangCeilingAboveContent) // 装饰-吊顶-地上-指标1

              this.$set(this.tableData[72], 'cipcBase', item.decoHangCeilingUnder + ' ㎡') // 装饰-吊顶-地下
              this.$set(this.tableData[72], 'cipcBaseContent', item.decoHangCeilingUnderContent) // 装饰-吊顶-地下-指标1

              this.$set(this.tableData[73], 'cipcBase', item.decoHangCeiling + ' ㎡') // 装饰-吊顶-地上+地下
              this.$set(this.tableData[73], 'cipcBaseContent', item.decoHangCeilingContent) // 装饰-吊顶-地上+地下-指标1
              // 保温
              this.$set(this.tableData[74], 'cipcBase', item.insulationAbove + ' ㎡') // 保温-外墙保温-地上
              this.$set(this.tableData[74], 'cipcBaseContent', item.insulationAboveContent) // 保温-外墙保温-地上-指标1

              this.$set(this.tableData[75], 'cipcBase', item.insulationUnder + ' ㎡') // 保温-外墙保温-地下
              this.$set(this.tableData[75], 'cipcBaseContent', item.insulationUnderContent) // 保温-外墙保温-地下-指标1

              this.$set(this.tableData[76], 'cipcBase', item.insulation + ' ㎡') // 保温-外墙保温-地上+地下
              this.$set(this.tableData[76], 'cipcBaseContent', item.insulationContent) // 保温-外墙保温-地上+地下-指标1

              // 门窗
              this.$set(this.tableData[77], 'cipcBase', item.doorAbove + ' ㎡') // 门窗-门-地上
              this.$set(this.tableData[77], 'cipcBaseContent', item.doorAboveContent) // 门窗-门-地上-指标1

              this.$set(this.tableData[78], 'cipcBase', item.doorUnder + ' ㎡') // 门窗-门-地下
              this.$set(this.tableData[78], 'cipcBaseContent', item.doorUnderContent) // 门窗-门-地下-指标1

              this.$set(this.tableData[79], 'cipcBase', item.door + ' ㎡') // 门窗-门-地上+地下
              this.$set(this.tableData[79], 'cipcBaseContent', item.doorContent) // 门窗-门-地上+地下-指标1

              this.$set(this.tableData[80], 'cipcBase', item.windowAbove + ' ㎡') // 门窗-窗-地上
              this.$set(this.tableData[80], 'cipcBaseContent', item.windowAboveContent) // 门窗-窗-地上-指标1

              this.$set(this.tableData[81], 'cipcBase', item.windowUnder + ' ㎡') // 门窗-窗-地下
              this.$set(this.tableData[81], 'cipcBaseContent', item.windowUnderContent) // 门窗-窗-地下-指标1

              this.$set(this.tableData[82], 'cipcBase', item.window + ' ㎡') // 门窗-窗-地上+地下
              this.$set(this.tableData[82], 'cipcBaseContent', item.windowContent) // 门窗-窗-地上+地下-指标1

              // 汇总指标
              this.$set(this.tableData[83], 'cipcBase', item.totalMasonryAbove + ' m³') // 汇总指标-地上部分砌体总量
              this.$set(this.tableData[83], 'cipcBaseContent', item.totalMasonryAboveContent + ' m³/㎡') // 汇总指标-地上部分砌体总量-指标1

              this.$set(this.tableData[84], 'cipcBase', item.totalMasonryUnder + ' m³') // 汇总指标-地下部分砌体总量
              this.$set(this.tableData[84], 'cipcBaseContent', item.totalMasonryUnderContent + ' m³/㎡') // 汇总指标-地下部分砌体总量--指标1

              this.$set(this.tableData[85], 'cipcBase', item.totalMasonry + ' m³') // 汇总指标-砌体总量
              this.$set(this.tableData[85], 'cipcBaseContent', item.totalMasonryContent + ' m³/㎡') // 汇总指标-砌体总量-指标1

              this.$set(this.tableData[86], 'cipcBase', item.totalConcreteAbove + ' m³') // 汇总指标-地上部分混凝土总量-
              this.$set(this.tableData[86], 'cipcBaseContent', item.totalConcreteAboveContent + ' m³/㎡') // 汇总指标-地上部分混凝土总量--指标1

              this.$set(this.tableData[87], 'cipcBase', item.totalConcreteUnder + ' m³') // 汇总指标-地下部分混凝土总量
              this.$set(this.tableData[87], 'cipcBaseContent', item.totalConcreteUnderContent + ' m³/㎡') // 汇总指标-地下部分混凝土总量-指标1

              this.$set(this.tableData[88], 'cipcBase', item.totalConcrete + ' m³') // 汇总指标-混凝土总量
              this.$set(this.tableData[88], 'cipcBaseContent', item.totalConcreteContent + ' m³/㎡') // 汇总指标-混凝土总量-指标1

              this.$set(this.tableData[89], 'cipcBase', item.totalTemplateAbove + ' ㎡') // 汇总指标-地上部分模板总量
              this.$set(this.tableData[89], 'cipcBaseContent', item.totalTemplateAboveContent) // 汇总指标-地上部分模板总量--总量/面积
              this.$set(this.tableData[89], 'cipcBaseContents', item.totalTemplateAboveIndex + ' ㎡/m³') // 汇总指标-地上部分模板总量--总量/体积

              this.$set(this.tableData[90], 'cipcBase', item.totalTemplateUnder + ' ㎡') // 汇总指标-地下部分模板总量
              this.$set(this.tableData[90], 'cipcBaseContent', item.totalTemplateUnderContent) // 汇总指标-地下部分模板总量--总量/面积
              this.$set(this.tableData[90], 'cipcBaseContents', item.totalTemplateUnderIndex + ' ㎡/m³') // 汇总指标-地下部分模板总量-总量/体积

              this.$set(this.tableData[91], 'cipcBase', item.totalTemplate + ' ㎡') // 汇总指标-模板总量
              this.$set(this.tableData[91], 'cipcBaseContent', item.totalTemplateContent) // 汇总指标-模板总量--总量/面积
              this.$set(this.tableData[91], 'cipcBaseContents', item.totalTemplateIndex + ' ㎡/m³') // 汇总指标-模板总量--总量/体积
            } else {
              this.loading5 = false
              this.tableData = []
            }
            resolve(this.tableData)
          })
          .catch(res => {
            this.loading5 = false
            this.tableData = []
          })
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// .mrHeader {
//   box-sizing: border-box;
//   // height: 50px;
//   // line-height: 50px;
//   padding-bottom: 10px;
//   .target {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     .btns {
//       .downBtn {
//         position: relative;
//         display: inline-block;
//         button {
//           cursor: pointer;
//           width: 70px;
//           text-align: center;
//           height: 30px;
//           line-height: 30px;
//           color: #fff;
//           background-color: #4474cf;
//           vertical-align: middle;
//           // margin-bottom: 10px;
//         }
//         ul {
//           position: absolute;
//           left: 18px;
//           text-align: center;
//           width: 104.67px;
//           margin-top: 5px;
//           z-index: 2001;
//           background: #f2f5fc;
//           li {
//             height: 20px;
//             line-height: 20px;
//             font-size: 12px;
//             background: #f2f5fc;
//             cursor: pointer;
//             opacity: 0.8;
//           }
//           li:nth-child(1) {
//             border-bottom: 1px solid gray;
//           }
//         }
//       }
//     }
//   }
// }
.charts-box {
  width: 100%;
  display: flex;
  .boxs {
    background: #fff;
    width: e('calc((100% - 27px)/4)');
    padding: 21px 0 21px 21px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    .title {
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }
    .total-money {
      position: absolute;
      text-align: center;
      width: 39%;
      bottom: 3%;
      left: 8%;
      color: #666;
      .money {
        font-size: 22px;
      }
      .word_tips {
        margin-top: 1%;
        font-size: 12px;
      }
    }
  }
  .boxs:nth-child(1) {
    padding-bottom: 0;
  }
  .boxs:nth-child(2) {
    margin: 0 9px;
    position: relative;
  }
  .boxs:nth-child(3) {
    margin-right: 9px;
  }
}
table,
th,
td {
  border: 1px solid #eff2f9;
  text-align: center;
  height: 40px;
  line-height: 40px;
  min-width: 120px;
}
table {
  tr:hover {
    background: #f2f5fb;
    cursor: default;
  }
  tr {
    background: #fff;
  }
  th {
    background: #a9acb3;
    color: #fff;
    font-size: 12px;
  }
  td {
    color: #444;
    font-size: 14px;
  }
  .gangjin {
    th {
      min-width: 138px;
      padding: 0 10px;
    }
  }
}
.icon-box {
  vertical-align: middle;
  line-height: 23px;
  display: inline-block;
  cursor: pointer;
  img {
    vertical-align: middle;
    margin-top: -6px;
  }
}
.Hint-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2001;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #000;
  border: 1px solid rgba(225, 228, 233, 1);
  box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
  opacity: 0.65;
  border-radius: 5px;
  padding: 10px 20px 13px 11px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  .Hint-box1 {
    width: 225px;
  }
  .Hint-box2 {
    width: 245px;
  }
}
</style>
<style lang="less">
.fixedHeader .el-table__header-wrapper {
  position: fixed;
  top: 117px;
  z-index: 1;
}
.target input.el-input__inner::-webkit-input-placeholder {
  color: #4474cf;
}
.target .el-tag.el-tag--info.el-tag--small {
  float: left;
}
.target .el-select__tags-text {
  max-width: 147px;
  display: block;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mrmain .el-table thead.is-group th {
  background: #fafafb;
  font-size: 12px;
  height: 30px;
  color: #888;
  padding: 0;
  font-weight: bold;
}
.mrmain .el-table th.is-leaf {
  background: #fafafb;
  color: #666;
  font-size: 12px;
  padding: 0;
}
</style>
<style scoped>
.btns .selects >>> .el-input--medium .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
.civilTable >>> .el-table__row td {
  padding: 0;
  padding-left: 10px;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  color: #666;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(3n).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(2n).el-table__row--striped td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(6n).el-table__row--striped td:nth-child(2) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(24).el-table__row--striped td:nth-child(3) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(48).el-table__row--striped td:nth-child(3) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(78).el-table__row--striped td:nth-child(3) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--striped .el-table__body tr:nth-child(90).el-table__row--striped td:nth-child(2) {
  background-color: #f5f6f8 !important;
}

.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(1):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(1):hover > td:nth-child(2) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(2):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(3):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(4):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(6):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(8):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(9):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(10):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(12):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(14):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(15):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(16):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(18):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(20):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(21):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(22):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(24):hover > td:nth-child(3) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(26):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(27):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(28):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(30):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(32):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(33):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(34):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(36):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(38):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(39):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(39):hover > td:nth-child(2) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(40):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(42):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(44):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(45):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(46):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(48):hover > td:nth-child(3) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(50):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(51):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(52):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(54):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(56):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(57):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(57):hover > td:nth-child(2) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(58):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(60):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(62):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(63):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(64):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(66):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(68):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(69):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(70):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(72):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(74):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(75):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(75):hover > td:nth-child(2) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(76):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(78):hover > td:nth-child(3) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(80):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(81):hover > td:nth-child(1) {
  background-color: #fff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(82):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(84):hover > td:nth-child(2) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(86):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(88):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(90):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
.civilTable >>> .el-table--enable-row-hover .el-table__body tr:nth-child(92):hover > td:nth-child(1) {
  background-color: #ecf4ff !important;
}
</style>
