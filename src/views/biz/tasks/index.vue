<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="农机主" prop="agriFarmerName">
        <el-input
          v-model="queryParams.agriFarmerName"
          placeholder="请输入农机主"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="任务开始时间" prop="startTime">
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
      <el-form-item label="任务名称" prop="bizName">
        <el-input
          v-model="queryParams.bizName"
          placeholder="请输入任务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['biz:tasks:add']"
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
          v-hasPermi="['biz:tasks:edit']"
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
          v-hasPermi="['biz:tasks:remove']"
        >删除</el-button>
      </el-col> -->
             <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['biz:tasks:add']"
        >下发任务</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['biz:tasks:export']"
        >导出</el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tasksList" @selection-change="handleSelectionChange"
         border resizable
     auto-resize="true">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="任务名称" align="center" prop="bizName" />
      <el-table-column label="任务状态" align="center" prop="status" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="农机主" align="center" prop="agriFarmerName" />



      <el-table-column label="电子围栏" align="center" prop="agriFieldsName" />
              <el-table-column label="类别" align="center" prop="agriTypeCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agri_type_category" :value="scope.row.agriTypeCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" prop="agriTypeType" />
      <!-- <el-table-column label="任务开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['biz:tasks:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['biz:tasks:remove']"
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

    <!-- 添加或修改业务任务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
       
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
             <el-form-item label="任务名称" prop="bizName">
          <el-input v-model="form.bizName" placeholder="请输入任务名称" />
        </el-form-item>
        <!-- <el-form-item label="农机主" prop="agriFarmerName">
          <el-input v-model="form.agriFarmerName" placeholder="指派任务农机主" />
        </el-form-item> -->
        
   <el-form-item label="农机主" prop="agriFarmerName"> 
           <el-select v-model="form.agriFarmerName" filterable placeholder="请选择" @change="njId"  style="width: 100%;" >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.nickName">
            </el-option>
          </el-select>

       </el-form-item>
        <!-- <el-form-item label="电子围栏" prop="agriFieldsName">
          <el-input v-model="form.agriFieldsName" placeholder="请选择耕地作业电子围栏" />
        </el-form-item> -->
         <!-- <el-form-item label="任务状态" prop="status">
          <el-input v-model="form.status" placeholder="任务状态" />
        </el-form-item> -->
    

    <el-form-item label="电子围栏" prop="agriFieldsName">
           <el-select v-model="form.agriFieldsName" filterable placeholder="请选择耕地作业电子围栏"  @change="mapId"  style="width: 100%;" >
            <el-option
              v-for="item in fieldsList"
              :key="item.id"
              :label="item.fieldsName"
              :value="item.fieldsName">
            </el-option>
          </el-select>

      </el-form-item>
          
       <el-form-item label="耕作类型" prop="agriTypeType">
           <el-select v-model="form.agriTypeType" filterable placeholder="请选择耕作类型" @change="setId" style="width: 100%;" >
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
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTasks, getTasks, delTasks, addTasks, updateTasks } from "@/api/biz/tasks";
import { listTypeQuery } from "@/api/agri/type";
import { listUserQuery } from "@/api/system/user";
import { listFieldsQuery} from "@/api/map/fields";



export default {
  name: "Tasks",
   dicts: ['agri_type_category'],
  data() {
    return {
       //电子围栏集合
       fieldsList: [],
       //农户list集合
       userList: [],
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
      // 业务任务表格数据
      tasksList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agriFarmerName: null,
        agriFieldsName: null,
        startTime: null,
        endTime: null,
        agriTypeCategory: null,
        agriTypeType: null,
        status: null,
        bizName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
         bizName: [
          { required: true, message: "任务不能为空", trigger: "change" }
        ],
        agriTypeCategory: [
          { required: true, message: "耕地类别不能为空", trigger: "change" }
        ],
        agriTypeType: [
          { required: true, message: "耕地类型不能为空", trigger: "change" }
        ],
        agriFarmerName: [
          { required: true, message: "农机主不能为空", trigger: "change" }
        ],
        agriFieldsName: [
          { required: true, message: "电子围栏不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getType();
    this.getAgriUserList();
    this.getListFieldsQuery();
  },
  methods: {
    /** 查询业务任务列表 */
    getList() {
      this.loading = true;
      listTasks(this.queryParams).then(response => {
        this.tasksList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /**
  * 获取地图作业类型
  */
    getType() {
      listTypeQuery().then(res => {
        if (res.code != 200) { return this.message("系统错误,请重新查询") }
        this.typeList = res.rows
        console.log(this.typeList + "============" + res.rows);
      }
      )
    },
    /**
* 获取农户信息
*/
    getAgriUserList() {
      listUserQuery().then(res => {
        if (res.code != 200) { return this.message("系统错误,请重新查询") }
        this.userList = res.rows
        console.log(this.userList + "============" + res.rows);
      }
      )
    },
    /**
        * 获取电子围栏
        */
    getListFieldsQuery() {
      listFieldsQuery().then(res => {
        if (res.code != 200) { return this.message("系统错误,请重新查询") }
        this.fieldsList = res.rows
        console.log(this.fieldsList + "============" + res.rows);
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
        agriFarmerId: null,
        agriFarmerName: null,
        agriFieldsId: null,
        agriFieldsName: null,
        startTime: null,
        endTime: null,
        status: null,
        serialNum: null,
        bizName: null
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加业务任务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTasks(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改业务任务";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTasks(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTasks(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除业务任务编号为"' + ids + '"的数据项？').then(function () {
        return delTasks(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('biz/tasks/export', {
        ...this.queryParams
      }, `tasks_${new Date().getTime()}.xlsx`)
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
    },

    njId() {
      // 获取选中的用户对象    <el-form-item label="农机主" prop="agriFarmerName"> nickName

      const selectedUser = this.userList.find(item => item.nickName === this.form.agriFarmerName);
      // 将选中用户的id和种类赋值给对象
      this.form.agriFarmerId = selectedUser ? selectedUser.userId : null;
      this.form.userId = selectedUser ? selectedUser.userId : null;
      this.form.deptId = selectedUser ? selectedUser.deptId : null;

       console.log("农机主ID"+this.form.agriFarmerId)
       console.log("userID" + this.form.userId)
       console.log("deptId" + this.form.deptId)
         

    },
    mapId() {
      // 获取选中的用户对象
      const selectedMap = this.fieldsList.find(item => item.fieldsName === this.form.agriFieldsName);
      // 将选中用户的id和种类赋值给对象
       this.form.agriFieldsId = selectedMap ? selectedMap.id : null;
       console.log("地图信息id"+this.form.agriFieldsId)

    }
  }
};
</script>
