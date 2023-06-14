/**
 * Data path model
 */
export class DataPath {
    shipmentDestinationListPath;
    driverListPath;

    constructor({shipmentDestinationListPath, driverListPath}){
        this.shipmentDestinationListPath = shipmentDestinationListPath;
        this.driverListPath = driverListPath;
    }
}