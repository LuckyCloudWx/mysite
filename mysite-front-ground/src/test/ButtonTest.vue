<template>
  <div class="test-contaienr">
    <buttonVue @click="handleClick" />
  </div>
</template>

<script>
import buttonVue from "./Button.vue";
export default {
  components: {
    buttonVue,
  },
  methods: {
    handleClick(count, callBack) {
      console.log("father component:", count);
      setTimeout(() => {
        callBack("请填写密码");
      }, 2000);
    },
  },
};
</script>

<style>
</style>