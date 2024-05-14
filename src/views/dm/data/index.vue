<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="养殖户" prop="agroUserName">
        <el-input
          v-model="queryParams.agroUserName"
          placeholder="请输入养殖户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="牲畜档案id" prop="agroLivestockId">
        <el-input
          v-model="queryParams.agroLivestockId"
          placeholder="请输入牲畜档案id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="耳标" prop="agroLivestockCode">
        <el-input
          v-model="queryParams.agroLivestockCode"
          placeholder="请输入耳标"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备编号" prop="agroLivestockIccid">
        <el-input
          v-model="queryParams.agroLivestockIccid"
          placeholder="请输入设备编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="项圈编号" prop="agroLivestockXqiccid">
        <el-input
          v-model="queryParams.agroLivestockXqiccid"
          placeholder="请输入项圈编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="温度" prop="temperature">
        <el-input
          v-model="queryParams.temperature"
          placeholder="请输入温度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="步数" prop="step">
        <el-input
          v-model="queryParams.step"
          placeholder="请输入步数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="体重" prop="weight">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入体重"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="牲畜所在经度" prop="livestockLon">
        <el-input
          v-model="queryParams.livestockLon"
          placeholder="请输入牲畜所在经度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="牲畜所在纬度" prop="livestockLat">
        <el-input
          v-model="queryParams.livestockLat"
          placeholder="请输入牲畜所在纬度"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="rsrq" prop="rsrq">
        <el-input
          v-model="queryParams.rsrq"
          placeholder="请输入rsrq"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ecl" prop="ecl">
        <el-input
          v-model="queryParams.ecl"
          placeholder="请输入ecl"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="cellid" prop="cellid">
        <el-input
          v-model="queryParams.cellid"
          placeholder="请输入cellid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="snr" prop="snr">
        <el-input
          v-model="queryParams.snr"
          placeholder="请输入snr"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsrp" prop="rsrp">
        <el-input
          v-model="queryParams.rsrp"
          placeholder="请输入rsrp"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="pci" prop="pci">
        <el-input
          v-model="queryParams.pci"
          placeholder="请输入pci"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="上传时间" prop="date">
        <el-date-picker clearable
          v-model="queryParams.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择上传时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8"> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dm:data:add']"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dm:data:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dm:data:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dm:data:export']"
        >导出</el-button>
      </el-col> -->
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    <!-- </el-row> -->

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange"
    border resizable
     auto-resize="true" >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      <el-table-column label="养殖户" align="center" prop="agroUserName" />
      <el-table-column label="耳标" align="center" prop="agroLivestockCode" />
      <el-table-column label="设备编号" align="center" prop="agroLivestockIccid" />
      <el-table-column label="项圈编号" align="center" prop="agroLivestockXqiccid" />
      <el-table-column label="设备类型" align="center" prop="deviceType" />
      <el-table-column label="温度" align="center" prop="temperature">
  <template slot-scope="scope">
    <span :style="{ color: getTemperatureColor(scope.row.temperature) }">{{ scope.row.temperature }}</span>
  </template>
