<template>
    <v-app>
        <v-toolbar white color="primary">
            <v-toolbar-title class="white--text">Facebook powered - APP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-items class="hidden-sm-and-down">
                <router-link :to="{name: 'Profil'}" class="btn btn--flat btn--raised" v-if="$store.state.isUserLoggedIn">
                    Home
                </router-link>
                <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">Log Out</v-btn>
                <router-link :to="{name: 'SignIn'}" class="btn btn--flat btn--raised" v-if="!$store.state.isUserLoggedIn">
                    Signin
                </router-link>
                <router-link :to="{name: 'SignUp'}" class="btn btn--flat btn--raised" v-if="!$store.state.isUserLoggedIn">
                    Signup
                </router-link>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
            </v-content>
        </main>
    </v-app>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', {})
        this.$router.push('/');
    }
  }
}
</script>
