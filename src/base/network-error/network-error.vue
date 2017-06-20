<template>
  <transition name="fade">
    <div class="network-error" v-show="netErr">
      <div class="error-infor">
        <div class="text">网络异常，请稍后再试！</div>
        <a href="javascrip:;" class="refresh">重新加载</a>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    netErr: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.network-error {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #222;
  transition: all 0.5s ease;
}

.network-error.fade-enter,
.network-error.fade-leave {
  opacity: 0.5;
  background: rgba(2, 2, 2, 0.5);
}

.network-error.fade-enter-active,
.network-error.fade-leave-active {
  opacity: 0;
  background: #222;
}

.network-error .error-infor {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}

.network-error .error-infor .text {
  margin-bottom: 10px;
}
</style>
