import {DeliveryPersonnel} from '../../models/DeliveryPersonnel'
import dataSource from "../../dataSource/dataSource"

const deliveryPersonnelRepo = dataSource.getRepository(DeliveryPersonnel);


function shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const shuffleDeliveryPersonnels = async() : Promise<DeliveryPersonnel>  => {
    const allDeliveryPersonnelsIds = await deliveryPersonnelRepo.find({select:["id"]});
    const exactIds = allDeliveryPersonnelsIds.map(person => person.id);
    const shuffledIds = shuffleArray(exactIds);
    const exactId = shuffledIds.slice(0,1);
    const exactDeliveryPersonnel = await deliveryPersonnelRepo.findOne({where:{id:Number(exactId)}});
    if(!exactDeliveryPersonnel){
        throw new Error("Something wrong happened while selecting delivery personnel for your order! Please try again!")
    }
    return exactDeliveryPersonnel;
}


