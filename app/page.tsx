"use client";

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWatermark = async () => {
    if (canvasRef.current) {
      const canvas = await html2canvas(canvasRef.current, { allowTaint: true });
      const context = canvas.getContext('2d');

      if (context) {
        // Set font properties (bigger, bold, and red-orange with opacity)
        context.font = 'bold 100px serif';  // Make it large and bold
        context.fillStyle = 'rgba(255, 69, 0, 0.5)';  // Red-orange with 50% opacity

        // Adjust the position of the watermark
        context.fillText('888', canvas.width - 150, canvas.height - 100);

        // Generate the new watermarked image
        const imgUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgUrl;
        link.download = 'watermarked-image.png';
        link.click();
      }
    }
  };

  return (
    <div>
      <h1>Upload Image and Add Watermark</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <div ref={canvasRef} style={{ position: 'relative', display: 'inline-block' }}>
            <img src={image} alt="uploaded" style={{ maxWidth: '100%' }} />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                color: 'rgba(255, 69, 0, 0.75)',  // Red-orange, 50% opacity
                fontSize: '200px',
                fontWeight: 'bold',
              }}
            >
              888
            </div>
          </div>
          <button onClick={addWatermark}>Download Watermarked Image</button>
        </div>
      )}
    </div>
  );
};

export default Home;
