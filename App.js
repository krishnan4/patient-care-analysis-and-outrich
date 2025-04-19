import React, { useState } from 'react';
     import './App.css';

     function App() {
       const [symptoms, setSymptoms] = useState({
         chills: 0,
         sweating: 0,
         headache: 0,
         body_aches: 0,
         fatigue: 0,
         loss_of_appetite: 0
       });
       const [result, setResult] = useState(null);

       const handleChange = (e) => {
         const { name, checked } = e.target;
         setSymptoms({ ...symptoms, [name]: checked ? 1 : 0 });
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         try {
           const response = await fetch('http://localhost:8000/predict', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(symptoms)
           });
           const data = await response.json();
           setResult(data);
         } catch (error) {
           console.error('Error:', error);
           setResult({ error: 'Failed to get prediction. Please try again.' });
         }
       };

       return (
         <div className="container">
           <div className="header">
             <div className="logo">
               <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="50" cy="50" r="50" fill="#007bff"/>
                 <text x="50" y="55" fontSize="30" fill="#fff" textAnchor="middle" dominantBaseline="middle">PCAP</text>
               </svg>
             </div>
             <h1>Patient Care Analysis</h1>
           </div>
           <div className="section">
             <h2>Enter Symptoms</h2>
             <form onSubmit={handleSubmit}>
               {Object.keys(symptoms).map((symptom) => (
                 <label key={symptom}>
                   <input
                     type="checkbox"
                     name={symptom}
                     checked={symptoms[symptom] === 1}
                     onChange={handleChange}
                   />
                   {symptom.replace('_', ' ').toUpperCase()}
                 </label>
               ))}
               <button type="submit">Predict Diagnosis</button>
             </form>
           </div>
           {result && (
             <div className="section">
               <h2>Results</h2>
               {result.error ? (
                 <p className="error">{result.error}</p>
               ) : (
                 <>
                   <div className="result-section">
                     <h3>Predicted Diagnosis</h3>
                     <p>{result.diagnosis}</p>
                   </div>
                   <div className="result-section">
                     <h3>Next Step (RL Prediction)</h3>
                     <p>{result.next_step}</p>
                   </div>
                   <div className="result-section">
                     <h3>Medical Report</h3>
                     <p>{result.medical_report}</p>
                   </div>
                   <div className="result-section">
                     <h3>Simplified Summary (NLP)</h3>
                     <p>{result.summary}</p>
                   </div>
                 </>
               )}
             </div>
           )}
         </div>
       );
     }

     export default App;