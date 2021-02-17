<template>
  <div>
    <template v-if="home">
      <h1>{{ home.title }}</h1>
    </template>
    <p v-else>No home found</p>
  </div>
</template>

<script>
import homes from '@/data/homes'

export default {
  data() {
    return {
      home: {},
    }
  },

  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id)
  },
}
</script>
