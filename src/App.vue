<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import mHeader from 'components/header/header';
import tab from 'components/tab/tab';

export default {
  components: {
    mHeader,
    tab
  }
};
</script>
<style>
</style>
