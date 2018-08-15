export class Music {
    id: number = 0;
    name: string;
    genre: string;
    artist_id: number = 0;
    artist_name: string;
    description: string;
    thumb: any = "";
    public_thumb: any = "";
    public_path: any = "";
    public_pathex: any = "";
    path: any = "";
    pathex: any = "";
    thumbFile: File;
    pathFile: File;
    pathexFile : File;
    slug: string;
    day_of_creation: string;
    status: number = 0;
    version: string;
    price: number;
    created_at: string;
    updated_at: string;
    error: false;
    is_play: boolean = false;
    type: string = '';
}