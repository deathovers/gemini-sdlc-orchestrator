import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { ProjectService } from '../project/project.service';

@Controller('v1/workflow')
export class OrchestratorController {
  constructor(
    private orchestratorService: OrchestratorService,
    private projectService: ProjectService
  ) {}

  @Post('start')
  async start(@Body('prd_content') prdContent: string) {
    return await this.orchestratorService.startWorkflow(prdContent);
  }

  @Get('status/:id')
  async getStatus(@Param('id') id: string) {
    const project = await this.projectService.findOne(id);
    return { status: project.status };
  }
}