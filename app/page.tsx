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
    <div style={{
      backgroundImage: `url(${backgroundImageUrl})`, // Set the background image for the webpage
      backgroundSize: 'cover', // Cover the whole area
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the div takes full height of the viewport
      color: 'rgba(128, 0, 32, 1)', // Burgundy text color
      padding: '20px', // Optional: Add some padding
    }}
    >

      <center><h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Welcome to 888</h1></center>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2 style={{ color: 'rgba(128, 0, 32, 0.8)' }}>Join abundance and prosperity.</h2>
        <a
          href="https://x.com/i/communities/1848939851800056074"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: '20px', color: 'rgba(128, 0, 32, 0.8)', textDecoration: 'underline' }}
        >
          X Community
        </a>
        <a
          href="https://dexscreener.com/solana/2k94kvqycbyndh91iywduch6qrzclnprtfd5oikpxi9c"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'rgba(128, 0, 32, 0.8)', textDecoration: 'underline' }}
        >
          Dexscreener
        </a>
      </div>
      {/* New Section for Cultural Significance */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Cultural Significance</h2>
        <p style={{ fontSize: '1.2em' }}>
          <strong>Chinese Culture:</strong> The number <strong>8</strong> is considered very lucky in Chinese culture because it sounds like the word for &quot;prosperity&quot; or &quot;wealth&quot; (發, pronounced &quot;fa&quot;). It’s common for people to seek phone numbers, addresses, or license plates with the number <strong>8</strong>.
        </p>
        <p style={{ fontSize: '1.2em' }}>
          <strong>Hinduism and Buddhism:</strong> In Hinduism, there are eight forms of wealth (Ashta Lakshmi), and in Buddhism, there’s the Eightfold Path, which outlines the way to end suffering.
        </p>

      </div>
      <h1 style={{ fontSize: '1.5em' }}>Upload Image and Add Watermark</h1>

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
          <button
            onClick={addWatermark}
            style={{
              fontSize: '1.5em', // Button text size
              marginTop: '20px', // Space above the button
              padding: '15px 30px', // Increased padding for a larger button
              borderRadius: '8px', // Rounded corners
              border: '2px solid rgba(128, 0, 32, 0.75)', // Burgundy border
              backgroundColor: 'rgba(128, 0, 32, 0.8)', // Darker burgundy background
              color: 'white', // White text color for better contrast
              cursor: 'pointer', // Pointer cursor on hover
              transition: 'background-color 0.3s, color 0.3s, transform 0.2s', // Smooth transitions
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 1)'; // Darker on hover
              e.currentTarget.style.color = '#fff'; // Ensure text stays white on hover
              e.currentTarget.style.transform = 'scale(1.05)'; // Slightly grow on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.8)'; // Reset background on mouse out
              e.currentTarget.style.color = 'white'; // Reset text color on mouse out
              e.currentTarget.style.transform = 'scale(1)'; // Reset scale on mouse out
            }}
          >
            Download Watermarked Image
          </button>
        </div>
      )}

      {/* </div> */}
    </div>
  );
};

export default Home;
