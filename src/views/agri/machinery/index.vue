<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="主机号" prop="hostNum">
        <el-input
          v-model="queryParams.hostNum"
          placeholder="请输入主机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <!-- <el-form-item label="农机长度" prop="machineryLength">
        <el-input
          v-model="queryParams.machineryLength"
          placeholder="请输入农机长度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
    

<el-form-item label="农机类型" prop="machineryType">
           <el-select v-model="queryParams.machineryType" filterable placeholder="请选择农机类型"   style="width: 100%;" >
            <el-option
              v-for="item in machineryTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.typeName"
              >
            
            </el-option>
          </el-select>
       </el-form-item>
      
       <el-form-item label="所属农机主" prop="userMachineryName" label-width="83px">
           <el-select v-model="queryParams.userMachineryName" filterable placeholder="请选择所属农机主"   style="width: 100%;" >
            <el-option
              v-for="item in nickNameList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.nickName">
            </el-option>
          </el-select>
       </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['agri:machinery:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['agri:machinery:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['agri:machinery:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['agri:machinery:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="machineryList" @selection-change="handleSelectionChange"
       border resizable
     auto-resize="true">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="所属农机主" align="center" prop="userMachineryName" />
      <el-table-column label="农机名称" align="center" prop="name" />
      <!-- <el-table-column label="主机号" align="center" prop="hostNum" /> -->
      <el-table-column label="农机类型" align="center" prop="machineryType" />
      <!-- <el-table-column label="农机长度" align="center" prop="machineryLength" /> -->
      <el-table-column label="农机宽度" align="center" prop="machineryWidth" />
      <el-table-column label="农机编号" align="center" prop="machineryNo" />
      <el-table-column label="农机品牌" align="center" prop="machineryBrand" />
      <el-table-column label="农机马力" align="center" prop="machineryHp" />
      <!-- <el-table-column label="所属农机主" align="center" prop="userMachineryId" /> -->
      

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['agri:machinery:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['agri:machinery:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改农机管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

       <el-form-item label="农机名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入农机名称" />
        </el-form-item>

        <!-- <el-form-item label="主机号" prop="hostNum">
          <el-input v-model="form.hostNum" placeholder="请输入主机号" />
        </el-form-item> -->
        <!-- <el-form-item label="农机长度" prop="machineryLength">
          <el-input v-model="form.machineryLength" placeholder="请输入农机长度" />
        </el-form-item> -->
        <!-- <el-form-item label="农机长度" prop="machineryLength" :rules="[
    { required: true, message: '请输入农机长度', trigger: 'blur' },
    { validator: validateMachineryLength, message: '农机长度只能为数字', trigger: 'blur' }
  ]">
    <el-input v-model="form.machineryLength" placeholder="请输入农机长度" />
     </el-form-item> -->

      <el-form-item label="农机类型" prop="machineryType">
           <el-select v-model="form.machineryType" filterable placeholder="请选择农机类型"   @change="setmachineryId" style="width: 100%;" >
            <el-option
              v-for="item in machineryTypeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.typeName">
            </el-option>
          </el-select>
       </el-form-item>

       
     
   

        <!-- <el-form-item label="农机类型" prop="machineryType">
          <el-input v-model="form.machineryType" placeholder="请输入农机类型" />
        </el-form-item>  -->




        <el-form-item label="农机宽度" prop="machineryWidth" :rules="[
    { required: true, message: '请输入农机宽度', trigger: 'blur' },
    { validator: validateMachineryWidth, message: '农机宽度只能为数字', trigger: 'blur' }
  ]">
    <el-input v-model="form.machineryWidth" placeholder="请输入农机宽度" />
     </el-form-item>

          <el-form-item label="所属农机主" prop="userMachineryName" label-width="95px">
           <el-select v-model="form.userMachineryName" filterable placeholder="请选择所属农机主"  @change="setuserMachineryId"  style="width: 100%;" >
            <el-option
              v-for="item in nickNameList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.nickName">
            </el-option>
          </el-select>
       </el-form-item>


        <el-form-item label="农机编号" prop="machineryNo">
          <el-input v-model="form.machineryNo" placeholder="请输入农机编号" />
        </el-form-item>



     <el-form-item label="农机马力" prop="machineryHp" :rules="[
   // { required: true, message: '请输入农机马力', trigger: 'blur' },
    { validator: validateMachineryHp, message: '农机马力只能为数字', trigger: 'blur' }
  ]">
    <el-input v-model="form.machineryHp" placeholder="请输入农机马力" />
     </el-form-item>

     <el-form-item label="农机品牌" prop="machineryBrand">
          <el-input v-model="form.machineryBrand" placeholder="请输入农机品牌" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMachinery, getMachinery, delMachinery, addMachinery, updateMachinery } from "@/api/agri/machinery";
