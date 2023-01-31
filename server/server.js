const net = require("net");
const server = net.createServer();
const serverPort = 4000;
const connections = new Map();

const sendMessage = (message, origin) => {
  for (const socket of connections.keys()) {
    if (socket !== origin) {
      socket.write(message);
    }
  }
};
//CONECCION DEL PUERTO
server.listen(serverPort, () => {
  console.log("SERVER ESCUCHADO EN EL PUERTO: ", server.address().port);
  server.on("connection", (socket) => {
    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;
    socket.setEncoding('utf-8')
    socket.on("data", (data) => {
      if (!connections.has(socket)) {
        let isRegistered =false;

        if(!isRegistered) {
          connections.set(socket, data);
        console.log(remoteSocket, " CONECTADO CON EL NOMBRE DE ", data);
        socket.write('Connection');
        }
      }else {
        console.log(`[${connections.get(socket)}]: ${data}`);
  
          const fullMessage = `[${connections.get(socket)}]: ${data}`;
          console.log(`${remoteSocket} -> ${fullMessage}`);
          sendMessage(fullMessage, socket);
      }
    });

    socket.on("error", (err) => {
      console.error(err.message);
      process.exit(1);
    });
  
    socket.on("close", () => {
      console.log("COMUNICACION FINALIZADA CON ", connections.get(socket));
      connections.delete(socket);
    });
  });
});
