import cv2
import numpy as np
from flask import Flask, request, jsonify
import face_recognition
import base64
from concurrent.futures import ThreadPoolExecutor

def create_app():
    app = Flask(__name__)
    return app

app = create_app()
executor = ThreadPoolExecutor(max_workers=4)

CONFIG = {
    "min_face_size": 0.3,
    "min_blur": 150,
    "min_light": 50,
    "max_light": 200,
    "match_threshold": 0.6,
}

def check_image_quality(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.Laplacian(gray, cv2.CV_64F).var()
    light = np.mean(gray)
    return blur, light

def decode_base64_image(image_data):
    try:
        header, encoded = image_data.split(",", 1)
        nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
        return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    except Exception as e:
        raise ValueError("Invalid image format") from e

def get_largest_face(face_locations):
    return max(face_locations, key=lambda loc: (loc[2] - loc[0]) * (loc[1] - loc[3]))

def process_image(image_data):
    try:
        img = decode_base64_image(image_data)
        blur, light = check_image_quality(img)
        if blur < CONFIG["min_blur"]:
            return {"error": "Blur score too low"}, 400
        if not (CONFIG["min_light"] < light < CONFIG["max_light"]):
            return {"error": "Lighting issue"}, 400
        
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_img)
        if not face_locations:
            return {"error": "No face detected"}, 400

        main_face = get_largest_face(face_locations)
        top, right, bottom, left = main_face
        if (bottom - top) / img.shape[0] < CONFIG["min_face_size"]:
            return {"error": "Face too small"}, 400

        future = executor.submit(
            face_recognition.face_encodings, rgb_img, [main_face], "large"
        )
        encodings = future.result()
        if not encodings:
            return {"error": "Face encoding failed"}, 400

        return {"encoding": encodings[0].tolist(), "quality": {"blur": blur, "light": light}}
    except ValueError as ve:
        return {"error": str(ve)}, 400
    except Exception as e:
        return {"error": "Internal server error"}, 500

@app.route("/verify-face", methods=["POST"])
def verify_face():
    try:
        image_data = request.json.get("image")
        if not image_data:
            return jsonify({"error": "No image provided"}), 400
        
        result = process_image(image_data)
        return jsonify(result), (400 if "error" in result else 200)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/compare-faces", methods=["POST"])
def compare_faces():
    try:
        data = request.json
        known = np.array(data["known_encoding"])
        current_encoding = process_image(data["image"])
        if isinstance(current_encoding, tuple):
            return jsonify(current_encoding[0]), current_encoding[1]
        
        distance = face_recognition.face_distance([known], current_encoding["encoding"])[0]
        match = distance < CONFIG["match_threshold"]
        return jsonify({"match": match, "confidence": float(1 - distance / CONFIG["match_threshold"])}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
