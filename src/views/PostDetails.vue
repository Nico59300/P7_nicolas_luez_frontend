<template>
  <v-container>
    <h1 class="text-center mb-5">Details du post</h1>

    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <v-card>
              <v-card-title>Posté par {{ post.pseudo }}</v-card-title>
              <v-card-subtitle>
                le {{ formatDate(post.createdAt) }} postid : {{ post.id }}
              </v-card-subtitle>
          <v-card-text>
            <p>{{ post.content }}</p>
          </v-card-text>

          <v-row v-if="pictures.length > 0" class="d-flex justify-center">
            <v-col cols="12" md="8">
              <v-carousel
                :show-arrows="pictures.length > 1"
                :hide-delimiters="pictures.length == 1"
              >
                <v-carousel-item
                  v-for="(picture, index) in pictures"
                  :key="index"
                  :src="picture"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                >
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
          
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <Comment :postId="post.id"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Comment from "../components/Comment.vue";
export default {
  name: "PostDetails",
  components: { Comment },
  data: () => {
    return {
      postId: null,
      formatedPostDate: "",
      pictures: [
        "https://i.imgur.com/0NfE6HI.jpeg",
        "https://i.imgur.com/Qbcv9KC.jpeg",
        "https://i.imgur.com/5Bro5a3.jpeg"
      ],
    };
  },
  methods: {
    formatDate: (date) => {
      //console.log(date)
      let postDate = new Date(date);
      let formated = `${postDate.getDate()}/${
        postDate.getMonth() + 1
      }/${postDate.getFullYear()} à ${postDate.getHours()}:${postDate.getMinutes()}`;
      return formated;
    },
  },
  computed: {
    post() {
      return this.$store.state.posts.postDetails;
    },
    author() {
      return this.$store.state.users.PostAuthor;
    },
  },
  beforeCreate() {
    //console.log(this.this.post.id)
    this.$store.dispatch("posts/getPostDetails", this.$route.params.id);
    this.$store.dispatch('comments/getComments', this.$route.params.id)
  },
  created() {
    //console.log(this.this.post.id)
    //console.log('created ' + JSON.stringify(this.post))
  },
  unmounted() {
    //console.log('mounted ' + JSON.stringify(this.post))
    console.log('unmounted post details')
    this.$store.dispatch('posts/clearPostDetails')
  }
};
</script>

<style scoped>

</style>