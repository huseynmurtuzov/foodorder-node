import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany,ManyToOne } from "typeorm";
import { userRole } from "../utils/enums/userRole";
import { Customer } from "./Customer";
import { Restaurant } from "./Restaurant";

@Entity({name:"RestaurantReview"})
export class RestaurantReview{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    rating:number;

    @Column({nullable:false})
    comment:string;

    @Column()
    reviewDate:Date = new Date();

    @ManyToOne(() => Customer,(customer) => customer.orders)
    @JoinColumn()
    customer:Customer;

    @ManyToOne(() => Restaurant,(restaurant) => restaurant.restaurantReview)
    @JoinColumn()
    restaurant:Restaurant;

}