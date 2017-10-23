<template>
<v-layout row wrap>
    <v-flex md6 offset-md3>
          <h3>Login</h3>
        <v-form v-model="valid" ref="form">
            <v-text-field label="Email"v-model="email" type="email" required />
            <v-text-field label="Password" v-model="password" type="password"  required />
             <div class="text-xs-center">
                <v-btn @click="logIn" :disabled="!valid">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
             </div>
        </v-form>
    </v-flex>
</v-layout>
</template>

<script>
export default{
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            error: null,
            emailRules: [(v) => !!v || 'E-mail is required']
        }
    },
    beforeCreate: function () {
        if (this.$store.state.isUserLoggedIn) {
         this.$router.push({name: 'Profil'})
        }
    },
    methods: {
        logIn () {
            if (this.$refs.form.validate()) {
                console.log(this.email, this.password);
                // Native form submission is not yet supported
                let uri = 'http://localhost:8080/login';
                this.axios.post(uri, {email: this.email, password: this.password})
                    .then((response) => {
                        console.log(response.data)
                        this.$store.dispatch('setToken', response.data.token)
                        this.$store.dispatch('SetUser', response.data.user)
                        //this.$session.start();
                        this.$router.push('/profil');
                    },
                    (error) => {
                        this.error = error.response.data.error
                       console.log(error.response.data.error);
                    })
              }
        },
        clear () {
        this.$refs.form.reset();
        }
    }
}
</script>