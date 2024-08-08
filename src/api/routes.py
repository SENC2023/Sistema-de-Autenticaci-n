"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    try:
        request_body_user = request.get_json()
        print(request_body_user)
        
        user = User.query.filter_by(email=request_body_user["email"], password=request_body_user["password"]).first()
        
        if user:
            return jsonify({"message": "El email y la contraseña ya existen"}), 400
        
        new_user = User(email=request_body_user["email"], password=request_body_user["password"])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "Usuario agregado exitosamente"}), 201
    
    except Exception as e:
        print(f"Error al procesar la solicitud: {e}")
        return jsonify({"message": "Error al registrar el usuario"}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email, password)
    if not email or not password:
        return jsonify({"message": "Se requieren correo electrónico y contraseña"})
    user = User.query.filter_by(email=email, password=password).first()
    print(user)
    if not user:
        return jsonify({"message": "Correo electrónico y contraseña incorrectos"})
    token = create_access_token(identity=user.id)
    print(token)
    return jsonify({"message": token, "user_id": user.id})

@api.route('/private', methods=['POST'])
@jwt_required()
def validate_token():
    data = request.json
    current_user_id = get_jwt_identity()
    print(current_user_id)
    user = User.query.filter_by(id=current_user_id).first()
    if user is None:
        raise APIException("Usuario no encontrado", status_code=404)
    print(user)
    return jsonify("Usuario autenticado"), 200