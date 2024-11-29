<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true, //属性必传
    },
    size: {
      type: Number,
      default: 150,
    },
  },
};
</script>

<style scoped>
.avatar-container {
  cursor: pointer;
  border-radius: 50%;
  display: block;
}
</style>>
    