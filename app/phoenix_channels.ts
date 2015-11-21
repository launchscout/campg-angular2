import { Socket } from "phoenix_js";
import {EventEmitter, Observable } from 'angular2';
import {Injectable, bind} from 'angular2';

class PhoenixChannel {

  constructor(socket, topic, options = {}) {
    this.socket = socket;
    this.topic = topic;
    this.channel = this.socket.channel(topic, options);
  }

  join(options = {}) {
    let joined = this.channel.join();
    return new Observable( (observer) => {
      joined
        .receive("ok", resp => {
          console.log("connected", resp);
          observer.next(resp);
        })
        .receive("error", resp => { observer.error(resp); });
    });
  }

  observeMessage(message) {
    return new Observable( (observer) => {
      this.channel.on(message, (resp) => {
        console.log(message, resp);
        observer.next(resp);
      });
    });
  }
}

@Injectable()
class PhoenixChannels {

  constructor() {
    this.socket =  new Socket("ws://localhost:4000/socket");
    this.socket.connect();
  }

  channel(topic) {
    return new PhoenixChannel(this.socket, topic);
  }
}

export PhoenixChannel;
export default PhoenixChannels;
