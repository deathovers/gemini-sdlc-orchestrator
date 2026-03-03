import { Module } from '@nestjs/common';
import { DeveloperAgent } from './developer.agent';
import { AgentFactory } from './agent.factory';

@Module({
  providers: [DeveloperAgent, AgentFactory],
  exports: [AgentFactory],
})
export class AgentModule {}