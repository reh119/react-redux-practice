import { PackageSummary } from "../types/packageSummary";

interface SearchResponse {
    objects: {
        package: {
            name: string,
            description: string,
            version: string,
            keywords: string[]
        }
    }[]

}

// api request from loader in createBroswerRouter
export async function searchPackages(term: string) : Promise<PackageSummary[]> {
    const res = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${term}`
      );

      const data: SearchResponse = await res.json(); // data is of type search response 

      // now, we can map over datas object oroperty and turn it into an array of PackageSummary objects
      return data.objects.map((searchResult)=>{
        return {
            // satisfiy PackageSummary interface
            name: searchResult.package.name,
            description: searchResult.package.description,
            version: searchResult.package.version,
            keywords: searchResult.package.keywords
        }
      }) // dont want type 'any'  in our code

}
// searchPackages made for fetch request making it easier to organize