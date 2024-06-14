<template>
  <div class="map-data-container">
        <!--地图 -->
    <div class="map-section">
      <div id="mapContainer" class="map-container"></div>
    </div>

  <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
  </div>
</template>

<script>
import { listRtdata, getRtdata, delRtdata, addRtdata, updateRtdata } from "@/api/dm/rtdata";
import { listUser} from "@/api/agro/user";


export default {
  name: "Map",

  data() {
    return {
      //livestock牲畜坐标
      // livestockCoordinates:[],
      //圆心坐标
      centerl:[],
      //用户经纬度
      lon: null,
      lat: null,

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
      // 冻结数据表格数据
      rtdataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agroLivestockCode: null,
        agroLivestockIccid: null,
        agroLivestockXqiccid: null,
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
        date: null,
        phone:null,
        agroLivestockVarieties:null,
        agroLivestockType:null,

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      map: null,
      farmerName: "",
      earTagNumber: "",
      deviceNumber: "",
      localList:[]
   
    };
  },
  mounted() {
    this.initMap();

},
  created() {

  },
  methods: {
  
    /**
          * 获取农户信息
          */ 
    //   getUserList(){
    //     listUser().then( res => {
    //         if( res.code != 200){ return this.message("系统错误,请重新查询") }
   
    //       this.userList = res.rows
    //       this.userList.forEach(user => {
    //       const lon = parseFloat(user.lon); // 将经度字符串转换为浮点数
    //       const lat = parseFloat(user.lat); // 将纬度字符串转换为浮点数

    //       // 将经纬度数据添加到 this.centerl 数组中
    //       this.centerl.push({ lon, lat });
    //       });

    //         //获取设备数据
    //         // this.getList();
    //       // 在成功获取用户列表后再初始化地图
    //       this.initMap();


    //       // console.log(this.userLis+"============"+ res.rows);
    //    }
    //      )
    // },
// 初始化地图
initMap() {
  this.map = new window.AMap.Map("mapContainer", {
    zoom: 8,
    viewMode: "3D",
    center: [123.414875, 41.908154],
    resizeEnable: true,
    mapType: 'Satellite'
  });

  // 添加卫星地图图层
  const satelliteLayer = new window.AMap.TileLayer.Satellite();
  this.map.add(satelliteLayer);

  // 初始化多边形坐标数组
  let polygonPath = [];

  // 监听地图点击事件
  this.map.on('click', (e) => {
    // 获取点击位置的经纬度坐标
    const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
    // 将坐标添加到多边形坐标数组中
    polygonPath.push(lnglat);
    // 创建多边形并添加到地图上
    const polygon = new window.AMap.Polygon({
      path: polygonPath, // 多边形坐标数组
      strokeColor: "#FF33FF", // 线颜色
      strokeOpacity: 1, // 线透明度
      strokeWeight: 2, // 线宽
      fillColor: "#FF99FF", // 填充颜色
      fillOpacity: 0.35 // 填充透明度
    });
    polygon.setMap(this.map); // 将多边形添加到地图上
  });
}
,




    /**
          * 冻结数据
          */ 
    // getList() {
    //   this.loading = true;
    //   listRtdata(this.queryParams).then(response => {
    //     this.rtdataList = response.rows;
    //     this.total = response.total;
        
    //       // // 将经纬度数据添加到 this.livestockCoordinates 数组中
    //       // this.rtdataList.forEach(rtdata => {
    //       //       const livestockLon = parseFloat(rtdata.livestockLon); // 将经度字符串转换为浮点数
    //       //       const livestockLat = parseFloat(rtdata.livestockLat); // 将纬度字符串转换为浮点数
    //       //       this.livestockCoordinates.push({ livestockLon, livestockLat });
    //       // });
    //       this.loading = false;
    //       this.getUserList();

        
    //   });





      
    // },

    // search() {
    //   // 执行查询操作
    // },

    locateOnMap(rows) {
  this.localList = [];
  this.localList.push([rows.livestockLon, rows.livestockLat]);
  
  const location = this.localList[0];

  if (location) {
    const infoWindowContent = `
      <div>
        <p>养殖户：${rows.agroUserName}</p>
        <p>电话：${rows.phone}</p>
        <p>牲畜标号：${rows.agroLivestockCode}</p>
        <p>设备编号：${rows.agroLivestockIccid}</p>
        <p>牛品种：${rows.agroLivestockVarieties}</p>
        <p>经度：${location[0]}</p>
        <p>纬度：${location[1]}</p>
      </div>
    `;

    const infoWindow = new AMap.InfoWindow({
      content: infoWindowContent,
      offset: new AMap.Pixel(6, -30) // 向上移动 30 个像素

    });

    infoWindow.open(this.map, location);  
    this.map.setCenter(location);
  }
},


//     locateOnMap(rows) {
//   this.localList = [];
//   this.localList.push([rows.livestockLon, rows.livestockLat]);
  
//   const location = this.localList[0];

//   if (location) {
//     const marker = new AMap.Marker({
//       position: location,
//       map: this.map,
//       visible: false // 设置标记不可见
//     });
  
//     const infoWindowContent = `
//       <div>
//         <p>养殖户：${rows.agroUserName}</p>
//         <p>电话：${rows.phone}</p>
//         <p>牲畜标号：${rows.agroLivestockCode}</p>
//         <p>设备编号：${rows.agroLivestockIccid}</p>
//         <p>牛品种：${rows.agroLivestockVarieties}</p>
//         <p>经度：${location[0]}</p>
//         <p>纬度：${location[1]}</p>
//       </div>
//     `;

//     const infoWindow = new AMap.InfoWindow({
//       content: infoWindowContent
//     });

//     infoWindow.open(this.map, location);  
//     this.map.setCenter(location);
//   }
// },


openInfoWindow(marker, rows) {
  // 构建信息窗口内容
  const infoWindowContent = `
    <div>
      <p>养殖户：${rows.agroUserName}</p>
      <p>电话：${rows.phone}</p>
      <p>牲畜标号：${rows.agroLivestockCode}</p>
      <p>设备编号：${rows.agroLivestockIccid}</p>
      <p>牛品种：${rows.agroLivestockVarieties}</p>
      <p>经度：${marker.getPosition().getLng()}</p>
      <p>纬度：${marker.getPosition().getLat()}</p>
    </div>
  `;

  // 创建信息窗口并打开
  const infoWindow = new AMap.InfoWindow({
    content: infoWindowContent
  });

  infoWindow.open(this.map, marker);
},

   
         
   formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      this.title = "添加冻结数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRtdata(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改冻结数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateRtdata(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRtdata(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除冻结数据编号为"' + ids + '"的数据项？').then(function() {
        return delRtdata(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dm/rtdata/export', {
        ...this.queryParams
      }, `rtdata_${new Date().getTime()}.xlsx`)
    }
  
  }
};
</script>

<style scoped>
.map-data-container {
  display: flex;
}

.map-section {
  flex: 1;
}

.data-section {
  /* flex: 1; */
  width: 500px;
  height: 860px;
  /* padding-left: 350px; */
  margin-top: 15px; /* 将整体向下移动 15 像素 */
}

.map-container {
  width: 100%;
  height: 860px;
}

.input-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.input-item {
  flex: 1;
  margin-right: 10px;
}

.input-field {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 22px; /* 将按钮向下移动22像素 */
  transition: background-color 0.3s, box-shadow 0.3s;
}
.search-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}

.data-table th {
  background-color: #f0f0f0;
}

.data-table td {
  background-color: #f9f9f9;
}

.data-row:hover {
  background-color: #e9e9e9;
}

.locate-button {
  padding: 6px 12px;
  background-color: #5cb85c;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.search-bar {
  width: 500px;
  height: 57px;
  transform: translateX(5px); /* 向右平移 20 像素 */
}
.item {
  width: 500px;
  height: 600px;
  /* transform: translateX(20px); 向右平移 20 像素 */

}
</style>