<template>
  <v-container>
    <div>
      <h3 class="text-center">Se connecter à Groupomania</h3>
      <div
        id="message"
        v-bind:class="{'green' : isValid, 'red': isNotValid }"
        v-if="resMessage.length > 0"
      >
        <p>{{ resMessage }}</p>
      </div>
    </div>
    <v-form v-model="formValidity">
      <v-text-field
        v-model="email"
        label="Email"
        :rules="emailRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="passwordRules"
        required
      ></v-text-field>

      <v-btn
        class="mr-4"
        color="success"
        :disabled="!formValidity"
        @click="login"
      >
        login
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "LoginForm",
  data: function () {
    return {
      email: "",
      password: "",
      resMessage: "",
      isValid: false,
      isNotValid: false,
      emailRules: [(value) => !!value || "email is required"],
      passwordRules: [(value) => !!value || "password is required"],
      formValidity: false,
    };
  },
  methods: {
    login: function () {
      axios
        .post(`http://localhost:3000/api/auth/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log("response : " + res);
          if (res.status == 200) {
            this.isValid = true;
            console.log('valid : ' + this.isValid)
            this.resMessage = res.data.message;
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userId", res.data.userId);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log("erreur catch : " + err.toJSON().message);
          this.isNotValid = true;
          if (err.response.status == 404) {
            console.log("isnotvalid : " + this.isNotValid)
            this.resMessage = "Utilisateur inconnu";
          }
          if (err.response.status == 400) {
            this.resMessage = "Informations erronnées";
          }
        });
    },
  },
};
</script>

<style scoped>
#message {
  height: 50px;
  text-align: center;
  margin-bottom: 1rem;
}
#message p {
  line-height: 50px;
}
.green {
  background-color: green;
  color: white;
}
.red {
  background-color: tomato;
  color: white;
}
</style>