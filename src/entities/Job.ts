import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @Entity Job
 * Database Entity
 */
export enum Status {
  STARTED = "started",
  CANCELED = "cancelled",
  PROGRESS = "in progress",
  DONE = "done",
}
@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Status, default: "started" })
  status: Status;

  @Column()
  url: string;

  @Column({ nullable: true })
  screenshot: string;
}
