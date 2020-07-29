import axios from "axios";
import store from "./../store/";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "/vinci/"
    : "http://hustmaths.top:9090/";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
    store.commit("Progress", true);
    return request;
  },
  (error) => {
    console.log(error);
    store.commit("Notify", "error", error.message);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit("Progress", false);
    if (response.data.status !== 200) {
      store.commit("Notify", { type: "error", message: response.data.message });
      throw response.data;
    } else {
      store.commit("Notify", {
        type: "success",
        message: response.data.message,
      });
      return response.data;
    }
  },
  (error) => {
    console.log(error);
    store.commit("Progress", false);
    store.commit("Notify", "error", error.message);
  }
);

export default axios;
