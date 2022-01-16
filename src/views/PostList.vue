<template>
  <v-container  class="posts">

    <div v-if="user.isLogged">
     
      <v-row class="justify-center my-5">
        <CreatePost />
      </v-row>
      <div id="postsContainer">
        <h3 class="text-center my-5">les Posts de la communauté</h3>

        <v-row v-if="posts.length == 0">
          <v-col>
            <p>Aucun post à afficher</p>
          </v-col>
        </v-row>
        
        <v-row v-else>
          <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" lg="4">
            <v-card>
              <v-card-subtitle>author : {{ post.author_id }}</v-card-subtitle>
              <p>{{ post.content }}</p>
              <router-link
                :to="{
                  name: 'PostDetails',
                  params: { id: post.id },
                }"
                >Voir post</router-link
              >
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <p>acces refusé</p>
    </div>
  </v-container>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
export default {
  components: { CreatePost },
  name: "Posts",

  data: () => {
    return {
      
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    posts() {
      return this.$store.state.posts.allPosts;
    },
  },
  mounted() {
    if (this.user.isLogged == false) {
      console.log("pas loggé");
    }
    this.$store.dispatch("posts/getAllPosts");
  }
};
</script>