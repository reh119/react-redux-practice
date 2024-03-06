// interface that describes what a PackageDetail object is
// will make a PackageDetails interface that describes the response (object) structure  we get back after making our get request for details. dont need to make a interface like searchresponse as the data we get is already nice enough to work with directly. 

export interface PackageDetails {
    name: string, 
    description: string, 
    readme: string,
    author: {
        email: string,
        name: string,
    }
    maintainers: {
        email: string,
        name: string,
    } [] // array of email and name objects
    license: string
}