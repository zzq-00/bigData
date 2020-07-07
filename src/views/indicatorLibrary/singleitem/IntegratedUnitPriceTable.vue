<template>
  <div class="self-tablePrice scroll-table">
    <el-table :data="indexData" border v-loading="loading" stripe
    :class="{'fixedHeader': headerFixed}">
      <el-table-column label="项目名称" align="center" width="280" fixed>
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col level1'>
              <span class="table-cell">
                <input type="button" v-model="status1[index]" class="inputBtn" @click="changestatus(item,index)">
                <span :title="item.unitProjectName">{{item.unitProjectName}}</span>
              </span>
            </p>
            <div v-for="(items,index2) in item.subdivisionList" :key="index2" v-if="item.isshow">
              <p class='col levelS'>
                <span class="table-cell" :title="items.subdivision">
                  <input type="button" v-model="items.status2" class="inputBtn" @click="changestatus2(items,index,index2)">{{items.subdivision}}
                </span>
              </p>
              <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                <p class='col levelT'>
                  <span class="table-cell" v-if="itemss.name" :title="itemss.name">{{itemss.name}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="项目编码" prop="specialityName" align="center" width="150" fixed>
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.code">{{itemss.code}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center" fixed>
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.unit">{{itemss.unit}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" fixed>
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.amount">{{itemss.amount}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="人工费" align="center">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitLaborCost">{{itemss.unitLaborCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>

        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.laborCost||item.laborCost==0">{{item.laborCost}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.laborCost||items.laborCost==0">{{items.laborCost}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.laborCost||itemss.laborCost==0">{{itemss.laborCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.laborCostPercent||item.laborCostPercent==0">{{item.laborCostPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.laborCostPercent||items.laborCostPercent==0">{{items.laborCostPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.laborCostPercent||itemss.laborCostPercent==0">{{itemss.laborCostPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="材料费" align="center">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitMaterialCost||itemss.unitMaterialCost==0">{{itemss.unitMaterialCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.materialCost||item.materialCost==0">{{item.materialCost}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.materialCost||items.materialCost==0">{{items.materialCost}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.materialCost||itemss.materialCost==0">{{itemss.materialCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.materialCostPercent||item.materialCostPercent==0">{{item.materialCostPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.materialCostPercent||items.materialCostPercent==0">{{items.materialCostPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.materialCostPercent||itemss.materialCostPercent==0">{{itemss.materialCostPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="机械费" align="center">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitMachineryFee||itemss.unitMachineryFee==0">{{itemss.unitMachineryFee}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.machineryFee||item.machineryFee==0">{{item.machineryFee}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.machineryFee||items.machineryFee==0">{{items.machineryFee}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.machineryFee||itemss.machineryFee==0">{{itemss.machineryFee}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.machineryFeePercent||item.machineryFeePercent==0">{{item.machineryFeePercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.machineryFeePercent||items.machineryFeePercent==0">{{items.machineryFeePercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.machineryFeePercent||itemss.machineryFeePercent==0">{{itemss.machineryFeePercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="风险" align="center">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitRisk||itemss.unitRisk==0">{{itemss.unitRisk}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.risk||item.risk==0">{{item.risk}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.risk||items.risk==0">{{items.risk}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.risk||itemss.risk==0">{{itemss.risk}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.riskPercent||item.riskPercent==0">{{item.riskPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.riskPercent||items.riskPercent==0">{{items.riskPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.riskPercent||itemss.riskPercent==0">{{itemss.riskPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="管理费" align="center" v-if="andShow == ''">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitManagementCost||itemss.unitManagementCost==0">{{itemss.unitManagementCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.managementCost||item.managementCost==0">{{item.managementCost}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.managementCost||items.managementCost==0">{{item.managementCost}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.managementCost||itemss.managementCost==0">{{itemss.managementCost}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.managementCostPercent||item.managementCostPercent==0">{{item.managementCostPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.managementCostPercent||items.managementCostPercent==0">{{items.managementCostPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.managementCostPercent||itemss.managementCostPercent==0">{{itemss.managementCostPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="利润" align="center" v-if="andShow ==''">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitProfit||itemss.unitProfit==0">{{itemss.unitProfit}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.profit||item.profit==0">{{item.profit}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.profit||items.profit==0">{{items.profit}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.profit||itemss.profit==0">{{itemss.profit}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.profitPercent||item.profitPercent==0">{{item.profitPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.profitPercent||items.profitPercent==0">{{items.profitPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.profitPercent||itemss.profitPercent==0">{{itemss.profitPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="管理费和利润" align="center" v-if="andShow == 'existence'">
        <el-table-column prop="" label="单价费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell">--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.unitManagementAndProfit||itemss.unitManagementAndProfit==0">{{itemss.unitManagementAndProfit}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="合计费用" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.managementAndProfit||item.managementAndProfit ==0">{{item.managementAndProfit}}</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.managementAndProfit||items.managementAndProfit==0">{{items.managementAndProfit}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.managementAndProfit||itemss.managementAndProfit==0">{{itemss.managementAndProfit}}</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="造价占比" width="120" align="center">
          <template slot-scope="scope">
            <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
              <p class='col centers'>
                <span class="table-cell" v-if="item.managementAndProfitPercent||item.managementAndProfitPercent==0">{{item.managementAndProfitPercent}}%</span>
                <span class="table-cell" v-else>--</span>
              </p>
              <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="items.managementAndProfitPercent||items.managementAndProfitPercent==0">{{items.managementAndProfitPercent}}%</span>
                  <span class="table-cell" v-else>--</span>
                </p>
                <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                  <p class='col centers'>
                    <span class="table-cell" v-if="itemss.managementAndProfitPercent||itemss.managementAndProfitPercent==0">{{itemss.managementAndProfitPercent}}%</span>
                    <span class="table-cell" v-else>--</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="合计" width="120" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">{{item.totalCost}}</span>
            </p>
            <div v-for="(items,index) in item.subdivisionList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">{{items.totalCost}}</span>
              </p>
              <div v-for="(itemss,index) in items.unitPriceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell">{{itemss.totalCost}}</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['fixTabs'],
  data () {
    return {
      fixedWidth: 0,
      headerFixed: false,
      params: {
        flag: '2',
        monomerId: (() => this.$route.params.monomerId)()
      }, // 请求参数
      id: '', // 地址栏参数id
      indexData: [], // 请求到的数据
      status1: [],
      loading: true, // 加载动画
      andShow: ''
      // maxHeight: window.innerHeight - 500
    }
  },
  methods: {
    // 控制一级折叠
    changestatus (item, index) {
      if (this.status1[index] == '+') {
        this.$set(this.status1, index, '-')
        item.isshow = true
        return
      }
      if (this.status1[index] == '-') {
        this.$set(this.status1, index, '+')
        item.isshow = false
      }
    },
    // 控制二级折叠
    changestatus2 (items, index, index2) {
      if (items.status2 == '+') {
        items.status2 = '-'
        items.isshow = true
        this.complexUnitPriceFour(items.subdivisionId).then(res => {
          this.indexData[0].unitProjectList[index].subdivisionList[index2].unitPriceList = this.fourDataList
          this.$set(this.indexData[0].unitProjectList, index, this.indexData[0].unitProjectList[index])
        })
        return
      }
      if (items.status2 == '-') {
        items.status2 = '+'
        this.indexData[0].unitProjectList[index].subdivisionList[index2] = items
        this.$set(this.indexData[0].unitProjectList, index, this.indexData[0].unitProjectList[index])
        items.isshow = false
      }
    },
    // 综合单价第1级
    complexUnitPriceOne () {
      return new Promise((resolve, relect) => {
        api
          .complexUnitPriceOne(this.params)
          .then(res => {
            if (res.data) {
              this.oneDataList = res.data
              if (this.oneDataList[0].managementAndProfit) {
                this.andShow = 'existence'
              } else {
                this.andShow = ''
              }
              this.loading = false
              this.status1 = []
              this.indexData = this.oneDataList
            } else {
              this.loading = false
            }
            resolve(this.indexData)
          })
          .catch(res => {
            this.loading = false
          })
      })
    },
    // 请求第1.1级数据
    complexUnitPriceTwo () {
      return new Promise((resolve, relect) => {
        if (this.oneDataList) {
          api.complexUnitPriceTwo({ monomerId: this.oneDataList[0].buildingId }).then(res => {
            this.twoDataList = res.data
            if (res.data) {
              this.twoDataList.map((item, index) => {
                item.isshow = true
                this.$set(this.status1, index, '-')
              })
              this.indexData[0].unitProjectList = this.twoDataList
            }
            resolve(this.twoDataList)
          })
        }
      })
    },
    // 请求第2级数据
    complexUnitPriceThree () {
      if (this.oneDataList[0].unitProjectList) {
        this.oneDataList[0].unitProjectList.map((item, index) => {
          let data = {
            unitProjectId: item.unitProjectId
          }
          api.complexUnitPriceThree(data).then(res => {
            this.threeDataList = res.data
            if (this.threeDataList) {
              this.threeDataList.map((items, indexs) => {
                items.isshow = false
                items.status2 = '+'
              })
            }
            this.oneDataList[0].unitProjectList[index].subdivisionList = this.threeDataList
          })
        })
      }
    },
    // 请求第3级数据
    complexUnitPriceFour (subdivisionId) {
      return new Promise((resolve, relect) => {
        let data = {
          subdivisionId: subdivisionId
        }
        api.complexUnitPriceFour(data).then(res => {
          this.fourDataList = res.data
          resolve(this.fourDataList)
        })
      })
    }
  },
  mounted () {
    this.complexUnitPriceOne().then(res => {
      this.complexUnitPriceTwo().then(res => {
        this.complexUnitPriceThree()
      })
    })
    this.$nextTick(() => {
      let fixed = document.getElementsByClassName('el-table__fixed')[0]
      if (fixed) {
        this.fixedWidth = fixed.style.width
      }
    })
  },
  watch: {
    fixTabs (val) {
      this.headerFixed = val
      if (val) {
        let headerWrapper = document.getElementsByClassName('el-table__fixed-header-wrapper')[0]
        headerWrapper.style.width = this.fixedWidth
      }
    }
  }
}
</script>
<style lang="less" scoped>
.inputBtn {
  width: 12px;
  height: 12px;
  line-height: 12px;
  border: 1px solid #d8e0f5;
  text-align: center;
  margin: 0px 5px 0 0;
  cursor: pointer;
  float: left;
  color: #4474cf;
  background-color: #fff;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  max-height: 30px;
  height: 30px;
  padding: 0 10px;
  line-height: 13px;
}
.col {
  border-bottom: 1px solid #ccc;
  max-height: 30px;
  overflow: hidden;
}
.centers {
  display: table;
  width: 100%;
  text-align: center;
}
.level1 {
  padding-left: 20px;
}
.levelS {
  padding-left: 40px;
}
.levelT {
  padding-left: 60px;
}
</style>

<style lang="less">
.self-tablePrice .el-table .cell {
  line-height: 16px;
  padding: 0;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}
.self-tablePrice .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.self-tablePrice .el-table td,
.el-table th.is-leaf {
  // border-bottom: none;
}
.self-tablePrice .el-table td {
  padding: 0;
}
</style>
<style scoped>
.self-tablePrice >>> .el-table th {
  background: #fafafb;
  color: #888;
  font-size: 12px;
  height: 30px;
  padding: 0;
  font-weight: bold;
}
.self-tablePrice >>> .el-table thead.is-group th {
  background: #fafafb;
  font-size: 12px;
  color: #666;
}
.self-tablePrice >>> .el-table__row td {
  padding: 0;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
}
.self-tablePrice >>> .el-table__row.hover-row:hover td {
  background: #fff !important;
}
.self-tablePrice >>> .hover-row > td {
  background: #fff !important;
}
.self-tablePrice >>> .el-table th.gutter {
  display: table-cell !important;
}
</style>
<style lang="less">
.fixedHeader .el-table__fixed-header-wrapper  {
  position: fixed;
  top: 120px;
  left: 1.04%; // 根据外边距算的
  z-index: 10;
  overflow: hidden;
}
</style>
