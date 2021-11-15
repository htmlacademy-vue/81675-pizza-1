import Api from "@/services/Api";
import jwtService from "@/services/jwtService";

export default {
  namespaced: true,
  state: {
    token: "",
    loginError: "",
    user: {
      avatar: "",
      email: "",
      id: "",
      name: "",
      phone: "",
    },
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    isAuthed(state) {
      return state.token;
    },
  },
  actions: {
    async init({ commit }) {
      const token = jwtService.getToken();
      if (!token) return;

      try {
        const userResult = await Api.whoAmI(token);
        commit("setState", { token, user: userResult.data });
      } catch {
        console.log("invalid token");
      }
    },
    async login({ commit }, payload) {
      commit("setState", { loginError: "" });
      try {
        const loginResult = await Api.login(payload);
        const { token } = loginResult.data;
        jwtService.saveToken(token);
        const userResult = await Api.whoAmI(token);

        commit("setState", {
          token,
          user: userResult.data,
        });
      } catch (e) {
        const errorMessage =
          e.response?.data?.error?.message ?? "Ошибка аутентификации";
        commit("setState", { loginError: errorMessage });
        throw Error(errorMessage);
      }
    },
    logout({ state }) {
      state.token = "";
    },
  },
};
