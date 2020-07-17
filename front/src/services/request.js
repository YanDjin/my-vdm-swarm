import axios from 'axios';
import urljoin from 'url-join';

function request(url, data, headers, method = "post") {
    if (Array.isArray(url)){
        url = urljoin(process.env.VUE_APP_API_URL, ...url);
    } else {
        url = urljoin(process.env.VUE_APP_API_URL, url);
    }
    let loader = this.$loading.show({
        container: null
    });
    return axios({method, url, data, headers}).then(res => {
        if (res.data && res.data.message){
            this.$toast.success(res.data.message)
        }
        return Promise.resolve(res);
    }).catch(err => {
        if (err.response.data && err.response.data.message){
            this.$toast.error(err.response.data.message)
        }
        return Promise.reject(err)
    }).finally(() => {
        loader.hide();
    });
}

export default request;