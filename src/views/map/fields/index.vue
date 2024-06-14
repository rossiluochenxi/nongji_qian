<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="电子围栏" prop="fieldsName">
        <el-input
          v-model="queryParams.fieldsName"
          placeholder="请输入围栏名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="面积" prop="fieldsArea">
        <el-input
          v-model="queryParams.fieldsArea"
          placeholder="请输入面积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="地图面积" prop="mapInfo">
        <el-input
          v-model="queryParams.mapInfo"
          placeholder="请输入地图面积信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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
          v-hasPermi="['map:fields:add']"
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
          v-hasPermi="['map:fields:edit']"
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
          v-hasPermi="['map:fields:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['map:fields:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fieldsList" @selection-change="handleSelectionChange"
    border resizable
     auto-resize="true" >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="电子围栏名称" align="center" prop="fieldsName" />
      <!-- <el-table-column label="耕地类别" align="center" prop="agriTypeCategory" /> -->
        <el-table-column label="类别" align="center" prop="agriTypeCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agri_type_category" :value="scope.row.agriTypeCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="agriTypeType" />
      <el-table-column label="面积" align="center" prop="fieldsArea" />
      <el-table-column label="地图信息" align="center" prop="mapInfo" />
      <!-- <el-table-column label="状态" align="center" prop="status" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-location-information"
            @click="getMap(scope.row)"
            v-hasPermi="['map:fields:edit']"
          >查看地图</el-button>

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

    <!-- 添加或修改任务耕地信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="围栏名称" prop="fieldsName">
          <el-input v-model="form.fieldsName" placeholder="请输入面积名字" />
        </el-form-item>
        <el-form-item label="围栏面积" prop="fieldsArea">
          <el-input v-model="form.fieldsArea" placeholder="请输入面积" />
        </el-form-item>
   
       <el-form-item label="耕作类型" prop="agriTypeType">
           <el-select v-model="form.agriTypeType" filterable placeholder="请选择" @change="setId" style="width: 100%;" >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.type"
              :value="item.type">
            </el-option>
          </el-select>

      </el-form-item>

<el-form-item label="耕作类别" prop="agriTypeCategory" >
    <el-select v-model="form.agriTypeCategory" :disabled="form.agriTypeType !== ''" placeholder="请选择耕作类别" style="display: block" >
        <el-option
            v-for="option in dict.type.agri_type_category"
            :key="option.value"
            :label="option.label"
            :value="option.value"
        ></el-option>
    </el-select>
</el-form-item>
      <el-form-item label="地图信息" prop="mapInfo">
          <el-input v-model="form.mapInfo" placeholder="请输入地图面积信息" />
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
import { listFields, getFields, delFields, addFields, updateFields } from "@/api/map/fields";
import { listType } from "@/api/agri/type";


export default {
  name: "Fields",
    dicts: ['agri_type_category'],
  data() {
    return {
      //类型list集合
      typeList: [],
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
      // 任务耕地信息表格数据
      fieldsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fieldsName: null,
        agriTypeCategory: null,
        agriTypeType: null,
        fieldsArea: null,
        mapInfo: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fieldsName: [
          { required: true, message: "面积名字不能为空", trigger: "blur" }
        ],
        agriTypeId: [
          { required: true, message: "耕地类型id不能为空", trigger: "blur" }
        ],
        agriTypeCategory: [
          { required: true, message: "耕地类别不能为空", trigger: "change" }
        ],
        agriTypeType: [
          { required: true, message: "耕地类型不能为空", trigger: "change" }
        ],
        fieldsArea: [
          { required: true, message: "面积不能为空", trigger: "blur" }
        ],
        mapInfo: [
          { required: true, message: "地图面积信息不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getType();
  },
  methods: {
    /** 查询任务耕地信息列表 */
    getList() {
      this.loading = true;
      listFields(this.queryParams).then(response => {
        this.fieldsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
        /**
          * 获取地图作业类型
          */
        getType(){
        listType().then( res => {
            if( res.code != 200){ return this.message("系统错误,请重新查询") }
          this.typeList = res.rows
          console.log(this.typeList+"============"+ res.rows);
              }
              )
    },
    // 取消按钮
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
        fieldsName: null,
        agriTypeId: null,
        agriTypeCategory: null,
        agriTypeType: null,
        fieldsArea: null,
        mapInfo: null,
        status: null
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
      this.title = "添加任务耕地信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFields(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改任务耕地信息";
      });
    },

        /** 地图按钮 */
/** 地图按钮 */
getMap(row) {
  console.log("Row ID:", row.id);
  this.reset();
  this.$router.push({ path: `/map/fie-lds/get-map/${row.id}` });
  console.log("Router Path:", `/map/fie-lds/get-map/${row.id}`);
},

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFields(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFields(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除任务耕地信息编号为"' + ids + '"的数据项？').then(function() {
        return delFields(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('map/fields/export', {
        ...this.queryParams
      }, `fields_${new Date().getTime()}.xlsx`)
    },
      setId() {
        // 获取选中的用户对象
        const selectedType = this.typeList.find(item => item.type === this.form.agriTypeType);
        // 将选中用户的id和种类赋值给对象
        if (selectedType) {
            this.form.agriTypeId = selectedType.id;
            this.$set(this.form, 'agriTypeCategory', selectedType.category); // 使用this.$set()确保Vue.js检测到属性变化
        } else {
            this.form.agriTypeId = null;
            this.$set(this.form, 'agriTypeCategory', '');
        }
        console.log("Agri Type ID: " + this.form.agriTypeId);
        console.log("Agri Type Category: " + this.form.agriTypeCategory);
    }
  }
};
</script>
