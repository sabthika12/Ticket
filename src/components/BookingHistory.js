import React from 'react';

function BookingHistory({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="card">
        <h3>📜 Booking History</h3>
        <p style={{ color: 'var(--text-secondary)' }}>No bookings made yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>📜 Booking History</h3>
      <div>
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="booking-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{booking.name} ({booking.tickets} {booking.category} tickets)</strong>
              <span>₹{booking.totalPrice}</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              ID: {booking.bookingId} | Date: {booking.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;
