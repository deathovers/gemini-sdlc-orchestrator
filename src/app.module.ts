import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrchestratorModule } from './modules/orchestrator/orchestrator.module';
import { ProjectModule } from './modules/project/project.module';
import { AgentModule } from './modules/agents/agent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'sdlc_orchestrator',
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
    ProjectModule,
    OrchestratorModule,
    AgentModule,
  ],
})
export class AppModule {}