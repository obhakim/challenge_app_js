import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    access_token: null,
    isUserLoggedIn: false,
    user: null,
    albums: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = (token) ? true:false
    },
    SetUser(state, user) {
      state.user = user;
    },
    SetAccessToken(state, access_token) {
      state.access_token = access_token;
    },
    SetAlbums(state, albums) {
      state.albums = albums;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    SetUser({ commit }, user) {
      commit("SetUser", user);
    },
    SetAccessToken({ commit }, access_token) {
      commit("SetAccessToken", access_token);
    },
    SetAlbums({ commit }, albums) {
      commit("SetAlbums", albums);
    }
  },
});
