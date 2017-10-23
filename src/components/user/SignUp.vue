<template>
<v-layout row wrap>
    <v-flex md6 offset-md3>
      <h3>SignUp</h3>
        <v-form v-model="valid" ref="form">
            <v-text-field label="Email"v-model="email" :rules="emailRules" type="email" required />
            <v-text-field label="Password" v-model="password" type="password"  required />
             <div class="text-xs-center">
                <v-btn @click="submit" :disabled="!valid">submit</v-btn>
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
          valid: true,
          error: null,
          email: '',
          password: '',      
          emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ]
      }
  },
  beforeCreate: function () {
        if (this.$store.state.isUserLoggedIn) {
         this.$router.push({name: 'Profil'})
        }
    },
  methods: {
    submit () {
        if (this.$refs.form.validate()) {
          console.log(this.email, this.password);
            // Native form submission is not yet supported
          let uri = 'http://localhost:8080/register';
          this.axios.post(uri, {email: this.email, password: this.password})
                  .then(
                    (response) => {
                    this.$router.push({name: 'SignIn'})
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