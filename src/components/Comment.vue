<template>
  <div v-if="postId">
    <div class="justify-center align-center">
      <h3>Ajouter un commentaire - {{ postId }}</h3>
      <v-form class="d-flex d-sm-column d-md-row">
        <v-col cols="8" class="p-1">
          <v-text-field
            v-model="com"
            label="Votre commentaire"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="p-1">
          <v-btn @click="addComment">enregistrer</v-btn>
        </v-col>
      </v-form>
    </div>
    <div v-if="comments.length == 0">
      {{ message }}
    </div>
    <div v-else>
      <v-card v-for="comment in comments" :key="comment.id">
        <v-card-title>author id {{ comment.author_id }} </v-card-title>
        <v-card-text>{{ comment.textcontent }}</v-card-text>
        <v-card-actions>
          <v-icon v-if="comment.author_id == userId" large color="red" :id="comment.id" @click="deleteComment(comment.id, comment.author_id, comment.post_id)"> mdi-delete </v-icon>
        </v-card-actions>
        
        
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: { postId: Number },
  data: () => {
    return {
      com: "",
    };
  },
  methods: {
    addComment: function () {
      console.log("add Comment front ");
      let com2send = {
        postId: this.postId,
        authorId: this.userId,
        com: this.com,
      };
      this.$store.dispatch("comments/addComment", com2send);
    },
    deleteComment: function(commentId, authorId, postId)  {
      
      this.$store.dispatch('comments/deleteComment', {commentId: commentId, authorId: authorId, postId: postId})
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments.comments;
    },
    message() {
      return this.$store.state.comments.commentMessage;
    },
    userId() {
      return this.$store.state.auth.user.id;
    },
  },
  Created() {
    //console.log("created "+this.postId)
    this.$store.dispatch('comments/getComments', this.postId)
  },
  beforeMount() {
    //console.log("bfmount comment postid "+this.postId)
  },
  mounted() {
    //console.log('mounted comment postid ' + this.postId)
  },
  unmounted() {
    console.log('unmounted')
    //console.log("mounted comment postId "+ this.postId)
    this.$store.dispatch("comments/clearComments");
  },
  updated() {},
};
</script>

<style scoped>
</style>
