import { Project } from '../project/project.entity';

export interface IAgent {
  process(project: Project): Promise<any>;
}

export abstract class BaseAgent implements IAgent {
  abstract process(project: Project): Promise<any>;
  
  protected async callGemini(prompt: string, model: 'pro' | 'flash' = 'flash'): Promise<string> {
    // Placeholder for actual Gemini API call logic
    this.logger.log(`Calling Gemini ${model} with prompt length: ${prompt.length}`);
    return `Generated response from Gemini ${model}`;
  }

  protected readonly logger = {
    log: (msg: string) => console.log(`[Agent] ${msg}`),
    error: (msg: string) => console.error(`[Agent Error] ${msg}`)
  };
}