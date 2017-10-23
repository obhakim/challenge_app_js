<template>
 <v-container fluid="fluid" class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card height="185px" flat color="white">
          <v-card-text>
            <div>
              <h5>Hello {{username}}</h5>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card height="185px" flat color="white">
              <fb-signin-button
                :params="fbSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
                v-if="!$store.state.access_token">
                <v-btn round color="blue darken-4" dark >
                Link to Facebook
                </v-btn>
              </fb-signin-button>
                <v-btn round color="blue darken-4" dark 
                @click="unlinkFacebook"
                v-if="$store.state.access_token">
                Inlink to Facebook</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="$store.state.access_token">
      <v-flex md12 cyon>
        <lightbox :nav="true" :images="pictures"></lightbox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
window.fbAsyncInit = function() {
    FB.init({
      appId      : '', // use your facebook app-id
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      },
      username: this.$store.state.user.email,
      pictures: this.$store.state.albums
    }
  },
  beforeCreate: function () {
        if (!this.$store.state.isUserLoggedIn) {
         this.$router.push('/')
        }
  },
  methods: {
    onSignInSuccess (response) {
       var access_token = FB.getAuthResponse()['accessToken']
       console.log(access_token)
        this.$store.dispatch('SetAccessToken', access_token)
  
        FB.api('/me', 'GET', {"fields":"albums{photos{picture}}", "access_token":access_token},
            response => {
              console.log(response)
                var albums = (response) ? response.albums:[];
                  var data = [];

                for (var i in albums.data) {

                  for (var j in albums.data[i].photos.data) { 

                      data.push({src: albums.data[i].photos.data[j].picture})
                  }
                }
                this.pictures = data
                this.$store.dispatch('SetAlbums', data)

            }
        );
      // FB.api('/me', dude => {
      //  // console.log(dude)
      // })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    unlinkFacebook () {
       this.$store.dispatch('SetAccessToken', null)
    }
  }
}
</script>

<style scoped>
/* .fb-signin-button {
  // This is where you control how the button looks. Be creative! 
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
} */
</style>
