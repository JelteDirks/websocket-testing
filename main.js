const ws = require("ws")

const ws_server_options_defaults = {
  port: 3000,
  host: "localhost",
}

const logs_object = {
  message_type: "get_logs",
  message: {
    start_time_msue: 1686296659639,
    end_time_msue: 1686297040235,
  }
};

const history_object = {
  message_type: "get_history",
  message: {
    requests: [
      {
        tag_id: "12345",
        start_time_msue: 1686296659639,
        end_time_msue: 1686297040235
      }
    ]
  }
};

const login_object = {
  message_type: "login",
  message: {
    username: "peercode",
    password: "12345"
  }
};

const visualization = {
  message_type: "get_visualization",
  message: {
    svg_name: "dbenv"
  }
}

const bad_login_object = {
  message_type: "login",
  message: {
    username: "bad",
    password: "12345"
  }
}


// override default server options with env variables here (from .env)
const ws_options = Object.assign(ws_server_options_defaults, {})

const ws_server = new ws.WebSocket(`ws://${ws_options.host}:${ws_options.port}`)

ws_server.onopen = function() {
  console.log("open");
  setTimeout(login, 0);
  setTimeout(viz, 1_000);

  setTimeout(function() {
    console.log("closing...");
    ws_server.close()
    process.exit();
  }, 10_000);
}

ws_server.onmessage = function(msg) {
  console.log("message received: " + msg.data);
}

ws_server.onclose = function() {
  console.log("close");
}

function viz() {
  const l = JSON.stringify(visualization);
  console.log("sending", l);
  ws_server.send(l);
}

function bad_login() {
  const l = JSON.stringify(bad_login_object);
  console.log("sending", l);
  ws_server.send(l);
}

function login() {
  const l = JSON.stringify(login_object);
  console.log("sending", l);
  ws_server.send(l);
}

function logs() {
  const l = JSON.stringify(logs_object);
  console.log("sending", l);
  ws_server.send(l);
}

function history() {
  const h = JSON.stringify(history_object);
  console.log("sending", h);
  ws_server.send(h);
}
