<template>
    <div class="base-info-container">
        <div class="base-info-block">
            <nav class="nav-title">单项工程基本信息</nav>
            <ul class="base-info-lists">
                <li class="base-info-list">
                    <span class="info-title">建筑面积</span>
                    <span class="info-details">
                        {{baseInfo.monomerArea}}㎡<span class="margin-35">l</span>
                        <span class="margin-right-40">地上面积：{{baseInfo.groundArea}}㎡</span>
                        <span class="margin-right-40">地下面积：{{baseInfo.undergroundArea}}㎡</span>
                        <span class="margin-right-40">基础面积：{{baseInfo.baseArea}}㎡</span>
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">建筑层高</span>
                    <span class="info-details">
                        <span class="margin-right-40">地上层数：{{baseInfo.groundFloors}}层</span>
                        <span class="margin-right-40">地下层数：{{baseInfo.undergroundFloors}}层</span>
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">建筑业态</span>
                    <span class="info-details">
                        {{baseInfo.structureForm1}}{{'/' + baseInfo.structureForm2}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">结构类型</span>
                    <span class="info-details">
                        {{baseInfo.structType}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="base-info-block">
            <nav class="nav-title projec-name">项目基本信息</nav>
            <ul class="base-info-lists">
                <li class="base-info-list">
                    <span class="info-title">项目行业</span>
                    <span class="info-details">
                        {{projectInfo.industryBelong}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">类别</span>
                    <span class="info-details">
                        {{projectInfo.projectType}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">项目名称</span>
                    <span class="info-details">
                        {{projectInfo.projectName}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">项目地点</span>
                    <span class="info-details">
                        {{projectInfo.provinceName}}{{'/' + projectInfo.cityName }}{{'/' + projectInfo.distinctName }}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">开工日期</span>
                    <span class="info-details">
                        {{projectInfo.projectStart}}
                    </span>
                    <span class="info-title margin-left-120">竣工日期</span>
                    <span class="info-details">
                        {{projectInfo.projectEnd}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">建设性质</span>
                    <span class="info-details">
                        {{projectInfo.projectNature}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">建设单位</span>
                    <span class="info-details">
                        {{projectInfo.doSide}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">产品类型</span>
                    <span class="info-details">
                        {{projectInfo.productTypeList?projectInfo.productTypeList.join(','):''}}
                    </span>
                </li>
                <li class="base-info-list">
                    <span class="info-title">建设规模</span>
                    <div class="info-details">
                        <p v-for="item in projectInfo.projectScaleList" :key="item"><span class="margin-right-40">{{item.split(':')[0]}}工程</span>{{item.split(':')[1]}}{{item.split(':')[2]}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="base-info-block" v-if="projectInfo.itemSpecification">
            <nav class="nav-title">国家清单计价规范</nav>
            <div class="base-info-lists">
                <span class="info-title"></span>
                {{projectInfo.itemSpecification}}
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['baseInfo', 'projectInfo']
}
</script>
<style lang="less" scoped>
.base-info-container{
    font-size: 12px;
    .base-info-block{
        .nav-title{
            // margin-top: 10px;
            color: #666666;
            padding: 12px 0 12px 18px;
            background-color: #EFF1F7;
            position: relative;
            &::before{
                content:'';
                position: absolute;
                top: 0;
                left: 0;
                background: #91A2E8;
                width: 4px;
                height: 40px;
            }
        }
        .base-info-lists{
            padding: 30px 40px;
            background: #fff;
            .base-info-list + .base-info-list{
                margin-top: 20px;
            }
            .info-title{
                color: #BEBEBE;
                display: inline-block;
                width: 105px;
                vertical-align: top;
            }
            .info-details{
                color: #666;
                display: inline-block;
                p + p{margin-top: 10px;}
            }
            .margin-35{
                margin: 0 35px;
            }
            .margin-right-40{
                margin-right: 40px;
            }
            .margin-left-120{
                margin-left: 120px;
            }
        }
    }
}
</style>
