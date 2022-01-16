<template>
  <header>
    <v-app-bar app color="indigo" class="white--text">
      <v-app-bar-nav-icon
        @click="drawer = true"
        color="white"
      ></v-app-bar-nav-icon>
      <div to="/" class="text-center">
        <v-img
          :src="require('@/assets/brand-name.png')"
          width="160"
          contain
        ></v-img>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list nav dense>
        <!-- nav header -->
        <v-list-item-group active-class="indigo--text text--accent-5 mb-5">
          <v-list-item disabled>
            <v-list-item-avatar>
              <v-icon v-if="user.avatar == 'default'"
                >mdi-account-circle</v-icon
              >
              <v-img v-else :src="user.avatar"></v-img>
            </v-list-item-avatar>
            <div>
              <span class="indigo--text">Bienvenu {{ user.pseudo }}</span>
            </div>
          </v-list-item>
          <!-- if user  -->

          <v-list-item v-if="user.role != 'visitor'">
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title @click="disconnect">Se déconnecter</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/">
            <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <!-- user navigation links  -->
        <v-list-item-group
          v-if="user.role !== 'visitor'"
          active-class="blue--text text--accent-5 mb-5"
        >
          <v-list-item disabled class="blue--text">
            <v-list-item-title>Menu posts</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/posts">
            <v-list-item-icon
              ><v-icon>mdi-book-open-variant</v-icon></v-list-item-icon
            >
            <v-list-item-title>Voir les posts et partager</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-list-item-group
          v-if="user.role == 'admin'"
          active-class="red--text text--accent-5 mb-5">
          <v-list-item disabled class="red--text">
            <v-list-item-title>Menu admin</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/manageTeam">
            <v-list-item-icon
              ><v-icon>mdi-book-open-variant</v-icon></v-list-item-icon
            >
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
export default {
  name: "Header",
  data: function () {
    return {
      drawer: false,
    };
  },
  methods: {
    disconnect: function () {
      // update user in store
      this.$store.dispatch("logout");
      sessionStorage.clear();
      this.drawer = false;
      window.location.href = "/";
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted: () => {},
};
</script>

<style>
</style>