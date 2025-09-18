import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState("");


  // Password strength checker
  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || phone === undefined) {
      setMessage("All fields are required.");
      return;
    }

    if (!isStrongPassword(password)) {
      setMessage(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // Ensure phone is integer
    const phoneInt = parseInt(phone);
    if (isNaN(phoneInt) || phoneInt.toString().length !== 10) {
      setMessage("Phone number must be a valid 10-digit number.");
      return;
    }

    const newUser = { name, email, password, phone: phoneInt };

    try {
      const res = await fetch(`${API_URL}/admin/Owner_signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        // navigate("/login"); // optionally redirect after success
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5 rounded-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="navbar-brand logo fs-1 text-center">EATY</p>
                    <p className="text-center text-white h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    {message && <p className="text-center text-danger">{message}</p>}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-white">Your Name</label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex-row align-items-center mb-2">
  <div className="form-outline flex-fill mb-0">
    <label className="form-label text-white">Mobile No</label>
    <input
      type="number"
      className="form-control custom-input"
      value={phone}
      onChange={(e) => {
        const val = e.target.value;
        if (val.length <= 10 && val>=0) {       // limit to 10 digits
          setPhone(val);
        }
      }}
    />
  </div>
</div>


                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-white">Your Email</label>
                          <input
                            type="email"
                            className="form-control custom-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill">
                          <label className="form-label text-white">Password</label>
                          <input
                            type="password"
                            className="form-control custom-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {password && !isStrongPassword(password) && (
                            <small className="text-danger">
                              Weak password: must include uppercase, lowercase, number & special char
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="buybtn py-2 w-100 mt-4">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
