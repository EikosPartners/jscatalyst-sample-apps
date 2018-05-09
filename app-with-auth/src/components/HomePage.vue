<template>
  <main>
    <section class="left white--text">
      <h1 class="display-3">Authentication Demo</h1>
      <p class="headline">
        This page demonstrates the Authentication plugin available in the <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst repo</a>.
      </p>
    </section>
    <section class="right">
      <div class="card">
        <p class="mb-5">The plugin encapsulates all necessary logic to keep track of a user's authentication. It  provides built-in actions for logging in and signing up and stores that data to the Vuex store.</p>
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
    background-image: radial-gradient(ellipse farthest-side at 100% 100%, #3D59FF 30%, #30398a 50%, #1A247D 110%);
  }

  section {
    margin: auto 80px;
  }

  /* .bg {
    background-image: radial-gradient(ellipse farthest-side at 100% 100%, #3D59FF 30%, #30398a 50%, #1A247D 110%);
  } */

  .left {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
  }

  .right {
    grid-column: 2 / 2;
    grid-row: 1 / 1;
    background-color: #FFF;
  }

  .card {
    padding: 40px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px #333;
  }
</style>
