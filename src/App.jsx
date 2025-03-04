import { useState } from 'react'
import Fund from './fund'
import Scatter from './Scatter'
import './App.css'

function App() {
  const [fund, setFund] = useState(null);

  const setNewFund = (e) => {
    const fund = parseInt(new FormData(e.target).get("fund"), 10);
    
    if (!isNaN(fund)) {
      const newFund = new Fund();
      newFund.setFund(fund)
      
      setFund(newFund);
    }
    
    e.preventDefault();
  };


  return (
    <>
      <h1>Clean Scatter</h1>

      <div className={fund === null ? "show" : "hidden"}>
        <form id="starting-input" onSubmit={setNewFund}>
          <div>
            <div className="fund-form">
              <label htmlFor="fund">Your Total Fund</label>
              <input type="number" step="any" name="fund" id="fund" required/>
            </div>
          </div>

          <div id="submit">
            <input type="submit" value="Scatter"/>
          </div>
        </form>
      </div>

      <div className={fund === null ? "hidden" : "show"}>
        {fund !== null && <Scatter fund={fund} />}
      </div>
    </>
  );
}

export default App
