import { io } from "socket.io-client";


// set up socket
const URL =
    process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = URL ? io(URL) : io();
