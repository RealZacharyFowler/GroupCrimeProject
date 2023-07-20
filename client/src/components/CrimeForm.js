import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CrimeForm = (props) => {
const [crimeType, setCrimeType] = useState("");
const [crimeStatus, setCrimeStatus] = useState("");
const [crimeCity, setCrimeCity] = useState("");
const [errors, setErrors] = useState({});
const navigate = useNavigate();
const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/crime", { 
        type: crimeType, 
        status: crimeStatus,
        city: crimeCity
}, {withCredentials:true})
.then((response) => {
        console.log("form data",response);
        navigate("/allcrimes");
})
.catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
    });
};
return (
    <div className="auth-form-container">
        <h2>Add Crime</h2>
        <form className="crime-form" onSubmit={handleSubmit}>
            
            <label htmlFor="crimeTitle">Crime Type</label>
            <input type="text" onChange={(e) => setCrimeType(e.target.value)} value={crimeType}/>
            {errors?.type && <span>{errors.type.message}</span> }
            
            <label htmlFor="crimeStatus">Status</label>
            <input type="text" onChange={(e) => setCrimeStatus(e.target.value)} value={crimeStatus} />
            {errors?.status && <span>{errors.status.message}</span> }
            
            <label htmlFor="crimeTitle">City</label>
            <input type="text"onChange={(e) => setCrimeCity(e.target.value)} value={crimeCity}/>
            {errors?.city && <span>{errors.city.message}</span> }
            
            <button className="link-btn" type="submit">SUBMIT </button>
        <Link to="/allcrimes"><button className="link-btn">Home</button></Link>
        </form>
        </div>
    );
};

export default CrimeForm;