import {listMachineryTypeQuery} from "@/api/agri/machineryType";
import {listUserQuery} from "@/api/system/user";
export default {
  name: "Machinery",
  data() {
    return {
     nickNameList:[],
     machineryTypeList:[],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 农机管理表格数据
      machineryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hostNum: null,
        machineryType: null,
        machineryLength: null
      },
      // 表单参数
      form: {
        // machineryLength: ''  // 农机长度字段
      },
      form: {
        machineryHp: ''  // 农机马力字段
      },
      form: {
        machineryWidth: ''  // 农机宽度字段
      },

    // 表单校验
  rules: {
    hostNum: [
          // { required: true, message: "主机号不能为空", trigger: "blur" }
        ],
    machineryLength: [
          // { required: true, message: '农机长度不能为空', trigger: 'blur' },
        ],
    machineryType:     [
          { required: true, message: "农机类型不能为空", trigger: "blur" }
        ],
        machineryNo:     [
          { required: true, message: "农机编号不能为空", trigger: "blur" }
        ],
         userMachineryName:     [
          { required: true, message: "所属农机主不能为空", trigger: "blur" }
        ]



      }


    };
  },
  //沟子函数
  created() {
    this.getList();
    this.getMachineryType();
    this.getNickName();
  },
  methods: {

    // validateMachineryLength(rule, value, callback) {
    //   const reg = /^\d+(\.\d+)?$/; // 正则表达式，用于匹配数字
    //   if (value && !reg.test(value)) {
    //     callback(new Error('农机长度只能为数字'));
    //   } else {
    //     callback();
    //   }
    // },
    validateMachineryWidth(rule, value, callback) {
      const reg = /^\d+(\.\d+)?$/; // 正则表达式，用于匹配数字
      if (value && !reg.test(value)) {
        callback(new Error('农机宽度只能为数字'));
      } else {
        callback();
      }
    },
    validateMachineryHp(rule, value, callback) {
      const reg = /^\d+(\.\d+)?$/; // 正则表达式，用于匹配数字
      if (value && !reg.test(value)) {
        callback(new Error('农机马力只能为数字'));
      } else {
        callback();
      }
    },
    /** 查询农机管理列表 */
    getList() {
      this.loading = true;
      listMachinery(this.queryParams).then(response => {
        this.machineryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
     //获取类型
     getMachineryType() {
      listMachineryTypeQuery(this.queryParams).then(response => {
        this.machineryTypeList = response.rows;
      });
    },
         //获取类型
     getNickName() {
      listUserQuery(this.queryParams).then(response => {
        this.nickNameList = response.rows;
      });
    },
    //取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        userId: null,
        deptId: null,
        name: null,
        hostNum: null,
        tasksStatus: null,
        tasksId: null,
        machineryType: null,
        machineryLength: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加农机管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMachinery(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改农机管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMachinery(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMachinery(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除农机管理编号为"' + ids + '"的数据项？').then(function() {
        return delMachinery(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('agri/machinery/export', {
        ...this.queryParamslistmachineryTypeQuery
      }, `machinery_${new Date().getTime()}.xlsx`)
    },  
     setmachineryId() {
      // 获取选中的用户对象
      const selectedmachineryId = this.machineryTypeList.find(item => item.typeName === this.form.machineryType);
      // 将选中用户的id和种类赋值给对象
       this.form.machineryTypeId = selectedmachineryId ? selectedmachineryId.id : null;
       console.log("查看农机类型id"+this.form.machineryTypeId)
      },
       setuserMachineryId() {
      // 获取选中的用户对象
      const selecteduserMachineryId = this.nickNameList.find(item => item.nickName === this.form.userMachineryName);
      // 将选中用户的id和种类赋值给对象
       this.form.userMachineryId = selecteduserMachineryId ? selecteduserMachineryId.userId : null;
       console.log("查看农机主ID"+this.form.userMachineryId)
      }
  }
};
</script>
