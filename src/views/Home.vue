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
    <v-card class="mb-5 animate__animated animate__lightSpeedInRight" shaped to="rule">
      <v-card-title>排行榜</v-card-title>
      <v-card-subtitle>最强大脑诞生于此</v-card-subtitle>
    </v-card>
    <v-card class="mb-5 text-right animate__animated animate__lightSpeedInLeft" shaped to="info">
      <v-card-title class="flex-row-reverse">个人信息</v-card-title>
      <v-card-subtitle>填写个人信息才可领奖哦~</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

