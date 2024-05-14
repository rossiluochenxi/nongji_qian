<template>
  <div @click="startPlayback">
    <video ref="videoPlayer" controls></video>
  </div>
</template>

<script>
import flvjs from 'flv.js';

export default {
  methods: {
    startPlayback() {
      if (flvjs.isSupported()) {
        const videoElement = this.$refs.videoPlayer;
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'rtmp://127.0.0.1/live/test' // 替换为你的 RTMP 视频流地址
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  }
}
</script>
