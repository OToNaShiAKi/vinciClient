import request from "./../plugins/request";
import router from "./../router/";
import { setItem } from "./../plugins/storage";

const Account = async ({ commit }, info) => {
  try {
    const result = await request.post("/user/account", info);
    setItem("user", info);
    commit("Account", result.data);
    router.replace("/");
  } catch (error) {
    console.log(error);
    router.replace("/login");
  }
};

const Info = async ({ commit }, info) => {
  try {
    const result = await request.post("/user/info", info);
    commit("Info", result.data);
  } catch (error) {
    console.log(error);
  }
};

export default {
  Account,
  Info,
};
