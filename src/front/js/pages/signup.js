import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [data, setData] = useState({});
    const [alertMessage, setAlertMessage] = useState();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, config);
            console.log('URL de Backend:', `${process.env.REACT_APP_BACKEND_URL}/api/signup`);
            
            // Verifica si la respuesta fue exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.message === "Email and password already exist") {
                setAlertMessage(
                    <div className="alert alert-warning" role="alert">
                        El correo electrónico y la contraseña ya existen
                    </div>
                );
            } else if (result.message === "New user added") {
                setAlertMessage(
                    <div className="alert alert-success" role="alert">
                        Usuario añadido exitosamente
                    </div>
                );
                setTimeout(() => navigate("/login"), 1000);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setAlertMessage(
                <div className="alert alert-danger" role="alert">
                    Hubo un problema con la solicitud. Por favor, intenta de nuevo.
                </div>
            );
        }
    };

    return (
        <div className="container inicio-sesion d-flex justify-content-center pt-4 pb-4" style={{ backgroundColor: "#def4f5" }}>
            <div className="card col-10 col-sm-4 col-md-6 col-lg-6 col-xl-5 mb-3 mt-2 p-3">
                <div className="card-body row text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <h1>Registrate</h1>
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
                        <button type="submit" className="mb-4 btn btn-primary">Registrarse</button>
                        <br />
                        <div className="form-text d-flex justify-content-center">¿Ya tienes cuenta?</div>
                        <div className="form-text d-flex justify-content-center">
                            <Link to="/login">
                                Inicia Sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};