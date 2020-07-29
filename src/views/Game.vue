<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular :size="120" indeterminate>匹配中</v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
// import Vinci from "./../plugins/vinci";

export default {
  name: "Game",
  data: () => ({
    overlay: true,
  }),
  created() {
    /* const user = this.$store.state.user;
    this.game = new Vinci(user);
    console.log(this.game); */
  },
};
</script>