import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import './Process.css';

import { useParams } from 'react-router-dom';

const Process = () => {
  const [processData, setProcessData] = useState(null);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const progress = [
    { label: "New", value: 0},
    { label: "In progress", value:1},
    { label: "Complete", value:2},
]

  const params = useParams();

  const fetchData = async (userId) => {
    try {
      const response = await axios.post('/process', {
        userId
      });
      setProcessData(response.data);

      setStatus(response.data.status)

    } catch (error) {
      console.error('Error fetching process data:', error);
    }
  };

  const handleClick = async ()=>{
    const id = processData._id

    console.log(processData)
    try {
        await axios.post(`/confirm`, {
            id,
            status
        });
       
      } catch (error) {
        console.error('Error updating status:', error); 
      }
      alert('Status updated and Email sent');
      navigate('/admin');
  }

  
  useEffect(() => {
    console.log(params.id)
    const userId = params.id;
    fetchData(userId);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatus(newStatus)
  };

  console.log(status)

  return (
    <div className="process-container">
      {processData && (
        <div className="process-details">
            <form>
          <h2>Name: {processData.name}</h2>
          <p>Email: {processData.email}</p>
          <p>Description: {processData.description}</p>
          <p>Attachment: {processData.attachment !== 'None' ? (
                    <a href={processData.attachment} target="_blank" rel="noopener noreferrer">
                    Link
                    </a>
                ) : (
                    'None'
                )}</p>
          <p>Status:
            <select value={status} onChange={(e) => handleStatusChange(processData._id, e.target.value)}>
              <option value="NEW">NEW</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </p>
          </form>
          <div className='name'>
              <label>Send response in email:</label>
              <textarea value={response} onChange={(e) => setResponse(e.target.value)} required />
            </div>
            <button className="gooey-button" onClick={handleClick}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Process;
