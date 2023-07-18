import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const EditCrimeForm = (props) => {
    const { id } = useParams();
    const [crimeType, setCrimeType] = useState("");
    const [crimeStatus, setCrimeStatus] = useState("");
    const [crimeCity, setCrimeCity] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [crimeNotFoundError, setCrimeNotFoundError] = useState("");
    console.log(id);
    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/crime/${id}`)
        .then((response) => {
            console.log(response.data);
            setCrimeType(response.data.type);
            setCrimeStatus(response.data.status);
            setCrimeCity(response.data.city);
        })
        .catch((err) => {
            console.log(err.response);
            setCrimeNotFoundError(`Crime not found using that ID`);
        });
    }, []);

const submitHandler = (e) => {
    e.preventDefault();

    axios
    .put(`http://localhost:8000/api/crime/${id}`, { type: crimeType, status: crimeStatus, city: crimeCity})
    .then((response) => {
        navigate("/allcrimes");
        console.log(response);
    })
    .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
    });
};
return (
    <div className="auth-form-container">
        <h2>Edit Crime</h2>
        <form className="crime-form" onSubmit={submitHandler}>
            
            <label htmlFor="crimeTitle">Crime Type</label>
            <input type="text" onChange={(e) => setCrimeType(e.target.value)} defaultValue={crimeType} />
            {errors?.title && <span>{errors.title.message}</span> }
            
            <label htmlFor="crimeStatus">Status</label>
            <input type="text" onChange={(e) => setCrimeStatus(e.target.value)} defaultValue={crimeStatus} />
            {errors?.status && <span>{errors.status.message}</span> }
            
            <label htmlFor="crimeTitle">City</label>
            <input type="text"onChange={(e) => setCrimeCity(e.target.value)} defaultValue={crimeCity}/>
            {errors?.city && <span>{errors.city.message}</span> }
            
            <button className="link-btn" type="submit">SUBMIT </button>
        <Link to="/allcrimes"><button className="link-btn">Home</button></Link>
        </form>
        </div>
    );
};

export default EditCrimeForm;