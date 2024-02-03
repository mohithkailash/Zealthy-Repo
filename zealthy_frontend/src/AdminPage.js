import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './AdminPage.css';


const AdminPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([])

    const process = (userId) => {
        // Send the user ID to port 8000
        navigate(`/admin/process/${userId}`); 
    };

    //display the saved user information 
    useEffect(() => {
        axios.post('/admin')
            .then(response => {
                console.log(response.data);
                setUserInfo(response.data)})
    }, []);
    
    console.log("userInfo", userInfo)

  return (
    <div className="admin-page-container">
      <nav className="NavbarItems">
                <div className="head"><h2>Customer Queries</h2></div>
                <div className="nav-menu">
                </div>
                
            </nav>
      <div className="user-data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Attachment</th>
              <th>Status</th>
              <th>Respond</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.description}</td>
                <td>
                {user.attachment !== 'None' ? (
                    <a href={user.attachment} target="_blank" rel="noopener noreferrer">
                    Attachment
                    </a>
                ) : (
                    'None'
                )}
                </td>
                <td>{user.status}</td>
                <td> <button className="gooey-button"  onClick={() => process(user._id)}>Process</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to= '/user'> Return to User Form </Link>

      </div>
    </div>
  );
};

export default AdminPage;
