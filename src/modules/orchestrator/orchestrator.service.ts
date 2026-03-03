import { Injectable, Logger } from '@nestjs/common';
import { Project, ProjectStatus } from '../project/project.entity';
import { ProjectService } from '../project/project.service';
import { AgentFactory } from '../agents/agent.factory';

@Injectable()
export class OrchestratorService {
  private readonly logger = new Logger(OrchestratorService.name);

  constructor(
    private projectService: ProjectService,
    private agentFactory: AgentFactory,
  ) {}

  async startWorkflow(prdContent: string): Promise<Project> {
    const project = await this.projectService.createProject(prdContent);
    this.runWorkflow(project.id).catch(err => this.logger.error(`Workflow failed for ${project.id}`, err));
    return project;
  }

  private async runWorkflow(projectId: string) {
    let project = await this.projectService.findOne(projectId);

    try {
      // 1. Analysis Phase
      project = await this.executePhase(project, ProjectStatus.ANALYSIS);
      
      // 2. Architecture Phase
      project = await this.executePhase(project, ProjectStatus.ARCHITECTURE);

      // 3. Development Phase
      project = await this.executePhase(project, ProjectStatus.DEVELOPMENT);

      // 4. Review Phase
      project = await this.executePhase(project, ProjectStatus.REVIEW);

      await this.projectService.updateStatus(projectId, ProjectStatus.COMPLETE);
    } catch (error) {
      this.logger.error(`Error in workflow for project ${projectId}: ${error.message}`);
      await this.projectService.updateStatus(projectId, ProjectStatus.FAILED);
    }
  }

  private async executePhase(project: Project, phase: ProjectStatus): Promise<Project> {
    this.logger.log(`Starting phase: ${phase} for project ${project.id}`);
    await this.projectService.updateStatus(project.id, phase);
    
    const agent = this.agentFactory.getAgent(phase);
    const result = await agent.process(project);
    
    return await this.projectService.updateProjectWithPhaseResult(project.id, phase, result);
  }
}