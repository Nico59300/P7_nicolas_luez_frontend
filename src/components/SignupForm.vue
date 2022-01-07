<template>
  <v-container>
    <div>
      <h3 class="text-center">Créer votre compte</h3>
      <div
        id="message"
        v-bind:class="{ green: isValid, red: isNotValid }"
        v-if="resMessage.length > 0"
      >
        <p>{{ resMessage }}</p>
      </div>
    </div>
    <v-form v-model="formValidity">
      <v-text-field
        v-model="pseudo"
        label="Pseudo"
        :rules="pseudoRules"
        required
      ></v-text-field>

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

      <v-text-field
        v-model="comfirmPassword"
        label="Comfirm password"
        type="password"
        :rules="comfirmPasswordRules"
        required
      ></v-text-field>

      <v-btn
        class="mr-4"
        color="success"
        :disabled="!formValidity"
        @click="register"
      >
        Create account
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "SignupForm",
  data: function () {
    return {
      email: "",
      password: "",
      pseudo:"",
      comfirmPassword: "",
      resMessage: "",
      isValid: false,
      isNotValid: false,
      emailRules: [(value) => !!value || "email is required"],
      passwordRules: [
        (value) => !!value || "password is required",
        (value) => value.length >= 8 || "Minimum length is 8",
      ],
      comfirmPasswordRules: [
        (value) => !!value || "you need to comfirm password",
        (value) => value == this.password || "password doesn't match",
      ],
      pseudoRules: [
        (value) => !!value || "veuillez entrer un pseudo"
      ],
      formValidity: false,
    };
  },
  methods: {
    register: function () {
      axios
        .post(`http://localhost:3000/api/auth/signup`, {
          email: this.email,
          password: this.password,
          pseudo: this.pseudo
        })
        .then((res) => {
          console.log("res : " + res);
          if (res.status == 400) {
            console.log(res.message);
            
            this.resMessage = "email déjà utilisé";
          }
          if (res.status == 201) {
            console.log(res.message);
            this.isValid = true;
            this.resMessage = "compte utilisateur créé";
            window.location.href = "/login";
          }
        })
        .catch((err) => {
          console.log("erreur catch : " + err.toJSON().message);
          this.isNotValid = true;
          if (err.response.status == 400) {
            console.log("isnotvalid : " + this.isNotValid);
            this.resMessage = "email déjà utilisé";
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