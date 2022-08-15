import os
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_refresh_token
from dotenv import load_dotenv


api = Blueprint('api', __name__)

@api.route("/Login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"Message": "Please contact your administrator"}), 401
    if password != user.password: 
        return jsonify({"message: password is incorrect"}), 401
    
    print('message succeeded')
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route("/FormSignup", methods=["POST"])
def create_user():
    # body = request.json.get()
    email = request.json.get("email", none)
    password = request.json.get("password", none)
    password2 = request.json.get("password2", none)
    if email == "test" or password == "test":
        return jsonify({"msg": "Invalid email or password doesn't match"}), 401
        
    user = User(email=email, password=password, password2=password2)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    print(user_id)
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify(user.serialize())
    return jsonify("error user not found")

# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)

#     user = User.query.filter_by(email=email).first()
#     if user is None:
#         return jsonify({"Message": "Please contact your administrator"}), 401
#     if password != user.password: 
#         return jsonify({"message: password is incorrect"}), 401

#     print('message succeeded')
    # access_token = create_access_token(identity=user.id)
    # return jsonify(access_token=access_token), 200