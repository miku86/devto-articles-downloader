const axios = require('axios').default;

require('dotenv').config()
const API_URL = "https://dev.to/api";
const PATH_ALL_ARTICLES = "/articles/me/all?per_page=1&page=1";
const URL_ALL_ARTICLES = `${API_URL}${PATH_ALL_ARTICLES}`;

const getAllArticles = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "api-key": process.env.API_TOKEN
      }
    });
    return await data
  } catch (err) {
    console.log(err);
  }
}

const articlesDownloader = async () => {
  const articles = await getAllArticles(URL_ALL_ARTICLES);
}

articlesDownloader();