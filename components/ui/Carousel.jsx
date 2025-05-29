'use client';

import { useKeenSlider } from 'keen-slider/react';
import React from 'react';
import 'keen-slider/keen-slider.min.css';

export default function Carousel({
  children,
  width = '100%',
  height = '100%',
  perView = 1.4,
  spacing = 10,
  origin = 'center',
  loop = true,
  mode = 'free-snap',
}) {
  const [sliderRef] = useKeenSlider({
    loop,
    mode,
    slides: { perView, spacing, origin },
  });

  return (
    <div ref={sliderRef} className="keen-slider" style={{ width, height }}>
      {React.Children.map(children, (child, idx) => (
        <div key={idx} className="keen-slider__slide relative overflow-hidden rounded-2xl">
          {child}
        </div>
      ))}
    </div>
  );
}
