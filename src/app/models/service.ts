export class Service {
    status: boolean = false;
    messege: string = "";
    response: any = null;
    limit : number = 0;
    page  : number = 1;
    total : number = 0;
    public_url : string;
    next : number =  1;
}