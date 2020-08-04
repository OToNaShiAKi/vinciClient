<template>
  <div class="pa-5 overflow-hidden">
    <v-card class="mb-5 animate__animated animate__lightSpeedInRight" shaped to="game">
      <v-card-title>立即匹配</v-card-title>
      <v-card-subtitle>整起！拿奖！</v-card-subtitle>
    </v-card>
    <v-card class="mb-5 text-right animate__animated animate__lightSpeedInLeft" shaped to="rule">
      <v-card-title class="flex-row-reverse">游戏规则</v-card-title>
      <v-card-subtitle>没玩过《达芬奇密码》可以来瞅瞅</v-card-subtitle>
    </v-card>
    <v-card class="mb-5 animate__animated animate__lightSpeedInRight" shaped to="rank">
      <v-card-title>排行榜</v-card-title>
      <v-card-subtitle>最强大脑诞生于此</v-card-subtitle>
    </v-card>
    <v-card class="mb-5 text-right animate__animated animate__lightSpeedInLeft" shaped to="info">
      <v-card-title class="flex-row-reverse">个人信息</v-card-title>
      <v-card-subtitle>填写个人信息才可领奖哦~</v-card-subtitle>
    </v-card>
    <v-btn rounded block color="error" @click="dialog = true">退出登录</v-btn>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>确认退出？</v-card-title>
        <v-card-actions>
          <v-btn color="warning" text @click="dialog = false">取消</v-btn>
          <v-spacer />
          <v-btn color="error" text @click="logout">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapMutations(["Account"]),
    logout() {
      this.Account({});
      window.localStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

