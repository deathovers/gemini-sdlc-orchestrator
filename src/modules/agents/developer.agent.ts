import { Injectable } from '@nestjs/common';
import { BaseAgent } from './base.agent';
import { Project } from '../project/project.entity';

@Injectable()
export class DeveloperAgent extends BaseAgent {
  async process(project: Project): Promise<any> {
    const { architecture_spec } = project;
    
    // Logic to interpret architecture_spec and generate multiple files
    // This would involve prompting Gemini to output a JSON structure:
    // { files: [{ path: '...', content: '...' }], dependency_graph: { ... } }
    
    const prompt = `Generate code for project based on architecture: ${JSON.stringify(architecture_spec)}`;
    const response = await this.callGemini(prompt, 'flash');

    // Mocking the structured output for multi-file generation
    return {
      files: [
        { path: 'src/index.ts', content: 'console.log("Hello World");' },
        { path: 'package.json', content: '{ "name": "generated-app" }' }
      ],
      dependency_graph: {
        'src/index.ts': ['package.json']
      }
    };
  }
}