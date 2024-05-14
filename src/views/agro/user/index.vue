<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="证件号码" prop="identity">
        <el-input
          v-model="queryParams.identity"
          placeholder="请输入证件号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.agro_farmers_user_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地区" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入地区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="站点" prop="station">
        <el-input
          v-model="queryParams.station"
          placeholder="请输入站点"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="负责人" prop="manager">
        <el-input
          v-model="queryParams.manager"
          placeholder="请输入负责人"
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['agro:user:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['agro:user:edit']"
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
          v-hasPermi="['agro:user:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['agro:user:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange"
      border resizable  
     auto-resize="true" >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="自动编号" align="center" prop="id" /> -->
      <el-table-column label="姓名" align="center" prop="name" />
      <el-table-column label="手机" align="center" prop="phone" />
      <el-table-column label="证件号码" align="center" prop="identity" />
      <el-table-column label="状态" align="center" prop="state">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agro_farmers_user_status" :value="scope.row.state"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="地区" align="center" prop="areaName" />
      <el-table-column label="站点" align="center" prop="station" />
      <el-table-column label="负责人" align="center" prop="manager" />

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['agro:user:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['agro:user:remove']"
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

    <!-- 添加或修改养殖户管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px ">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="身份证" prop="identity">
          <el-input v-model="form.identity" placeholder="请输入证件号码" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态" style="display: block;">
            <el-option
              v-for="dict in dict.type.agro_farmers_user_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="地区" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入地区" />
        </el-form-item> -->

    <!-- <div style="margin-left: 80px;  margin-top: -10px; margin-bottom: 10px;"> -->
    <el-form-item label="地区" prop="areaName"  >
      <el-cascader :options="options" :props="{ checkStrictly: true, value: 'code', label: 'name' }" ref="cascaderAddr"
      v-model="selectedOptions" @change="handleChange"  style="display: block;">
      <template slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
    </el-form-item>
         <!-- </div> -->
   <el-form-item label="经纬度" prop="lon"  >

 <div class="input-group">
    <el-input placeholder="经度" :size="size" :disabled="inpDisabled" v-model="form.lon" class="input-with-select"></el-input>
    <el-input placeholder="纬度" :size="size" :disabled="inpDisabled" v-model="form.lat" class="input-with-select"></el-input>
    <el-button :disabled="btnDisabled" @click="onClickButton" icon="el-icon-location-information"></el-button>
  </div>
    </el-form-item>

        <el-form-item label="站点" prop="station">
          <el-input v-model="form.station" placeholder="请输入站点" />
        </el-form-item>
        <el-form-item label="负责人" prop="manager">
          <el-input v-model="form.manager" placeholder="请输入负责人" />
        </el-form-item>
                <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
  </el-dialog>



   
   <el-dialog width="630px" height="500px"  title="用户定位" :visible.sync="innerVisible" >
       <div  id="mapDiv" ref="mapDiv" style="width: 600px; height: 500px;" >
        <!-- <div id="coordinates"></div> 显示坐标的元素 -->

        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queding">确 定</el-button>
        <el-button @click="quxiao">取 消</el-button>
       
        </span>
   </el-dialog>



  </div>

  
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/agro/user";
let pcas = require('@/assets/pcas-code.json');

export default {
  name: "User",
  ChinaPcaName: 'ChinaPca',
  dicts: ['agro_farmers_user_status'],
  data() {
    return {
      innerVisible: false,
      // flag: false,
      dizhiMap: '',
      size: '11',
      inpDisabled:false,
      btnDisabled: false,
      // marker: null, // 存储标记对象
      isMarkerAdded: false, // 控制变量，确保标记只添加一次
      // clickedPosition: null, // 存储点击位置的经纬度信息
      mapLoaded: false, // 标志位表示地图是否已加载

     // 地区
      options: pcas,
      selectedOptions: [],
      addrCodes: [],
      addrCodesSelected: [],
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
      // 养殖户管理表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        identity: null,
        state: null,
        station: null,
        manager: null,
        areaName: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        streetId: null,
        lon: null,
        lat: null,
       },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        identity: [
          { required: true, message: "证件号码不能为空", trigger: "blur" }
        ],
         lon: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    // this.initMap();
  },
  //   mounted() {
  //   this.getList();
  // },
  methods: {
    /** 查询养殖户管理列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      //  this.initMap();

    },
     handleChange(thsAreaCode) {
       thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0];
       this.addrCodes = thsAreaCode.path;
       this.addrCodesSelected = thsAreaCode.pathLabels;
       this.form.areaName = this.addrCodesSelected.toString().replace(/,/g, '-');
       this.form.provinceId= this.addrCodes[0];
       this.form.cityId= this.addrCodes[1];
       this.form.areaId= this.addrCodes[2];
       this.form.streetId = this.addrCodes[3];
    },

    
    onClickButton() {
      this.innerVisible = true;
      // this.initMap();
      this.$nextTick(() => {
      this.initMap();
     });

},
    initMap() {
        this.map = new AMap.Map("mapDiv", {
          zoom: 8,
          center: [123.414875, 41.908154],
          resizeEnable: true
        });
        // 添加地图点击事件监听器
        this.map.on('click', (event) => {
          const position = event.lnglat; // 获取点击位置的经纬度信息
          // this.clickedPosition = position; // 更新 clickedPosition 数据

          // 先判断是否已经存在标记
          if (this.currentLocationMarker) {
            this.currentLocationMarker.setMap(null); // 将旧标记从地图上移除
            this.currentLocationMarker = null; // 将标记对象引用设置为null
          }

          // 添加新的标记
          this.currentLocationMarker = new AMap.Marker({
            position: position,
            icon: require('@/assets/images/mark_b.png'),
            offset: new AMap.Pixel(-12, -36), // 图标的偏移量，可以根据实际情况调整
            map: this.map,
            zIndex: 999 // 设置标记的层级，确保位于最上层
          });

          // console.log('点击位置经度：', position.lng);
          // console.log('点击位置纬度：', position.lat);
          this.form.lon = position.lng;
          this.form.lat = position.lat;
          this.isMarkerAdded = true; // 标记已添加
        });
 
},

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },

    // 地图取消按钮
    quxiao() {
      this.innerVisible = false;
      // this.reset();
    },

    queding() { 
      this.innerVisible = false;
      //  this.reset();
    },

    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        meterinformation: null,
        phone: null,
        identity: null,
        state: null,
        remark: null,
        guid: null,
        areaName: null,
        lon: null,
        lat: null,
        sysUserId: null,
        sysUserName: null,
        station: null,
        manager: null,
        areaId: null,
        cityId: null,
        provinceId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.title = "添加养殖户管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUser(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改养殖户管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除养殖户管理编号为"' + ids + '"的数据项？').then(function() {
        return delUser(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('agro/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>

<style scoped>
.input-group {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

/* .mapDiv { */
  /* width: 100%;
  padding-top: 100%; 
  height: 0; 
  position: relative;  */
  /* width: 100%;
 height: 100%; */
/* } */
</style>
