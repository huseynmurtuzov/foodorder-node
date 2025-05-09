"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dataSource_1 = __importDefault(require("./dataSource/dataSource"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
require("express-async-errors");
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use(express_1.default.static('./public'));
app.use((0, express_fileupload_1.default)());
//routes
//last middlewares
app.use(not_found_1.default);
app.use(error_handler_1.default);
// dataSource.initialize().then(() => {
//     console.log("Success")
// }).catch((err) => {
//     console.log(err)
// });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dataSource_1.default.initialize();
        console.log("Database connected");
        app.listen(process.env.PORT, () => {
            console.log("Server is listening");
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
