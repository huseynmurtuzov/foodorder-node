import { Meal } from "../../models/Meal";
import dataSource from "../../dataSource/dataSource";
const mealRepo = dataSource.getRepository(Meal)

export const checkMeals = async(meals:Meal[]):Promise<boolean> => {
    meals.forEach(async(meal) => {
        let isRealMeal = await mealRepo.findOne({where:{id:meal.id}})
        if(!isRealMeal){
            return false
        }
    })
    return true;
}