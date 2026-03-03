import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProjectStatus {
  ANALYSIS = 'ANALYSIS',
  ARCHITECTURE = 'ARCHITECTURE',
  DEVELOPMENT = 'DEVELOPMENT',
  REVIEW = 'REVIEW',
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED'
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.ANALYSIS })
  status: ProjectStatus;

  @Column({ type: 'text' })
  prd_content: string;

  @Column({ type: 'text', nullable: true })
  trd_content: string;

  @Column({ type: 'jsonb', nullable: true })
  architecture_spec: any;

  @Column({ type: 'string', nullable: true })
  repository_url: string;

  @Column({ type: 'jsonb', default: [] })
  review_feedback: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}