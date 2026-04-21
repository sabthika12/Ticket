import React, { useState, useEffect } from 'react';
import './App.css';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import BookingSummary from './components/BookingSummary';
import BookingHistory from './components/BookingHistory';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [eventData, setEventData] = useState({
    name: "Tech Innovators Summit 2026",
    department: "Computer Science",
    date: "2026-05-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    price: 500,
    vipPrice: 1000,
    totalTickets: 100,
    available: 100
  });

  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleBook = (bookingData) => {
    setCurrentBooking(bookingData);
    setBookings([bookingData, ...bookings]);
  };

  const handleReset = () => {
    setCurrentBooking(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>🎫 Event Ticket System</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="main-content">
        <div className="left-column">
          <EventDetails event={eventData} />
          
          <BookingForm 
            event={eventData} 
            setEvent={setEventData} 
            onBook={handleBook}
            onReset={handleReset}
          />
        </div>

        <div className="right-column">
          {currentBooking && (
            <BookingSummary booking={currentBooking} event={eventData} />
          )}
          
          <BookingHistory bookings={bookings} />
        </div>
      </div>
    </div>
  );
}

export default App;
