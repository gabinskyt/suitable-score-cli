import { setupData } from "./lib/config/data.config";
import { DataPath } from "./lib/config/data-path.model";
import { SuitabilityScoreModule } from "./suitability-score/suitability-score.module";

/**
 * Setups the CLI and executes the app
 */
export const App = () => {
    setupData()
    .then(dataPath => {
        const suitabilityScoreModule = new SuitabilityScoreModule({
            injectables: [{
                provide: DataPath,
                useValue: dataPath
            }]
        });
        
        suitabilityScoreModule.controllers.SuitabilityScoreController.getSuitabilityScoreList();
    })
}