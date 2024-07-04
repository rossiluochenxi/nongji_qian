<template>
  <div class="map-data-container">
    <!-- 地图 -->
    <div class="map-section">
      <div id="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script>
import { getFields } from "@/api/map/fields";

export default {
  name: "Map",

  data() {
    return {
      mapData: [], // 存储地图坐标的数组
      map: null, // 地图对象
      polylinePath: [], // 存储 Polyline 的路径
    };
  },

  mounted() {
    this.initMap();
    this.fetchMapData(); // 获取地图数据
  },

  methods: {
    fetchMapData() {
      const mapid = this.$route.params && this.$route.params.id;
      if (!mapid) {
        console.error("Map ID is not defined.");
        return;
      }
      getFields(mapid)
        .then(response => {
          console.log("Full Map Info Response:", response);
          if (response && response.data) {
            this.mapData = JSON.parse(response.data.newMapInfo);
            console.log("mapData:", this.mapData);

            // 将所有的坐标点存储到 polylinePath 数组中
            this.polylinePath = this.mapData.map(location => new window.AMap.LngLat(location.longitude, location.latitude));

            // 确保坐标点首尾相连
            if (this.polylinePath.length > 0) {
              this.polylinePath.push(this.polylinePath[0]);
            }

            console.log("polylinePath:", this.polylinePath);

            this.addMarkersToMap();
            this.addPolylineToMap();
            this.addPolygonOverlay();
          } else {
            console.log("No data in response.");
          }
        })
        .catch(error => {
          console.error("Error fetching map info:", error);
        });
    },

    initMap() {
      // 初始化地图
      this.map = new window.AMap.Map("mapContainer", {
        zoom: 8,
        viewMode: "3D",
        center: [123.414875, 41.908154],
        resizeEnable: true,
        mapType: "Satellite",
      });

      // 添加卫星地图图层
      const satelliteLayer = new window.AMap.TileLayer.Satellite();
      this.map.add(satelliteLayer);
    },

    addMarkersToMap() {
      if (Array.isArray(this.mapData)) {
        this.mapData.forEach(location => {
          const marker = new window.AMap.Marker({
            position: new window.AMap.LngLat(location.longitude, location.latitude),
            map: this.map,
            content: '<div class="custom-marker"></div>', // 使用自定义圆点
            offset: new window.AMap.Pixel(-6, -6) // 调整图标位置偏移
          });
        });
      }
    },

    addPolylineToMap() {
      if (this.polylinePath.length > 0) {
        const polyline = new window.AMap.Polyline({
          path: this.polylinePath, // 设置折线的路径
          strokeColor: "#00FF00", // 线颜色改为绿色
          strokeWeight: 4, // 线宽
          strokeOpacity: 0.8, // 线透明度
          strokeStyle: "solid", // 线样式
        });
        this.map.add(polyline);
      }
    },

    addPolygonOverlay() {
      if (this.polylinePath.length > 0) {
        const polygon = new window.AMap.Polygon({
          path: this.polylinePath, // 设置多边形的路径
          fillColor: '#00FF00', // 填充色
          fillOpacity: 0.1, // 填充透明度设置为全透明
          strokeColor: '#00FF00', // 线颜色
          strokeWeight: 1, // 线宽
        });
        this.map.add(polygon);
      }
    },
  },
};
</script>

<style scoped>
.map-data-container {
  display: flex;
  height: 100vh; /* 确保父容器高度为视口高度 */
}

.map-section {
  flex: 1; /* 使地图部分自适应宽度 */
}

.map-container {
  width: 100%;
  height: 100%; /* 使地图容器高度填满父容器 */
}

.custom-marker {
  width: 12px;
  height: 12px;
  background-color: #00FF00; /* 绿色 */
  border-radius: 50%; /* 圆点 */
  border: 2px solid #FFFFFF; /* 白色边框使其更清晰 */
}
</style>
