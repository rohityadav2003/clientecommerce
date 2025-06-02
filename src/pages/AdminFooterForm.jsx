import React, { useState } from "react";
import axios from "axios";

export default function AdminFooterForm() {
  const [form, setForm] = useState({
    aboutLinks: [],
    categories: [],
    contact: {
      address: "",
      phone: "",
      email: "",
    },
    registeredOffice: {
      address: "",
      phone: "",
    },
    socialIcons: [],
    paymentLogos: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`
${process.env.REACT_APP_BACKEND_URLL}/api/footer`, form);
    alert("Footer content updated successfully!");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Footer Panel</h2>
      {/* You can create individual inputs to push links, icons, etc. */}
      <textarea
        placeholder="About Links (JSON)"
        onChange={(e) => setForm({ ...form, aboutLinks: JSON.parse(e.target.value) })}
        rows="5"
        cols="50"
      ></textarea>

      <textarea
        placeholder="Categories (JSON)"
        onChange={(e) => setForm({ ...form, categories: JSON.parse(e.target.value) })}
        rows="5"
        cols="50"
      ></textarea>

      <input
        type="text"
        placeholder="Contact Address"
        onChange={(e) => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Contact Phone"
        onChange={(e) => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })}
      />
      <input
        type="email"
        placeholder="Contact Email"
        onChange={(e) => setForm({ ...form, contact: { ...form.contact, email: e.target.value } })}
      />
      <input
        type="text"
        placeholder="Registered Office Address"
        onChange={(e) =>
          setForm({ ...form, registeredOffice: { ...form.registeredOffice, address: e.target.value } })
        }
      />
      <input
        type="text"
        placeholder="Registered Office Phone"
        onChange={(e) =>
          setForm({ ...form, registeredOffice: { ...form.registeredOffice, phone: e.target.value } })
        }
      />

      <textarea
        placeholder="Social Icons (JSON Array)"
        onChange={(e) => setForm({ ...form, socialIcons: JSON.parse(e.target.value) })}
      />
      <textarea
        placeholder="Payment Logos (JSON Array of URLs)"
        onChange={(e) => setForm({ ...form, paymentLogos: JSON.parse(e.target.value) })}
      />

      <button onClick={handleSubmit}>Submit Footer</button>
    </div>
  );
}
