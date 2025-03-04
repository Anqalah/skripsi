import cv2
import numpy as np
from flask import Flask, request, jsonify
import face_recognition
import base64
from skimage import exposure
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
executor = ThreadPoolExecutor(4)  # Optimasi multi-threading

# Konfigurasi
CONFIG = {
    "min_face_size": 0.3,
    "min_blur": 150,
    "min_light": 50,
    "max_light": 200,
    "match_threshold": 0.6
}

def check_image_quality(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.Laplacian(gray, cv2.CV_64F).var()
    light = np.mean(gray)
    return blur, light

def async_face_encoding(rgb_image):
    return face_recognition.face_encodings(
        rgb_image, 
        model="large", 
        num_jitters=2
    )

def process_image(image_data):
    try:
        # Decode base64
        header, encoded = image_data.split(",", 1)
        nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Validasi kualitas
        blur, light = check_image_quality(img)
        if blur < CONFIG["min_blur"]:
            return {"error": f"Blur score too low: {blur:.1f}"}, 400
        if not (CONFIG["min_light"] < light < CONFIG["max_light"]):
            return {"error": f"Lighting issue: {light:.1f}"}, 400

        # Deteksi wajah
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_img)
        if not face_locations:
            return {"error": "No face detected"}, 400
            
        # Ambil wajah terbesar
        main_face = max(face_locations, key=lambda loc: (loc[2]-loc[0])*(loc[1]-loc[3]))
        top, right, bottom, left = main_face
        
        # Validasi ukuran wajah
        face_height = bottom - top
        if face_height/img.shape[0] < CONFIG["min_face_size"]:
            return {"error": "Face too small"}, 400

        # Encoding dengan multi-threading
        future = executor.submit(
            face_recognition.face_encodings,
            rgb_img, 
            known_face_locations=[main_face], 
            model="large"
        )
        encodings = future.result()
        if not encodings:
            return {"error": "Face encoding failed"}, 400
        return {
            "encoding": encodings[0].tolist(),
            "quality": {"blur": blur, "light": light}
        }
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/verify-face', methods=['POST'])
def verify_face():
    try:  
        if 'image' not in request.json:
            return jsonify({"error": "No image provided"}), 400
        result = process_image(request.json['image'])
        if 'error' in result:
            return jsonify(result), 400
        return jsonify({
            "encoding": result['encoding'],
            "quality": result['quality']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/compare-faces', methods=['POST'])
def compare_faces():
    data = request.json
    try:
        known = np.array(data['known_encoding'])
        current = process_image(data['image'])[0]['encoding']
        
        distance = face_recognition.face_distance([known], current)[0]
        match = distance < CONFIG["match_threshold"]
        
        return jsonify({
            "match": match,
            "confidence": float(1 - distance/CONFIG["match_threshold"])
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)