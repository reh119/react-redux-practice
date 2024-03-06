// detail Page + Loader
import { getPackage } from "../../api/queries/getPackage"
import type { Params } from "react-router-dom" // for type of params 
import type { PackageDetails } from "../../api/types/packageDetails"

interface LoaderArgs {
    params: Params
}

export interface DetailsLoaderResult {
    details: PackageDetails // make sure we are returning correct type of data from loader below

}

export async function detailsLoader({params}: LoaderArgs) : Promise <DetailsLoaderResult>{
    // reach out to api and fetch data
    const{name} = params
    

    if(!name){
        throw new Error('Name must be provided')
    }

    const details = await getPackage(name)

    return {
        details,

    }
}