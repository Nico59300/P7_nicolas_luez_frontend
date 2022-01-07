<template>
  <v-container>
    <div v-if="isLogged">
      <v-row class="justify-center align-center mb-5">
        <v-col col="12" md="4" lg="3">
          <v-img
            :src="require('@/assets/icon.png')"
            max-height="100"
            max-width="250"
            contain
          ></v-img>
        </v-col>
        <v-col col="12" md="4" lg="3">
          <h2>Bienvenue sur Groupomania</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-col>
            <h3>les derniers posts</h3>
          </v-col>

          <v-col>
            <h3>les posts les plus likés</h3>
          </v-col>
        </v-col>
        <v-col class="justify-end" col="3">
          <h3>Les derniers inscrits</h3>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <div class="title text-center my-6">
        <h2>Connectez-vous pour utiliser Groupomania</h2>
      </div>

      <div>
        <v-tabs centered grow color="indigo" v-model="tab">
          <v-tab key="#signup"> Créer un compte </v-tab>

          <v-tab key="login"> Se connecter </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="signup">
            <SignupForm />
          </v-tab-item>
          <v-tab-item key="login">
            <LoginForm />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: { LoginForm, SignupForm },
  data: function () {
    return {
      isLogged: false,
      tab: null,
    };
  },
  methods: {
    checkIsLogged: function () {
      if (
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("token").length > 0
      ) {
        this.isLogged = true;
        console.log("someone is logged");
      }
    },
  },
  mounted() {
    this.checkIsLogged();
  },
};
</script>
<style scoped>
</style>