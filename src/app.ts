import express from 'express';
import dotenv from 'dotenv';
import dataSource from './dataSource/dataSource';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUploader from 'express-fileupload'
import notFoundMiddleware from './middleware/not-found';
import 'express-async-errors'
import errorHandlerMiddleware  from './middleware/error-handler';
import authRouter from './routes/accountRoutes'
import customerRouter from './routes/customerRoutes'
import deliveryPersonnelRouter from './routes/deliveryPersonnelRoutes'
import mealsRouter from './routes/mealRoutes'
import notificationsRouter from './routes/notificationRoutes'
import ordersRouter from './routes/orderRoutes'
import paymentRouter from './routes/paymentRoutes'
import restaurantReviewsRouter from './routes/restaurantReviewRoutes'
import restaurantsRouter from './routes/restaurantRoutes'
dotenv.config();
const app = express();
app.use(morgan('tiny'));
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUploader())

//routes
app.use('/api/Account',authRouter);
app.use('/api/Customers',customerRouter);
app.use('/api/DeliveryPersonnel',deliveryPersonnelRouter);
app.use('/api/Meals',mealsRouter);
app.use('/api/Notifications',notificationsRouter);
app.use('/api/Orders',ordersRouter);
app.use('/api/Payments',paymentRouter);
app.use('/api/RestaurantReviews',restaurantReviewsRouter);
app.use('/api/Restaurants',restaurantsRouter)


//last middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
