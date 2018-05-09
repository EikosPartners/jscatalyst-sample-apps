<template>
  <main>
    <section class="left">
      <h1 class="display-3" style="margin-left: 40px;">Authentication Demo</h1>
      <p class="headline" style="margin-left: 40px;">
        This page demonstrates the Authentication plugin available in the <a href="https://github.com/EikosPartners/jscatalyst" target="_blank" style="text-decoration: none;">JS Catalyst repo</a>.
      </p>
    </section>
    <section class="right">
      <div class="card">
        <p class="mb-4">The plugin encapsulates all necessary logic to keep track of a user's authentication. It  provides built-in actions for logging in and signing up and stores that data to the Vuex store.</p>
        <div class="my-3">
          <h3 class="title mb-2">To Use</h3>
          <p>Notice that the 'Go to Protected Dashboard' button is disabled below. Next, either login with 'test' as the username and password, or signup with a new account.</p>
        </div>
        <div class="my-3">
          <h3 class="title mb-2">How It Works</h3>
          <p>After successfully being authenticated in our mock server, you are issued a JWT token, which is stored in a HTTPOnly cookie, and redirected back to the Home Page. If you try to access the Dashboard page now, your cookie will be checked and because you have the JWT token you will be allowed to view the protected dashboard page.</p>
        </div>
        <div>
          <router-link to='Dashboard' style="text-decoration:none;"><v-btn :disabled="authenticated"  color="primary" class="ml-0">Go to Protected Dashboard</v-btn></router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

  export default {
    components: {

    },
    computed: {
      authenticated: function() {
        return !this.$store.state.authMod.authenticated
      },
    }
  }
</script>

<style lang="css" scoped>
  main {
    height: 100%;
    display: grid;
    grid-gap: 40px;
    justify-content: space-around;
    /* background-image: radial-gradient(ellipse farthest-side at 100% 100%, #3D59FF 30%, #30398a 50%, #0277BD 110%); */
    background-color: #E0E0E0;
  }

  section {
    margin: auto 80px;
  }

  .left {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }

  .right {
    grid-column: 2 / 2;
    grid-row: 1 / 1;
  }

  .card {
    padding: 40px;
    background-color: #FFF;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #999;
  }
</style>
