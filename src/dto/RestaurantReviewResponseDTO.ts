import { userRole } from "../utils/enums/userRole";

export class RestaurantReviewResponseDTO{
    constructor(comment:string,rating:number){
        this.comment = comment;
        this.rating = rating
    }
    comment:string;
    rating:number;
}