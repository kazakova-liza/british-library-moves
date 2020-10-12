import Airtable from "airtable";
import apiKey from "./apiKey.js";
import fields from './fields/collections.js'

const base = new Airtable({ apiKey: apiKey }).base("app8NoNcMIh4UeDkL");

const getData = async (table) => {
    const result = [];
    await base(table)
        .select({
            // view: "Grid view",
            // maxRecords: 1,
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                let data = {};
                for (const field of fields) {
                    data[field] = record.get(field);
                }
                result.push(data);
            });
            fetchNextPage();
        });
    return result;
}

export default getData;