import { $cms } from "@jx3box/jx3box-common/js/https";
const CLIENT = 'origin'

function getCode() {
    return $cms({mute:true}).get(`/api/cms/news`, {
        params: {
            client: CLIENT,
            type: "code",
            status : 1
        },
    });
}

function getNews(type,limit) {
    let _params = {
        client: CLIENT,
        type: type,
        status : 1
    };
    if (limit) {
        _params.limit = limit;
    }
    return $cms({mute:true}).get(`/api/cms/news`, {
        params: _params,
    });
}

function getSliders(type, limit) {
    let _params = {
        client: CLIENT,
        type: type,
        status : 1
    };
    if (limit) {
        _params.limit = limit;
    }
    return $cms({mute:true}).get(`/api/cms/news`, {
        params: _params,
    });
}

export { getCode, getNews, getSliders };