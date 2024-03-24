const parquet = require("@dsnp/parquetjs")
const axios = require('axios');
const dns = require('node:dns');

// create new ParquetReader that reads from 'fruits.parquet`
const readParquetFile = async (filename) => {
    try {
        const reader = parquet.ParquetReader.openFile(filename);

        // create a new cursor
        const cursor = (await reader).getCursor();

        // read all records from the file and print them
        let record = null;
        const domains = []
        while (record = await cursor.next()) {
            const { domain } = record
            domains.push(domain)
        }

        (await reader).close();

        return domains

    } catch (error) {
        console.error("Error: ", error);
    }
}

const addressExtraction = async () => {
    try {
        const domains = await readParquetFile('companyWebsites.snappy.parquet');
        for (let i = 0; i < domains.length; i++) {
            const domain = domains[i];
            try {

                const ip = await dns.promises.lookup(domain);
                const location = await axios.get(`https://ipapi.co/${ip.address}/json/`);
                const { latitude, longitude, country_name, city, region } = location.data;
                const address = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                const { road, house_number, postcode } = address.data.address;
                const formattedHouseNumber = house_number !== undefined ? house_number : "N/A";

                console.log({ country_name, city, region, road, house_number: formattedHouseNumber, postcode })

            } catch (error) {
                console.error(`Error: The domain ${domain} is not available. Skipping...`, error)
            }
        }


    } catch (error) {
        console.error("Error: ", error);
    }
}


addressExtraction().then(locations => console.log(locations))
    .catch(error => console.error("Error:", error));
