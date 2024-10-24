import {
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [student, setStudent] = useState([{}]);

  // input State
  const [name, setName] = useState("");
  const [address, setAddresss] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [course, setCourse] = useState("");

  // Error State
  const [errorName, setErrorName] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(false);

  const [formSubmited, setFormSubmited] = useState(false);

  const ValidateName = (input) => {
    const { name, value } = input;
    if (name === "name") {
      setName(value);
      if (!!value.match(/^[A-Za-z\s]+$/)) {
        setErrorName(false);
      } else {
        setErrorName(true);
      }
    }
  };

  const ValidateAddress = (input) => {
    const { name, value } = input;
    if (name === "address") {
      setAddresss(value);
      if (!!value.match(/^[A-Za-z0-9\s]+$/)) {
        setErrorAddress(false);
      } else {
        setErrorAddress(true);
      }
    }
  };

  const ValidateMobile = (input) => {
    const { name, value } = input;
    if (name === "mobile") {
      setMobile(value);
      if (!!value.match(/^[0-9]{10}$/)) {
        setErrorMobile(false);
      } else {
        setErrorMobile(true);
      }
    }
  };

  const ValidateEmail = (input) => {
    const { name, value } = input;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (name === "email") {
      setEmail(value);
      if (emailPattern.test(value)) {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
    }
  };

  const ValidateGender = (e) => {
    const value = e.target.value;
    setGender(value);
    if (!value) {
      setErrorGender(true);
    } else {
      setErrorGender(false);
    }
  };

  const ValidateBirthYear = (e) => {
    const value = e.target.value;
    setBirthday(value);
    if (!value) {
      setErrorBirthday(true);
    } else {
      setErrorBirthday(false);
    }
  };

  const ValidateCourse = (e) => {
    const value = e.target.value;
    setCourse(value);
    if (!value) {
      alert("Select your Course");
    }
  };

  const HandleSubmitForm = (e) => {
    e.preventDefault();
    if (name && address && mobile && email && gender && birthday && course) {
      const data = {
        id: Date.now(),
        name,
        address,
        mobile,
        email,
        gender,
        birthday,
        course,
      };
      setStudent([...student, data]);
      setFormSubmited(true);
      console.log(student);
    } else {
      alert("Please fill in all the fields correctly.");
    }
  };

  // UseEffect to hide success message after 5 seconds
  useEffect(() => {
    if (formSubmited) {
      const timer = setTimeout(() => {
        setFormSubmited(false); // Hide the message after 5 seconds
      }, 5000);
      // Cleanup function to clear the timer when the component unmounts or before starting a new timer
      return () => clearTimeout(timer);
    }
  }, [formSubmited]);

  return (
    <div className="container">
      <div className="formContainer">
        <h4 className="text-center text-decoration-underline">
          Registration Forms
        </h4>
        <form action="" onSubmit={HandleSubmitForm}>
          {/* name */}
          <TextField
            className="w-100 mt-4"
            id="standard-name"
            label="Name"
            name="name"
            variant="standard"
            onChange={(e) => ValidateName(e.target)}
          />
          {errorName && (
            <span className="text-danger text-bold">Wrong name</span>
          )}
          {/* address */}
          <TextField
            className="w-100 mt-4"
            id="standard-address"
            label="Address"
            name="address"
            variant="standard"
            onChange={(e) => ValidateAddress(e.target)}
          />
          {errorAddress && (
            <span className="text-danger text-bold">Wrong address</span>
          )}
          {/* mobile */}
          <TextField
            className="w-100 mt-4"
            id="standard-mobile"
            label="Mobile"
            name="mobile"
            variant="standard"
            onChange={(e) => ValidateMobile(e.target)}
          />
          {errorMobile && (
            <span className="text-danger text-bold">Wrong mobile number</span>
          )}
          {/* email */}
          <TextField
            className="w-100 mt-4"
            id="standard-email"
            label="Email"
            name="email"
            variant="standard"
            onChange={(e) => ValidateEmail(e.target)}
          />
          {errorEmail && (
            <span className="text-danger text-bold">Wrong Email Address</span>
          )}
          <br></br>
          {/* gender */}
          <FormControl className="mt-4">
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              onChange={ValidateGender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {errorGender && (
            <span className="text-danger text-bold">Please select gender</span>
          )}
          {/* date */}
          <div className="mt-3">
            <label htmlFor="birthday">Choose your birthday:</label>
            <br></br>
            <input
              onChange={ValidateBirthYear}
              type="date"
              id="birthday"
              name="birthday"
            />
          </div>
          {errorBirthday && (
            <span className="text-danger text-bold">
              Please select a valid birthday
            </span>
          )}
          {/* course */}
          <FormControl className="mt-4" fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Course"
              onChange={ValidateCourse}
            >
              <MenuItem value={"biology"}>Biology</MenuItem>
              <MenuItem value={"computer science"}>Computer Science</MenuItem>
              <MenuItem value={"commerce"}>Commerce</MenuItem>
              <MenuItem value={"humanities"}>Humanities</MenuItem>
            </Select>
          </FormControl>
          {/* button */}
          <Stack spacing={2} className="mt-4">
            <Button type="submit" variant="contained">
              Register Now
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Stack>
        </form>
        {/* Success Message */}
        <div className="mt-3">
          {formSubmited && (
            <span className="text-success text-center">
              Form Submitted Successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
