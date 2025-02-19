from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition
import os

app = Flask(__name__)

# Fungsi untuk load dataset wajah
def load_known_faces():
    known_faces = {}
    dataset_path = "face_recognition/dataset"
    
    for filename in os.listdir(dataset_path):
        if filename.endswith(".jpg"):
            user_id = os.path.splitext(filename)[0]
            image = face_recognition.load_image_file(f"{dataset_path}/{filename}")
            encoding = face_recognition.face_encodings(image)[0]
            known_faces[user_id] = encoding
    
    return known_faces

known_faces = load_known_faces()

@app.route('/api/face/detect', methods=['POST'])
def detect_face():
    try:
        image_data = request.json['image'].split(",")[1]
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        face_locations = face_recognition.face_locations(img)
        
        return jsonify({
            "face_detected": len(face_locations) > 0,
            "count": len(face_locations)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/face/recognize', methods=['POST'])
def recognize_face():
    try:
        image_data = request.json['image'].split(",")[1]
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        face_encodings = face_recognition.face_encodings(img)
        if not face_encodings:
            return jsonify({"message": "Wajah tidak terdeteksi"}), 400
            
        input_encoding = face_encodings[0]
        
        # Cari wajah yang cocok
        for user_id, known_encoding in known_faces.items():
            matches = face_recognition.compare_faces([known_encoding], input_encoding)
            if matches[0]:
                return jsonify({
                    "message": "Presensi berhasil!",
                    "user_id": user_id
                })
        
        return jsonify({"message": "Wajah tidak dikenali"}), 401
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)