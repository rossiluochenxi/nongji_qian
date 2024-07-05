<template>
  <div class="map-data-container">
    <div class="map-section">
      <div id="mapContainer" class="map-container"></div>
    </div>
  </div>
</template>

<script>
import { getFields } from "@/api/map/fields";
import tractorIcon from "@/assets/images/tractor_icon.png"; // 导入农机图标

export default {
  name: "Map",

  data() {
    return {
      mapData: [], // 存储地图坐标的数组
      map: null, // 地图对象
      polylinePath: [], // 存储 Polyline 的路径
      clickPolylinePath: [], // 存储点击生成的折线路径
      clickPolylines: [], // 存储所有点击生成的折线
      polygon: null, // 存储多边形对象
    };
  },

  mounted() {
    this.initMap();
    this.fetchMapData(); // 获取地图数据
  },

  methods: {
    async fetchMapData() {
      const mapid = this.$route.params && this.$route.params.id;
      if (!mapid) {
        console.error("Map ID is not defined.");
        return;
      }
      try {
        const response = await getFields(mapid);
        console.log("Full Map Info Response:", response);
        if (response && response.data) {
          this.mapData = JSON.parse(response.data.newMapInfo);
          console.log("mapData:", this.mapData);

          this.polylinePath = this.mapData.map(location => new window.AMap.LngLat(location.longitude, location.latitude));

          if (this.polylinePath.length > 0) {
            this.polylinePath.push(this.polylinePath[0]);
          }

          this.addMarkersToMap();
          this.addPolygonOverlay(); // 在添加多边形时也添加折线
        } else {
          console.log("No data in response.");
        }
      } catch (error) {
        console.error("Error fetching map info:", error);
      }
    },

    initMap() {
      const mapOptions = {
        zoom: 16,
        viewMode: "3D",
        center: [123.53214057074653, 41.75495361328125],
        resizeEnable: true,
        mapType: "Satellite",
      };

      this.map = new window.AMap.Map("mapContainer", mapOptions);

      const satelliteLayer = new window.AMap.TileLayer.Satellite();
      this.map.add(satelliteLayer);

      this.map.on('click', this.handleMapClick);
    },

    addMarkersToMap() {
      if (Array.isArray(this.mapData)) {
        this.mapData.forEach(location => {
          new window.AMap.Marker({
            position: new window.AMap.LngLat(location.longitude, location.latitude),
            map: this.map,
            content: '<div class="custom-marker"></div>', // 使用自定义圆点
            offset: new window.AMap.Pixel(-16, -16) // 调整图标位置偏移
          });
        });
      }
    },

    addPolylineToMap() {
      if (this.polylinePath.length > 0) {
        const polyline = new window.AMap.Polyline({
          path: this.polylinePath, // 设置折线的路径
          strokeColor: "#00FF00", // 线颜色改为绿色
          strokeWeight: 3, // 线宽
          strokeOpacity: 0.8, // 线透明度
          strokeStyle: "solid", // 线样式
        });
        this.map.add(polyline);
      }
    },

    addPolygonOverlay() {
      if (this.polylinePath.length > 0) {
        this.polygon = new window.AMap.Polygon({
          path: this.polylinePath, // 设置多边形的路径
          fillColor: '#0000FF', // 填充色
          fillOpacity: 0.01, // 填充透明度设置为非常低
          strokeColor: '#0000FF', // 线颜色蓝色
          strokeWeight: 7, // 线宽
          bubble: true, // 允许事件冒泡
        });
        this.map.add(this.polygon);

        // 在添加多边形时也添加折线
        const polyline = new window.AMap.Polyline({
          path: this.polylinePath, // 设置折线的路径
          strokeColor: "#00FF00", // 线颜色改为绿色
          strokeWeight: 7, // 线宽
          strokeOpacity: 0.7, // 线透明度
          strokeStyle: "solid", // 线样式
        });
        this.map.add(polyline);
      }
    },

    handleMapClick(e) {
      const { lnglat } = e;
      this.addMarkerAndPolyline(lnglat.lng, lnglat.lat);
    },

    addMarkerAndPolyline(lng, lat) {
      // 创建新的 Marker
      new window.AMap.Marker({
        position: new window.AMap.LngLat(lng, lat),
        map: this.map,
        content: `<img src="${tractorIcon}" class="custom-marker">`, // 使用农机图标
        offset: new window.AMap.Pixel(-16, -16) // 调整图标位置偏移，确保图标居中
      });

      // 清除旧的折线
      if (this.clickPolylines.length > 0) {
        this.clickPolylines.forEach(polyline => polyline.setMap(null));
        this.clickPolylines = [];
      }

      // 更新折线路径
      this.clickPolylinePath.push(new window.AMap.LngLat(lng, lat));

      // 创建新的折线
      this.clickPolylinePath.forEach((point, index) => {
        let strokeColor = "#FF0000"; // 默认颜色为红色
        if (this.polygon && this.polygon.contains(point)) {
          strokeColor = "#00FF00"; // 在多边形内部时，颜色为绿色
        }

        // 创建并添加折线段
        if (index > 0) {
          const segment = new window.AMap.Polyline({
            path: [this.clickPolylinePath[index - 1], point],
            strokeColor: strokeColor, // 根据判断设置线颜色
            strokeWeight: 3, // 线宽
            strokeOpacity: 0.8, // 线透明度
            strokeStyle: "solid", // 线样式
          });
          this.map.add(segment);
          this.clickPolylines.push(segment);
        }
      });
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
  width: 6px; /* 农机图标的宽度 */
  height: 6px; /* 农机图标的高度 */
}
</style>
