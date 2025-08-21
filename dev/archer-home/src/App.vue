<template>
  <div class="archer">
    <Home id="home-area"/>
  </div>
</template>

<script>
import Home from "@components/Home";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style lang="scss">
.archer {
  display: flex;
  min-height: 100%;
  max-height: 100%;
  scrollbar-width:none;
  background: url(./assets/image/bg1.gif) no-repeat center center;
  background-size: 100% 100%;
  
  #home-area {
    width: 100%;
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #c2c2c2;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #8f94fb;
  }
}
</style>
