import { SetStateAction, useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Phone number is not valid");
      return;
    }

    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp?: string) => {
    console.log(`Login successful ${otp}`)
  }

  return (
    <div>
      { !showOtpInput ? <form onSubmit={handlePhoneSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          placeholder="Enter phone number"
        />
        <button type="submit">Submit</button>
      </form> : <div>
          <p>Enter Otp sent to mobile {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>}
    </div>
  );
};

export default PhoneOtpForm;
