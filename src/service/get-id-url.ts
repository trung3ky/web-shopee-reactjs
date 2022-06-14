export const getParamsUrl = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    let params: any = new URLSearchParams(url.search.slice(1));
    let obj: any = {};

    for(let pair of params.entries()) {
        obj[pair[0]] = pair[1]
    }

    return obj
};
