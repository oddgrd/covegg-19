import { useCallback, useRef, useState } from 'react';

type coords = { x: number; y: number; c: string };

export const useCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>();
  const [history] = useState<Array<coords>>([]);
  const [currentColor, setCurrentColor] = useState('#00FF00');
  const lineWidth = 2.2;
  const selectedColor = useRef('#00FF00');
  const lastX = useRef(0);
  const lastY = useRef(0);
  const ctx = useRef(canvas?.current?.getContext('2d'));

  const drawCircle = useCallback((event: any) => {
    if (!ctx || !ctx.current) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.arc(lastX.current, lastY.current, 12, 0, 2 * Math.PI);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const draw = useCallback(
    (e: any) => {
      if (!ctx.current) return;
      [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
      ctx.current.strokeStyle = selectedColor.current;
      ctx.current.lineWidth = lineWidth;
      setCurrentColor(selectedColor.current);
      drawCircle(e);
      const circle = {
        x: lastX.current,
        y: lastY.current,
        c: selectedColor.current
      };
      history.push(circle);
    },
    [drawCircle, history]
  );

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    const ratio = Math.ceil(window.devicePixelRatio) || 1;
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('click', draw);
      canvas.current.width = 360 * ratio;
      canvas.current.height = 478 * ratio;
      canvas.current.style.width = `${360}px`;
      canvas.current.style.height = `${478}px`;

      ctx.current.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }, [draw]);
  const initViewer = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    const ratio = Math.ceil(window.devicePixelRatio) || 1;
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.width = 360 * ratio;
      canvas.current.height = 478 * ratio;
      canvas.current.style.width = `${360}px`;
      canvas.current.style.height = `${478}px`;

      ctx.current.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }, []);

  const handleColor = (color: string) => {
    setCurrentColor(color);
    selectedColor.current = color;
  };

  const undo = useCallback(() => {
    if (!ctx.current || !canvas.current || history.length === 0) return;
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    history.pop();
    history.forEach((circle) => {
      if (!ctx.current) return;
      ctx.current.strokeStyle = circle.c;
      ctx.current.lineWidth = lineWidth;
      ctx.current.beginPath();
      ctx.current.arc(circle.x, circle.y, 12, 0, 2 * Math.PI);
      ctx.current.stroke();
    });
  }, [history]);

  const loadFromDataUrl = (url: string) => {
    if (!ctx.current) return;
    const img = new Image();
    img.src = url;
    img.onload = () => ctx.current?.drawImage(img, 0, 0, 360, 478);
  };
  return [
    {
      canvas,
      currentColor
    },
    { init, initViewer, handleColor, undo, loadFromDataUrl }
  ];
};
