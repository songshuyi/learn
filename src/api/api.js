const host = '/apiApp/api_'
const url = {
    fenlei: 'fenlei',
    list: 'zlliebiao',
    content: 'neirong'
}
for(let key in url){
    url[key] = host + url[key] + '.php'
}
export default url