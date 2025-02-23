'use client';

import React, { useState, useEffect } from 'react';

interface ClaimButtonProps {
  onClick: () => void | Promise<void>;
  text?: string;
  disabled?: boolean;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  scale: number;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  onClick,
  text = "Button Text",
  disabled = false,
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const createCoin = () => {
    // Generate random x position across the full viewport width
    const startX = Math.random() * window.innerWidth;
    return {
      id: Math.random(),
      x: startX,
      y: window.innerHeight + 50, // Start below viewport
      speed: 5 + Math.random() * 3, // Increased speed
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5
    };
  };

  const handleClick = async () => {
    if (disabled) return;

    // Create more coins for a more dramatic effect
    const newCoins = Array(20).fill(null).map(() => createCoin());
    setCoins(newCoins);

    // Execute claim
    await onClick();
  };

  // Animation loop using useEffect
  useEffect(() => {
    if (coins.length === 0) return;

    const animationFrame = setInterval(() => {
      setCoins(prevCoins => {
        const updatedCoins = prevCoins
          .map(coin => ({
            ...coin,
            y: coin.y - coin.speed,
            rotation: coin.rotation + 2
          }))
          .filter(coin => coin.y > -100); // Keep coins until they're well off screen

        // If no coins left, clear the interval
        if (updatedCoins.length === 0) {
          clearInterval(animationFrame);
        }

        return updatedCoins;
      });
    }, 16);

    // Cleanup
    return () => clearInterval(animationFrame);
  }, [coins]);

  return (
    <>
      {/* Fixed position coin container that covers the whole viewport */}
      {coins.length > 0 && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
          {coins.map(coin => (
            <div
              key={coin.id}
              className="absolute"
              style={{
                transform: `translate(${coin.x}px, ${coin.y}px) rotate(${coin.rotation}deg) scale(${coin.scale})`,
                transition: 'transform 0.016s linear',
                willChange: 'transform'
              }}
            >
              <img
                src="/coin.png"
                alt="coin"
                className="w-8 h-6" // Made coins slightly larger
              />
            </div>
          ))}
        </div>
      )}

      {/* Original button */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`box-border relative inline-flex items-center justify-center w-full px-6 py-2 overflow-hidden font-semibold text-white text-sm transition-all duration-300 rounded-full cursor-pointer group ring-offset-2 ring-1 ${
          disabled
            ? 'bg-gray-600 ring-gray-900 ring-offset-gray-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-400 to-amber-600 animate-pulse shadow-lg shadow-green-500/50 animate-pulse'
        } ease focus:outline-none`}
      >
        {text}
      </button>
    </>
  );
};

export default ClaimButton;