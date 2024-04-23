// expand using next.js, etc ... https://www.youtube.com/watch?v=eQrbjvn_fSc&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=6

import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
    // if value is already stored
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // return result of a function
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    })
    
    // const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage