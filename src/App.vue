<template>
  <v-app>
    <v-progress-linear indeterminate color="primary" absolute :active="progress" />
    <keep-alive>
      <router-view />
    </keep-alive>
    <v-snackbar
      :color="notify.type"
      :timeout="1500"
      v-model="notify.show"
      top
      dark
    >{{ notify.message }}</v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["notify", "progress"]),
  },
};
</script>

<style lang="less">
.back {
  border-radius: 0 18px 18px 0 !important;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
