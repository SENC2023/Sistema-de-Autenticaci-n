import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <h1>Hola! Bienvenido al sistema de autenticación</h1>
            <p>
                <img src={rigoImageUrl} />
            </p>
            <button
                type="submit"
                className="btn btn-primary m-4"
                onClick={() => {
                    navigate("/login");
                }}
            >
                Ir a Inicio de Sesión
            </button>
            <button
                type="submit"
                className="btn btn-primary m-4"
                onClick={() => {
                    navigate("/signup");
                }}
            >
                Ir a Registrarse
            </button>
        </div>
    );
};
