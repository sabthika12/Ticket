import React, { useState } from "react";

function BookingForm({ event, setEvent, onBook, onReset }) {
  const initialFormState = {
    name: "",
    email: "",
    dept: "",
    tickets: "",
    category: "Regular"
  };

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Reset success/error messages on typing
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const validate = () => {
    if (!form.name || !form.email || !form.dept || !form.tickets) {
      return "All fields are required.";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (form.tickets <= 0) {
      return "Number of tickets must be positive.";
    }

    if (form.tickets > event.available) {
      return `Not enough tickets available. Only ${event.available} left.`;
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();

    if (err) {
      setError(err);
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const isVIP = form.category === "VIP";
      const unitPrice = isVIP ? event.vipPrice : event.price;
      const totalPrice = form.tickets * unitPrice;
      const bookingId = "BK" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

      const updatedEvent = {
        ...event,
        available: event.available - form.tickets
      };

      setEvent(updatedEvent);

      onBook({
        ...form,
        bookingId,
        unitPrice,
        totalPrice,
        date: new Date().toLocaleString()
      });

      setSuccess(true);
      setIsLoading(false);
      setForm(initialFormState);
    }, 1500); // 1.5s loading simulation
  };

  const handleReset = () => {
    setForm(initialFormState);
    setError("");
    setSuccess(false);
    onReset();
  };

  const currentUnitPrice = form.category === "VIP" ? event.vipPrice : event.price;
  const liveTotal = form.tickets > 0 ? form.tickets * currentUnitPrice : 0;

  return (
    <div className="card">
      <h3>Book Tickets</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            name="name" 
            placeholder="John Doe" 
            value={form.name} 
            onChange={handleChange} 
            disabled={isLoading || event.available === 0}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            name="email" 
            placeholder="john@example.com" 
            value={form.email} 
            onChange={handleChange} 
            disabled={isLoading || event.available === 0}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input 
            name="dept" 
            placeholder="e.g. IT, HR" 
            value={form.dept} 
            onChange={handleChange} 
            disabled={isLoading || event.available === 0}
          />
        </div>

        <div className="form-group">
          <label>Seat Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange}
            disabled={isLoading || event.available === 0}
          >
            <option value="Regular">Regular (₹{event.price})</option>
            <option value="VIP">VIP (₹{event.vipPrice})</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Tickets</label>
          <input 
            name="tickets" 
            type="number" 
            min="1"
            max={event.available}
            placeholder="0" 
            value={form.tickets} 
            onChange={handleChange} 
            disabled={isLoading || event.available === 0}
          />
        </div>

        {form.tickets > 0 && liveTotal > 0 && !error && (
          <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
            Live Total: ₹{liveTotal}
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">Booking successful! Check summary.</p>}
        {event.available === 0 && <p className="error-text">Sold out!</p>}

        <div className="button-group">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading || success || event.available === 0}
          >
            {isLoading ? <span className="spinner"></span> : "Confirm Booking"}
          </button>
          
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
