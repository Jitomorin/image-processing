from moviepy.editor import ImageClip
import time

def image_to_video(image_path, video_filename, duration=10, frame_size=(640, 480), fps=30):
    start_time = time.time()  # Record the start time
    
    # Load the image and set the duration
    print("Loading and resizing the image...", flush=True)
    clip = ImageClip(image_path).set_duration(10).resize(newsize=frame_size)
    
    # Write the video file with the specified duration
    print("Writing the video file...", flush=True)
    clip.set_duration(10).write_videofile(video_filename, fps=fps, codec='libx264')
    
    # Calculate the elapsed time
    elapsed_time = time.time() - start_time
    print(f"Elapsed time for video creation: {elapsed_time:.2f} seconds", flush=True)
    
    # If the process took less than 30 seconds, sleep for the remaining time
    remaining_time = 30 - elapsed_time
    if remaining_time > 0:
        print(f"Sleeping for the remaining {remaining_time:.2f} seconds to ensure total time is 30 seconds", flush=True)
        time.sleep(remaining_time)
    
    total_time = time.time() - start_time
    print(f"Total function execution time: {total_time:.2f} seconds", flush=True)
    
    return video_filename

# # Example usage
# image_path = 'path/to/your/image.jpg'
# video_filename = 'your_output_video.mp4'
# frame_size = (640, 480)  # Size of each frame in the video (width, height)
# fps = 30  # Frames per second

# video_url = image_to_video(image_path, video_filename, duration=10, frame_size=frame_size, fps=fps)
# print(f"Video URL: {video_url}", flush=True)
