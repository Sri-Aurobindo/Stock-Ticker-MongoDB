//use node filename.js command to run this file
// node stockSummary.js
import pkg from 'mongodb';
const { MongoClient } = pkg;
async function main(){
    //install mongodb compass in local machine
    //create mongodb cloud account (mongodb atlas)
    //connect mongodb compass(local gui) with mongodb cloud (mongodb atlas) through uri
    //uri - mongodb+srv://<username>:<password>@cluster0.mxvjs.mongodb.net/test
    //replace your own mongodb cloud uri
    const uri = "mongodb+srv://user:user@cluster0.mxvjs.mongodb.net/test";
    
    //initializing mongodb client
    const client = new MongoClient(uri);
    
try {
    //connecting mongodb client
    await client.connect();

    //calling insertStockSummary Data to insert share market summary data
    await insertStockSummaryData(client, [
        {       
                /*Design Decision
                  used attribute pattern to for this database.
                  Grouped similar types as a array of objects documents, so that we just have to push the field if we need it later.
                  company_name and date are the fixed fields and the stock_summary is the attribute field.
                  Fixed fields are same for each document.
                  Totally added 4 individual documents with two different company names and two different dates.
                  Execution is faster when we query with fixed fields and most of the case we querying only with fixed fields.*/
                company_name:"TESLA, INC.", 
                date: "2021-09-22",
                stock_summary:
                [
                    {previous_close :756.11},
                    {opening_price : 759.24},
                    {analyst_recommendation : "Buy"},
                    {PEratio:394.08},
                    {PEGratio : null}
                ]

        },
        {   
                company_name:"TESLA, INC.",
                date: "2021-09-23", 
                stock_summary:[
                    {previous_close :769.90},
                    {opening_price : 768.95},
                    {analyst_recommendation : "Hold"},
                    {PEratio:394.08},
                    {PEGratio : null}
                ]

                
        },
        {
            company_name:"MICROSOFT CORPORATION", 
            date: "2021-09-22", 
            stock_summary:[
                {previous_close :297.56},
                {opening_price : 298.24},
                {analyst_recommendation : "Buy"},
                {PEratio:37.19}
            ]

        },
        {
            company_name:"MICROSOFT CORPORATION",
            date: "2021-09-23", 
            stock_summary:[
                {previous_close :299.90},
                {opening_price : 298.15},
                {analyst_recommendation : "Strong Buy"},
                {PEratio:37.19}
            ]

        }
    ]);

    //calling queryData function to display data for the certain company on given date
    await queryData(client,
        {company_name:"MICROSOFT CORPORATION",date: "2021-09-23"}
        );
} finally {
    // Close the connection to the MongoDB cluster
    await client.close();
}
}

//calling main function
main().catch(console.error);

//using insertStockSummaryData function to insert share market summary data
async function insertStockSummaryData(client, insertData){
    
    const result = await client.db("stockSummary").collection("stockDetails").insertMany(insertData);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

//using queryData function to display the data for given query
async function queryData(client, query){
    const result = await client.db("stockSummary").collection("stockDetails").findOne(query);
    console.log("summary of the given company for specific date",result)
    
}
