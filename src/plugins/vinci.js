import io from "socket.io-client";

export const RoundTotalPlayer = 4;
export const RoomStatus = {
  Playing: 1,
  Waiting: -1,
  Done: 2,
};

class Player {
  constructor(options) {
    this.RoomStatus = RoomStatus.Waiting;
    this._id = options._id;
    this.integral = options.integral;
    this.nick = options.nick;
    this.cards = [];
  }

  InitSocket(call) {
    let path =
      process.env.NODE_ENV === "development"
        ? "localhost:9090"
        : "hustmaths.top:9090";
    path = path + "?_id=" + this._id;
    this.socket = io.connect(path);
    call(this.socket);
  }
}

export default Player;
