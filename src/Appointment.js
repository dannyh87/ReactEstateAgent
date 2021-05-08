import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
function Appointment(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsFormOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const sendSMS = () => {
    async function doSMS() {
      let payload = {
        msg: document.getElementById("msg").value,
        tel: document.getElementById("tel").value,
        id: props.id,
        email: document.getElementById("email").value,
        time: document.getElementById("time").value,
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        
      };
      console.log(payload);
      let response = await fetch("http://localhost:3001/sms", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
    }
    doSMS();
  };
  if (isOpen) {
    return (
      <div>
        <label>Preferred date:</label>
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <br />
        <label>Customer Name</label>
        <input id="name" type="text"></input>
        <br />
        <label>Preferred time:</label>
        <input id="time" type="text"></input>
        <br />
        <label>Contact email:</label>
        <input id="email" type="text"></input>
        <br />
        <label>Contact phone:</label>
        <input id="tel" type="text"></input>
        <br />
        <label>Notes/comments:</label>
        <br />
        <textarea id="msg" rows="5" cols="40"></textarea>
        <br />
        <button
          onClick={() => {
            setIsFormOpen(false);
            setIsBooked(true);
            sendSMS();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => setIsFormOpen(true)}>
      {isBooked ? "Booked" : "Request viewing"}
    </button>
  );
}
export default Appointment;
