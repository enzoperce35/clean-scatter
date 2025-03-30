import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Fund from './fund';
import Scatter from './Scatter';
import Scatter2 from './Scatter2';
import './App.css';

function App() {
  const [fund, setFund] = useState(null);
  const [mode, setMode] = useState(0); // 0 for Scatter, 1 for Scatter2

  useEffect(() => {
    const storedFund = sessionStorage.getItem('initialFund');
    if (storedFund) {
      setFund(new Fund(parseInt(storedFund, 10)));
    }
  }, []);

  const setNewFund = (e) => {
    e.preventDefault();
    
    const inputFund = parseInt(e.target.elements.fund.value, 10);
    
    if (!isNaN(inputFund)) {
      const newFund = new Fund(inputFund);
      sessionStorage.setItem('initialFund', inputFund);
      setFund(newFund);
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setMode((prevMode) => (prevMode + 1) % 2),  // Toggle to Scatter2
    onSwipedRight: () => setMode((prevMode) => (prevMode + 1) % 2), // Toggle back to Scatter
    trackMouse: true, // Allows mouse dragging as well
  });

  return (
    <>
      <h1>
        Clean Scatter
        <p>
          {mode === 0 
            ? "safe playstyle" 
            : "high-risk ~ high-reward"}
        </p>
      </h1>

      {fund ? (
        <div {...handlers} className="swipe-container">
          {mode === 0 ? <Scatter fund={fund} /> : <Scatter2 fund={fund} />}
        </div>
      ) : (
        <form id="starting-input" onSubmit={setNewFund}>
          <div className="fund-form">
            <label htmlFor="fund">Your Total Fund</label>
            <input type="number" step="any" name="fund" id="fund" required />
          </div>
          <div id="submit">
            <input type="submit" value="Scatter" className="submit-button" />
          </div>
        </form>
      )}
    </>
  );
}

export default App;
