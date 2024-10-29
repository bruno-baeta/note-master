// components/edit-bar/image-edit-bar/ImageEditBar.tsx
import React, { useState } from 'react';
import { CanvasItemType } from "../../canvas/CanvasItemType";
import { HexColorPicker } from "react-colorful";
import { FaTrash, FaSyncAlt, FaExpandAlt } from 'react-icons/fa';
import styles from './ImageEditBar.module.css';

interface ImageEditBarProps {
    item: CanvasItemType;
}

const ImageEditBar: React.FC<ImageEditBarProps> = ({ item }) => {
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [size, setSize] = useState(50);
    const [rotation, setRotation] = useState(50);
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const toggleColorPicker = () => {
        setIsColorPickerVisible(!isColorPickerVisible);
    };

    const handleResize = (newSize: number) => {
        setSize(newSize);
        const slider = document.getElementById('resizeSlider') as HTMLInputElement;
        slider.style.background = `linear-gradient(to right, #4CAF50 ${newSize}%, #3A3D41 ${newSize}%)`;
    };

    const handleRotate = (angle: number) => {
        setRotation(angle);
        const slider = document.getElementById('rotateSlider') as HTMLInputElement;
        slider.style.background = `linear-gradient(to right, #4CAF50 ${angle}%, #3A3D41 ${angle}%)`;
    };

    const handleDelete = () => {
        // Lógica para excluir o item de imagem
    };

    return (
        <div className={styles.editBar} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.colorPickerContainer}>
                <button className={styles.colorButton} onClick={toggleColorPicker}>
                    <div className={styles.colorPreview} style={{ backgroundColor }} />
                </button>
                {isColorPickerVisible && (
                    <div className={styles.colorPickerPopover}>
                        <div className={styles.colorPickerCover} onClick={() => setIsColorPickerVisible(false)} />
                        <HexColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} className={styles.customColorPicker} />
                    </div>
                )}
            </div>

            <div className={styles.sliderContainer}>
                <FaExpandAlt className={styles.icon} />
                <input
                    id="resizeSlider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={size}
                    onChange={(e) => handleResize(parseInt(e.target.value))}
                    className={styles.slider}
                    title="Tamanho"
                />
            </div>
            <div className={styles.sliderContainer}>
                <FaSyncAlt className={styles.icon} />
                <input
                    id="rotateSlider"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={rotation}
                    onChange={(e) => handleRotate(parseInt(e.target.value))}
                    className={styles.slider}
                    title="Rotação"
                />
            </div>

            <button onClick={handleDelete} className={styles.controlButton}><FaTrash /></button>
        </div>
    );
};

export default ImageEditBar;
