export interface IOrder {
    id : number;
    userId: string;    
    productIds: []; 
    totalAmount :number;
    createdAt : Date
}