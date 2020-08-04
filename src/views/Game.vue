<template>
  <div>
    <div class="text-center">
      <section>
        <div>牌堆</div>
        <div class="d-flex flex-wrap justify-center">
          <card v-for="(item, index) in cards" :key="index" :color="item.color" />
        </div>
      </section>
      <section>
        <div>{{ player.nick }}（我）</div>
        <div class="d-flex flex-wrap justify-center">
          <card v-for="(card, index) in player.cards" :key="index" :color="card.color" />
        </div>
      </section>
      <section v-for="item in player.with" :key="item._id">
        <div>{{ item.nick }}</div>
        <div class="d-flex flex-wrap justify-center">
          <card v-for="(card, index) in item.cards" :key="index" :color="card.color" />
        </div>
      </section>
      <section>
        <v-btn :disabled="chose.button" @click="chose.dialog = true">选牌</v-btn>
        <v-btn :disabled="guess.button">猜牌</v-btn>
      </section>
    </div>
    <v-overlay :value="match.show" class="text-center">
      <v-progress-circular :size="120" indeterminate>
        匹配中
        <br />
        {{ match.group }} / 4
      </v-progress-circular>
    </v-overlay>

    <v-btn fixed v-show="match.show" @click="dialog = true" class="back" color="primary" dark>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-dialog v-model="chose.dialog">
      <v-card>
        <v-card-title>可选择 {{ chose.count }} 张牌</v-card-title>
        <v-card-text class="d-flex flex-wrap justify-center">
          <card
            v-for="(item, index) in cards"
            :key="index"
            :color="item.color"
            ref="cards"
            can-chose
            @chose="ChoseCard(index)"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" text @click="GameChose">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>确认返回？</v-card-title>
        <v-card-text>返回主页后将退出房间，需要重新匹配</v-card-text>
        <v-card-actions>
          <v-btn color="warning" text @click="dialog = false">取消</v-btn>
          <v-spacer />
          <v-btn color="error" text @click="GameClose">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vinci, { RoomStatus } from "./../plugins/vinci";
import { mapMutations } from "vuex";
import Card from "./../components/Card.vue";

export default {
  name: "Game",
  components: { Card },
  data: () => ({
    match: {
      show: true,
      group: 1,
    },
    game: null,
    dialog: false,
    cards: [],
    chose: {
      dialog: false,
      count: 0,
      button: true,
      cards: [],
    },
    guess: {
      dialog: false,
      count: 0,
      button: true,
    },
  }),
  created() {
    const user = this.$store.state.user;
    this.player = new Vinci(user);
    this.player.InitSocket((socket) => {
      socket.on("player", (group) => {
        this.match.group = group;
      });
      socket.on("start", this.GameStart);
      socket.on("turn", this.GameTurn);
      socket.on("message", this.GameMessage);
      socket.on("cards", this.GameReciveCards);
    });
  },
  beforeDestroy() {
    this.GameClose();
  },
  methods: {
    ...mapMutations(["Notify"]),
    GameStart(players) {
      this.match.show = false;
      this.player.RoomStatus = RoomStatus.Playing;
      this.player.with = players.filter((item) => item._id !== this.player._id);
    },
    GameTurn(turn) {
      this.Notify({
        type: "info",
        message: `轮到${turn.play.nick}猜牌`,
      });
      if (turn.play._id === this.player._id) {
        this.chose.count = turn.chose;
        this.chose.dialog = true;
        this.chose.button = false;
      }
    },
    GameMessage(data) {
      this.Notify({
        type: "info",
        message: data.message,
      });
      if (data.status > 1000) {
        this.GameClose(data.message);
      }
    },
    GameClose() {
      this.player.socket.close();
      this.$router.replace("/");
    },
    GameReciveCards(cards) {
      this.cards = cards.all;
      this.player.cards = cards.mine;
      for (let item of this.player.with) {
        item.cards = cards[item._id];
      }
    },
    ChoseCard(index) {
      let cards = this.chose.cards;
      if (cards.includes(index)) {
        this.chose.cards = cards.filter((item) => item != index);
      } else {
        if (this.chose.count <= cards.length) {
          this.$refs.cards[index].choose = false;
          this.Notify({
            type: "info",
            message: "超出选择卡牌数量",
          });
          return;
        }
        cards.push(index);
      }
    },
    GameChose() {
      if (this.chose.button) return;
      const _id = this.player._id;
      const cards = this.chose.cards;
      this.player.socket.emit("ChoseCard", { _id, cards });
      this.chose.button = true;
      this.guess.button = true;
      this.chose.dialog = false;
      this.guess.dialog = false;
    },
  },
};
</script>
