<template>
  <v-container class="d-flex flex-column align-center">
    <div class="title text-center my-6">
      <h2>Connectez-vous pour utiliser Groupomania</h2>
    </div>

    <v-row class="">
      <v-col>
        <v-tabs center-active color="indigo" v-model="tab">
          <v-tab key="#login"> Se connecter </v-tab>
          <v-tab key="#signup"> Créer un compte </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="login"> <LoginForm /> </v-tab-item>
          <v-tab-item key="signup"> <SignupForm /> </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";

export default {
  name: "Connect",
  components: { LoginForm, SignupForm },
  data: function () {
    return {
      tab: "",
    };
  },
};
</script>

<style scoped>
</style>