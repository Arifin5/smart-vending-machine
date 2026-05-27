import io from "socket.io-client";

const socket = io("https://smart-vending-machine-production.up.railway.app");

export default socket;
