import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Booking.css";

const BookingPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [appointment, setAppointment] = useState({
    barberId: "",
    serviceId: "",
    date: "",
    time: "",
    customerName: "",
    notes: "",
  });

  useEffect(() => {
    const fetchBarbersAndServices = async () => {
      try {
        const barbersResponse = await axios.get(
          "http://localhost:3000/api/barbers"
        );
        const servicesResponse = await axios.get(
          "http://localhost:3000/api/services"
        );
        setBarbers(barbersResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchBarbersAndServices();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/appointments", appointment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Appointment booked successfully");
    } catch (error) {
      console.error("Failed to book appointment", error);
    }
  };

  return (
    <div className="booking-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleBooking}>
        <select
          value={appointment.barberId}
          onChange={(e) =>
            setAppointment({ ...appointment, barberId: e.target.value })
          }
        >
          <option value="">Select Barber</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
        <select
          value={appointment.serviceId}
          onChange={(e) =>
            setAppointment({ ...appointment, serviceId: e.target.value })
          }
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={appointment.customerName}
          onChange={(e) =>
            setAppointment({ ...appointment, customerName: e.target.value })
          }
          placeholder="Customer Name"
          required
        />
        <input
          type="date"
          value={appointment.date}
          onChange={(e) =>
            setAppointment({ ...appointment, date: e.target.value })
          }
          required
        />
        <input
          type="time"
          value={appointment.time}
          onChange={(e) =>
            setAppointment({ ...appointment, time: e.target.value })
          }
          required
        />
        <textarea
          value={appointment.notes}
          onChange={(e) =>
            setAppointment({ ...appointment, notes: e.target.value })
          }
          placeholder="Additional Notes"
        ></textarea>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookingPage;
