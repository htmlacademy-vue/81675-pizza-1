import Api from "@/services/Api";
import jwtService from "@/services/jwtService";

const getEmptyUser = () => ({
  avatar: "",
  email: "",
  id: "",
  name: "",
  phone: "",
});

export default {
  namespaced: true,
  state: {
    loginError: "",
    user: getEmptyUser(),
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    isAuthed(state) {
      return !!state.user?.id;
    },
  },
  actions: {
    async init({ commit, dispatch }) {
      const token = jwtService.getToken();
      if (!token) return;

      try {
        const userResult = await Api.whoAmI(token);
        commit("setState", { token, user: userResult.data });

        dispatch("Address/fetchAddresses", null, { root: true });
      } catch {
        console.log("invalid token");
        jwtService.removeToken();
      }
    },
    async login({ commit, dispatch }, payload) {
      commit("setState", { loginError: "" });
      try {
        const loginResult = await Api.login(payload);
        const { token } = loginResult.data;
        jwtService.saveToken(token);
        dispatch("init");
      } catch (e) {
        const errorMessage =
          e.response?.data?.error?.message ?? "Ошибка аутентификации";
        commit("setState", { loginError: errorMessage });
        throw Error(errorMessage);
      }
    },
    async logout({ commit }) {
      await Api.logout();
      commit("setState", { user: getEmptyUser() });
    },
  },
};
