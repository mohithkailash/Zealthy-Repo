// Userpage.js
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Userpage.css';
import axios from 'axios';



function Userpage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', attachment);
    formData.append('description', description);
    console.log(attachment);


    axios.post('http://localhost:8000/user',

      formData

    ).then(response => {
      if (response) {
        // Handle successful response, e.g., show thank you message
        console.log(response.data);
        setName('');
        setEmail('');
        setAttachment(null);
        setDescription('');
        setSubmitted(true);
      } else {
        // Handle error response
        console.error('Failed to submit ticket');
      }
    })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error);
      });
    // Set submitted state to true to display thank you message

  };

  const handleAnotherQuery = () => {
    // Reset submitted state to false to show the form again
    setSubmitted(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);

  }

  return (
    <div className='outbox'>
      <div className="userpage-container">
        <h2>Enter your Query here</h2>
        {submitted ? (
          <div className="thank-you-message">
            <p>Thank you for submitting your query!</p>
            <div><button onClick={handleAnotherQuery}>Submit Another Query</button></div>
            <div>
              <Link to="/admin" style={{ marginTop: '10%' }}>Go to Admin Page</Link>
            </div>
          </div>
          
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='name'>
              <label>
                Name: <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className='name'>
              <label>Email: <span style={{ color: 'red' }}>*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='name'>
              <label>Description:<span style={{ color: 'red' }}>*</span></label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className='name'>
              <label>Attachment:</label>
              <input type="file" onChange={handleFileChange} />
            </div>

            <div>
              <button className="submit" type="submit">Submit</button>
            </div>
            <div>
              <Link to="/admin" style={{ marginTop: '10%' }}>Go to Admin Page</Link>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default Userpage;
