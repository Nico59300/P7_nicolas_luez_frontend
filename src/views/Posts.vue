<template>
  <v-container class="posts">
    <h1>Posts</h1>

    <v-row id="postsContainer">
      <v-col v-if="posts.length == 0">
        <p>Aucun post à afficher</p>
      </v-col>
      <v-col
        v-else
        v-for="post in posts"
        :key="post.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-card-title class="text-center">{{ post.title }}</v-card-title>
          <v-card-subtitle>author : {{ post.pseudo }}</v-card-subtitle>
          <p>{{ post.content }}</p>
          <router-link
            :to="{
              name: 'PostDetails',
              params: { id: post.id }
            }"
            >Voir post</router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Posts",

  data: () => {
    return {
      posts: "",
    };
  },
  methods: {
    getPosts:  function () {
       axios.get("http://localhost:3000/api/posts")
        .then((posts) => {
          console.log(posts);
          console.log(posts)
          this.posts = posts.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
    mounted() {
      this.getPosts();
    }
};
</script>