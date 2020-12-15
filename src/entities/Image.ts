import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  url: string;

  @Column("blob", { nullable: true, name: "data" })
  data: Buffer;
}
export default Image;
