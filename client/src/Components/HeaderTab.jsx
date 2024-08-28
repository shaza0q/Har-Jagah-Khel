import React, { useEffect, useState } from 'react';
import { handleLogout } from '../api/handleLogout';
import { useNavigate } from 'react-router-dom';


export default function HeaderTab() {

    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const sec = date.getSeconds().toString().padStart(2, '0');
    
        return `${hours}:${min}:${sec}`;
      };

  return (
    <header>
        <button id='logout-bt' onClick={() => handleLogout(navigate)}>Logout</button>
        <p>{formatTime(currentTime)}</p>
    </header>
  )
}
