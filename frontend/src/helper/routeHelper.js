export const getRouteForUpdate = (url, id) => {
    return url.replace(':id?',id);
}
export const getRouteForCreate = (url) => {
    return url.replace(':id?/','');
}
