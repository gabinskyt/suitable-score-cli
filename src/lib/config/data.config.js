import { createInterface } from 'readline'
import { DataPath } from './data-path.model';

/**
 * Initial setup for getting the file directories
 * 
 * @returns {Promise<DataPath>} dataPath
 */
export const setupData = () => {
    const inputReader = createInterface({ input: process.stdin, output: process.stdout });

    return new Promise(resolve =>
        inputReader.question(
            'Insert shipment destination list directory: ',
            shipmentDestinationListPath => resolve(shipmentDestinationListPath)
        )
    )
    .then(shipmentDestinationListPath => new Promise( resolve => 
        inputReader.question(
            'Insert driver list directory: ',
            driverListPath => resolve({ shipmentDestinationListPath, driverListPath })
        )
    ))
    .then(dataPath => {
        inputReader.close();
        return new DataPath(dataPath);
    });
}