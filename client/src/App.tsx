import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import Multiplayer from "./multiplayer/Multiplayer";
import PrivateMultiplayer from "./private-multiplayer/PrivateMultiplayer";
import Singleplayer from "./singleplayer/Singleplayer";

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [numUsers, setNumUsers] = useState(0);

    useEffect(() => {
        // connection
        function onConnect() {
            setIsConnected(true);
        }

        socket.on("connect", onConnect);

        // disconnection
        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("disconnect", onDisconnect);

        // num players
        function onNumUsersUpdated(newNum: number) {
            setNumUsers(newNum);
        }

        socket.on("update-num-users", onNumUsersUpdated);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("update-num-users", onNumUsersUpdated);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home isConnected={isConnected} numUsers={numUsers} />
                    }
                />
                <Route path="/singleplayer" element={<Singleplayer />} />
                <Route path="/multiplayer" element={<Multiplayer />} />
                <Route
                    path="/private-multiplayer"
                    element={<PrivateMultiplayer />}
                />
            </Routes>
        </Router>
    );
}

export default App;
