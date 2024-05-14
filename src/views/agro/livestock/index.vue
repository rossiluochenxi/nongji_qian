<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

   <!--    @keyup.enter.native="handleQuery" -->
      <el-form-item label="养殖户" prop="agroUserName">
        <el-select v-model="queryParams.agroUserName" placeholder="请输入养殖户" clearable>
          <el-option
            v-for="item in userList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>


      <el-form-item label="原始耳标" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入原始耳标"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="设备编号" prop="iccid">
        <el-input
          v-model="queryParams.iccid"
          placeholder="请输入设备编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="项圈编号" prop="xqIccid">
        <el-input
          v-model="queryParams.xqIccid"
          placeholder="请输入项圈编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <el-form-item label="牲畜类型" prop="livestockType">
        <el-select v-model="queryParams.livestockType" placeholder="请选择牲畜类型" clearable>
          <el-option
            v-for="item in livestockTypeList"
            :key="item.livestockType"
            :label="item.livestockType"
            :value="item.livestockType"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="牲畜品种" prop="livestockVarieties">
        <el-select v-model="queryParams.livestockVarieties" placeholder="请选择牲畜品种" clearable>
          <el-option
            v-for="item in livestockVarietiesList"
            :key="item.livestockVarieties"
            :label="item.livestockVarieties"
            :value="item.livestockVarieties"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="预计出栏" prop="outDate">
        <el-date-picker clearable
          v-model="queryParams.outDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择预计出栏日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker clearable
          v-model="queryParams.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择出生日期">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="是否投保" prop="isInsure">
        <el-select v-model="queryParams.isInsure" placeholder="请选择是否投保" clearable>
          <el-option
            v-for="dict in dict.type.agro_is_insure"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="站点" prop="station">
        <el-input
          v-model="queryParams.station"
          placeholder="请输入站点"
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
          v-hasPermi="['agro:livestock:add']"
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
          v-hasPermi="['agro:livestock:edit']"
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
          v-hasPermi="['agro:livestock:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['agro:livestock:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="livestockList" 
     @selection-change="handleSelectionChange"
     border resizable  
     auto-resize="true" 
     >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="主键id" align="center" prop="id" /> -->
      <el-table-column label="养殖户" align="center" prop="agroUserName"  />
      <el-table-column label="原始耳标" align="center" prop="code"/>
         <el-table-column label="设备类型" align="center" prop="deviceType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.device_type" :value="scope.row.deviceType"/>
        </template>
      </el-table-column>
      <el-table-column label="设备编号" align="center" prop="iccid" />
      <!-- <el-table-column label="项圈编号" align="center" prop="xqIccid" :width="flexColumnWidth('项圈编号','xqIccid')"/> -->
      <el-table-column label="牲畜类型" align="center" prop="livestockType" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agro_livestock_type" :value="scope.row.livestockType"/>
        </template>
      </el-table-column>
      <el-table-column label="牲畜品种" align="center" prop="livestockVarieties">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agro_livestock_varieties" :value="scope.row.livestockVarieties"/>
        </template>
      </el-table-column>
      <el-table-column label="预计出栏" align="center" prop="outDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" prop="birthday" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="贷款日期" align="center" prop="loanDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loanDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款金额" align="center" prop="loanMoney" />
      <el-table-column label="是否投保" align="center" prop="isInsure">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.agro_is_insure" :value="scope.row.isInsure"/>
        </template>
      </el-table-column> -->
      



      <el-table-column label="站点" align="center" prop="station" />


        <!-- <el-table-column label="照片" align="center" prop="image" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.image" :width="50" :height="50"/>
        </template>
      </el-table-column> -->
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['agro:livestock:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['agro:livestock:remove']"
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

    <!-- 添加或修改牲畜档案管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="养殖户" prop="agroUserName">
           <el-select v-model="form.agroUserName" filterable placeholder="请选择" @change="setId" style="width: 100%;" >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>

      </el-form-item>
    
       <!-- <el-form-item label="养殖户" prop="agroUserName" v-else>
         <el-input v-model="form.agroUserName" placeholder="请输入养殖户" :disabled="true"  /> -->
         <!-- {{ initializeUserData()}} -->
       <!-- </el-form-item>  -->

        <el-form-item label="原始耳标" prop="code">
          <el-input v-model="form.code" placeholder="请输入原始耳标" />
        </el-form-item>

         <el-form-item label="设备类型" prop="deviceType">
          <el-select v-model="form.deviceType" placeholder="请选择设备类型" style="display: block;">
            <el-option
              v-for="dict in dict.type.device_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
   <el-form-item label="经纬度"   prop="elLon" v-if="form.deviceType === 'el'">

 <div class="input-group" style="display: flex;">
    <el-input placeholder="经度" :size="size" :disabled="inpDisabled" v-model="form.elLon" class="input-with-select"></el-input>
    <el-input placeholder="纬度" :size="size" :disabled="inpDisabled" v-model="form.elLab" class="input-with-select"></el-input>
    <el-button :disabled="btnDisabled" @click="onClickButton" icon="el-icon-location-information"></el-button>
  </div>
    </el-form-item>  

        <el-form-item label="设备编号" prop="iccid">
          <el-input v-model="form.iccid" placeholder="请输入设备编号" />
        </el-form-item>
        <!-- <el-form-item label="项圈编号" prop="xqIccid">
          <el-input v-model="form.xqIccid" placeholder="请输入项圈编号" />
        </el-form-item> -->
        <el-form-item label="牲畜类型" prop="livestockType">
          <el-select v-model="form.livestockType" placeholder="请选择牲畜类型" @change="setLivestockTypeId" style="display: block">
            <el-option
              v-for="item in livestockTypeList"
              :key="item.livestockType"
              :label="item.livestockType"
              :value="item.livestockType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="牲畜品种" prop="livestockVarieties">
          <el-select v-model="form.livestockVarieties" placeholder="请选择牲畜品种" @change="setLivestockVarietiesId" style="display: block;">
            <el-option
              v-for="item in livestockVarietiesList"
              :key="item.livestockVarieties"
              :label="item.livestockVarieties"
              :value="item.livestockVarieties"
            ></el-option>
          </el-select>
        </el-form-item>



  
        <el-form-item label="预计出栏" prop="outDate" >
          <el-date-picker clearable
            v-model="form.outDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预计出栏日期"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item >

        
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker clearable
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出生日期"   style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="贷款日期" prop="loanDate">
          <el-date-picker clearable
            v-model="form.loanDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择贷款日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="贷款金额" prop="loanMoney">
          <el-input v-model="form.loanMoney" placeholder="请输入贷款金额" />
        </el-form-item>
        <el-form-item label="是否投保" prop="isInsure">
          <el-radio-group v-model="form.isInsure">
            <el-radio
              v-for="dict in dict.type.agro_is_insure"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="站点" prop="station">
          <el-input v-model="form.station" placeholder="请输入站点" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <!-- <el-form-item label="照片" prop="image">
          <image-upload v-model="form.image"/>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
       <el-dialog width="630px" height="500px"  title="耳标定位" :visible.sync="innerVisible" >
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
import { listLivestock, getLivestock, delLivestock, addLivestock, updateLivestock } from "@/api/agro/livestock";
import { listUser} from "@/api/agro/user";
import { listLivestockType} from "@/api/agro/livestockType";
import { listLivestockVarieties} from "@/api/agro/livestockVarieties";

export default {
  name: "Livestock",
  dicts: ['agro_livestock_varieties', 'agro_livestock_type', 'agro_is_insure','device_type'],
  data() {
    return {

   //地图
      dizhiMap: '',
       innerVisible: false,
      size: '11',
      inpDisabled:false,
      btnDisabled: false,
      // marker: null, // 存储标记对象
      isMarkerAdded: false, // 控制变量，确保标记只添加一次
      // clickedPosition: null, // 存储点击位置的经纬度信息
      mapLoaded: false, // 标志位表示地图是否已加载
      //用户经纬度圆心坐标
      zbLon: null,
      zbLat: null,


      //牲畜品种集合
      livestockVarietiesList: [],
      userPostType: '',
      
      //牲畜类型集合
      livestockTypeList:[],
      userList: [],
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
      // 牲畜档案管理表格数据
      livestockList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      areaName: null,
      showElLon : false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agroUserName: null,
        code: null,
        iccid: null,
        xqIccid: null,
        livestockType: null,
        livestockVarieties: null,
        outDate: null,
        birthday: null,
        isInsure: null,
        station: null,
        deviceType: null,
        elLon: null,
        elLab: null,
        livestockVarietiesId: null,
        livestockTypeId: null,  
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        agroUserName: [
          { required: true, message: "养殖户不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "原始耳标不能为空", trigger: "blur" }
        ],
        iccid: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        livestockType: [
          { required: true, message: "牲畜类型不能为空", trigger: "change" }
        ],
        livestockVarieties: [
          { required: true, message: "牲畜品种不能为空", trigger: "change" }
        ],
          deviceType: [
          { required: true, message: "设备类型不能为空", trigger: "change" }
        ],
           elLon: [
          { required: true, message: "经纬度不能为空", trigger: "change" }
        ],
       
      
      }
    };
  },


  created() {
       // 获取当前用户信息
    // this.userPostType = this.$store.state.user.roles[0];
    // this.$set(this.form, 'deviceType','el');
    this.getList();
    this.getUserList();
    this.getlivestockTypeList();
    this.getlivestockVarietiesList();
  //  if (this.userPostType === 'common') {
  //     this.initializeUserData();
  //     console.log("调用了吗");
  //     }
  },

  methods: {
    /** 查询牲畜档案管理列表 */
    getList() {
      this.loading = true;
      listLivestock(this.queryParams).then(response => {
        this.livestockList = response.rows;
        this.total = response.total;
        this.loading = false;

      });  

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
          // center: [parseFloat(this.zbLon), parseFloat(this.zbLat)], // 圆心坐标
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
          this.$set(this.form, 'elLon', position.lng);
          this.$set(this.form, 'elLab', position.lat);
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
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        agroUserId: null,
        agroUserName: null,
        code: null,
        iccid: null,
        xqIccid: null,
        livestockType: null,
        livestockVarieties: null,
        outDate: null,
        birthday: null,
        loanDate: null,
        loanMoney: null,
        isInsure: null,
        station: null,
        remark: null,
        image: null
      };
      this.resetForm("form");
    },
    //  initializeUserData() {
    //    this.form.agroUserName = this.$store.state.user.name;
    //    this.form.agroUserId = this.$store.state.user.id;

    // },
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
      this.title = "添加牲畜档案管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLivestock(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改牲畜档案管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLivestock(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLivestock(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除牲畜档案管理编号为"' + ids + '"的数据项？').then(function() {
        return delLivestock(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
         /**
          * 获取农户信息
          */
        getUserList(){
        listUser().then( res => {
            if( res.code != 200){ return this.message("系统错误,请重新查询") }
          this.userList = res.rows
          // console.log(this.userLis+"============"+ res.rows);
              }
              )
    },
             /**
          * 获取牲畜类型信息
          */
        getlivestockTypeList(){
        listLivestockType().then( res => {
            if( res.code != 200){ return this.message("系统错误,请重新查询") }
          this.livestockTypeList = res.rows
          // console.log(this.livestockTypeList+"============"+ res.rows);
              }
              )
    },
           /**
          * 获取牲畜品种信息
          */
        getlivestockVarietiesList(){
          listLivestockVarieties().then( res => {
            if( res.code != 200){ return this.message("系统错误,请重新查询") }
          this.livestockVarietiesList = res.rows
          // console.log(this.livestockVarietiesList+"============"+ res.rows);
              }
              )
    },

    /**
          * 赋值选中农户id
          */
    setId() {
    // 获取选中的用户对象
      const selectedUser = this.userList.find(item => item.name === this.form.agroUserName);
    // 将选中用户的id赋值给form.code
      this.form.agroUserId = selectedUser ? selectedUser.id : null;
      //圆心坐标
      // 获取选中的用户对象
      // const userLon = this.userList.find(item => item.name === this.form.agroUserName);
      // const userLat = this.userList.find(item => item.name === this.form.agroUserName);
      this.zbLon = selectedUser ? selectedUser.lon : null;
      this.zbLat = selectedUser ? selectedUser.lat : null;
      console.log(this.zbLon + "=圆心坐标");
      console.log(this.zbLat+"圆心坐标");

    
  },

  setLivestockTypeId() {
    // 获取选中的牲畜类型id赋值给对象
      const selectedLivestockTypeId = this.livestockTypeList.find(item => item.livestockType === this.form.livestockType);
      this.form.livestockTypeId = selectedLivestockTypeId ? selectedLivestockTypeId.id : null;
    
  },

  setLivestockVarietiesId() {
    // 获取选中的牲畜品种id赋值给对象
      const selectedLivestockVarietiesId = this.livestockVarietiesList.find(item => item.livestockVarieties === this.form.livestockVarieties);
      this.form.livestockVarietiesId = selectedLivestockVarietiesId ? selectedLivestockVarietiesId.id : null;
    
  },

    /** 导出按钮操作 */
    handleExport() {
      this.download('agro/livestock/export', {
        ...this.queryParams
      }, `livestock_${new Date().getTime()}.xlsx`)
    },




    
  }
};
</script>
<style scoped>
.input-group {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

</style>

