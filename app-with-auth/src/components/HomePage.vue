<template>
  <div class="header-title" style="z-index: 1;">
      <h1 class="display-2">Authentication</h1>
      <p class="subtitle my-3">
        This is a demo the Authentication plugin available in the JS Catalyst repo. This plugin encapsulates all the logic needed to keep track of a user's authentication by adding this data to the Vuex store. It also provides built in actions for logging in and signing up. For this demo first try clicking on the Dashboard button below. Notice how it does not take you to a new page and restricts access to this Home Page. Next either login with 'test' as the username and password or signup with a new account. After successfully being authenticated in our mock server you are issued a JWT token, which is stored in a HTTPOnly Cookie, and redirected back to the Home Page. If you try to access the Dashboard page now, your cookie will be checked and because you have the JWT token you will be allowed to view the protected Dashboard page.
      </p>
      <div>
        <router-link to='Dashboard' style="text-decoration:none;"><v-btn :disabled="authenticated"  color="primary" class="ml-0">Go to Protected Dashboard</v-btn></router-link>
      </div>
  </div>
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

<style lang="css">
.header-title {
  width:600px;
  margin:auto;
}
</style>
