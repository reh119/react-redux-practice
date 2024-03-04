export interface Place {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
}
// this interface was made so that as we put together all these seperate pieces of our app, they all stuck/satisfied with the interface to gurantee all components work together correctly, all components expect to exchnage these place objects. 