// components/edit-bar/audio-edit-bar/AudioEditBar.tsx
import React, { useState } from 'react';
import { FaPlay, FaPause, FaMicrophone, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { CanvasItemType } from "../../canvas/CanvasItemType";
import styles from './AudioEditBar.module.css';

interface AudioEditBarProps {
    item: CanvasItemType;
}

const AudioEditBar: React.FC<AudioEditBarProps> = ({ item }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleRecord = () => {
        // Lógica para gravar/regravar áudio
    };

    const handleDelete = () => {
        // Lógica para excluir o item de áudio
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
        e.target.style.background = `linear-gradient(to right, #4CAF50 ${Number(e.target.value) * 100}%, #3A3D41 ${Number(e.target.value) * 100}%)`;
    };

    return (
        <div className={styles.editBar} onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={togglePlayPause} className={styles.controlButton}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleRecord} className={styles.controlButton}><FaMicrophone /></button>
            <div className={styles.volumeControl}>
                <FaVolumeUp />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className={styles.slider}
                />
            </div>
            <button onClick={handleDelete} className={styles.controlButton}><FaTrash /></button>
        </div>
    );
};

export default AudioEditBar;
