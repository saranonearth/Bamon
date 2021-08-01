import { createContext } from 'react';

const Store = createContext({
    user: null,
    isAuth: false,
    bammedin: 0.00,
    bammedout: 0.00
});

export default Store;