</el-table-column>      <el-table-column label="步数" align="center" prop="step" />
      <el-table-column label="体重" align="center" prop="weight" />
      <el-table-column label="电量" align="center" prop="drycell" />
   <!-- <el-table-column label="牲畜所在经度" align="center" prop="livestockLon" />
      <el-table-column label="牲畜所在纬度" align="center" prop="livestockLat" /> -->
      <!-- <el-table-column label="rsrq" align="center" prop="rsrq" />
      <el-table-column label="ecl" align="center" prop="ecl" />
      <el-table-column label="cellid" align="center" prop="cellid" />
      <el-table-column label="snr" align="center" prop="snr" />
      <el-table-column label="rsrp" align="center" prop="rsrp" />
      <el-table-column label="pci" align="center" prop="pci" /> -->
      <el-table-column label="上传时间" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['dm:data:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dm:data:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改全部数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="耳标" prop="agroLivestockCode">
          <el-input v-model="form.agroLivestockCode" placeholder="请输入耳标" />
        </el-form-item>
        <el-form-item label="设备编号" prop="agroLivestockIccid">
          <el-input v-model="form.agroLivestockIccid" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="项圈编号" prop="agroLivestockXqiccid">
          <el-input v-model="form.agroLivestockXqiccid" placeholder="请输入项圈编号" />
        </el-form-item>
        <el-form-item label="温度" prop="temperature">
          <el-input v-model="form.temperature" placeholder="请输入温度" />
        </el-form-item>
        <el-form-item label="步数" prop="step">
          <el-input v-model="form.step" placeholder="请输入步数" />
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入体重" />
        </el-form-item>
        <el-form-item label="牲畜所在经度" prop="livestockLon">
          <el-input v-model="form.livestockLon" placeholder="请输入牲畜所在经度" />
        </el-form-item>
        <el-form-item label="牲畜所在纬度" prop="livestockLat">
          <el-input v-model="form.livestockLat" placeholder="请输入牲畜所在纬度" />
        </el-form-item>
        <el-form-item label="rsrq" prop="rsrq">
          <el-input v-model="form.rsrq" placeholder="请输入rsrq" />
        </el-form-item>
        <el-form-item label="ecl" prop="ecl">
          <el-input v-model="form.ecl" placeholder="请输入ecl" />
        </el-form-item>
        <el-form-item label="cellid" prop="cellid">
          <el-input v-model="form.cellid" placeholder="请输入cellid" />
        </el-form-item>
        <el-form-item label="snr" prop="snr">
          <el-input v-model="form.snr" placeholder="请输入snr" />
        </el-form-item>
        <el-form-item label="rsrp" prop="rsrp">
          <el-input v-model="form.rsrp" placeholder="请输入rsrp" />
        </el-form-item>
        <el-form-item label="pci" prop="pci">
          <el-input v-model="form.pci" placeholder="请输入pci" />
        </el-form-item>
        <el-form-item label="上传时间" prop="date">
          <el-date-picker clearable
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择上传时间">
          </el-date-picker>
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
import { listData, getData, delData, addData, updateData } from "@/api/dm/data";

export default {
  name: "Data",
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
      // 全部数据表格数据
      dataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agroUserName: null,
        agroLivestockId: null,
        agroLivestockCode: null,
        agroLivestockIccid: null,
        agroLivestockXqiccid: null,
        deviceType: null,
        drycell: null,
        temperature: null,
        step: null,
        weight: null,
        livestockLon: null,
        livestockLat: null,
        rsrq: null,
        ecl: null,
        cellid: null,
        snr: null,
        rsrp: null,
        pci: null,
        date: null
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
    /** 查询全部数据列表 */
    getList() {
      this.loading = true;
      listData(this.queryParams).then(response => {
        this.dataList = response.rows;
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
        agroUserId: null,
        agroUserName: null,
        agroLivestockId: null,
        agroLivestockCode: null,
        agroLivestockIccid: null,
        agroLivestockXqiccid: null,
        imei: null,
        deviceId: null,
        temperature: null,
        step: null,
        weight: null,
        livestockLon: null,
        livestockLat: null,
        rsrq: null,
        ecl: null,
        cellid: null,
        snr: null,
        rsrp: null,
        pci: null,
        date: null
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
      this.title = "添加全部数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getData(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改全部数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateData(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addData(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除全部数据编号为"' + ids + '"的数据项？').then(function() {
        return delData(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dm/data/export', {
        ...this.queryParams
      }, `data_${new Date().getTime()}.xlsx`)
    },
    //颜色
     getTemperatureColor(temperature) {
     var lowerLimit = 38.5;
     var upperLimit = 39.5;

    if (temperature < lowerLimit || temperature > upperLimit) {
        return 'red'; // 超出正常范围，显示红色
    } else {
        return 'green'; // 正常范围，显示绿色
    }
  }
  }
};
</script>
