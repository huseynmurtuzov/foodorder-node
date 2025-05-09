import { userRole } from "../utils/enums/userRole";
import { veichleType } from "../utils/enums/veichleType";

export class RestaurantResponseDTO{
    constructor(id:number,role:userRole,name:string,email:string,phoneNumber:string,address:string,rating:number,image:string){
        this.id = id;
        this.role=role;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.rating = rating;
        this.image = image
    }
    id:number;
    role:userRole
    name:string;
    email:string;
    phoneNumber:string;
    address:string;
    rating:number;
    image:string
}