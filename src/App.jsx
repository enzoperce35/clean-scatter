import { useState } from 'react';
import Fund from './fund';
import Scatter from './Scatter';
import Scatter2 from './Scatter2';  
import './style/App.css';

function App() {
  const [fund, setFund] = useState(null);
  const [mode, setMode] = useState("safe");
  const [submitted, setSubmitted] = useState(false);

  const carouselItems = [
    { label: "Safe Playstyle", mode: "safe", className: "safe" },
    { label: "High Risk ~ High Reward", mode: "high-risk", className: "high-risk" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % carouselItems.length;
    setCurrentSlide(newSlide);
    setMode(carouselItems[newSlide].mode);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    setCurrentSlide(newSlide);
    setMode(carouselItems[newSlide].mode);
  };

  const setNewFund = (e) => {
    e.preventDefault();
    const inputFund = parseFloat(new FormData(e.target).get("fund"));
    const minAmount = mode === "safe" ? 80 : 300;

    if (!isNaN(inputFund) && inputFund >= minAmount) {
      const newFund = new Fund(inputFund);
      sessionStorage.setItem('initialFund', inputFund);
      setFund(newFund);
      setSubmitted(true);
    } else {
      alert(`Minimum fund required: ${minAmount}`);
    }
  };

  return (
    <>
      <div className="title-container">
        <h1>Clean Scatter</h1>
        {submitted && (
          <h2 className={`subtitle ${carouselItems.find(item => item.mode === mode).className}`}>
            {carouselItems.find(item => item.mode === mode).label}
          </h2>
        )}
      </div>
  
      {!submitted && (
        <div className="carousel">
          <button className="carousel-btn left" onClick={prevSlide}>&#8249;</button>
          <div className="carousel-item">{carouselItems[currentSlide].label}</div>
          <button className="carousel-btn right" onClick={nextSlide}>&#8250;</button>
        </div>
      )}
  
      {!fund ? (
        <div className="show">
          <form id="starting-input" onSubmit={setNewFund}>
            <div>
              <div className="fund-form">
                <label htmlFor="fund">Your Total Fund</label>
                <input 
                  type="number" 
                  step="any" 
                  name="fund" 
                  id="fund" 
                  required 
                  min={mode === "safe" ? 80 : 300}
                  placeholder={`Minimum: ${mode === "safe" ? 80 : 300}`}  
                />
              </div>
            </div>
            <div id="submit">
              <input type="submit" value="Scatter"/>
            </div>
          </form>
        </div>
      ) : (
        <div className="show">
          {mode === "safe" ? <Scatter fund={fund} /> : <Scatter2 fund={fund} />}
        </div>
      )}
    </>
  );
  
}

export default App;
