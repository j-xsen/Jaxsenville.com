export { data }

async function data(pageContext) {
    let path = pageContext.urlParsed.pathname.split('/')[1]
    console.log(path)
    return { path }
}