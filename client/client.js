const { Socket } = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const end = "end";
const error = (message) => {
  console.error(message);
  process.exit(1);
};

const connect = (host, port) => {
  console.log(`CONECTANDO AL PUERTO ${host}:${port}`);

  const socket = new Socket();
  socket.connect({ host, port });
  socket.setEncoding("utf-8");

  socket.on("connect", () => {
    console.log("ESTAS CONECTADO");

    readline.question("ELIGE TU NOMBRE DE USUARIO: ", (username) => {
      socket.write(username);
      console.log(`ESCRIBE CUALQUIER MENSAJE, Y ESCRIBE ${end} PARA TERMINAR LA COMUNICACION`);
    });

    readline.on("line", (message) => {
      socket.write(message);
      if (message === end) {
        socket.end();
      }
    });

    socket.on("data", (data) => {
      console.log(data);
    });
  });

  socket.on("error", (err) => error(err.message));

  socket.on("close", () => {
    console.log("DESCONECTADO, VUELVA PRONTO");
    process.exit(0);
  });
};

connect("192.168.89.199", 4000);