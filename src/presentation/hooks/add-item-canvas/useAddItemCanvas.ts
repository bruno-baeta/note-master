// hooks/canvas/useAddItem.ts
import { RefObject } from 'react';
import {CanvasItemType, Position} from "../../components/canvas/CanvasItemType";

interface UseAddItemProps {
    canvasRef: RefObject<HTMLDivElement>;
    canvasPosition: Position;
    zoom: number;
    setItems: React.Dispatch<React.SetStateAction<CanvasItemType[]>>;
}

export const useAddItemCanvas = ({ canvasRef, canvasPosition, zoom, setItems }: UseAddItemProps) => {
    return (type: string) => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current.getBoundingClientRect();
            const newItem: CanvasItemType = {
                id: Date.now(),
                type,
                content: type,
                position: {
                    x: (width / 2 - canvasPosition.x) / zoom,
                    y: (height / 2 - canvasPosition.y) / zoom,
                },
                size: { width: 'auto', height: 'auto' },
            };
            setItems((prevItems) => [...prevItems, newItem]);
        }
    };
};
