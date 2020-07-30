<template>
  <div>
    <v-overlay :value="match.show" class="text-center">
      <v-progress-circular :size="120" indeterminate>
        匹配中
        <br />
        {{ match.group }} / 4
      </v-progress-circular>
    </v-overlay>
    <v-btn fixed to="/" v-show="match.show" class="back" color="primary" dark>
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </div>
</template>

<script>
// import Vinci from "./../plugins/vinci";

export default {
  name: "Game",
  data: () => ({
    match: {
      show: true,
      group: 0,
    },
  }),
  created() {
    /* const user = this.$store.state.user;
    this.game = new Vinci(user);
    console.log(this.game); */
  },
};
</script>
