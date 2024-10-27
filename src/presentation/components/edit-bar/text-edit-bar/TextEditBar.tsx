import React, { useState } from 'react';
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';
import styles from './TextEditBar.module.css';
import {CanvasItemType} from "../../canvas/CanvasItemType";
import {HexColorPicker} from "react-colorful";

interface TextEditBarProps {
    item: CanvasItemType;
}

const TextEditBar: React.FC<TextEditBarProps> = ({ item }) => {
    const [fontColor, setFontColor] = useState("#FFFFFF");
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

    const toggleColorPicker = () => {
        setIsColorPickerVisible(!isColorPickerVisible);
    };

    return (
        <div className={styles.editBar} onMouseDown={(e) => e.stopPropagation()}>
            <select className={styles.select}>
                <option>Poppins</option>
                <option>Arial</option>
                <option>Roboto</option>
            </select>
            <select className={styles.select}>
                <option>Medium</option>
                <option>Bold</option>
                <option>Italic</option>
            </select>
            <select className={styles.select}>
                <option>12 Pt</option>
                <option>14 Pt</option>
                <option>16 Pt</option>
            </select>

            {/* Botão para abrir o seletor de cores */}
            <div className={styles.colorPickerContainer}>
                <button className={styles.colorButton} onClick={toggleColorPicker}>
                    <div className={styles.colorPreview} style={{ backgroundColor: fontColor }} />
                </button>
                {isColorPickerVisible && (
                    <div className={styles.colorPickerPopover}>
                        <div className={styles.colorPickerCover} onClick={() => setIsColorPickerVisible(false)} />
                        <HexColorPicker color={fontColor} onChange={setFontColor} className={styles.customColorPicker} />
                    </div>
                )}
            </div>

            <div className={styles.alignmentButtons}>
                <button className={styles.alignButton}><FaAlignLeft /></button>
                <button className={styles.alignButton}><FaAlignCenter /></button>
                <button className={styles.alignButton}><FaAlignRight /></button>
            </div>
        </div>
    );
};

export default TextEditBar;
