import { Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany,ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { Restaurant } from "./Restaurant";
import { DeliveryPersonnel } from "./DeliveryPersonnel";
import { User } from "./BaseUser";

@Entity({name:"Notification"})
export class Notification{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    title:string;

    @Column({nullable:false})
    message:string;

    @Column()
    date:Date = new Date();

    @Column({default:false})
    isRead:boolean;

    @ManyToOne(() => User,(baseUser) => baseUser.notifications)
    @JoinColumn()
    user:User;
}