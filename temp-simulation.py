# simulation.py
import cv2

def image_to_video(image_path, video_filename, frame_count, frame_size, fps=30):
    # Load the image
    image = cv2.imread(image_path)
    
    if image is None:
        raise ValueError(f"Image at path '{image_path}' not found.")
    
    # Resize the image to the specified frame size
    image = cv2.resize(image, frame_size)
    
    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Correct codec for mp4 files
    video = cv2.VideoWriter(video_filename, fourcc, fps, frame_size)
    
    # Write the image to the video file multiple times
    for _ in range(frame_count):
        video.write(image)
    
    # Release the VideoWriter object
    video.release()

    return video_filename
