import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
const DisplayAll = (props) => {
const [allCrimes, setAllCrimes] = useState([]);
const [user, setUser] = useState([]);
useEffect(() => {
    axios
    .get("http://localhost:8000/api/crime")
    .then((response) => {
        console.log(response.data);
        setAllCrimes(response.data);
    })
    // .getLogged("http://localhost:8000/api/user-current")
    // .then((response) => {
    //     console.log(response.data);
    //     setUser(response.data);
    // })
    .catch((err) => {
        console.log(err.response);
    });
}, []);

const handleDeleteCrime = (idFromBelow) => {
    axios
    .delete(`http://localhost:8000/api/crime/${idFromBelow}`)
    .then((response) => {
        console.log("success deleting crime");
        console.log(response);
        const filteredCrimes = allCrimes.filter((crime) => {
        return crime._id !== idFromBelow;
        });
        setAllCrimes(filteredCrimes);
    })
    .catch((err) => {
        console.log("error deleting crime", err.response);
    });
};
return (
    <div className="container">
    <div className="row">
        <div className="col-8">

            <h1>Los Angeles County Crime Database</h1>
        <table className="table table-striped border border-light">
            <thead>
            <tr>
            <th scope="col">Type of Crime</th>
            <th scope="col">Status</th>
            <th scope="col">City</th>
            <th scope="col">Action</th>
            <th scope="col">Uploaded By</th>
            </tr>
            </thead>
            <tbody>
            {allCrimes.map((crime, index) => {
                return (
                    <tr key={crime._id}>
                    <td>{crime.type}</td>
                    <td>{crime.status}</td>
                    <td>{crime.city}</td>
                    <td>
                    <Link to={`/edit/${crime._id}`}>
                        <button className="btn btn-primary">Edit</button>
                    </Link>

                    <button
                        onClick={() => handleDeleteCrime(crime._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                    </td>
                    <td>{user._id}</td>
                    {/*<td>{login.firstName}</td>*/}
                </tr>
                );
            })}
            </tbody>
        </table>
            <Link to="/newcrime"><button className="btn btn-primary">Report a Crime</button></Link>
        </div>
    </div>
    </div>
);
};

export default DisplayAll;