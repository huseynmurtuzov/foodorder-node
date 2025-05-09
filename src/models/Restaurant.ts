import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { Order } from "./Order";
import { RestaurantReview } from "./RestaurantReview";
import { Meal } from "./Meal";
import { Notification } from "./Notification";
import { userRole } from "../utils/enums/userRole";
import { User } from "./BaseUser";

@Entity({name:"Restaurant"})
export class Restaurant extends User{
    constructor() {
        super();
        this.role = userRole.RESTAURANT;
    }
    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    phoneNumber:string;

    @Column({nullable:false})
    address:string

    @Column({nullable:false})
    workingHours:string

    @Column({nullable:false})
    rating:number

    @Column({nullable:false})
    image:string

    @OneToMany(() => Order,(order) => order.restaurant)
    orders:Order[] 

    @OneToMany(() => RestaurantReview,(restaurantReview) => restaurantReview.restaurant)
    restaurantReview:RestaurantReview[] 

    @OneToMany(() => Meal,(meal) => meal.restaurant)
    meals:Meal[] 

}