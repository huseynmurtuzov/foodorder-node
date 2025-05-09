import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany } from "typeorm";
import { paymentMethod } from "../utils/enums/PaymentMethod";
import { Order } from "./Order";

@Entity({name:"Payment"})
export class Payment{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    paymentMethod:paymentMethod;

    @Column()
    date:Date = new Date();

    @Column({nullable:false})
    amount:number;

    @Column({default:false})
    isSuccessfull:boolean;

    @OneToOne(() => Order,(order) =>order.payment)
    order:Order
}