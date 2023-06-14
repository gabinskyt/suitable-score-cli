/**
 * Class responsible of providing the logics methods and implementing the business algorithm
 * 
 * Notes: As noticed in the module file, the instance of the service are injected in the constructor
 * including the cli setup, so it is ready to use
 */
export class SuitabilityScoreController {
    suitabilityScoreService

    // Instance injected in the constructor, 
    // Note: In a "more development time" scenario it may be created a decorator for 
    // automatically injecting the needed providers without using the constructor args
    // i.e. @inject(SuitabilityScoreService)
    constructor({ SuitabilityScoreService }) {
        this.suitabilityScoreService = SuitabilityScoreService;
    }

    /**
     * Implements the algorithm for generating the destination list by driver name
     * 
     * @returns {Object<{ [string: DriverName]: { destination: Object, suitabilityScore: number }}>}
     */
    getSuitabilityScoreList(){
        return Promise.all([
            this.suitabilityScoreService.getShipmentDestinationList(),
            this.suitabilityScoreService.getDriverList()
        ])
        .then(([shipmentDestinationList, driverList]) => 
            // Iterates through destinations generating the assignedDrivers
            shipmentDestinationList.reduce((assignedDrivers, destination) => {

                // Iterates through driver names returning the highest match between destination and driver
                driverList.reduce((match, driver) => {
                    
                    // If the driver is already assigned will skip
                    if(driver.DriverName in assignedDrivers) return match;

                    // Calculate the suitability score with the given method 
                    let suitabilityScore;
                    if(destination.StreetName.length % 2 == 0) suitabilityScore = driver.DriverName.match(/[aeiou]/gi).length * 1.5;
                    else suitabilityScore = driver.DriverName.match(/[bcdfghjklmnpqrstvwxys]/gi).length;
                    if(destination.StreetName.length > 1 && destination.StreetName.length == driver.DriverName.length) suitabilityScore += suitabilityScore * 0.5;

                    // If the new match suitabilityScore is higher than the previous then replace it and mark the previous driver as available 
                    if(suitabilityScore > match.suitabilityScore){
                        assignedDrivers[driver.DriverName] = { destination, suitabilityScore };
                        delete assignedDrivers[match.driver.DriverName];

                        return { suitabilityScore, driver };
                    } 
                    // If the previous match is higher then keep it
                    else return match; 
                }, { driver: {}, suitabilityScore: 0 });
                return assignedDrivers;
            }, {})
        )
        .then(assignedDrivers => console.log(assignedDrivers));
    }
}