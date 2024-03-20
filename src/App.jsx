import {useState, useEffect} from "react";
export default function App(){
  const [isLoading, setIsLoading]=useState(false);
  const [error, setError]=useState();
  const [apiData, setApiData]=useState({});
  const [amountOne, setAmountOne]=useState("");
  const [amountTwo, setAmountTwo]=useState("")
  const [currencyOne, setCurrencyOne]=useState("USD")
  const [currencyTwo, setCurrencyTwo]=useState("INR")
  useEffect(()=>{
    async function apiCall(currencyOne){
      setIsLoading(true);
      try{
        let response=await fetch(`https://v6.exchangerate-api.com/v6/5bb6f5960cde1502a8cce189/latest/${currencyOne}`);
        let data=await response.json();
        setApiData(data.conversion_rates);
      }catch(e){
        setError(e);
      }finally{
        setIsLoading(false);
      }
    }
    apiCall(currencyOne);
  },[currencyOne])
  if (isLoading){
    return (
      <h1>Loading...</h1>
    )
  }
  if (error){
    return (
      <h1>please try again after some time</h1>
    )
  }
  function amountOneChange(e){
    const amountOneNew=e.target.value
    setAmountOne(amountOneNew)
    setAmountTwo(apiData[currencyTwo]*amountOneNew)
  }
  function amountTwoChange(e){
    setAmountTwo(e.target.value)
  }
  function changeCurrencyOne(e){
    setCurrencyOne(e.target.value)
  }
  function changeCurrencyTwo(e){
      setCurrencyTwo(e.target.value)
  }

  return (
    <div className="container">
      <div className="first-row">
      <input
        type="number"
        placeholder="From"
        value={amountOne}
        onChange={amountOneChange}
        />
        <select value={currencyOne} onChange={changeCurrencyOne}>
          {Object.keys(apiData).map(elements=>
              <option value={elements} key={elements}>{elements}</option>
            )}
        </select>
        </div>
        <div className="second-row">
        <input
          type="number"
          placeholder="To"
          value={amountTwo}
          onChange={amountTwoChange}

        />
          <select value={currencyTwo} onChange={changeCurrencyTwo}>
          {Object.keys(apiData).map(elements=>
              <option value={elements} key={elements}>{elements}</option>
            )}
        </select>
        </div>
      
      
    </div>
  )
}