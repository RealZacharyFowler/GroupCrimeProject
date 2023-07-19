import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SelectCrime = (props) => {
  const { id } = useParams();
  const [allCrimes, setAllCrimes] = useState([]);
  const [crimeType, setCrimeType] = useState("");
  const [crimeStatus, setCrimeStatus] = useState("");
  const [crimeCity, setCrimeCity] = useState("");
  const [errors, setErrors] = useState({});
  const [CrimeNotFoundError, setCrimeNotFoundError] = useState("");
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/crime/${id}`)
      .then((response) => {
        console.log("here",response.data);
        setAllCrimes(response.data);
        setCrimeType(response.data.crimeType);
        setCrimeStatus(response.data.crimeStatus);
        setCrimeCity(response.data.crimeCity);
      })
      .catch((err) => {
        console.log(err.response);
        setCrimeNotFoundError(`Crime not found using that ID`);
      });
  }, []);

  
  return (
    <div className ="container">
        {CrimeNotFoundError ? (
        <h2>
            {CrimeNotFoundError} <Link to="/new">Click here to add Crime</Link>
        </h2>
        ) : null}
        <Link to="/allcrimes" style={{margin: '50px'}}>Home</Link>
        
        
          <div style={{margin: '50px'}} className = "form-group">
            
            <h1>{allCrimes.type}</h1>
          </div>
          <div style={{margin: '50px'}} className = "form-group">
            
            <h1>Status: {allCrimes.status} </h1>
          </div>
              
            <div style={{margin: '50px'}} className = "form-group">
              
              <h1>City: {allCrimes.city} </h1>
            </div>
              
        
        
    </div>
  );
};

export default SelectCrime;