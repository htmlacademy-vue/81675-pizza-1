export default {
  namespaced: true,
  state: {
    isAuthed: false,
  },
  mutations: {
    login(state) {
      state.isAuthed = true;
    },
    logout(state) {
      state.isAuthed = false;
    },
  },
};
