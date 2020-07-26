<template>
  <div class="pa-5">
    <v-text-field label="昵称" v-model="nick" />
    <v-text-field label="密码" v-model="password" />
    <v-btn
      rounded
      block
      outlined
      :disabled="!nick.length || password.length < 6"
      @click="account"
    >注册 / 登录</v-btn>
    <p class="caption text-center mt-3">若账号不存在，则为注册</p>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    nick: "",
    password: "",
  }),
  methods: {
    ...mapActions(["Account"]),
    account() {
      this.Account({
        nick: this.nick,
        password: md5(this.password),
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>