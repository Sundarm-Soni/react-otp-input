import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = (val:string) => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs: React.MutableRefObject<HTMLInputElement[]> = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if(inputRefs.current[0]) {
        inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if(isNaN(parseInt(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if(combinedOtp.length) onOtpSubmit(combinedOtp);

    if(value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index+1].focus();
    }
  }
  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1,1);

    if(index > 0 && !otp[index - 1]) {
        inputRefs.current[otp.indexOf("")].focus();
    }
  }
  const handleKeyDown = (index: number, event: KeyboardEvent) => {
        if(event.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index-1].focus();
        }
  }
  return (
    <div>{otp.map((value, index) => {
        return <input 
            key={index}
            type="text"
            value={value}
            ref={(input) => ((inputRefs.current[index] as HTMLInputElement | null) = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={()=> handleKeyDown(index, e)}
            className="otpInput"
        /> 
    })}</div>
  )
}

export default OtpInput;