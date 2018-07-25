export class Music {
    id: number;
    name: string;
    artist_id: number = 0;
    artist_name: string;
    description: string;
    thumb: any = "";
    public_thumb: any = "";
    public_path: any = "";
    path: any = "";
    thumbFile: File;
    pathFile: File;
    slug: string;
    day_of_creation: string;
    status: number = 0;
    version: string;
    price: number;
    created_at: string;
    updated_at: string;
    error: false;
    is_play : boolean = false;
    type : string = '';
}