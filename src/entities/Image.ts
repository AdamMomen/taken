import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Website } from "./Website";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  createdAt: Date;

  @Column({ name: "data", type: "bytea", nullable: false })
  data: Buffer;

  @ManyToOne(() => Website, (website) => website.images)
  website: Website;
}
