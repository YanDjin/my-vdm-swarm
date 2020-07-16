const storeObject = {
    state: {
        token: null
    },
    mutations: {
        saveToken (state, token) {
            state.token = token;
        },
        resetToken(state) {
            state.token = null;
        }
    }
};

export default storeObject;