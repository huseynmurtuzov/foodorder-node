import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { userRole } from "../utils/enums/userRole";
import { Order } from "./Order";
import { RestaurantReview } from "./RestaurantReview";
import { Notification } from "./Notification";
import { User } from "./BaseUser";

@Entity({name:"Customer"})
export class Customer extends User{
    constructor() {
        super();
        this.role = userRole.CUSTOMER;
    }
    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    phoneNumber:string;

    @Column({nullable:false})
    address:string

    @OneToMany(() => Order,(order) => order.customer)
    orders:Order[] 

    @OneToMany(() => RestaurantReview,(RestaurantReview) => RestaurantReview.customer)
    restaurantReviews:RestaurantReview[] 
}