import { userRole } from "../utils/enums/userRole";

export class CustomerResponseDTO{
    constructor(id:number,role:userRole,name:string,email:string,phoneNumber:string,address:string){
        this.id = id;
        this.role=role;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address
    }
    id:number;
    role:userRole
    name:string;
    email:string;
    phoneNumber:string;
    address:string
}