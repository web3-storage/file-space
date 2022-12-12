import React, { useEffect, useState } from "react";
import { useKeyring } from "@w3ui/react-keyring";
import { useNavigate } from "react-router-dom";
import LineBg from "../components/LineBg/LineBg";

export default function Signin() {
  const [{ space }, { createSpace, registerSpace, cancelRegisterSpace }] =
    useKeyring();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (space?.registered()) {
      navigate("/upload");
    }
  }, [navigate, space]);

  if (submitted) {
    return (
      <section className="pa6 bg-navy white">
        <LineBg></LineBg>
        <div className="center relative mw6 hero-card">
          <h1 className="near-white">Verify your email address!</h1>
          <p>Click the link in the email we sent to {email} to sign in.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cancelRegisterSpace();
            }}
          >
            <button
              type="submit"
              className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black bd ba b--white-70"
            >
              Cancel
            </button>
          </form>
        </div>
      </section>
    );
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await createSpace();
      await registerSpace(email);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSubmitted(false);
    }
  };

  if (error) {
    return <div>Ups! Something went wrong! Please try again later!</div>;
  }

  return (
    <section className="min-vh-100 pa6 bg-navy white">
      <LineBg></LineBg>
      <div className="center relative mw6 hero-card">
        <form onSubmit={handleRegisterSubmit}>
          <div className="mb3">
            <label htmlFor="email" className="db mb2">
              Email address:
            </label>
            <input
              id="email"
              className="db pa2 w-100"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black bd ba b--white-70"
            disabled={submitted}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
