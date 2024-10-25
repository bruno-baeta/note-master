// components/Canvas.tsx
import React, { useState, useRef, useEffect } from 'react';
import CanvasItem from './CanvasItem';
import styles from './Canvas.module.css';
import { CanvasItemType, Position } from "./CanvasItemType";
import { useDrag } from "../../hooks/drag/useDrag";
import { useZoom } from "../../hooks/zoom/useZoom";

const Canvas: React.FC = () => {
    const [items, setItems] = useState<CanvasItemType[]>([]);
    const [zoom, setZoom] = useState<number>(1);
    const [canvasPosition, setCanvasPosition] = useState<Position>({ x: 0, y: 0 });
    const [draggingItem, setDraggingItem] = useState<number | null>(null);
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const canvasRef = useRef<HTMLDivElement | null>(null);

    const { startCanvasDrag, startItemDrag } = useDrag({
        canvasPosition,
        setCanvasPosition,
        draggingItem,
        setDraggingItem,
        items,
        setItems,
        zoom,
    });

    useZoom({
        canvasRef,
        zoom,
        setZoom,
        canvasPosition,
        setCanvasPosition,
    });

    const addItem = (type: string) => {
        if (canvasRef.current) {
            const { width, height } = canvasRef.current.getBoundingClientRect();
            setItems((prevItems) => [
                ...prevItems,
                {
                    id: Date.now(),
                    type,
                    content: type,
                    position: {
                        x: (width / 2 - canvasPosition.x) / zoom,
                        y: (height / 2 - canvasPosition.y) / zoom,
                    },
                    size: { width: 200, height: 100 },
                },
            ]);
        }
    };

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        setIsDraggingCanvas(true);
        startCanvasDrag(e);
    };

    const handleMouseUp = () => {
        setIsDraggingCanvas(false);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className={styles.canvasContainer}>
            <div
                className={`${styles.canvas} ${isDraggingCanvas ? styles.cursorGrabbing : styles.cursorGrab}`}
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
            >
                <div
                    className={styles.zoomedCanvas}
                    style={{
                        transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={styles.itemContainer}
                            style={{
                                top: item.position.y,
                                left: item.position.x,
                                width: item.size.width,
                                height: item.size.height,
                            }}
                            onMouseDown={(e) => startItemDrag(e, item.id)}
                        >
                            <CanvasItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.sideButtons}>
                <button
                    className={styles.sideButton}
                    onClick={() => addItem('Texto')}
                >
                    Adicionar Texto
                </button>
                <button
                    className={styles.sideButton}
                    onClick={() => addItem('Post-it')}
                >
                    Adicionar Post-it
                </button>
                <button
                    className={styles.sideButton}
                    onClick={() => addItem('Imagem')}
                >
                    Adicionar Imagem
                </button>
                <button
                    className={styles.sideButton}
                    onClick={() => addItem('Código')}
                >
                    Adicionar Código
                </button>
            </div>
        </div>
    );
};

export default Canvas;
