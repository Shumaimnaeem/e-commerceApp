import { IFile } from "../interface/file";

// http://placeimg.com/300/200/tech/grayscale

export class Product {
    id : string = '';
    name: string = '';    
    category: string = ''; 
    description: string = '';   
    price :number =0;
    image: any = File;
    imageUrl :string ='';
    quantity : number  =1;
}