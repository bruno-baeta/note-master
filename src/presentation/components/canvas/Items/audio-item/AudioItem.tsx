// components/canvas-items/AudioItem.tsx
import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import styles from './AudioItem.module.css';
import {CanvasItemType} from "../../CanvasItemType";

interface AudioItemProps {
    item: CanvasItemType;
}

const AudioItem: React.FC<AudioItemProps> = ({ item }) => {
    return (
        <div className={styles.audioItem}>
            <FaVolumeUp className={styles.icon} />
        </div>
    );
};

export default AudioItem;
