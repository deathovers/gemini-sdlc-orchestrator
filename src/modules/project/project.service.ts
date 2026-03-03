import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(prdContent: string): Promise<Project> {
    const project = this.projectRepository.create({ prd_content: prdContent });
    return await this.projectRepository.save(project);
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new NotFoundException();
    return project;
  }

  async updateStatus(id: string, status: ProjectStatus): Promise<void> {
    await this.projectRepository.update(id, { status });
  }

  async updateProjectWithPhaseResult(id: string, phase: ProjectStatus, result: any): Promise<Project> {
    const update: Partial<Project> = {};
    if (phase === ProjectStatus.ANALYSIS) update.trd_content = result.trd;
    if (phase === ProjectStatus.ARCHITECTURE) update.architecture_spec = result;
    // ... handle other phases
    
    await this.projectRepository.update(id, update);
    return this.findOne(id);
  }
}