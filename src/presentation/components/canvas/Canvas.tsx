import React, { useState, useRef, useEffect, useCallback } from 'react';

// Interfaces e Tipos
interface CanvasItemType {
    id: number;
    type: string;
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

interface Position {
    x: number;
    y: number;
}

// Componente de CanvasItem
const CanvasItem: React.FC<{ item: CanvasItemType }> = ({ item }) => (
    <div style={{ padding: '10px', background: '#f0f0f0' }}>{item.content}</div>
);

// Funções Utilitárias
const generateNewItem = (type: string, position: Position): CanvasItemType => ({
    id: Date.now(),
    type,
    content: type,
    position: { x: position.x - 100, y: position.y - 50 },
    size: { width: 200, height: 100 },
});

// Hook para Zoom com Foco no Ponto do Mouse
const useZoom = (
    canvasRef: React.RefObject<HTMLDivElement>,
    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>>,
    canvasPosition: Position,
    setCanvasPosition: React.Dispatch<React.SetStateAction<Position>>
) => {
    const handleZoom = (event: WheelEvent) => {
        event.preventDefault();
        if (!canvasRef.current) return;

        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const { clientX, clientY, deltaY } = event;

        const zoomStep = 0.1;
        const targetZoom = deltaY > 0 ? Math.max(0.1, zoom - zoomStep) : Math.min(6, zoom + zoomStep);
        if (targetZoom === zoom) return;

        const scaleChange = targetZoom / zoom;
        const mouseX = clientX - canvasBounds.left;
        const mouseY = clientY - canvasBounds.top;

        const newCanvasPosition = {
            x: mouseX - (mouseX - canvasPosition.x) * scaleChange,
            y: mouseY - (mouseY - canvasPosition.y) * scaleChange,
        };

        setCanvasPosition(newCanvasPosition);
        setZoom(targetZoom);
    };

    useEffect(() => {
        const canvasElement = canvasRef.current;
        if (canvasElement) {
            canvasElement.addEventListener('wheel', handleZoom as EventListener, { passive: false });
        }
        return () => {
            if (canvasElement) {
                canvasElement.removeEventListener('wheel', handleZoom as EventListener);
            }
        };
    }, [canvasRef, zoom, canvasPosition]);
};

// Hook para arrastar o canvas e os itens
const useDrag = (
    canvasPosition: Position,
    setCanvasPosition: React.Dispatch<React.SetStateAction<Position>>,
    draggingItem: number | null,
    setDraggingItem: React.Dispatch<React.SetStateAction<number | null>>,
    items: CanvasItemType[],
    setItems: React.Dispatch<React.SetStateAction<CanvasItemType[]>>,
    zoom: number
) => {
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

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Arraste do Canvas
        if (draggingCanvas && draggingItem === null) {
            const deltaX = e.clientX - initialMousePos.current.x;
            const deltaY = e.clientY - initialMousePos.current.y;

            setCanvasPosition({
                x: initialCanvasPos.current.x + deltaX,
                y: initialCanvasPos.current.y + deltaY,
            });
        }
        // Arraste do Item
        else if (draggingItem !== null && !draggingCanvas) {
            const deltaX = (e.clientX - initialMousePos.current.x) / zoom;
            const deltaY = (e.clientY - initialMousePos.current.y) / zoom;

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === draggingItem
                        ? { ...item, position: { x: initialItemPos.current.x + deltaX, y: initialItemPos.current.y + deltaY } }
                        : item
                )
            );
        }
    }, [draggingCanvas, draggingItem, zoom]);

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

// Canvas Principal
const Canvas: React.FC = () => {
    const [items, setItems] = useState<CanvasItemType[]>([]);
    const [zoom, setZoom] = useState(1);
    const [canvasPosition, setCanvasPosition] = useState<Position>({ x: 0, y: 0 });
    const [draggingItem, setDraggingItem] = useState<number | null>(null);
    const canvasRef = useRef<HTMLDivElement | null>(null);

    const { startCanvasDrag, startItemDrag } = useDrag(
        canvasPosition,
        setCanvasPosition,
        draggingItem,
        setDraggingItem,
        items,
        setItems,
        zoom
    );

    useZoom(canvasRef, zoom, setZoom, canvasPosition, setCanvasPosition);

    const addItem = (type: string) => {
        if (canvasRef.current) {
            const canvasBounds = canvasRef.current.getBoundingClientRect();
            const centerX = (canvasBounds.width / 2 - canvasPosition.x) / zoom;
            const centerY = (canvasBounds.height / 2 - canvasPosition.y) / zoom;

            setItems([...items, generateNewItem(type, { x: centerX, y: centerY })]);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div
                id="canvas"
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                }}
                onMouseDown={startCanvasDrag}
            >
                <div
                    style={{
                        transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${zoom})`,
                        width: '0vw',
                        height: '0vh',
                        position: 'absolute',
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                position: 'absolute',
                                top: item.position.y,
                                left: item.position.x,
                                width: item.size.width,
                                height: item.size.height,
                                backgroundColor: 'lightgray',
                                cursor: 'move',
                                userSelect: 'none',
                            }}
                            onMouseDown={(e) => startItemDrag(e, item.id)}
                        >
                            <CanvasItem item={item} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <button onClick={() => addItem('Texto')}>Adicionar Texto</button>
                <button onClick={() => addItem('Post-it')}>Adicionar Post-it</button>
                <button onClick={() => addItem('Imagem')}>Adicionar Imagem</button>
                <button onClick={() => addItem('Código')}>Adicionar Código</button>
            </div>
        </div>
    );
};

export default Canvas;
