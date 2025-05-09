"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatus = void 0;
var orderStatus;
(function (orderStatus) {
    orderStatus["PENDING"] = "Pending";
    orderStatus["PREPARED"] = "Prepared";
    orderStatus["DELIVERED"] = "Delivered";
    orderStatus["CANCELLED"] = "Cancelled";
})(orderStatus || (exports.orderStatus = orderStatus = {}));
