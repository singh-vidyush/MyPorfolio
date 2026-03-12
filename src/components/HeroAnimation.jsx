import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const HeroAnimation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameCount = 66; // Updated to 66 frames

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      let loadedCount = 0;

      // Attempt to load frames 1 to frameCount
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Fallback or actual image path
        img.src = `/scroll_animation/${i}.png`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          // Fallback missing images
          loadedCount++;
          if (loadedCount === frameCount) {
            setImagesLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const renderFrame = (latest) => {
    if (imagesLoaded && canvasRef.current && images.length > 0) {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(latest * frameCount)
      );

      const context = canvasRef.current.getContext('2d');
      const img = images[frameIndex];

      if (img && img.complete) {
        // Clear canvas and draw new frame
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Calculate aspect ratio to fit canvas
        const hRatio = canvasRef.current.width / img.width;
        const vRatio = canvasRef.current.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Use max to cover

        const centerShiftX = (canvasRef.current.width - img.width * ratio) / 2;
        const centerShiftY = (canvasRef.current.height - img.height * ratio) / 2;

        context.drawImage(img, 0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    }
  };

  // Draw initial frame once loaded
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(scrollYProgress.get());
    }
  }, [imagesLoaded]);

  // Render canvas images based on scroll
  useMotionValueEvent(scrollYProgress, "change", renderFrame);

  // Variables for animations
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const leftY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Adjust so text appears earlier and stays visible for longer at the bottom
  const rightOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.4, 0.7], [50, 0]);

  // Fallback animation if images are missing
  const scalePulse = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const rotateAnim = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Calculate the height of the scroll area dynamically based on frame count 
  // (e.g. 100vh per 10 frames + baseline of 200vh means more frames = more scrolling needed)
  const calcHeight = Math.max(300, 200 + (frameCount / 10) * 50);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${calcHeight}vh` }} id="home">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {imagesLoaded ? (
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              style={{ scale: scalePulse, rotate: rotateAnim }}
              className="w-96 h-96 rounded-full bg-gradient-to-tr from-[#4d90db] to-[#13263b] blur-3xl"
            />
          )}
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 w-full z-10">

          {/* Left Side: Large Name */}
          <motion.div
            style={{ opacity: leftOpacity, y: leftY }}
            className="flex flex-col justify-center h-full"
          >
            <h2 className="text-2xl md:text-4xl font-light text-gray-400 mt-2">
              Hi, I'm
            </h2>
            <h1 className="font-[Open_Sans] text-6xl md:text-8xl font-black tracking-tighter">
              VIDYUSH SINGH
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-gray-400 mt-2">
              Developer & Creator
            </h2>
          </motion.div>

          {/* Right Side: Description */}
          <motion.div
            style={{ opacity: rightOpacity, y: rightY }}
            className="flex flex-col justify-center h-full text-right md:text-left"
            id="about"
          >
            <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-100">
              "I am a developer passionate about building intelligent systems, solving problems with code, and creating impactful digital experiences."
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
