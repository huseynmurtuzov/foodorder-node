import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Notification } from "./Notification";
import { userRole } from "../utils/enums/userRole";
import bcrypt from 'bcryptjs'
@Entity({name:"User"})
export abstract class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    role:userRole

    @Column()
    email: string;

    @Column()
    password: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @Column({ default: () => 'GETDATE()' })
    createdAt: Date;

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];
}