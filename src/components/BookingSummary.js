import React from 'react';

function BookingSummary({ booking, event }) {
  if (!booking) return null;

  return (
    <div className="card" style={{ borderLeft: '4px solid var(--success-color)' }}>
      <h3>🎉 Booking Confirmed!</h3>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        An email confirmation has been sent to <strong>{booking.email}</strong>.
      </p>
      
      <div style={{ marginTop: '15px' }}>
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Department:</strong> {booking.dept}</p>
        <p><strong>Event:</strong> {event.name}</p>
        <p><strong>Category:</strong> {booking.category}</p>
        <p><strong>Tickets:</strong> {booking.tickets}</p>
        <hr style={{ border: 'none', borderTop: '1px dashed var(--border-color)', margin: '15px 0' }} />
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          Total Paid: ₹{booking.totalPrice}
        </p>
      </div>
    </div>
  );
}

export default BookingSummary;
