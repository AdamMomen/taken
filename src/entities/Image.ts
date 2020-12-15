import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  url: string;

  @Column({ name: "data", type: "bytea", nullable: false })
  data: Buffer;
}
export default Image;
