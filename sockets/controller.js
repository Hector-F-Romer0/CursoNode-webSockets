import { Server } from "socket.io";

const socketController = (socket) => {
	console.log("Cliente conectado 馃");

	socket.on("disconnect", () => {
		console.log(`Cliente con id ${socket.id} desconectado 馃槦`);
	});

	// El segundo par谩metro del callback en el m茅todo "on" hace referencia a la funci贸n de callback que hayamos definido en el socket del cliente del m茅todo emit(). Al llamarla desde el backend, disparar谩 el callback del frontend.
	socket.on("enviar-mensaje", (payload, callback) => {
		// Esta l铆nea de c贸digo permite evitar que el server se caiga si la persona del frontend no manda una funci贸n como callback DESDE EL FRONT en el m茅todo .emit(), evitando que el server se caiga por esta acci贸n si existe una funci贸n de callback en el backend
		if (!callback) return;
		// console.log(payload);
		const id = 123456;
		callback(id);
		socket.broadcast.emit("enviar-mensaje", payload);
	});
};

export { socketController };
