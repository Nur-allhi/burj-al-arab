import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + loggedInUser.email, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h3>You have {bookings.length} bookings previously</h3>
      <ul>
        {bookings.map((res) => (
          <li>
            {res.name} <strong>From:</strong>
            {new Date(res.checkIn).toDateString("dd/MM/yyyy")},
            <strong> To:</strong>{" "}
            {new Date(res.checkOut).toDateString("dd/MM/yyyy")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
