#  TIG Freight management code test
This repo is for TIG Freight management code test

# How to run
1. Please run "docker-compose up --build" to initialize the project

2. After all the services are up, you might want to steup the database user for the app by follow steps:

    Connect to the MongoDB Shell with Authentication: You need to authenticate as a user with the necessary permissions to initiate the replica set.

    "docker exec -it tig-mongo-1 bash"
    "mongosh -u root -p password --authenticationDatabase admin"
    "rs.initiate()""

3. You can visit the application by http://localhost:3000/graphql

    In these interfaces, you can write queries and mutations to test your shorten and redirect functionalities, like so:

    mutation {
    shorten(originalUrl: "https://www.example.com/long-url")
    }

    query {
    redirect(shortUrl: "http://yourdomain.com/short-id")
    }

4. You can run test with "npx jest test --watchAll"

5. To address scalability, I have been utilizing Redis and MongoDB in the application, and I plan to incorporate a load balancer and monitor system metrics and set up auto-scaling for Monitoring and Auto-Scaling to adjust resources based on demand for this Microservice.

