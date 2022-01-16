<template>
  <v-container id="container">
    <div>
      <h3 class="text-center pb-3">Se connecter à Groupomania</h3>
      
      <div
        id="message"
        v-bind:class="{ green: isValid, red: notValid }"
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
// @ is an alias to /src

export default {
  name: "LoginForm",
  data: function () {
    return {
      email: "",
      password: "",
      emailRules: [(value) => !!value || "email is required"],
      passwordRules: [(value) => !!value || "password is required"],
      formValidity: false,
    };
  },
  methods: {
    login: function () {
      this.$store.dispatch("logUser", {
        email: this.email,
        password: this.password,
      })
      
    },
    getLoggedUser: function () {
      console.log(this.isLogged)
    }
  },
  computed: {
    resMessage() {
      return this.$store.state.auth.authMessage;
    },
    isValid() {
      return this.$store.state.auth.isValid;
    },
    notValid() {
      return this.$store.state.auth.notValid;
    },
    userRole() {
      return this.$store.state.auth.user.role;
    }
  },
  updated() {
    if(this.userRole !== "visitor") {
      console.log("logged")
      setTimeout(() => {
        this.$router.push('/')
      }, 1500);
    }
  }
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