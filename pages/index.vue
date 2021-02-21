<template>
  <div class="container">
    <template v-for="home in homes">
      <nuxt-link :key="home.objectID" :to="`home/${home.objectID}`">
        <HomeCard :home="home" class="home" />
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({ $http }) {
    const result = await $http.$get('homes')
    return { homes: result.hits }
  },

  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          hid: 'description', // Unique id to overwrite global settins
          name: 'description',
          content: 'The Homepage',
        },
      ],
    }
  },
}
</script>
