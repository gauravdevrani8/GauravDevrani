import React, { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    function createRandomSparkle() {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      
      sparkle.style.left = `${randomX}px`;
      sparkle.style.top = `${randomY}px`;
      
      const randomXDirection = (Math.random() - 0.5) * 10;
      const randomYDirection = (Math.random() - 0.5) * 10;
      
      sparkle.style.setProperty('--randomXDirection', randomXDirection);
      sparkle.style.setProperty('--randomYDirection', randomYDirection);
      
      document.body.appendChild(sparkle);
      
      sparkle.style.animation = `sparkleAnimation 10s linear`;
      sparkle.style.animationDirection = randomXDirection > 0 ? 'normal' : 'reverse';
      
      setTimeout(() => {
        sparkle.remove();
      }, 10000);
    }
    
    const sparkleInterval = setInterval(createRandomSparkle, 1000);
    
    return () => clearInterval(sparkleInterval);
  }, []);
  
  useEffect(() => {
    const credit = document.getElementById('credit');
    const rotateInterval = setInterval(() => {
      if (credit) {
        credit.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
          credit.style.transform = 'rotate(0deg)';
        }, 500);
      }
    }, 8000);
    
    return () => clearInterval(rotateInterval);
  }, []);
  
  return (
    <>
      <p id="credit" className="credit"></p>
    </>
  );
};

export default Background;
