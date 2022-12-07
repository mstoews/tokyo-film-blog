"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const server_1 = require("./server");
(0, server_1.initServer)();
//# sourceMappingURL=main.js.map