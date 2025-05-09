import express from 'express';
import dotenv from 'dotenv';
import dataSource from './dataSource/dataSource';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUploader from 'express-fileupload'
import notFoundMiddleware from './middleware/not-found';
import 'express-async-errors'
import errorHandlerMiddleware  from './middleware/error-handler';
dotenv.config();
const app = express();
app.use(morgan('tiny'));
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUploader())

//routes







//last middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// dataSource.initialize().then(() => {
//     console.log("Success")
// }).catch((err) => {
//     console.log(err)
// });
const start  = async():Promise<void> => {
    try {
        await dataSource.initialize()
        console.log("Database connected")
        app.listen(process.env.PORT, () => {
            console.log("Server is listening")
        })
    } catch (error) {
        console.log(error)
    }
}


start();
