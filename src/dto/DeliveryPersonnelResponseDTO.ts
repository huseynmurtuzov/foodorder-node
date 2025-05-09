import { userRole } from "../utils/enums/userRole";
import { veichleType } from "../utils/enums/veichleType";

export class DeliveryPersonnelResponseDTO{
    constructor(id:number,role:userRole,name:string,email:string,phoneNumber:string,veichleType:veichleType){
        this.id = id;
        this.role=role;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.veichleType = veichleType;
    }
    id:number;
    role:userRole
    name:string;
    email:string;
    phoneNumber:string;
    veichleType:veichleType;
}