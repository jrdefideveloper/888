"use client";

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const backgroundImageUrl = 'https://dd.dexscreener.com/ds-data/tokens/solana/C65t4Bd52R1ZdV1GVzzSyLqphoPrShiajsK5nJBrpump/header.png?size=xl&key=c50d42';

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
    <div  style={{
      backgroundImage: `url(${backgroundImageUrl})`, // Set the background image for the webpage
      backgroundSize: 'cover', // Cover the whole area
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the div takes full height of the viewport
      color: 'rgba(128, 0, 32, 1)', // Burgundy text color
      padding: '20px', // Optional: Add some padding
    }}
    >
      
      <center><h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Welcome to 888</h1></center>
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
                right: '50px',
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
