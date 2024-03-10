import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Laptop {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    brand!: string

    @Column()
    model!: string

    @Column("float")
    price!: number;


    @Column("json")
    specs!: { screenSize: string; processor: string; ram: string; storage: string };
}
