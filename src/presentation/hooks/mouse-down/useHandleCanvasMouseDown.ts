import {MouseEvent} from 'react';

interface UseHandleCanvasMouseDownProps {
    isDraggingCanvas: boolean;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
    setIsDraggingCanvas: React.Dispatch<React.SetStateAction<boolean>>;
    startCanvasDrag: (e: MouseEvent) => void;
}

export const useHandleCanvasMouseDown = ({
                                             isDraggingCanvas,
                                             setSelectedItem,
                                             setIsDraggingCanvas,
                                             startCanvasDrag
                                         }: UseHandleCanvasMouseDownProps) => {
    return (e: MouseEvent) => {
        if (!isDraggingCanvas) {
            setSelectedItem(null);
        }
        setIsDraggingCanvas(true);
        startCanvasDrag(e);
    };
};
