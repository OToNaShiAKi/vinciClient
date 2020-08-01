import io from "socket.io-client";

class Player {
  constructor(options) {
    this.player = options._id;
    this.integral = options.integral;
    this.InitSocket();
  }
  InitGame() {
    this.card = [];
  }
  InitSocket() {
    const path =
      process.env.NODE_ENV === "development"
        ? "localhost:9090"
        : "hustmaths.top:9090";
    this.socket = io.connect(path);
  }
}

export default Player;
