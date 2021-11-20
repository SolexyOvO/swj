<template>
  <div>
    <div style="width: 100%; height: 100%" id="echart"></div>
  </div>
</template>

<script>
export default {
  name: "Charts",

  props:['newData'],
  mounted(){

  },
};
</script>

<style>
#echart {
  min-width: 1280px;
  min-height: 800px;
}
</style>
