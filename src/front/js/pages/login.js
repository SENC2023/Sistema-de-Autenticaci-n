import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [data, setData] = useState({});
    const [alertMessage, setAlertMessage] = useState();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(process.env.BACKEND_URL + "/api/login", config)
            .then((response) => response.json())
            .catch(error => console.log('error', error))
            .then(response => {
                console.log(response);
                
                if (response.message === "Email and password are required") {
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            Email and password are required
                        </div>
                    );
                } else if (response.message === "Email and password incorrect") {
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            Email and password incorrect
                        </div>
                    );
                } else if (response.user_id) {
                    localStorage.setItem('token', response.message);
                    navigate("/private");
                }
            });
    };

    return (
        <div className="container inicio-sesion d-flex justify-content-center pt-4 pb-4" style={{ backgroundColor: "#def4f5" }}>
            <div className="card col-10 col-sm-4 col-md-6 col-lg-6 col-xl-5 mb-3 mt-2 p-3">
                <div className="card-body row text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <h1>Iniciar Sesión</h1>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp" 
                                placeholder="email@address.com" 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                id="exampleInputPassword1" 
                                placeholder="***********" 
                                onChange={handleChange} 
                            />
                        </div>
                        {alertMessage}
                        <button type="submit" className="mb-4 btn btn-primary">Iniciar Sesión</button>
                        <br />
                        <div className="form-text d-flex justify-content-center">¿No tienes cuenta? </div>
                        <div className="form-text d-flex justify-content-center">
                            <Link to="/signup">
                                Crea una cuenta nueva
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};