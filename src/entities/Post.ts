import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'date' })
    createdAt = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() }) // hook to create new date automatically
    updatedAt = new Date();

    @Property({ type: 'text' })
    title!: string;
}