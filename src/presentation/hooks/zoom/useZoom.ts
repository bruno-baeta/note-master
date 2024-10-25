// hooks/useZoom.ts
import { useEffect } from 'react';
import {Position} from "../../components/canvas/CanvasItemType";

interface UseZoomProps {
    canvasRef: React.RefObject<HTMLDivElement>;
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    canvasPosition: Position;
    setCanvasPosition: React.Dispatch<React.SetStateAction<Position>>;
}

export const useZoom = ({
                            canvasRef,
                            zoom,
                            setZoom,
                            canvasPosition,
                            setCanvasPosition,
                        }: UseZoomProps) => {
    const handleZoom = (event: WheelEvent) => {
        event.preventDefault();
        if (!canvasRef.current) return;

        const { clientX, clientY, deltaY } = event;
        const zoomStep = 0.1;
        const targetZoom = deltaY > 0 ? Math.max(0.1, zoom - zoomStep) : Math.min(6, zoom + zoomStep);
        if (targetZoom === zoom) return;

        const scaleChange = targetZoom / zoom;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const mouseX = clientX - left;
        const mouseY = clientY - top;

        const newCanvasPosition = {
            x: mouseX - (mouseX - canvasPosition.x) * scaleChange,
            y: mouseY - (mouseY - canvasPosition.y) * scaleChange,
        };

        setCanvasPosition(newCanvasPosition);
        setZoom(targetZoom);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) canvas.addEventListener('wheel', handleZoom, { passive: false });
        return () => canvas?.removeEventListener('wheel', handleZoom);
    }, [canvasRef, zoom, canvasPosition]);
};
