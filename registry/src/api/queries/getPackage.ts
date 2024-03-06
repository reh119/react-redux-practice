// function to get packages for the detials page
// we will jsut make 
// to fetch details
import type { PackageDetails } from "../types/packageDetails"; // interface 


export async function getPackage(name: string): Promise<PackageDetails>{

    const res = await fetch (`https://registry.npmjs.org/${name}`)
    const data = await res.json(); 

    return data as PackageDetails // type asserstion

}
