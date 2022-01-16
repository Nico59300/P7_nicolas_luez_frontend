<template>
  <div>
    <v-container>
      <h2>Que voulez-vous partager ?</h2>
      <v-form>
        <v-text-field
          v-model="content"
          label="Votre message"
          required
        ></v-text-field>
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
        ></v-file-input>
        <div class="d-flex">
          <v-btn color="green" class="white--text" @click="submitPost"
            >Partager</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data: function () {
    return {
      content: "",
    };
  },
  methods: {
    submitPost: function () {
      console.log("userId : " + this.user.id);
      let post = {
        content: this.content,
        author_id: this.user.id,
      };
      this.$store.dispatch("posts/addPost", post);
      this.$store.dispatch("posts/getAllPosts");
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
};
</script>
