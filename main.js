const ws = require("ws")

const ws_server_options_defaults = {
  port: 3000,
  host: "localhost",
}

const logs_object = {
  message_type: "get_logs",
  message: {
  }
};

const history_object_new = {
  message_type: "get_history",
  message: {
    requests: [
      {
        tag_id: "24050369",
        start_time_msue: Date.now() - 10000000,
        end_time_msue: Date.now()
      }
    ]
  }
};

const history_object = {
  message_type: "get_history",
  message: {
    requests: [
      {
        tag_id: "1234",
        start_time_msue: 0,
        end_time_msue: new Date().getTime()
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

const anchor_live = {
  message_type: 'set_anchor_data',
  message: [
    {
      anchor_id: '749951546',
      anchor_name: 'triplemid',
      location: {
        X: 7.35399,
        Y: 15.0361,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'erik'
      }
    },
    {
      anchor_id: '381010256',
      anchor_name: 'roelabovecabinet',
      location: {
        X: 7.35399,
        Y: -0.20,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'roel'
      }
    },
    {
      anchor_id: '1486462805',
      anchor_name: 'booksright',
      location: {
        X: 0.10,
        Y: 0.10,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'erik'
      }
    },
    {
      anchor_id: '580348575',
      anchor_name: 'booksleft',
      location: {
        X: 0.10,
        Y: 2.75436,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'erik'
      }
    },
    {
      anchor_id: '1759330419',
      anchor_name: 'tripleright',
      location: {
        X: 7.35399,
        Y: 2.75436,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'erik'
      }
    },
    {
      anchor_id: '1247604541',
      anchor_name: 'tripleleft',
      location: {
        X: 7.35399,
        Y: 0.1,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'erik'
      }
    },
    {
      anchor_id: '215247431',
      anchor_name: 'Pillar',
      location: {
        X: 5.91952,
        Y: -7.01314,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'roel'
      }
    },
    {
      anchor_id: '378522829',
      anchor_name: 'roelabovedoor',
      location: {
        X: 3.75967,
        Y: -0.2,
        Z: 0.0,
        floor_name: 'Floor 1',
        group_name: 'roel'
      }
    }
  ]
};

// override default server options with env variables here (from .env)
const ws_options = Object.assign(ws_server_options_defaults, {})

let ws_server;

ws_server = new ws.WebSocket(`ws://${ws_options.host}:${ws_options.port}`);

ws_server.onopen = function() {
  console.log("open");
  setTimeout(login, 500);
  setTimeout(anchor, 1000);

  setTimeout(() => {
    ws_server.close();
    process.exit();
  }, 5_000);
}

ws_server.onmessage = function(msg) {
  console.log("message received: " + msg.data);
}

ws_server.onclose = function() {
  console.log("...closed");
}

function anchor() {
  const l = JSON.stringify(anchor_live);
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
