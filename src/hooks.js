import React, {useState, useEffect} from 'react'
import axios from "axios"
import useLocalStorage from '../../react-cards-pokemon-solution/src/hooks';

const useFlip = () =>{
    const[state,setState] = useState(true);

    const flipCard = () =>{
        setState(state => !state)
    }

    return [state,flipCard]
}

const useAxios = (key,url) =>{
    const [response,setResponse] = useLocalStorage(key);

    const addResponseData = async (formatter = data => data,restOfUrl = "") =>{
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponse(data => [...data, formatter(response.data)]);
    };

    const clearResponses = () => setResponse([]);

    return [response, addResponseData, clearResponses];
}

const useLocalStorageState = (key, defaultValue) =>{
 const [state,setState] = useState(() =>{
     let value = JSON.parse(window.localStorage.getItem(key) || defaultValue);
        return value;
 });
 useEffect(() =>{
     window.localStorage.setItem(key,state)
 },[key,state])

 return [state,setState]
}
export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage};
