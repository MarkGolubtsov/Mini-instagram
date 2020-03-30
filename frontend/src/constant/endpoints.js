export const apiUrl = 'http://localhost:8090';
export const endpointsServer = {
    getNews: 'get news',
    putNews: 'update news',
    deleteNews: 'delete news',
    postNews: 'create news',
    getNewsList: 'get all news',
};
export const endpointsClient = {
    updated:'updated',
    getAll:'news',
    getNew:'new news',
    getDelete: 'news deleted'
};
export const authEndpoints = {
    login:`${apiUrl}/login`,
    registration:`${apiUrl}/registration`,
};
