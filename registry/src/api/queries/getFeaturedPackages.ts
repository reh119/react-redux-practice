import type { PackageDetails } from "../types/packageDetails"; // interface

const FEATURED_PACKAGES = [
    'react', 'typescript', 'esbuild','vite'
]
export async function getFeaturedPackages(){
    const promises = FEATURED_PACKAGES.map(async (name) => {
        const res = await fetch (`https://registry.npmjs.org/${name}`) // will return back array of promises!
        return res.json();
    })
    const data = await Promise.all(promises) // array of package details objects
    return data as PackageDetails[];
}
