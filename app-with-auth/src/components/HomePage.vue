<template>
  <section>
      <h1 class="display-2">Authentication Demo</h1>
      <p class="subtitle my-3">
        This is a demo for the Authentication plugin that is available in the <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst repo</a>. This plugin encapsulates all the logic needed to keep track of a user's authentication by adding this data to the Vuex store. It also provides built in actions for logging in and signing up.
      </p>
      <p class="subtitle my-3">
        For this demo, click on the Dashboard button below. Notice how it does not take you to a new page and restricts access to this Home Page. Next, either login with 'test' as the username and password or signup with a new account. After successfully being authenticated in our mock server, you are issued a JWT token, which is stored in a HTTPOnly Cookie, and redirected back to the Home Page.
      </p>
      <p class="subtitle my-3">
      If you try to access the Dashboard page now, then your cookie will be checked and be allowed to view the protected Dashboard page because you have the JWT token.
      </p>
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
