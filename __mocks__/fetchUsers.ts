import SocketIOClient from "socket.io-client";
import axios from "axios";

export default (socketclient: SocketIOClient.Socket, incrementId: number) => {
  // fetch data and send response back to socket io.
  const fetchUsers = axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((result) => {
      socketclient.emit("message", {
        data: result.data[1],
        count: incrementId,
      });
      return result.data;
    })
    .catch((error) => error.message);
  return fetchUsers;
};
