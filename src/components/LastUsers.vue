<template>
  <div>
        <h2 class=" mb-3">les derniers inscrits</h2>
        <div v-if="allUsers.length == 0">
          pas d'utilisateurs
        </div>
        <div v-else>
          <v-list>
            <v-list-item v-for="user in lastUsers" :key="user.uuid" class=" mb-3">
                <div>
                    <v-avatar color="indigo" size="56">
                      <v-icon v-if="user.avatar == 'default'" color="white">mdi-account</v-icon>
                      <v-img v-else src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-avatar>
                </div>
                <div>
                    <ul>
                        <li class="">{{ user.pseudo}}</li>
                        <li>role :  {{user.role}}</li>
                    </ul>
                </div>
            </v-list-item>
        </v-list>
        </div>
  </div>
</template>

<script>
export default {
  name: "LastRegistered",
  data: function () {
    return {
        avatar: "ldkfdfklf",
    };
  },
  methods: {
  },
  computed: {
    allUsers() {
      return this.$store.state.users.usersList
    },
    lastUsers() {
      return  this.allUsers.slice(0,5)
    }
  },
  beforeMount() {
    this.$store.dispatch('users/getAllUsers')
    
  },
  mounted() {
   
  },
  updated() {
    
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>

