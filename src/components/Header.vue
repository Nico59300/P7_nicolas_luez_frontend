<template>
  <header>
    <v-app-bar app color="indigo" class="white--text">
      <v-app-bar-nav-icon
        @click="drawer = true"
        color="white"
      ></v-app-bar-nav-icon>
      <div to="/" class="text-center"><v-img :src="require('@/assets/brand-name.png')"  width="160" contain></v-img></div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>

      <v-list nav dense>
        <!-- nav header -->
        <v-list-item-group active-class="indigo--text text--accent-5 mb-5">
          
          <v-list-item disabled>
              <v-list-item-avatar>
                <v-icon v-if="avatar == 'default'">mdi-account-circle</v-icon>
                <v-img v-else :src="avatar">mdi-account-circle</v-img>
              </v-list-item-avatar>
              <div>Bienvenu {{ pseudo }}</div>
          </v-list-item>
          <!-- if user  -->
          

          <v-list-item v-if="userId">
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title @click="disconnect">Se déconnecter</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
        
        <!-- user navigation links  -->
        <v-list-item-group v-if="role !== 'visitor' " active-class="blue--text text--accent-5 mb-4">
          <v-list-item>
            <v-list-item-title>Menu posts</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/posts">
            <v-list-item-icon><v-icon>mdi-book-open-variant</v-icon></v-list-item-icon>
            <v-list-item-title>Tous les posts</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/create-post">
            <v-list-item-icon>
              <v-icon>mdi-lead-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Créer un post</v-list-item-title>
          </v-list-item>

        </v-list-item-group>

        <v-list-item-group v-if="role == 'admin'" active-class="blue--text text--accent-5 mb-4">
          <v-list-item>
            <v-list-item-title>Menu admin</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/manageTeam">
            <v-list-item-icon><v-icon>mdi-book-open-variant</v-icon></v-list-item-icon>
            <v-list-item-title>Gestion staff</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/reportedPost">
            <v-list-item-icon>
              <v-icon>mdi-lead-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reported Posts</v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  data: function () {
    return {
      drawer: false,
      role: "visitor",
      userId: null,
      pseudo: "visiteur",
      avatar: "default",
    }
  },
  methods: {
    setUser: function () {
      
      if(sessionStorage.getItem('userId')){
        this.userId = sessionStorage.getItem('userId')

        axios.get(`http://localhost:3000/api/users/${this.userId}`)
        .then( (user) => {
          this.pseudo = user.data.pseudo
          this.role = user.data.role
          this.avatar = "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        })
        
        
      }
    },
    disconnect: function () {
      sessionStorage.clear();
      this.role = "visitor"
      this.userId = null
      this.pseudo = "visiteur"
      this.avatar = "default"
      window.location.href = '/'
      console.log("disco role: " + this.role)
    }
  },
  mounted: function ()  {
      this.setUser()
  }
};
</script>

<style>
</style>