import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    // this will look for a filter variable

    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
    let query: any = {}; // set any  tpe

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({ 
        data:[], 
        pagination:{ 
          total:0, 
          page:1, 
          pages:1, 
        }
      });
    }
    if(selectedCuisines){ 
        const cuisinesArray=selectedCuisines.split(",").map((cuisine)=> new RegExp(cuisine,"i")) 

        query["cuisines"]={$all:cuisinesArray}
    } 
    // searches for the restaurant name and cuisines
    // in operator is used to check if any of the cuisines in the database are query in searchQuery

        if(searchQuery){ 
            const searchRegex=new RegExp(searchQuery,"i") 
            query["$or"]=[ 
                {restaurantName:searchRegex}, 
                {cuisines:{$in: [searchRegex]}}, 
                // 
            ]
        }
        const pageSize=10; 
        const skip=(page-1)*pageSize; //skips the number documents in a page 
        const restaurants=await Restaurant.find(query).sort({[sortOption]:1}).skip(skip).limit(pageSize).lean()

        const total=await Restaurant.countDocuments(query)
        const response={ 
            data:restaurants, 
            pagination:{ 
                total,
                page, 
                pages: Math.ceil(total/pageSize)
            }
        }

        res.json(response); // converted to json and send to response

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
 
export default{ 
    searchRestaurant 
}