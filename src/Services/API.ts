import axios , {AxiosRequestConfig, AxiosResponse} from 'axios';
import { Channel, CommentsResponse, HomeVideo, Video } from './DataService';



const apiClient = axios.create({
    baseURL:'https://yt-api.p.rapidapi.com/',
    headers: {
        'x-rapidapi-key': '3b7a0ef5f1msha3a7cf231bf6c24p1229a7jsn582f6d9f7cfb',
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
      }
})

const requests = async <T>(config: AxiosRequestConfig): Promise<T | null > => {
  try {
    const response:AxiosResponse<T> = await apiClient.request(config);
    return response.data;
    
  } catch (error) {
    console.log('API request error:', error || error.message)
    return null;
  }
}


//Fetch Home Videos
export const getHomeVideos = async () : Promise <HomeVideo[]> => {
  const data = await requests <{data: HomeVideo[]}> ({
    url:'/home',
    method :'GET'
  })

return data?.data.filter((item) => item.type == 'video') || []
}


export const getSearchResults = async (query:string) : Promise <HomeVideo[]> => {
  const data = await requests <{data: HomeVideo[]}> ({
    url:`/search?query=${query}`,
    method :'GET'
  })

return data?.data.filter((item) => item.type == 'video') || []
}

export const getVideoInfo = async (videoId:string) :Promise <Video | null > => {
return await requests <Video> ({
  url:`/video/info?id=${videoId}`,
  method :'GET'
})

}

export const getchannelInfo = async (channelID:string) : Promise <Channel | null> => {
  return await requests <Channel> ({
    url:`/channel/home?id=${channelID}`,
    method:'GET'
  })
}



export const getRelatedVideos = async (videoId:string) : Promise <HomeVideo[]> => {
  const data = await requests <{data: HomeVideo[]}> ({
    url:`/related?id=${videoId}`,
    method:'GET'
  })

return data?.data.filter((item) => item.type == 'video') || []
}

export const getComments = async (videoId:string) :Promise <CommentsResponse | null> => {
  return await requests <CommentsResponse> ({
    url:`/comments?id=${videoId}`,
    method:'GET'
  })
}








  
