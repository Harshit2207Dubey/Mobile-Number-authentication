import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";



const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA Verified!"),
    });
  };

  // Send OTP
  const sendOtp = async () => {
    if (!phone.startsWith("+")) {
      alert("Enter phone number with country code (e.g., +919876543210)");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    setLoading(true);

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.message);
    }
    setLoading(false);
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter the OTP");
      return;
    }
    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      alert("Phone number verified successfully!");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", flexDirection: "column"}}>
      <h2>Phone Authentication</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div>
        <button onClick={sendOtp} disabled={loading} class="inline-block">
        Send OTP
        </button>
      </div>

      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
         />
          <button onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
