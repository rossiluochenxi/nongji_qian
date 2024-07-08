<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务名称" prop="bizTasksName">
        <el-input
          v-model="queryParams.bizTasksName"
          placeholder="请输入任务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="农机主" prop="agriFarmerName">
        <el-input
          v-model="queryParams.agriFarmerName"
          placeholder="请输入农机主"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="面积名字" prop="agriFieldsName">
        <el-input
          v-model="queryParams.agriFieldsName"
          placeholder="请输入面积名字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务开始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择任务开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择任务结束时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="任务状态" prop="tasksStatus">
        <el-select v-model="queryParams.tasksStatus" placeholder="请选择任务状态" clearable>
          <el-option
            v-for="dict in dict.type.tasks_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="任务流水号" prop="serialNum">
        <el-input
          v-model="queryParams.serialNum"
          placeholder="请输入任务流水号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务名称" prop="bizName">
        <el-input
          v-model="queryParams.bizName"
          placeholder="请输入任务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="耕地类别" prop="agriTypeCategory">
        <el-input
          v-model="queryParams.agriTypeCategory"
          placeholder="请输入耕地类别"
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
        <!-- <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['biz:tasksAssignments:add']"
        >新增</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <!-- <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['biz:tasksAssignments:edit']"
        >修改</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <!-- <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['biz:tasksAssignments:remove']"
        >删除</el-button> -->
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['biz:tasksAssignments:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tasksAssignmentsList" @selection-change="handleSelectionChange"
      border resizable>
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="任务名称" align="center" prop="bizTasksName" />
            <el-table-column label="任务状态" align="center" prop="tasksStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.tasks_status" :value="scope.row.tasksStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="农机主" align="center" prop="agriFarmerName" />
      <el-table-column label="电子围栏" align="center" prop="agriFieldsName" />
      <!-- <el-table-column label="任务开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="任务流水号" align="center" prop="serialNum" /> -->
      <!-- <el-table-column label="任务名称" align="center" prop="bizName" /> -->
      <!-- <el-table-column label="耕地类别" align="center" prop="agriTypeCategory" /> -->
               <el-table-column label="类别" align="center" prop="agriTypeCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agri_type_category" :value="scope.row.agriTypeCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="耕地类型" align="center" prop="agriTypeType" />
 
 
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['biz:tasksAssignments:edit']"
          >修改</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['biz:tasksAssignments:remove']"
          >删除</el-button> -->
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

    <!-- 添加或修改我的任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务名称"   prop="bizTasksName">
          <el-input v-model="form.bizTasksName"  disabled="true" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="农机主" prop="agriFarmerName">
          <el-input v-model="form.agriFarmerName"  disabled="true" placeholder="请输入农机主" />
        </el-form-item>
        <el-form-item label="电子围栏" prop="agriFieldsName">
          <el-input v-model="form.agriFieldsName"  disabled="true"  placeholder="请输入面积名字" />
        </el-form-item>
        <!-- <el-form-item label="任务开始时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择任务开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择任务结束时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="任务状态" prop="tasksStatus">
          <el-select v-model="form.tasksStatus" placeholder="请选择任务状态" style="width: 100%;" >
            <el-option
              v-for="dict in dict.type.tasks_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="流水号" prop="serialNum">
          <el-input v-model="form.serialNum" placeholder="请输入任务流水号" />
        </el-form-item> -->
        <!-- <el-form-item label="任务名称" prop="bizName">
          <el-input v-model="form.bizName" placeholder="请输入任务名称" />
        </el-form-item> -->


<el-form-item label="耕作类别" prop="agriTypeCategory" >
    <el-select v-model="form.agriTypeCategory"   :disabled="true" placeholder="请选择耕作类别" style="display: block" >
        <el-option
            v-for="option in dict.type.agri_type_category"
            :key="option.value"
            :label="option.label"
            :value="option.value"
        ></el-option>
    </el-select>
</el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newSubmitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTasksAssignments, getTasksAssignments, delTasksAssignments, addTasksAssignments, updateTasksAssignments,updateTasksData } from "@/api/biz/tasksAssignments";

export default {
   
  name: "TasksAssignments",
  dicts: ['tasks_status','agri_type_category'],
  data() {
    return {
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
      // 我的任务表格数据
      tasksAssignmentsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bizTasksName: null,
        agriFarmerName: null,
        agriFieldsName: null,
        startTime: null,
        endTime: null,
        tasksStatus: null,
        serialNum: null,
        bizName: null,
        agriTypeCategory: null,
        agriTypeType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询我的任务列表 */
    getList() {
      this.loading = true;
      listTasksAssignments(this.queryParams).then(response => {
        this.tasksAssignmentsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
        bizTasksId: null,
        bizTasksName: null,
        agriFarmerId: null,
        agriFarmerName: null,
        agriFieldsId: null,
        agriFieldsName: null,
        startTime: null,
        endTime: null,
        tasksStatus: null,
        serialNum: null,
        bizName: null,
        agriTypeId: null,
        agriTypeCategory: null,
        agriTypeType: null
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
      this.title = "添加我的任务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTasksAssignments(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改我的任务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTasksAssignments(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTasksAssignments(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },


        /** 新提交按钮2 */
    newSubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTasksData(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTasksAssignments(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除我的任务编号为"' + ids + '"的数据项？').then(function() {
        return delTasksAssignments(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('biz/tasksAssignments/export', {
        ...this.queryParams
      }, `tasksAssignments_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
