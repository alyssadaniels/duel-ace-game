import jest from "jest-mock";
import { socket } from "../src/socket";
import { beforeAll, afterAll, beforeEach, it, expect } from "vitest";
import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";
import { CardType, GameObject } from "../src/types";

// socket io
export const emitSpy = jest.spyOn(socket, "emit");

export let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

beforeAll(() => {
    return new Promise((resolve) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            clientSocket = ioc(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });

            // set socket.on in components to use the client socket defined here
            socket["on"] = jest.fn(
                (ev: string, listener: (...args: any[]) => void) =>
                    clientSocket.on(ev, listener)
            );

            clientSocket.on("connect", resolve);
        });
    });
});

afterAll(() => {
    io.close();
    clientSocket.disconnect();
});

// describe("sanity check", () => {
//     it("should be good", () => {
//         return new Promise<void>((resolve) => {
//             clientSocket.on("hello", (arg) => {
//                 expect(arg).toEqual("world");
//                 resolve();
//             });
//             serverSocket.emit("hello", "world");
//         });
//     });
// });

// match media function (from jest docs)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// game object
export let exampleGameObj: GameObject;

beforeEach(() => {
    // clear dom
    document.body.innerHTML = "";

    // set up gameobject
    // me
    const activeCards1 = [
        { type: CardType.Standard, displayValue: 2, trueValue: 2 },
        { type: CardType.Cancel, displayValue: 2, trueValue: -2 },
        { type: CardType.Standard, displayValue: 7, trueValue: 7 },
        null,
        null,
        null,
    ];
    const playableCards1 = [
        { type: CardType.Plus, displayValue: 3, trueValue: 3 },
        { type: CardType.Minus, displayValue: 6, trueValue: -6 },
    ];

    // other
    const activeCards2 = [
        { type: CardType.Standard, displayValue: 2, trueValue: 2 },
        { type: CardType.Standard, displayValue: 5, trueValue: 5 },
        null,
        null,
        null,
        null,
        null,
    ];
    const playableCards2 = [
        null,
        { type: CardType.Minus, displayValue: 3, trueValue: -3 },
    ];

    exampleGameObj = {
        me: {
            activeCards: activeCards1,
            playableCards: playableCards1,
            hasStood: false,
            canPlay: true,
        },
        other: {
            activeCards: activeCards2,
            playableCards: playableCards2,
            hasStood: false,
            canPlay: true,
        },
        myTurn: true,
        amWinner: true,
    };
});
