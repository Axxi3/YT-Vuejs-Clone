export interface HomeVideo{
    type: string;
    videoId:string;
    title:string;
    channelTitle:string;
    description:string;
    viewCount:string;
    publishedTimeText:string;
    publishedDate:string;
    publishedAt:string;
    lengthText:string;
    thumbnail:Thumbail[];
    channelThumbnail:Thumbail[];
}

export interface   Thumbail{
    url:string;
    width:number;
    height:number;
}

export interface Video {
    id: string;
    title: string;
    channelId: string;
    channelTitle: string;
    thumbnail: Thumbail[];
    description: string;
    publishedAt: string;
    viewCount: string;
}

export interface CommentsResponse {
 data:Comments[];
 commentsCount:string;
}

export interface Comments {
    commentId:string;
    authorThumbnail:Thumbail[];
    authorText:string;
    textDisplay:string;
    publishedTimeText:string;
    likeCount:string;
}


export interface Channel {
   meta:channelData
   data:ChnnnelDataVideos[]
}


export interface channelData {
    channelId: string;
    title: string;
    description: string;
    avatar:Thumbail[];
    banner:Thumbail[];
    channelHandle:string;
    subscriberCountText:string;
    videosCountText:string;
}


export interface ChnnnelDataVideos {
    type: string;
    title: string;
    subtitle: string;
    data:HomeVideo[]
}