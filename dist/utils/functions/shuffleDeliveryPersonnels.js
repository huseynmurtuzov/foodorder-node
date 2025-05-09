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
exports.shuffleDeliveryPersonnels = void 0;
const DeliveryPersonnel_1 = require("../../models/DeliveryPersonnel");
const dataSource_1 = __importDefault(require("../../dataSource/dataSource"));
const deliveryPersonnelRepo = dataSource_1.default.getRepository(DeliveryPersonnel_1.DeliveryPersonnel);
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const shuffleDeliveryPersonnels = () => __awaiter(void 0, void 0, void 0, function* () {
    const allDeliveryPersonnelsIds = yield deliveryPersonnelRepo.find({ select: ["id"] });
    const exactIds = allDeliveryPersonnelsIds.map(person => person.id);
    const shuffledIds = shuffleArray(exactIds);
    const exactId = shuffledIds.slice(0, 1);
    const exactDeliveryPersonnel = yield deliveryPersonnelRepo.findOne({ where: { id: Number(exactId) } });
    if (!exactDeliveryPersonnel) {
        throw new Error("Something wrong happened while selecting delivery personnel for your order! Please try again!");
    }
    return exactDeliveryPersonnel;
});
exports.shuffleDeliveryPersonnels = shuffleDeliveryPersonnels;
