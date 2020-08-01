<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">排名</th>
            <th class="text-center">昵称</th>
            <th class="text-center">游戏场次</th>
            <th class="text-center">积分</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="(item, index) in rank"
            :key="item._id"
            :class="`animate__animated animate__lightSpeedIn${index % 2 ? 'Left' : 'Right'}`"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.nick }}</td>
            <td>{{ item.race.first + item.race.second + item.race.third + item.race.forth }}</td>
            <td>{{ item.integral }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="caption ma-3">
      <h6>排位优先级：</h6>
      <p style="text-indent: 2em;">积分 > 第一名场次数 > 第二名场次数 > 第三名场次数 > 第四名场次数 > 注册时间</p>
    </div>
    <v-btn fixed to="/" class="back" color="primary" dark>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn fixed right bottom fab color="primary" dark small @click="GameRank">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { GameRank } from "./../store/actions";

export default {
  name: "Rule",
  data: () => ({
    rank: [],
  }),
  created() {
    this.GameRank();
  },
  methods: {
    async GameRank() {
      try {
        this.rank = await GameRank();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

