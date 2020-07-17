const storeObject = {
    state: {
        token: null,
        reservationData: []
    },
    mutations: {
        saveToken (state, token) {
            state.token = token;
        },
        resetToken(state) {
            state.token = null;
        },
        saveReservationData(state, data) {
            state.reservationData = data;
        },
        resetReservationData(state) {
            this.reservationData = [];
        }
    }
};

export default storeObject;