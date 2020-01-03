import { AIChoiceTrack } from './ai-choice-track';

export interface AIThinkPacket {
    configsChecked: number;
    configsMemoized: number;
    configsPruned: number;
    score: AIChoiceTrack;
    time: number;
}
