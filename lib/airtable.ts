import Airtable from "airtable";

export const airtableBase = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base('appSOp88YvPqFCF7w');
