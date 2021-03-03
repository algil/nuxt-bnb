<template>
  <div class="error-page">
    <h1>Error {{ error.statusCode }}!</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scope>
.error-page {
  text-align: center;
}
</style>
