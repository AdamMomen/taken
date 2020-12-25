import { ExpressApp } from "@types";
import http from "http";
import { Server, Socket } from "socket.io";
import config from "../config";
import Logger from "./logger";
// import * as io from "socket.io";
const io = require("socket.io");
class SocketServer {
  static io: Server;

  /**
   * Start the Socket Server.
   *
   * @param {http.Server} server
   */
  static async start(server: http.Server) {
    try {
      // create socket io server
      this.io = io(server, { origins: "*:*" });

      // register events on connect
      this.onConnect();
    } catch (e) {
      Logger.error("Socket server failed to start", e);
    }
  }

  //#region Private methods

  /**
   * On server connection.
   */
  private static onConnect() {
    this.io.on("connection", (socket) => {
      Logger.info("socket connection ");

      socket.on("message", (data: string) => {
        console.log(data);
      });
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.onDisconnecting(socket);
      this.onClientEvent(socket);
    });
  }

  /**
   * On subscribe to a channel.
   *
   * @param {io.Socket} socket
   */
  private static onSubscribe(socket: Socket): void {
    socket.on("subscribe", (data: any) => {
      Logger.debug("subscribe");
    });
  }

  /**
   * On unsubscribe from a channel.
   *
   * @param {io.Socket} socket
   */
  private static onUnsubscribe(socket: Socket): void {
    socket.on("unsubscribe", (data: any) => {
      Logger.debug("unsubscribe");
    });
  }

  /**
   * On socket disconnecting.
   *
   * @param {io.Socket} socket
   */
  private static onDisconnecting(socket: Socket): void {
    socket.on("disconnecting", (reason: any) => {
      Logger.debug("disconnecting");
    });
  }

  /**
   * On client events.
   *
   * @param {io.Socket} socket
   */
  private static onClientEvent(socket: Socket): void {
    socket.on("client:event", (data: any) => {
      Logger.debug("client event");
    });
  }
}

export default async ({ httpServer }: { httpServer: http.Server }) => {
  await SocketServer.start(httpServer);
};
