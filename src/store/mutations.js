const Account = (state, info) => {
  state.user = info;
};

const Info = (state, info) => {
  state.user.name = info.name;
  state.user.phone = info.phone;
  state.user.uid = info.uid;
};

const Notify = (state, { type, message = "网络连接失败" }) => {
  state.notify = {
    show: true,
    type,
    message,
  };
};

const Progress = (state, show) => {
  state.progress = show;
};

export default {
  Account,
  Notify,
  Progress,
  Info,
};
