<template>
  <section style="z-index: 1;">
      <h1 class="display-2">Authentication Demo</h1>
      <p class="subtitle my-3">
        This page demonstrates the Authentication plugin available in the <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst repo</a>.</p>

        <p>The plugin encapsulates all necessary logic to keep track of a user's authentication. It  provides built-in actions for logging in and signing up and stores that data to the Vuex store.</p>

        <h3>To Use</h3>
        <p>Notice that the 'Go to Protected Dashboard' button is disabled below. Next, either login with 'test' as the username and password, or signup with a new account.</p>

        <h3>How It Works</h3>
        <p>After successfully being authenticated in our mock server, you are issued a JWT token, which is stored in a HTTPOnly cookie, and redirected back to the Home Page. If you try to access the Dashboard page now, your cookie will be checked and because you have the JWT token you will be allowed to view the protected dashboard page.</p>
      <div>
        <router-link to='Dashboard' style="text-decoration:none;"><v-btn :disabled="authenticated"  color="primary" class="ml-0">Go to Protected Dashboard</v-btn></router-link>
      </div>
  </section>
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
  section {
    width:600px;
    margin:auto;
  }
</style>
