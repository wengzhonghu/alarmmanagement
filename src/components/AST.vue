<template>
    <div>
        <el-row>
            <el-col :span="24">
                 <span>选择Area</span>
                 <el-select v-model="value" @change="onSelectAreaChange" placeholder="请选择" style="margin-left:10px;">
                    <el-option
                    v-for="item in areas"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-table border :data="currentASTList" highlight-current-row @current-change="onSelectASTChange"  height="200px">
                <el-table-column property="displayName" label="名称"></el-table-column>
                <el-table-column property="desc" label="描述"></el-table-column>
            </el-table>
        </el-row>
        <el-row>
             <el-col :span="24">
                 <span>AST细节</span>
                 <el-button @click="showASTDialog" type="primary" size="small">查看AST</el-button> 
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                 <el-table border :data="currentASTDetailsList" highlight-current-row @current-change="onSelectASTDetailChange"  height="400px">
                    <el-table-column property="tagName" label="名称"></el-table-column>
                    <el-table-column property="desc" label="描述"></el-table-column>
                    <el-table-column property="sh" label="SH"></el-table-column>
                    <el-table-column property="sl" label="SL"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="130">
                        <template slot-scope="scope">
                            <el-button @click="editASTDetail(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="viewASTDetail(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="90%" :modal="true">
          <ASTDetailEditor ref="astEditor" />
          <span slot="footer"></span>
        </el-dialog>
    </div>
</template>

<script>
import ASTDetailEditor from '@/components/ASTEditor'

export default {
    name:'AST',
    data() {
        return {
        dialogTitle:'AST编辑器',
        dialogVisible:false,
        areas: [{
          id : 1,
          value: '黄金糕',
          label: '黄金糕'
        }, {
          id : 2,
          value: '双皮奶',
          label: '双皮奶'
        }, {
          id : 3,
          value: '北茎尻鸭',
          label: '北茎尻鸭'
        }],
        value: '',
        currentASTList:[

        ],
        currentASTDetailsList:[

        ],
        astList:[
            {id:1,displayName:'U2620 Green Coke Sampling System',desc:'Green Coke Sampling System',areaid:3},
            {id:2,displayName:'U2621 SEMIPORTAL RECLAIMER A',desc:'SEMIPORTAL RECLAIMER A',areaid:3},
            {id:3,displayName:'U2621 SEMIPORTAL RECLAIMER B',desc:'SEMIPORTAL RECLAIMER B',areaid:3},
        ],
        astDetailsList:[
            {id:1,tagName:'AT-U2620',desc:'Green Coke Sampling System',sh:90,sl:10,astId:1},
            {id:2,tagName:'AT-U2621',desc:'SEMIPORTAL RECLAIMER A',sh:70,sl:25,astId:1},
            {id:3,tagName:'AT-U2622',desc:'SEMIPORTAL RECLAIMER B',sh:100,sl:0,astId:1},
        ]
      }
    },
    components:{
      ASTDetailEditor
    },
    methods:{
        onSelectAreaChange(val) {
            console.log('selected value '+ val);
            this.currentASTList = this.astList.filter(o=>  o.areaid == val );
        },
        onSelectASTChange(val) {
            console.log(val);
            var astid = val.id;
            this.currentASTDetailsList = this.astDetailsList.filter(o=>o.astId == astid);
        },
        onSelectASTDetailChange(val) {

        },
        editASTDetail(row) {

          
        },
        viewASTDetail(row) {

        },
        showASTDialog(){
          this.dialogVisible = true;
          this.$nextTick(()=>{
            this.$refs["astEditor"].clearFields();
          });          
        }
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>