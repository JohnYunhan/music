<template>
  <div class="tab">
    <router-link tag="div" to="recommend" class="tab-item" v-ripple>
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" to="singer" class="tab-item" v-ripple>
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" to="rank" class="tab-item" v-ripple>
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" to="search" class="tab-item" v-ripple>
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
export default {};
</script>
<style lang="sass">
@import "./tab.scss";
</style>
