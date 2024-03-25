Write a program that extracts all the valid addresses that are found on a list of company websites. The format in which you will have to extract this data is the following: country, region, city, postcode, road, and road numbers.

Challenge #1 

I wrote the solution in Node.js. The console output i coudn't paste it in the README, it is too long.

So, the challenge has a file named "list of company.parquet".

The first step, i wrote a function that read this .parquet file, and the output was a list of over 2000 websites domain, which i stored them in an array.

The second one, i created one more function where i looped through the domains array, extracted the IP address from the domain. From the IP address, i found an API which has the latitude, longitude, country, city and region of the IP address, which means the location of it. Then i found another API that extract the road, house_number and postcode based on latitude and longitude, and i logged the data to the console.

I've noticed that some domains are not available.

In summary, to find the website location, the IP address must be determined.  
