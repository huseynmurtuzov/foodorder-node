import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany,ManyToOne,ManyToMany, } from "typeorm";
import { Restaurant } from "./Restaurant";
import { Order } from "./Order";

@Entity({name:"Meal"})
export class Meal{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    price:number;

    @Column({nullable:false})
    description:string;

    @Column({default:false})
    isAvailable:boolean;

    @Column({nullable:false})
    image:string;

    @Column({default:1})
    quantity:number

    @Column({nullable:false,default:5})
    rating:number

    @ManyToOne(() => Restaurant,(restaurant) => restaurant.meals)
    @JoinColumn()
    restaurant:Restaurant;

    @ManyToMany(() => Order, order => order.meals)
    orders: Order[] 
}