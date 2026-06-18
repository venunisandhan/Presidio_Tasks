
require('dotenv').config();

const app = require('./app');

const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3000 ;

const connectWithRetry = async ( retries = 5 , delay = 5000 ) =>{

    for(let attempts=1;attempts<=retries;attempts++)
    {
        try{
            console.log(`MongoDB connection attempt ${attempts} of {retries}...`);
            await connectDB();

            return;
        }
        catch(error)
        {
            console.error(`Attempt ${attempts} failed : ${error.message}`);

            if(attempts == retries)
            {
                console.error(`Max connection attempts failed. Exiting...`)
                process.exit(1);
            }

            console.log(`Waiting ${delay/1000}s before next connection attempt`);
            await new Promise((resolve)=>setTimeout(resolve,delay));
        }
    }
};

const startServer = async () => {
    
    await connectWithRetry();

    app.listen( PORT , () => {
        console.log(`Server is running!!!`);
    });
};

startServer();