<template>
  <transition name="fade">
    <div class="loading-wrapper" v-show="showLoading">
      <div class="loading-container">
        <img class="img" src="./loading.gif" width="24">
        <span class="text">正在载入…</span>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    showLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.loading-wrapper {
  position: fixed;
  top: 88px;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #222;
  transition: all 0.5s ease;
}

.loading-wrapper.fade-enter,
.loading-wrapper.fade-leave {
  opacity: 0.5;
  background: rgba(2, 2, 2, 0.5);
}

.loading-wrapper.fade-enter-active,
.loading-wrapper.fade-leave-active {
  opacity: 0;
  background: #222;
}

.loading-wrapper .loading-container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}

.loading-wrapper .loading-container .text {
  display: block;
  margin-top: 5px;
  padding-left: 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
