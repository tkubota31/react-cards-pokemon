import {useState, useEffect} from 'react'
import axios from "axios"


const useFlip = () =>{
    const[state,setState] = useState(true);

    const flipCard = () =>{
        setState(state => !state)
    }

    return [state,flipCard]
}

function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorageState(keyInLS);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
      };

    const clearResponses = () => setResponses([]);

    return [responses, addResponseData, clearResponses];
  }

const useLocalStorageState = (key, defaultValue=[]) =>{
    if (localStorage.getItem(key)) {
        defaultValue = JSON.parse(localStorage.getItem(key));
      }
      const [value, setValue] = useState(defaultValue);

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [value, key]);

      return [value, setValue];
}

export default useLocalStorageState;

export { useFlip, useAxios, useLocalStorageState};
