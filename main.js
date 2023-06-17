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

const set_anchor_data_object = {
  "message_type": "set_anchor_data",
  "message": [
    {
      "anchor_id": "2086079342",
      "anchor_name": "Testname 1",
      "location": {
        "x": 2.80, "y": 0.0,
        "floor_name": "floor 1",
        "group_name": "group 1",
      },
    },
    {
      "anchor_id": "1715682271",
      "location": {
        "x": 2.80, "y": 2.74,
        "group_name": "group 2",
        "floor_name": "floor 1"
      }
    },
    {
      "anchor_id": "378522829",
      "anchor_name": "Testname 3",
      "location": {
        "x": 0.0, "y": 0.0,
        "group_name": "group 1",
        "floor_name": "floor 1"
      }
    },
    {
      "anchor_id": "580348575",
      "location": {
        "x": 0.0, "y": 2.74,
        "group_name": "group 1",
        "floor_name": "floor 1"
      }
    }
  ]
}



// override default server options with env variables here (from .env)
const ws_options = Object.assign(ws_server_options_defaults, {})

const ws_server = new ws.WebSocket(`ws://${ws_options.host}:${ws_options.port}`)

ws_server.onopen = function() {
  console.log("open");
  setTimeout(bad_login, 0);
  setTimeout(login, 500);
  setTimeout(anchor, 1_000);

  setTimeout(function() {
    console.log("closing...");
    ws_server.close()
    process.exit();
  }, 5_000);
}

ws_server.onmessage = function(msg) {
  console.log("message received: " + msg.data);
}

ws_server.onclose = function() {
  console.log("close");
}

function anchor() {
  const l = JSON.stringify(set_anchor_data_object);
  console.log("sending", l);
  ws_server.send(l);
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
