// REFERENCIAS AL HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const btnEnviar = document.querySelector("#btnEnviar");
const txtMensaje = document.querySelector("#txtMensaje");

const socket = io();

socket.on("connect", () => {
	lblOffline.style.display = "none";
	lblOnline.style.display = "";
});

socket.on("disconnect", () => {
	lblOffline.style.display = "";
	lblOnline.style.display = "none";
});

socket.on("enviar-mensaje", (payload) => {
	console.log(payload);
});

btnEnviar.addEventListener("click", () => {
	const mensaje = txtMensaje.value;
	const payload = {
		id: "ABC123",
		mensaje,
		date: new Date().getTime(),
	};

	// Después de que el cliente emita el socket del evento "enviar-mensaje", yo puedo ejecutar un callback como tercer parámetro del método emit() que se ejecutará cuando el servidor le emita una respuesta al cliente
	socket.emit("enviar-mensaje", payload, (id) => {
		console.log("Desde el server: ", id);
	});
});
