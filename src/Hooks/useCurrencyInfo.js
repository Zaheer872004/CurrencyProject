import { useState,useEffect } from "react";

function useCurrencyInfo(currency){

    const [data, setData] = useState({});

    // https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
    useEffect(()=>{
        
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then(res=>res.json())
        .then(res=>setData(res[currency]))  // this res[currency] same as res.currency
        
    },[currency])
    
    console.table(data);
    
    return data;


}


export default useCurrencyInfo;






