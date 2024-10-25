// hooks/useDrag.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import {CanvasItemType, Position} from "../../components/canvas/CanvasItemType";

interface UseDragProps {
    canvasPosition: Position;
    setCanvasPosition: React.Dispatch<React.SetStateAction<Position>>;
    draggingItem: number | null;
    setDraggingItem: React.Dispatch<React.SetStateAction<number | null>>;
    items: CanvasItemType[];
    setItems: React.Dispatch<React.SetStateAction<CanvasItemType[]>>;
    zoom: number;
}

export const useDrag = ({
                            canvasPosition,
                            setCanvasPosition,
                            draggingItem,
                            setDraggingItem,
                            items,
                            setItems,
                            zoom,
                        }: UseDragProps) => {
    const initialMousePos = useRef<Position>({ x: 0, y: 0 });
    const initialCanvasPos = useRef<Position>({ x: 0, y: 0 });
    const initialItemPos = useRef<Position>({ x: 0, y: 0 });
    const [draggingCanvas, setDraggingCanvas] = useState(false);

    const startCanvasDrag = (e: React.MouseEvent) => {
        if (draggingItem === null) {
            setDraggingCanvas(true);
            initialMousePos.current = { x: e.clientX, y: e.clientY };
            initialCanvasPos.current = { ...canvasPosition };
        }
    };

    const startItemDrag = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setDraggingItem(id);
        const item = items.find((item) => item.id === id);
        if (item) {
            initialMousePos.current = { x: e.clientX, y: e.clientY };
            initialItemPos.current = { x: item.position.x, y: item.position.y };
        }
    };

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (draggingCanvas && draggingItem === null) {
                setCanvasPosition({
                    x: initialCanvasPos.current.x + e.clientX - initialMousePos.current.x,
                    y: initialCanvasPos.current.y + e.clientY - initialMousePos.current.y,
                });
            } else if (draggingItem !== null) {
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === draggingItem
                            ? {
                                ...item,
                                position: {
                                    x: initialItemPos.current.x + (e.clientX - initialMousePos.current.x) / zoom,
                                    y: initialItemPos.current.y + (e.clientY - initialMousePos.current.y) / zoom,
                                },
                            }
                            : item
                    )
                );
            }
        },
        [draggingCanvas, draggingItem, zoom]
    );

    const stopDrag = useCallback(() => {
        setDraggingCanvas(false);
        setDraggingItem(null);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopDrag);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopDrag);
        };
    }, [handleMouseMove, stopDrag]);

    return { startCanvasDrag, startItemDrag };
};
