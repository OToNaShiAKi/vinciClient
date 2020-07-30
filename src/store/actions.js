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
    await request.post("/user/info", info);
    commit("Info", info);
  } catch (error) {
    console.log(error);
  }
};

export const GameRank = async () => {
  const result = await request.get("/user/rank");
  return result.data;
};

export default {
  Account,
  Info,
};
