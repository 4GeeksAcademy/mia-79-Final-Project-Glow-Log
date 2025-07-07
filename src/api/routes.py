"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/purchase_details', methods=["GET"])
def get_user_purchase_details(user_id):
    user = User.get(user_id)
    if user is None:
        raise APIException("User not found", 404)
    return jsonify(user.serialize())

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
    user = User.query.filter_by(email = request_body['email']).one_or_none()
    if user is not None: 
        return "Email already used", 400
    user = User(
        email = request_body['email'],
        password = request_body['password']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/users/<int:user_id>/profile', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"error": "No user found"})
    return jsonify(user.serialize()), 200

@api.route('/users/<int:user_id>/profile', methods=['DELETE'])
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

@api.route('/users/<int:user_id>/purchase_details', methods=["POST"])
def add_product(user_id):
    request_body = request.json
    product = Product.query.filter_by(name=request_body['name'], brand=request_body['brand'], type=request_body['type']).first()
    if not product: 
        product_details = Product(
            name= request_body['name'],
            brand=request_body['brand'],
            type=request_body['type']
        )
        db.session.add(product_details)
        db.session.commit()
        product = product_details
    if not product: 
        return jsonify({"error": "product could not be created or found"}), 400
    purchase_details = PurchaseDetails(
        product_id = product.id,
        user_id = user_id,
        purchase_date = request_body['purchase_date'],
        expiration_date = request_body['expiration_date'],
        price = request_body['price'],
        store = request_body['store']
    )
    db.session.add(purchase_details)
    db.session.commit()
    return jsonify({"message": "product added"}), 201
