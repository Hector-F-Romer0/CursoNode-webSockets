import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import cors from "cors";
import { socketController } from "../sockets/controller.js";

dotenv.config();

class ServerSocket {
	constructor() {
		this.app = express();
		this.port = process.env.PORT_BE;
		this.httpServer = createServer(this.app);
		this.io = new Server(this.httpServer);

		// Middlewares
		this.middlewares();

		// Sockets
		this.sockets();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// Directorio Público
		this.app.use(express.static("public"));
	}

	sockets() {
		this.io.on("connection", socketController);
	}

	listen() {
		this.httpServer.listen(this.port, () => {
			console.log(`Servidor corriendo en puerto ${this.port} 🔥`);
		});
	}
}

export { ServerSocket };
