import axios from "axios";
import { BASE_URL_MAIN_SERVER } from "@/helpers/constants";
import NewsItem from "@/types/news";

const baseURL = BASE_URL_MAIN_SERVER;

type GetAllNewsResponse = {
  news: NewsItem[];
};

type GetAllNewsParams = {
  type: string;
  typeAccount: string;
};

export async function getAllNews(params: GetAllNewsParams) {
  const res = await axios.get<GetAllNewsResponse>(baseURL + "/news", {
    params,
  });
  return res.data;
}
export async function getNewsDetails(id: string) {
  const res = await axios.get<NewsItem>(baseURL + `/news/${id}`);
  return res.data;
}
export async function createNews(data) {
  const res = await axios.post(baseURL + `/news`, data);

  return res.data;
}
export async function deleteNews(newsId) {
  const res = await axios.delete(baseURL + `/news/${newsId}`);

  return res.data;
}
