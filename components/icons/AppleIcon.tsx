
import React from 'react';

export const AppleIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const src = "https://img.icons8.com/ios-glyphs/30/mac-os.png";

  return (
    <div
      {...props}
      className={`bg-current ${props.className || ''}`}
      style={{
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        ...props.style
      }}
    />
  );
};
