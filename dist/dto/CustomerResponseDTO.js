"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResponseDTO = void 0;
class CustomerResponseDTO {
    constructor(id, role, name, email, phoneNumber, address) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
exports.CustomerResponseDTO = CustomerResponseDTO;
