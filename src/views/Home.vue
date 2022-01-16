<template>
  <v-container>
    <!-- si l'utilisateur est loggué -->
    <div v-if="isLogged">
      <!-- bandeau bienvenue groupomania -->
      <v-row class="justify-center  mb-5">
          <v-col cols="12">
            <v-img
            :src="require('@/assets/icon.png')"
            max-height="100"
            max-width="250"
            contain
          ></v-img>
          <h2>Bienvenue sur Groupomania</h2>
          </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <LastUsers />
        </v-col>
        <v-col cols="12" sm="8">
          <LastPosts />
        </v-col>
        
        </v-row>
    </div>
  </v-container>
</template>

<script>
import LastUsers from '../components/LastUsers.vue'
import LastPosts from '../components/LastPosts.vue'
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    LastUsers, LastPosts
    },
  data: function () {
    return {
      tab: null,
      isLogged: false,
    };
  },
  methods: {
  },
  computed: {
  },
  beforeMount() {
   if(this.$store.state.auth.user.role == 'visitor') {
     this.$router.push('/connect')
   }else {
     this.isLogged = true
     }
  },
  updated() {
  },
};
</script>
<style scoped>
</style>