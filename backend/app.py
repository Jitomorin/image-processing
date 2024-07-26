import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from simulation import image_to_video

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

UPLOAD_FOLDER = 'uploads'
VIDEO_FOLDER = 'videos'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VIDEO_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    if file:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        print(f"Saving uploaded image to: {file_path}")
        file.save(file_path)

        # Define parameters for video creation
        video_filename = f"{os.path.splitext(file.filename)[0]}.mp4"
        video_path = os.path.join(VIDEO_FOLDER, video_filename)
        frame_count = 300  # Number of frames in the video
        frame_size = (640, 480)  # Size of each frame in the video (width, height)
        fps = 30  # Frames per second

        # Create video from image
        generated_video_path = image_to_video(file_path, video_path, frame_count, frame_size, fps)
        print(f"Video saved as: {generated_video_path}")
        return jsonify({"message": "Image processed successfully", "video_url": f"/videos/{video_filename}"})

    return jsonify({"error": "Failed to process image"}), 400

@app.route('/videos/<filename>', methods=['GET'])
def get_video(filename):
    return send_from_directory(VIDEO_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
