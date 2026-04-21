import React, { useState, useEffect } from 'react';

function EventDetails({ event }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date(event.date + 'T' + '10:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft('Event Started');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [event.date]);

  const progressPercentage = ((event.totalTickets - event.available) / event.totalTickets) * 100;

  return (
    <div className="card">
      <h2>{event.name}</h2>
      {timeLeft && <div className="timer">⏳ Starts in: {timeLeft}</div>}
      
      <p><strong>Department:</strong> {event.department}</p>
      <p><strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Regular Price:</strong> ₹{event.price}</p>
      <p><strong>VIP Price:</strong> ₹{event.vipPrice}</p>
      
      <div>
        <p style={{marginBottom: '5px'}}>
          <strong>Available Tickets:</strong> {event.available} / {event.totalTickets}
        </p>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ 
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage > 80 ? 'var(--danger-color)' : 'var(--primary-color)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
