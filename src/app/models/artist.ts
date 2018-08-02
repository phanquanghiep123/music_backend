export class Artist {
    id: number;
    name: string;
    sort_name : string;
    gender    : string ='';
    description : string;
    content : string;
    avatar : any = '';
    public_avatar : any = '';
    avatarFile : File;
    area : string;
    type : string = '';
    slug: string;
    begin_date : string;
    end_date : string;
    date_of_birth : string;
    status: boolean;
    created_at: string;
    updated_at: string;
    error : false;
    bio: string;
    price : object = null;
}