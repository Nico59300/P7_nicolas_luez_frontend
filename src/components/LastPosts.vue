<template>
  <div>
    <h2 class="mb-3">les derniers posts</h2>
    <div v-if="allPosts.length == 0">
      {{ this.message }}
    </div>
    <div v-else class="d-sm-flex d-sm-column d-md-row justify-space-between">
      <v-card v-for="post in lastPosts" :key="post.id" class="mb-3">
        <v-card-title>{{ formatDate(post.createdAt) }}</v-card-title>
        <v-card-subtitle>
          pseudo
        </v-card-subtitle>
        <v-card-actions class="d-flex align-end">
          <router-link
          style="text-decoration: none; color: inherit;"
          :to="{
            name: 'PostDetails',
            params: { id: post.id },
          }">
          <v-btn color="indigo" class="white--text">
            <v-icon>mdi mdi-arrow-bottom-right-bold-outline</v-icon>
            Details
          </v-btn>
        </router-link>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LastPosts",
  data: function () {
    return {};
  },
  methods: {
    formatDate: (date) => {
      let postDate = new Date(date);
      let formated = `${postDate.getDate()}/${
        postDate.getMonth() + 1
      }/${postDate.getFullYear()} à ${postDate.getHours()}:${postDate.getMinutes()}`;
      console.log("date " + formated);
      return formated;
    },
  },
  computed: {
    message() {
      return this.$store.state.posts.postMessage;
    },
    allPosts() {
      return this.$store.state.posts.allPosts;
    },
    lastPosts() {
      return this.allPosts.slice(0, 5);
    },
  },
  beforeMount() {
    this.$store.dispatch("posts/getAllPosts");
  },
  mounted() {},
};
</script>

<style scoped>
li {
  list-style-type: none;
}
router-link {
  text-decoration: none;
}
</style>

