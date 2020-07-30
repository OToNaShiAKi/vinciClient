<template>
  <div>
    <section class="px-5 pt-5">
      <v-text-field label="姓名" v-model="name" />
      <v-text-field label="手机" type="tel" v-model="phone" />
      <v-text-field label="学号" type="tel" v-model="uid" />
      <v-btn rounded block outlined @click="info">提交</v-btn>
      <p class="caption text-center ma-3">领奖时请凭学生证及短信领取</p>
    </section>
    <v-btn to="/" class="button" color="primary" dark>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <section>
      <v-card class="ma-5 animate__animated animate__bounceIn">
        <v-card-title class="justify-space-between">
          <span>积分：{{ user.integral }}</span>
          <span>排名：{{ user.rank }}</span>
        </v-card-title>
        <v-card-subtitle>游戏场次：{{ user.race.first + user.race.second + user.race.third + user.race.forth }} 场</v-card-subtitle>
        <v-card-text class="game d-flex flex-wrap justify-space-between">
          <p>第一名：{{ user.race.first }} 场</p>
          <p>第二名：{{ user.race.second }} 场</p>
          <p>第三名：{{ user.race.third }} 场</p>
          <p>第四名：{{ user.race.forth }} 场</p>
        </v-card-text>
      </v-card>
      <ul class="caption ma-5">
        <li>积分 = 第一名场次数 × 10 + 第二名场次数 × 7 + 第三名场次数 × 4 + 第四名场次数 × 1</li>
        <li>中途离开没有积分</li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

const PhoneRule = /^1\d{10}$/;
const UidRule = /^U20(16|17|18|19|20)\d{5}$/;

export default {
  name: "Info",
  data: () => ({
    name: "",
    phone: "",
    uid: "U2020",
  }),
  created() {
    this.name = this.user.name;
    this.phone = this.user.phone;
    this.uid = this.user.uid;
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["Info"]),
    ...mapMutations(["Notify"]),
    info() {
      if (!this.name.length) {
        this.Notify({ type: "warning", message: "姓名不可为空" });
        return;
      }
      if (!PhoneRule.test(this.phone)) {
        this.Notify({ type: "warning", message: "手机号不合规" });
        return;
      }
      if (!UidRule.test(this.uid)) {
        this.Notify({ type: "warning", message: "学号不合规" });
        return;
      }
      const _id = this.$store.state.user._id;
      this.Info({
        _id,
        name: this.name,
        phone: this.phone,
        uid: this.uid,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.button {
  border-radius: 0 18px 18px 0;
}
.game {
  p {
    width: 50%;
  }
}
</style>
