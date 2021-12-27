/*use node filename.js command to run this file
node stockSummary.js*/
import pkg from 'mongodb';
const { MongoClient } = pkg;
async function main(){

    /*install mongodb compass in local machine
      create mongodb cloud account (mongodb atlas)
      connect mongodb compass(local gui) with mongodb cloud (mongodb atlas) through uri
      uri - mongodb+srv://<username>:<password>@cluster0.mxvjs.mongodb.net/test
      replace your own mongodb cloud uri */
      
    const uri = "mongodb+srv://user:user@cluster0.mxvjs.mongodb.net/test";


    /*initializing mongodb client */
    const client = new MongoClient(uri);
    try {
        /*connecting mongodb client*/
        await client.connect();
        console.log("------------------Client Connected----------------")

        /*calling insertStockTransactionData to insert share market data */
        await insertStockTransactionData(client, [
            {
                /*  Design Decision
                    To manage time series data (share market data), bucket pattern is the most efficient way and It reduces the overall number of documents in a collection.
                    The stock price of the company will change in certain time interval.
                    To manage that i grouped and stored the timestamp (time and date) and the current price of the stock at give timestamp as array of objects documents(to reduce overall number of documents).
                    Then we easily query the values, without having to do an expensive join.
                    Company Name is same across the whole day, so declared only once per the document.
                    Storing stock price and timestamp with 5 minutes time interval to eliminate 16MB document size limit issue,
                    so that the array of objects has countable values starting from markets opening time to closing time.
                    I have created a property current_price outside the array of objects (price) just for easy retrival and access of the most recent stock price without traversing the array each time.
                    Totally added 4 individual documents with two different company names and two different dates.
                 */
                company_name:"TESLA, INC.",
                current_price: 769.90,
                percentage_change : 0.12,
                price: [
                {
                    timestamp: new Date("2021-09-22T09:30:00.000Z"),
                    lastupdated_price: 759.24
                },
                {
                    timestamp: new Date("2021-09-22T09:35:00.000Z"),
                    lastupdated_price: 769.90
                },
                {
                    timestamp: new Date("2021-09-22T09:40:00.000Z"),
                    lastupdated_price: 768.88
                },
                {
                    timestamp: new Date("2021-09-22T09:45:00.000Z"),
                    lastupdated_price: 764.24
                },
                {
                    timestamp: new Date("2021-09-22T09:50:00.000Z"),
                    lastupdated_price: 766.87
                },
                {
                    timestamp: new Date("2021-09-22T09:55:00.000Z"),
                    lastupdated_price: 766.54
                },
                {
                    timestamp: new Date("2021-09-22T10:00:00.000Z"),
                    lastupdated_price: 759.24
                },
                {
                    timestamp: new Date("2021-09-22T10:05:00.000Z"),
                    lastupdated_price: 769.90
                }
                ]
            },
            {
                company_name:"TESLA, INC.",
                current_price: 747.90,
                percentage_change : -0.78,
                price: [
                    {
                        timestamp: new Date("2021-09-23T09:30:00.000Z"),
                        lastupdated_price: 768.95
                    },
                    {
                        timestamp: new Date("2021-09-23T09:35:00.000Z"),
                        lastupdated_price: 760.68
                    },
                    {
                        timestamp: new Date("2021-09-23T09:40:00.000Z"),
                        lastupdated_price: 755.88
                    },
                    {
                        timestamp: new Date("2021-09-23T09:45:00.000Z"),
                        lastupdated_price: 750.24
                    },
                    {
                        timestamp: new Date("2021-09-23T09:50:00.000Z"),
                        lastupdated_price: 753.87
                    },
                    {
                        timestamp: new Date("2021-09-23T09:55:00.000Z"),
                        lastupdated_price: 749.53
                    },
                    {
                        timestamp: new Date("2021-09-23T10:00:00.000Z"),
                        lastupdated_price: 749.24
                    },
                    {
                        timestamp: new Date("2021-09-23T10:05:00.000Z"),
                        lastupdated_price: 747.90
                    }
                ]
            },
            {
                company_name:"MICROSOFT CORPORATION",
                current_price: 299.90,
                percentage_change : 0.24,
                price: [
                    {
                        timestamp: new Date("2021-09-22T09:30:00.000Z"),
                        lastupdated_price: 298.24
                    },
                    {
                        timestamp: new Date("2021-09-22T09:35:00.000Z"),
                        lastupdated_price: 297.90
                    },
                    {
                        timestamp: new Date("2021-09-22T09:40:00.000Z"),
                        lastupdated_price: 298.88
                    },
                    {
                        timestamp: new Date("2021-09-22T09:45:00.000Z"),
                        lastupdated_price: 296.24
                    },
                    {
                        timestamp: new Date("2021-09-22T09:50:00.000Z"),
                        lastupdated_price: 296.87
                    },
                    {
                        timestamp: new Date("2021-09-22T09:55:00.000Z"),
                        lastupdated_price: 296.54
                    },
                    {
                        timestamp: new Date("2021-09-22T10:00:00.000Z"),
                        lastupdated_price: 297.24
                    },
                    {
                        timestamp: new Date("2021-09-22T10:05:00.000Z"),
                        lastupdated_price: 299.90
                    }
                    ]
            },
            {
                company_name:"MICROSOFT CORPORATION",
                current_price: 298.15,
                percentage_change : 0.12,
                price: [
                    {
                        timestamp: new Date("2021-09-23T09:30:00.000Z"),
                        lastupdated_price: 299.90
                    },
                    {
                        timestamp: new Date("2021-09-23T09:35:00.000Z"),
                        lastupdated_price: 301.76
                    },
                    {
                        timestamp: new Date("2021-09-23T09:40:00.000Z"),
                        lastupdated_price: 302.88
                    },
                    {
                        timestamp: new Date("2021-09-23T09:45:00.000Z"),
                        lastupdated_price: 302.24
                    },
                    {
                        timestamp: new Date("2021-09-23T09:50:00.000Z"),
                        lastupdated_price: 301.87
                    },
                    {
                        timestamp: new Date("2021-09-23T09:55:00.000Z"),
                        lastupdated_price: 300.54
                    },
                    {
                        timestamp: new Date("2021-09-23T10:00:00.000Z"),
                        lastupdated_price: 298.24
                    },
                    {
                        timestamp: new Date("2021-09-23T10:05:00.000Z"),
                        lastupdated_price: 298.15
                    }
                ]
            }
        ]);

        /*displaying stock price for a certain company on given date */
        let companydetails = await findQuery(client,
            {company_name:"MICROSOFT CORPORATION",price:{$elemMatch :{timestamp : new Date("2021-09-23T09:50:00.000Z")}}}
            );

        /*getting previous day closing stock price for a certain company on given date */
        let previousdayclosingprice =await findQuery(client,
            {company_name:"MICROSOFT CORPORATION",price:{$elemMatch :{timestamp : new Date("2021-09-22T09:50:00.000Z")}}}
            );

        previousdayclosingprice = previousdayclosingprice.current_price;
        console.log("previousdayclosingprice",previousdayclosingprice);

        /*getting current day most recent stock price for a certain company for most recent date */
        let currentdaycurrentprice =await findQuery(client,
            {company_name:"MICROSOFT CORPORATION",price:{$elemMatch :{timestamp : new Date("2021-09-23T09:50:00.000Z")}}}
            );
    
        currentdaycurrentprice = currentdaycurrentprice.current_price;
        console.log("currentdaycurrentprice",currentdaycurrentprice);

        /*calculating percentage change for the certain company with previous day closing price and current day most recent price  */
        let percentageChange = (((previousdayclosingprice-currentdaycurrentprice)/currentdaycurrentprice)*100).toFixed(2);
        console.log("percentageChange",percentageChange);

        /*updating percentage change data for certain company for most recent date */
        await updateQuery(client,
            {company_name:"MICROSOFT CORPORATION",price:{$elemMatch :{timestamp : new Date("2021-09-23T09:50:00.000Z")}}},
            { $set: {percentage_change: percentageChange } });


        /* displaying the updated percentage change values for the certain company */
        await findQuery(client,
            {company_name:"MICROSOFT CORPORATION",price:{$elemMatch :{timestamp : new Date("2021-09-23T09:50:00.000Z")}}}
            );

    }
    finally {
        /* Close the connection to the mongodb client */
        await client.close();
    }
}

/*calling main function */
main().catch(console.error);

/* using insertStockTransactionData function to insert given values */
async function insertStockTransactionData(client, newdata){
    const result = await client.db("stockTransaction").collection("stock").insertMany(newdata);
    console.log("-------------------------query inserted------------------------")
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

/* using findQuery function to find the data for given query */
async function findQuery(client, query){
    const result = await client.db("stockTransaction").collection("stock").findOne(query);
    console.log("------------------------query found-----------------------");
    console.log(result)
    return result;
}

/* using updateQuery function to update value for given query */
async function updateQuery(client,query,setvalue){
    const result = await client.db("stockTransaction").collection("stock").updateOne(query,setvalue);
    console.log("------------------query updated---------------");

}