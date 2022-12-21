import { Server } from "socket.io";

const socketController = (socket) => {
	console.log("Cliente conectado 🤠");

	socket.on("disconnect", () => {
		console.log(`Cliente con id ${socket.id} desconectado 😟`);
	});

	// El segundo parámetro del callback en el método "on" hace referencia a la función de callback que hayamos definido en el socket del cliente del método emit(). Al llamarla desde el backend, disparará el callback del frontend.
	socket.on("enviar-mensaje", (payload, callback) => {
		// Esta línea de código permite evitar que el server se caiga si la persona del frontend no manda una función como callback DESDE EL FRONT en el método .emit(), evitando que el server se caiga por esta acción si existe una función de callback en el backend
		if (!callback) return;
		// console.log(payload);
		const id = 123456;
		callback(id);
		socket.broadcast.emit("enviar-mensaje", payload);
	});
};

export { socketController };
