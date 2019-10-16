/* eslint camelcase: ["error", { allow: ["body_markdown", "published_at"]}] */
/* eslint no-shadow: ["error", { allow: ["err"] }] */
const axios = require('axios').default;
const fs = require('fs');
require('dotenv').config();

const API_URL = 'https://dev.to/api';
const PATH_ALL_ARTICLES = '/articles/me/all';
const URL_ALL_ARTICLES = `${API_URL}${PATH_ALL_ARTICLES}`;
const LENGTH_OF_TIMESTAMP = -14;
const PREFIX_IF_NOT_PUBLISHED = '[not-published]';
const OUT_DIR = 'OUTPUT/';

const getAllArticles = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'api-key': process.env.API_TOKEN,
      },
    });
    return await data;
  } catch (err) {
    throw new Error(err);
  }
};

const createFileName = ({ published_at, slug }) => {
  const correctDate = published_at
    ? published_at.slice(0, LENGTH_OF_TIMESTAMP)
    : PREFIX_IF_NOT_PUBLISHED;
  const fileName = `${correctDate}-${slug}`;
  const fileExtension = '.md';
  return `${fileName}${fileExtension}`;
};

const extractContent = ({ body_markdown }) => (body_markdown);

const writeContentToFile = (fileName, content) => {
  fs.mkdir(OUT_DIR, { recursive: true }, (err) => {
    if (err) throw new Error(err);
    fs.writeFile(`${OUT_DIR}${fileName}`, content, (err) => {
      if (err) throw new Error(err);
    });
  });
};

const articlesDownloader = async () => {
  const rawArticles = await getAllArticles(URL_ALL_ARTICLES);
  rawArticles.forEach((article) => {
    const fileName = createFileName(article);
    const content = extractContent(article);
    writeContentToFile(fileName, content);
  });
};

articlesDownloader();
