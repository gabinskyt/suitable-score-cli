import { CsvHandler } from '../../lib/handlers/csv.handler';

/**
 * Class responsible for providing a data origin service
 * 
 * NOTES: This class was created in order to follow the SOLID - Liskov Substitution Principle
 * providing a class which can be replaced with an API, FILE, microservice, DBMS 
 * or any other data origin without braking the implementation.
 */
export class SuitabilityScoreService {
    dataPath;
    csvHandler;

    // DataPath is set up and injected in the constructor, ready to be used
    constructor({ DataPath }){
        // This may be replaced with any AWS or DB open connection method invocation.
        this.dataPath = DataPath;
        this.csvHandler = new CsvHandler();
    }    

    /**
     * Retrieves the list of shipment destinations
     * 
     * @returns {Promise<[string]>} shipmentDestinationList
     */
    getShipmentDestinationList(){
        return this.csvHandler.getRows(this.dataPath.shipmentDestinationListPath)
        .catch(() => console.warn(
            "An error ocurred during file reading, make sure you are entering a valid path"
        ));
    }

    /**
     * Retrieves the list of driver names
     * 
     * @returns {Promise<[string]>} driverList
     */
    getDriverList(){
        return this.csvHandler.getRows(this.dataPath.driverListPath)
        .catch(() => console.warn(
            "An error ocurred during file reading, make sure you are entering a valid path"
        ));
    }
}