<template>
  <div>
    <template v-if="home">
      <div style="display: flex">
        <img
          v-for="image in home.images"
          :key="image"
          :src="image"
          width="200"
          height="200"
        />
      </div>
      <h1>{{ home.title }}</h1>
      <p>${{ home.pricePerNight }} / night</p>
      <p>
        <img src="/icons/marker.svg" width="20" height="20" />
        {{ home.location.address }} {{ home.location.city }}
        {{ home.location.state }} {{ home.location.country }}
      </p>

      <p>
        <img src="/icons/star.svg" width="20" height="20" />
        {{ home.reviewValue }}
      </p>
      <p>
        {{ home.guests }} guests, {{ home.bedrooms }} rooms,
        {{ home.beds }} beds, {{ home.bathrooms }} bath
      </p>
      <div ref="map" class="home__map"></div>
    </template>
    <p v-else>No home found</p>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $api }) {
    const { data } = await $api.getHomeById(params.id)
    return { home: data }
  },

  head() {
    return {
      title: this.home.title,
    }
  },

  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
}
</script>

<style scoped>
.home__map {
  width: 800px;
  height: 800px;
}
</style>
