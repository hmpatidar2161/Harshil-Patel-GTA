import rembg
from PIL import Image

input_path = "assets/images/harshil-lake.jpg"
output_path = "assets/images/harshil-cutout.png"

input_image = Image.open(input_path)
output_image = rembg.remove(
    input_image, 
    alpha_matting=True, 
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=10
)
output_image.save(output_path)
