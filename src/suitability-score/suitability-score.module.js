import { Module } from "../lib/decorators/module.decorator";
import { SuitabilityScoreController } from "./suitability-score.controller";
import { SuitabilityScoreService } from "./providers/suitability-score.service";

/**
 * Suitability Score module
 * 
 * Notes: This class implements the decorator pattern for creating the controllers and providers
 * this also implements the dependency injection pattern in order to allow sharing instances between controllers and providers
 */
@Module({
    controllers: [SuitabilityScoreController],
    providers: [SuitabilityScoreService]
})
export class SuitabilityScoreModule {}