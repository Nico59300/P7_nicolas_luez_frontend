<template>
  <div class="post">
    <h1>Post</h1>
    <div id="postContainer">
      <h2>Titre : {{ post.title }}</h2>
      <p>Contenu : {{ post.content }}</p>
      <p>autor id : {{ post.author_id }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import posts from '../posts.json'
export default {
  name: 'PostDetails',

  data: () => {
    return {
      post: ''
    }
  },
  methods: {
    getPostDetails: function () {
      console.log("param id" + this.$route.params.id)
      axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`)
      .then((post) => { this.post = post.data})
      .catch(err => console.log(err))
    }
  },
  beforeMount() {
    this.getPostDetails();
  }
}
</script>