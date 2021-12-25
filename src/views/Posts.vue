<template>
  <div class="posts">
    <h1>Posts</h1>
    <div id="postsContainer">
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>author id : {{ post.author_id }}</p>
        <p>{{ post.content }}</p>
        <router-link :to="{
          name: 'PostDetails',
          params: { id: post.id }
        }">Voir post</router-link>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import posts from '../posts.json'
export default {
  name: 'Posts',

  data: () => {
    return {
      posts: null
    }
  },
  methods: {
    getPosts: function () {
      axios.get('http://localhost:3000/api/posts')
        .then(posts => this.posts = posts.data)
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.getPosts();
  }
}
</script>