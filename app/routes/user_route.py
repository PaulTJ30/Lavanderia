from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.user import User
from app.database.db import db

user_bp = Blueprint('users',__name__, url_prefix="/users")

@user_bp.route("/register", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    rol = data.get('rol')

    if not name or not email or not password:
        return jsonify({"error": "Es necesario enviar todos los datos"}), 400
    
    if User.query.filter_by(email = email).first():
        return jsonify({"error": "El correo ya esta registrado"}), 400
    
    password_hash = generate_password_hash(password)
    new_user = User(name=name, email=email, password=password_hash, rol = rol)
    db.session.add(new_user)
    #Resgistra un cambio en nuestra db (algo como tipo GitHub)
    db.session.commit()
    
    return jsonify({"msg": "Usuario creado con exito"}), 200

