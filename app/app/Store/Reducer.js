const Reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN":
            return {
                ...state,
                isAuth: true
            }
        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            }
        case 'BAMIN':
            return {
                ...state,
                bammedin: payload
            }
        default:
            return state;
    }
}


export default Reducer;