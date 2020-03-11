const apiUrl = 'http://localhost:8090';
export const endpoints = {
    getNews: id => `${apiUrl}/news/${id}`,
    putNews: id => `${apiUrl}/news/${id}`,
    deleteNews: id => `${apiUrl}/news/${id}`,
    postNews: `${apiUrl}/news`,
    getNewsList: `${apiUrl}/news`,
};
