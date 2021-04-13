import React from 'react';

interface Props {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
}

export const Canvas: React.FC<Props> = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef as any}
      className='canvas'
      width='360'
      height='478'
    />
  );
};
