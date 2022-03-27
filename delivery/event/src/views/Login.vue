<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">User name</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="username"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        v-model="password"
      />
    </div>

    <button @click="login()" type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Login",
  components: {},
  methods: {
    async login() {
      if (this.username == "" || this.password == "") {
        alert("All field required");
      } else {
        try {
          await axios.post("http://localhost:3000/user/login", {
            username: this.username,
            password: this.password,
          });
          window.isAuthenticated = true;
          this.$router.push("/home");
        } catch (e) {
          console.error(e);
          alert("username or passwor wrong");
        }
      }
    },
  },
};
</script>
