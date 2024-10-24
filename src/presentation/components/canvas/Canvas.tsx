import React from 'react';
import { Rnd } from 'react-rnd';
import CanvasItem from './CanvasItem';
import styles from './Canvas.module.css';
import {CanvasItemType} from "./CanvasItemType";

interface CanvasProps {
    items: CanvasItemType[];
    setItems: React.Dispatch<React.SetStateAction<CanvasItemType[]>>;
}

const Canvas: React.FC<CanvasProps> = ({ items, setItems }) => {
    const addItemToCanvas = (type: string) => {
        const newItem: CanvasItemType = {
            id: Date.now(),
            type: type,
            content: type === 'Texto' ? 'Texto' : '',
            position: { x: 100, y: 100 },
            size: { width: 300, height: 100 },
        };

        setItems([...items, newItem]);
    };

    const updateItemPosition = (
        id: number,
        newPosition: { x: number; y: number },
        newSize: { width: number; height: number }
    ) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? { ...item, position: newPosition, size: newSize }
                    : item
            )
        );
    };

    return (
        <div className={styles.canvas}>
            {/* Renderizando os botões dentro do canvas */}
            <div className={styles.sideButtons}>
                {['Texto', 'Post-it', 'Imagens', 'Código'].map((button) => (
                    <button
                        key={button}
                        className={styles.sideButton}
                        onClick={() => addItemToCanvas(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>

            {/* Renderizando os itens dentro do canvas */}
            {items.map((item) => (
                <Rnd
                    key={item.id}
                    size={{ width: item.size.width, height: item.size.height }}
                    position={{ x: item.position.x, y: item.position.y }}
                    onDragStop={(e, d) =>
                        updateItemPosition(item.id, { x: d.x, y: d.y }, item.size)
                    }
                    onResizeStop={(e, direction, ref, delta, position) =>
                        updateItemPosition(item.id, position, {
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                        })
                    }
                >
                    <CanvasItem item={item} />
                </Rnd>
            ))}
        </div>
    );
};

export default Canvas;
