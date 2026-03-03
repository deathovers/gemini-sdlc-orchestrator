import { Injectable } from '@nestjs/common';
import { ProjectStatus } from '../project/project.entity';
import { IAgent } from './agent.interface';
import { DeveloperAgent } from './developer.agent';
// Import other agents...

@Injectable()
export class AgentFactory {
  constructor(
    private developerAgent: DeveloperAgent,
    // Inject other agents...
  ) {}

  getAgent(status: ProjectStatus): IAgent {
    switch (status) {
      case ProjectStatus.DEVELOPMENT:
        return this.developerAgent;
      // case ProjectStatus.ANALYSIS: return this.analystAgent;
      // ...
      default:
        // Return a mock agent for unimplemented phases
        return { process: async () => ({}) };
    }
  }
}