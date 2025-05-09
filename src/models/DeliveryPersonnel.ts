import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { veichleType } from "../utils/enums/veichleType";
import { userRole } from "../utils/enums/userRole";
import { Order } from "./Order";
import { Notification } from "./Notification";
import { User } from "./BaseUser";


@Entity({name:"DeliveryPersonnel"})
export class DeliveryPersonnel extends User{
    constructor() {
        super();
        this.role = userRole.DELIVERYPERSONNEL;
    }
    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    phoneNumber:string;

    @Column({nullable:false})
    veichleType:veichleType

    @OneToMany(() => Order,(order) => order.deliveryPersonnel)
    orders:Order[] 
}