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
import homes from '~/data/homes'

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
    }
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
