<template>
  <div>
    <Avatar :url="url" />
  </div>
</template>
    
    <script>
import Avatar from "./";

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      url: "https://img1.baidu.com/it/u=55138474,2823920391&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=480",
    };
  },
};
</script>
    
<style scoped>
</style>