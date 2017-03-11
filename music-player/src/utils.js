export function handleUrl(options) {
    let type = options.type || 1,
        size = options.size || 10,
        offset = options.offset || 0
    return `/api/ting/?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=${type}&size=${size}&offset=${offset}`
}