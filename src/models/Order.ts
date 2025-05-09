import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany, ManyToOne,ManyToMany,JoinTable } from "typeorm";
import { Customer } from "./Customer";
import { Restaurant } from "./Restaurant";
import { DeliveryPersonnel } from "./DeliveryPersonnel";
import { Payment } from "./Payment";
import { Meal } from "./Meal";
import { orderStatus } from "../utils/enums/orderStatus";


@Entity({name:"Order"})
export class Order{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    orderDate:Date = new Date();

    @Column({nullable:false,default:orderStatus.PENDING})
    status:orderStatus;

    @Column({nullable:false,default:0})
    totalAmount:number;

    @ManyToOne(() => Customer,(customer) => customer.orders)
    @JoinColumn()
    customer:Customer;

    @ManyToOne(() => Restaurant,(restaurant) => restaurant.orders)
    @JoinColumn()
    restaurant:Restaurant;

    @ManyToOne(() => DeliveryPersonnel,(deliveryPersonnel) => deliveryPersonnel.orders)
    @JoinColumn()
    deliveryPersonnel:DeliveryPersonnel;

    @OneToOne(() => Payment,(payment) =>payment.order,{cascade:true})
    @JoinColumn()
    payment:Payment

    @ManyToMany(() => Meal, meal => meal.orders)
    @JoinTable() // 
    meals: Meal[] 

}