import { Module } from '@nestjs/common';
import { OrchestratorService } from './orchestrator.service';
import { OrchestratorController } from './orchestrator.controller';
import { ProjectModule } from '../project/project.module';
import { AgentModule } from '../agents/agent.module';

@Module({
  imports: [ProjectModule, AgentModule],
  controllers: [OrchestratorController],
  providers: [OrchestratorService],
})
export class OrchestratorModule {}