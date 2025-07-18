"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, PurchaseDetails
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)
# Allow CORS requests to this API


FLASK_APP_KEY = os.getenv("FLASK_APP_KEY")


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/purchase-details', methods=["GET"])
@jwt_required()
def get_user_purchase_details():
    print("here")
    user_id = int(get_jwt_identity())
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        raise APIException("User not found", 404)
    return jsonify([purchase.serialize() for purchase in user.purchase_details])


@api.route('/users', methods=["GET"])
def get_users():
    users = User.query.all()
    users_list = []
    for user in users:
        users_list.append(
            user.serialize()
        )
    return jsonify(users_list), 200


@api.route('/users', methods=["POST"])
def add_user():
    request_body = request.json
    user = User.query.filter_by(email=request_body['email']).one_or_none()
    if user is not None:
        return "Email already used", 400
    password_hash = generate_password_hash(request_body["password"])
    user = User(
        email=request_body['email'],
        password=password_hash
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route('/profile', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "No user found"})
    return jsonify(user.serialize()), 200


@api.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200
    # user_id = request.json.get('user_id')
    # profile = Profile.query.get('profile_id')
    # db.session.delete(user_id)
    # db.session.commit()
    # return jsonify({"MSG": "Profile deleted"}), 200


@api.route('/purchase-details/<int:purchase_id>', methods=['DELETE'])
@jwt_required()
def delete_purchase(purchase_id):
    user_id = int(get_jwt_identity())
    purchase = PurchaseDetails.query.filter_by(
        user_id=user_id, id=purchase_id).first()
    if not purchase:
        return jsonify({"error": "Purchase not found"}), 404
    db.session.delete(purchase)
    db.session.commit()
    return jsonify({"message": "Purchase deleted"}), 204


@api.route('/purchase-details', methods=["POST"])
@jwt_required()
def add_product():
    user_id = int(get_jwt_identity())
    request_body = request.get_json()
    print(request_body)
    product = Product.query.filter_by(
        name=request_body['name'], brand=request_body['brand'], type=request_body['category']).first()
    if not product:
        product_details = Product(
            name=request_body['name'],
            brand=request_body['brand'],
            type=request_body['category']
        )
        db.session.add(product_details)
        db.session.commit()
        product = product_details
    if not product:
        return jsonify({"error": "product could not be created or found"}), 400
    purchase_details = PurchaseDetails(
        product_id=product.id,
        user_id=user_id,
        purchase_date=request_body['opened_date'],
        expiration_date=request_body['expiration_date'],
        price=request_body['price'],
        store="target"
    )
    db.session.add(purchase_details)
    db.session.commit()
    return jsonify({"message": "product added"}), 201

# TOKEN FOR LOGIN
# Secret key for JWT (use env var in production)


@api.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()  # <-- Fix: call the method
    print("Data received for login:", data)
    if not data:
        return jsonify({"message": "Missing JSON in request"}), 400

    if 'email' not in data or 'password' not in data:
        return jsonify({"message": "Missing email or password"}), 400

    print("Data pass conditionals")

    user = User.query.filter_by(email=data['email']).first()

    print("User found:", user)

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify(status="error", message="invalid email or password"), 400

    print("User authenticated successfully")

    # payload = {
    #     'user_id': user.id,
    #     'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    # }

    token = create_access_token(identity=str(user.id))

    print("Token created:", token)

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200
#  Image upload endpoint


@api.route("/profile-images", methods=["POST"])
@jwt_required()
def upload_profile_image():

    # get the user
    user_id = int(get_jwt_identity())
    # if no user retrurn 404
    if not user_id:
        return 404
    # if user get the profile
    profile = User.find_by_id(user_id)
    # get the url from the request body
    request_body = request.json
    image_url = request_body.get('image_url')
    public_id = request_body.get('public_id')
    # update the imgage url and the public id profile
    if not image_url or not public_id:
        return jsonify({"error": "Image URL and public ID are required"}), 400
    profile.image_url = image_url
    profile.public_id = public_id
    # add the profile to the db session
    db.session.add(profile)
    # commit the changes to the db
    db.session.commit()
    # return jsonify( profile.serialize)
    return jsonify({"message": "Profile image uploaded successfully", "profile": profile.serialize()}), 200
