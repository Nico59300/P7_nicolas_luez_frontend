<template>
  <div>
    <v-container>
      <h2>Que voulez-vous partager ?</h2>
      <v-form>
        <v-text-field v-model="title" label="Titre" required></v-text-field>
        <v-text-field
          v-model="content"
          label="Votre message"
          required
        ></v-text-field>
        <v-btn color="green" class="white--text" @click="submitPost"
          >Partager</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreatePost",
  data: function () {
    return {
      title: "",
      content: "",
      userUuid: "",
      authorId:"",
      pseudo:""
    };
  },
  methods: {
    submitPost: function () {
      console.log("userId : " + this.userUuid);
      axios.post("http://localhost:3000/api/posts", {
        title: this.title,
        content: this.content,
        author_id: this.authorId,
        pseudo: this.pseudo
      }).then(() => {window.location.href="/"})
    },
    getUser: function () {
      axios
        .get(`http://localhost:3000/api/users/${sessionStorage.getItem("userId")}`)
        .then((user) => {
          this.userUuid = user.data.userId;
          this.pseudo = user.data.pseudo
          this.authorId = user.data.id
        }).catch(err => console.log(err))
    },
  },
  mounted: function () {
    this.getUser();
  },
};
</script>
