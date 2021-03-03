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

      <template v-if="reviews">
        <div v-for="review in reviews" :key="review.objectID">
          <img :src="review.reviewer.image" />
          <h3>{{ review.reviewer.name }}</h3>
          <p>{{ formatDate(review.date) }}</p>
          <p><ShortText :text="review.comment" /></p>
        </div>
      </template>

      <template v-if="user">
        <img :src="user.image" />
        <h3>{{ user.name }}</h3>
        <p>{{ formatDate(user.joined) }}</p>
        <p>{{ user.reviewCount }}</p>
        <p>{{ user.description }}</p>
      </template>
    </template>
    <p v-else>No home found</p>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $api }) {
    const { data: home } = await $api.getHomeById(params.id)
    const { data: reviews } = await $api.getReviewsByHomeId(params.id)
    const { data: users } = await $api.getUsersByHomeId(params.id)

    return {
      home,
      reviews,
      user: users[0],
    }
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

  methods: {
    formatDate(dateString) {
      // TODO: Extract to a common file
      const date = new Date(dateString)
      return date.toLocaleString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.home__map {
  width: 800px;
  height: 800px;
}
</style>
