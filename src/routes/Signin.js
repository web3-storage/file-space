import React, { useEffect, useState } from "react";
import { useKeyring } from "@w3ui/react-keyring";
import { Navigate, useNavigate } from "react-router-dom";
import LineBg from "../components/LineBg/LineBg";
import LoaderPage from "../components/LoaderPage/Loader";

export default function Signin() {
  const [
    { space, agent },
    { createSpace, registerSpace, cancelRegisterSpace },
  ] = useKeyring();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (space?.registered()) {
      setSignedIn(true);
    }
  }, [space]);

  // We don't know yet if we're loggedIn or not
  if (!agent) {
    return <LoaderPage />;
  }

  if (signedIn) {
    return <Navigate to="/upload" />;
  }

  if (submitted) {
    return (
      <section className="min-vh-100 relative pa6 bg-navy white">
        <LineBg></LineBg>
        <div className="center relative mw6 hero-card">
          <h1 className="near-white">Verify your email address!</h1>
          <p>Click the link in the email we sent to {email} to sign in.</p>
          <p>The email will come from Web3.Storage.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cancelRegisterSpace();
              navigate("/");
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
    <section className="min-vh-100 relative pa6 bg-navy white">
      <LineBg></LineBg>
      <div className="center relative mw6 hero-card">
        <h1>Sign in</h1>
        <form onSubmit={handleRegisterSubmit}>
          <div className="mb3">
            <p>
              {" "}
              This will create an account for you on web3.storage, using w3up
              beta APIs.
            </p>
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
              autoFocus
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
