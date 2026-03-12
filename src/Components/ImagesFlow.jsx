import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../utils";

gsap.registerPlugin(ScrollTrigger);

// const DEFAULT_POSITIONS = [
//   { x: -0.8, y: -0.6 },
//   { x: 0.7, y: 0.4 },
//   { x: -0.5, y: 0.7 },
//   { x: 0.6, y: -0.5 },
//   { x: -0.8, y: 0.2 },
//   { x: 0.8, y: -0.3 },
//   { x: -0.6, y: -0.8 },
//   { x: 0.4, y: 0.6 },
//   { x: -0.7, y: 0.5 },
//   { x: 0.5, y: -0.7 },
//   { x: 0, y: 0 },
// ];

const DEFAULT_POSITIONS = [
  { x: -0.8, y: -0.6 }, { x: 0.7, y: 0.4 }, { x: -0.5, y: 0.7 }, { x: 0.6, y: -0.5 },
  { x: -0.8, y: 0.2 }, { x: 0.8, y: -0.3 }, { x: -0.6, y: -0.8 }, { x: 0.4, y: 0.6 },
  { x: -0.7, y: 0.5 }, { x: 0.5, y: -0.7 }, { x: -0.4, y: -0.4 }, { x: 0.3, y: 0.8 },
  { x: -0.8, y: 0.3 }, { x: 0.6, y: 0.2 }, { x: -0.2, y: -0.7 }, { x: 0.7, y: -0.6 },
  { x: -0.5, y: 0.4 }, { x: 0.4, y: -0.4 }, { x: -0.6, y: 0.6 }, { x: 0.8, y: 0.5 },
  { x: -0.3, y: -0.5 }, { x: 0.5, y: 0.3 }, { x: -0.7, y: -0.2 }, { x: 0.2, y: 0.7 },
  { x: -0.4, y: 0.8 }, { x: 0.6, y: -0.8 }, { x: -0.8, y: 0.1 }, { x: 0, y: 0 },
];

// "Every moment holds a universe waiting to be discovered",

const ImagesFlow = ({
  introTitle,
  introSubtitle,
  flowText = "", 
  outroTitle,
  outroSubtitle,
  images,
  className,
}) => {
  const containerRef = useRef(null);
  const flowRef = useRef(null);
  const imageRefs = useRef([]);

  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    const update = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const flow = flowRef.current;
    const imgElements = imageRefs.current.filter(Boolean);

    if (!flow || imgElements.length === 0) return;

    const spread = 0.7;
    const screenHeight = dimensions.height;
    const screenWidth = dimensions.width;

    const positions = DEFAULT_POSITIONS.slice(0, images.length);

    const initPos = images.map(() => ({
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    }));

    const finalPos = images.map((_, i) => ({
      xPercent: -50,
      yPercent: -50,
      x: (positions[i]?.x ?? 0) * screenWidth * spread,
      y: (positions[i]?.y ?? 0) * screenHeight * spread,
      z: 2000,
      scale: 1,
    }));

    imgElements.forEach((el, i) => gsap.set(el, initPos[i]));

    const st = ScrollTrigger.create({
      trigger: flow,
      start: "top top",
      end: `+=${screenHeight * 10}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        imgElements.forEach((img, index) => {
          const imgDelay = index * 0.03;
          const imgProgress = Math.max(0, (progress - imgDelay) * 4);

          const start = initPos[index];
          const end = finalPos[index];

          const x = gsap.utils.interpolate(start.x, end.x, imgProgress);
          const y = gsap.utils.interpolate(start.y, end.y, imgProgress);
          const z = gsap.utils.interpolate(start.z, end.z, imgProgress);
          const scale = gsap.utils.interpolate(
            start.scale,
            end.scale,
            imgProgress
          );

          gsap.set(img, {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            z,
            scale,
          });
        });
      },
    });

    return () => st.kill();
  }, [images, dimensions]);

  return (
    <main ref={containerRef} className={cn("w-full overflow-hidden bg-black", className)}>
      
      {/* Intro */}
      <section className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-6xl font-light tracking-widest">{introTitle}</h1>
          {introSubtitle && <p className="mt-4 opacity-70">{introSubtitle}</p>}
        </div>
      </section>

      {/* Flow */}
      <section ref={flowRef} className="relative min-h-screen bg-[#1c1c1c]">
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{ perspective: 2000 }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="absolute left-1/2 top-1/2 h-87.5 w-fit -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p className="text-3xl opacity-80">{flowText}</p>
        </div>
      </section>

      {/* Outro */}
      {/* <section className="flex min-h-screen items-center justify-center bg-black text-white overflow-hidden">
        <div className="text-center">
          <h1 className="text-6xl font-light tracking-widest">{outroTitle}</h1>
          {outroSubtitle && <p className="mt-4 opacity-70">{outroSubtitle}</p>}
        </div>
      </section> */}
    </main>
  );
};

export default ImagesFlow;