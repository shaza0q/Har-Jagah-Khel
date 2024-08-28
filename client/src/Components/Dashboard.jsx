import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styling/UserDashboardStyle.css';
import { gettingData } from '../api/getUserData';
import { getGroundNear } from '../api/getGroundNearby';
import { bookingSlot } from '../api/bookingSlot';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderTab from './HeaderTab';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({});
  const [userData, setUser] = useState(undefined);
  const [groundData, setGroundData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // New state for selected card

  axios.defaults.withCredentials = true;

  useEffect(() => {
    gettingData(setUser);
  }, []);

  

  useEffect(() => {
    if (userData) {
      getGroundNear(userData.pincode, 0, 50000, setGroundData);
    }
  }, [userData]);

  

  const handleBooking = (slotId, groundId, userId) => {
    bookingSlot(slotId, groundId, userId);
  };

  const openCardModal = (card) => {
    setSelectedCard(card);
  };

  const closeCardModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
    
    <HeaderTab/>
    
    <div className='dashboard'>
    
      <h1 style={{display:'flex', justifyContent:"center"}}>Welcome to dashboard</h1>
      <h2>Hello {userData && userData.username} </h2>

      <h3>Grounds near you</h3>

      <div className={selectedCard ? 'cards blur' : 'cards'}>
        {groundData && groundData.length &&
          groundData.map((ground) => {
            const open = isOpen[ground._id] || false;
            return (
              <motion.div
                className='card'
                transition={{layout: {duration:.75, type: 'spring'}}}
                key={ground._id}
                layout
                onClick={() => openCardModal(ground)}
                style={{
                  borderRadius: "5px",
                  boxShadow: "0px 10px 30px rgba(0,0,0, 0.5)"
                }}
              >
                <motion.h4 layout="position">{ground.ground}</motion.h4>
                <motion.img className='gImage' layout="position" src={ground.photo} alt='ground'></motion.img>
                <motion.p >{ground.type}</motion.p>
              </motion.div>
            )
          })}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <>
            <div className='overlay' onClick={closeCardModal} />
            <motion.div
              className='modal'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className='headTab'>
                <motion.h4 layout="position">{selectedCard.ground}</motion.h4>
                <motion.img className='gImage' layout="position" src={selectedCard.photo} alt='ground'></motion.img>
              </div>
              <motion.div 
                initial={{opacity: 0}} 
                animate={{opacity: 1}}
                transition={{duration: 1}}  
              >
                <p id='desc'>Type: {selectedCard.type}</p><br />
                <p id='desc'>{selectedCard.discription}</p>
              
                <div className='timings'>
                  <div className='slots'>
                    {selectedCard?.slots?.map(slot => (
                      <div key={slot._id} id='bt-confirm'>
                        {!slot.occupied ? (
                          <button className='slot-button' onClick={() => {
                            if(window.confirm(`Do you want to book the slot from ${slot.time_start} - ${slot.time_end}?`)){
                              handleBooking(slot._id, slot.ground_id, userData._id)}}}>
                            {slot.time_start} - {slot.time_end}
                          </button>
                        ) : (
                          <button
                            className='slot-button'
                            id='bt-confirm occupied-slot'
                            style={{
                              border: '3px dotted red',
                              cursor: 'not-allowed',
                              backgroundColor: '#FF999C',
                            }}
                          >
                            {slot.time_start} - {slot.time_end}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default Dashboard;
