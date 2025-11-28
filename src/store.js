import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: JSON.parse(localStorage.getItem("10ant_isl")) || false,
    userProfile: JSON.parse(localStorage.getItem("10ant_up")) || {},
    loading: false,
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    logUserIn(data) {
      this.isLoggedIn = true;
      this.userProfile = data;
      localStorage.setItem("10ant_up", JSON.stringify(data));
      localStorage.setItem("10ant_isl", JSON.stringify(true));
    },
    setisLoading() {
      this.loading = !this.loading;
    },
    logUserOut() {
      this.isLoggedIn = false;
      localStorage.removeItem("10ant_up");
      localStorage.removeItem("10ant_isl");
      localStorage.removeItem("_10at_");
      localStorage.removeItem("selected_role");
      this.userProfile = {};
    },
  },
});
// Optionally, you can also set up a watcher to update localStorage
// useUserStore.$subscribe((mutation, state) => {
//   localStorage.setItem('10ant_up', JSON.stringify(state.userProfile));
//   localStorage.setItem('10ant_isl', JSON.stringify(state.isLoggedIn));
// });
