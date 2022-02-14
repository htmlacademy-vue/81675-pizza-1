import Vuex from "vuex";
import modules from "@/store/modules";
import { cloneDeep } from "lodash";

export const generateMockStore = () => {
  return new Vuex.Store({
    modules: cloneDeep(modules),
  });
};
