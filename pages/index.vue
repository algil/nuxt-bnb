<template>
  <div class="container">
    <HomeCard
      v-for="home in homes"
      :key="home.objectID"
      :home="home"
      class="home"
    />
  </div>
</template>

<script>
import homes from '@/data/homes'

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
