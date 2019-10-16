const axios = require('axios').default;
require('dotenv').config();

const API_URL = 'https://dev.to/api';
const PATH_ALL_ARTICLES = '/articles/me/all?per_page=1&page=1';
const URL_ALL_ARTICLES = `${API_URL}${PATH_ALL_ARTICLES}`;
const LENGTH_OF_TIMESTAMP = -14;

const getAllArticles = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'api-key': process.env.API_TOKEN,
      },
    });
    return await data.slice(0, 5);
  } catch (err) {
    throw new Error(err);
  }
};

const createFileName = ({ published_at, slug }) => {
  const correctDate = published_at ? published_at.slice(0, LENGTH_OF_TIMESTAMP) : published_at;
  const fileName = `${correctDate}-${slug}`;
  const fileExtension = '.md';
  return `${fileName}${fileExtension}`;
};

const extractContent = ({ body_markdown }) => (body_markdown);

const articlesDownloader = async () => {
  const rawArticles = await getAllArticles(URL_ALL_ARTICLES);
  rawArticles.forEach((article) => {
    const fileName = createFileName(article);
    const content = extractContent(article);
  });
};

articlesDownloader();
