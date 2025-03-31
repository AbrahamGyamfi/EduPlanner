from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.eduplanner  # Database Name
users_collection = db.users  # Collection Name

# Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    studentId = data.get("studentId")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    users_collection.insert_one({
        "firstname": firstname,
        "lastname": lastname,
        "studentId": studentId,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "User created successfully"}), 201

# Login Route (No JWT, Simple Authentication)
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({
            "status": "success",
            "message": "Logged in successfully",
            "user": {
                "firstname": user.get("firstname"),
                "lastname": user.get("lastname"),
                "email": user.get("email")
            }
        }), 200
    else:
        return jsonify({
            "status": "fail",
            "message": "Invalid credentials"
        }), 401
        

if __name__ == "__main__":
    app.run(debug=True, port=5000)