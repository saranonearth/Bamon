const Reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN":
            return {
                isAuth: true
            }
        case "LOGOUT":
            return {
                isAuth: false
            }
        default:
            return state;
    }
}


export default Reducer;