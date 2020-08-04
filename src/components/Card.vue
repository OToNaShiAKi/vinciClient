<template>
  <section
    :style="{ backgroundColor: color, color: color == 'black' ? 'white' : 'black' }"
    :class="choose && 'choose animate__animated animate__heartBeat'"
    class="card text-center"
    @click="ChoseCard"
  >{{ card }}</section>
</template>

<script>
export default {
  name: "Card",
  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => ["black", "white"].includes(value),
    },
    value: {
      type: Number,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
    belong: {
      type: String,
      default: null,
    },
    canChose: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    choose: false,
  }),

  computed: {
    card() {
      const _id = this.$store.state.user._id;
      if (!this.value) return "?";
      if (this.show || this.belong === _id) return this.value;
      return "?";
    },
  },
  methods: {
    ChoseCard() {
      if (!this.canChose) return;
      this.choose = !this.choose;
      this.$emit("chose", this.choose);
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  box-sizing: border-box;
  border: 2px solid;
  height: 54px;
  width: 36px;
  border-radius: 6px;
  line-height: 54px;
  margin: 3px;
}
.choose {
  color: #ffc107 !important;
  border-color: #ffc107;
}
</style>>
