// components/Canvas.tsx
import React, { useState, useRef, useEffect } from 'react';
import CanvasItem from './CanvasItem';
import styles from './Canvas.module.css';
import { CanvasItemType, Position } from "./CanvasItemType";
import { useDrag } from "../../hooks/drag/useDrag";
import { useZoom } from "../../hooks/zoom/useZoom";
import { useFullscreen } from "../../hooks/fullscreen/useFullscreen";
import { FaExpand, FaCompress } from 'react-icons/fa';
import EditBar from "../edit-bar/EditBar";

const Canvas: React.FC = () => {
    const [items, setItems] = useState<CanvasItemType[]>([]);
    const [zoom, setZoom] = useState<number>(1);
    const [canvasPosition, setCanvasPosition] = useState<Position>({ x: 0, y: 0 });
    const [draggingItem, setDraggingItem] = useState<number | null>(null);
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CanvasItemType | null>(null);
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

    const { isFullscreen, toggleFullscreen } = useFullscreen(canvasRef);

    const addItem = (type: string) => {
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
                size: { width: 200, height: 100 },
            };
            setItems((prevItems) => [...prevItems, newItem]);
            console.log("Item added:", newItem);
        }
    };

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        if (!isDraggingCanvas) {
            setSelectedItem(null);
        }
        setIsDraggingCanvas(true);
        startCanvasDrag(e);
    };

    const handleMouseUp = () => {
        setIsDraggingCanvas(false);
    };

    const handleItemClick = (item: CanvasItemType) => {
        setSelectedItem(item);
        console.log("Item selected:", item);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        console.log("Current selectedItem:", selectedItem);
    }, [selectedItem]);

    return (
        <div className={styles.canvasContainer} ref={canvasRef}>
            <div
                className={`${styles.canvas} ${isDraggingCanvas ? styles.cursorGrabbing : styles.cursorGrab}`}
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
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                startItemDrag(e, item.id);
                                handleItemClick(item);
                            }}
                        >
                            <CanvasItem item={item} />
                        </div>
                    ))}
                </div>

                {selectedItem && <EditBar selectedItem={selectedItem} />}
            </div>

            <div className={styles.sideButtons}>
                <button className={styles.sideButton} onClick={() => addItem('Texto')}>Adicionar Texto</button>
                <button className={styles.sideButton} onClick={() => addItem('Post-it')}>Adicionar Post-it</button>
                <button className={styles.sideButton} onClick={() => addItem('Imagem')}>Adicionar Imagem</button>
                <button className={styles.sideButton} onClick={() => addItem('Código')}>Adicionar Código</button>
            </div>

            <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>

            <button className={styles.saveButtonStandalone}>Salvar</button>
        </div>
    );
};

export default Canvas;
