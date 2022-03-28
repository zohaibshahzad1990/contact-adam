<!--<template>
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
</template>-->

<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;">
            <div class="card-body p-5">

              <h3 class="mb-5">Login</h3>

              <div class="form-outline mb-4">
                <strong>User Account</strong>
                <input class="form-control me-2" type="text"  id="u" name="u" placeholder="User Account" v-model="username" >
              </div>

              <div class="form-outline mb-4">
                <strong>Password</strong>
                <input class="form-control me-2" type="password" id="p" name="p" placeholder="Password" v-model="password">

              </div>
              <!-- <form>  
                <p>Username: 
                    <input type="text" id="a" name="username1"/>
                </p>
                <p>Password 
                  <input type="password" id="b" name="password1"/>
                </p>
                <p>
                  <input type="button" id="submit" name="submit" value="Submit" onclick = "showInfo(username1.value,password1.value)"/>
                  <input type="button" id="cancel" name="cancel" value="Cancel"/>
                </p>
              </form>>-->

              <!-- <input type="button" id="submit" name="submit" value="Submit" 
                onclick="showInfo(username1.value,password1.value)" >-->

              <button @click="login()" type="submit" class="btn btn-primary">Login</button>



            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
