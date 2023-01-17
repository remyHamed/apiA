import express from "express";

async function bootstrap(): Promise<void> {
    const app = express();

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "PATCH, POST, DELETE, GET")
        next();
    });


    app.get('/', (req, res) => {
        res.send('Hello wolrd!')
    })
    app.listen(process.env.PORT, function() {
        console.log("Server listening on port " + process.env.PORT);
    });
}

bootstrap().catch(console.error);
