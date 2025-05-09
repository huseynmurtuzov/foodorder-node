"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantResponseDTO = void 0;
class RestaurantResponseDTO {
    constructor(id, role, name, email, phoneNumber, address, rating, image) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.rating = rating;
        this.image = image;
    }
}
exports.RestaurantResponseDTO = RestaurantResponseDTO;
