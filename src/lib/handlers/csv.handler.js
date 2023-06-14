import csvParser from 'csv-parser';
import * as fileSystem from 'fs';

/**
 * Class responsible for providing a easy way to get data from CSV files
 * 
 * Notes: This class following the SOLID - Single Responsibility Principle separates the "file system reading tasks" from any other part of the providers
 */
export class CsvHandler {
    /**
     * 
     * @param {string} path 
     * @returns {Promise<Array>}
     */
    getRows(path){
        return new Promise((resolve, reject) => {
            const rows = [];
    
            fileSystem.createReadStream(path)
            .on('error', error => {
                reject(error)
            })
            .pipe(csvParser())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            });
        });
    }
}