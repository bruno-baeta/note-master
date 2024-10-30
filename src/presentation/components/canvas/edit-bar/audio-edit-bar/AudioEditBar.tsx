// components/edit-bar/audio-edit-bar/AudioEditBar.tsx
import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaMicrophone, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { CanvasItemType } from "../../CanvasItemType";
import styles from './AudioEditBar.module.css';

interface AudioEditBarProps {
    item: CanvasItemType;
}

const AudioEditBar: React.FC<AudioEditBarProps> = ({ item }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [displayTime, setDisplayTime] = useState(0); // Mostra o tempo atual para a contagem regressiva
    const [volume, setVolume] = useState(0.5);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const recordingInterval = useRef<NodeJS.Timeout | null>(null);
    const playbackInterval = useRef<NodeJS.Timeout | null>(null);

    const togglePlayPause = () => {
        if (!audioURL) return;

        if (isPlaying) {
            audioRef.current?.pause();
            clearInterval(playbackInterval.current!); // Para a contagem regressiva ao pausar
        } else {
            audioRef.current = new Audio(audioURL);
            audioRef.current.volume = volume;
            audioRef.current.play();
            setDisplayTime(recordingTime); // Inicia a contagem regressiva a partir da duração total
            playbackInterval.current = setInterval(() => {
                setDisplayTime((prevTime) => {
                    if (prevTime <= 1) { // Pausa automaticamente no final
                        clearInterval(playbackInterval.current!);
                        setIsPlaying(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            audioRef.current.onended = () => setIsPlaying(false);
        }

        setIsPlaying(!isPlaying);
    };

    const startRecording = () => {
        setIsRecording(true);
        setAudioURL(null);
        setRecordingTime(0);
        setDisplayTime(0); // Reinicia o tempo exibido

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = (event) => {
                    chunks.current.push(event.data);
                };
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
                    setAudioBlob(blob);
                    const newAudioURL = URL.createObjectURL(blob);
                    setAudioURL(newAudioURL);
                    chunks.current = [];
                    setDisplayTime(recordingTime); // Define o tempo total ao finalizar a gravação
                };
                mediaRecorderRef.current.start();

                recordingInterval.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current?.stop();
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current);
            recordingInterval.current = null;
        }
    };

    const handleRecord = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleDelete = () => {
        setAudioBlob(null);
        setAudioURL(null);
        setIsPlaying(false);
        setRecordingTime(0);
        setDisplayTime(0);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        e.target.style.background = `linear-gradient(to right, #4CAF50 ${newVolume * 100}%, #3A3D41 ${newVolume * 100}%)`;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.editBar} onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={togglePlayPause} className={styles.controlButton} disabled={!audioURL}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleRecord} className={`${styles.controlButton} ${isRecording ? styles.recording : ''}`}>
                <FaMicrophone />
            </button>
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
            <span className={`${styles.duration} ${isRecording ? styles.recordingTime : ''}`}>
                {isRecording ? <span className={styles.blinkingDot}></span> : null}
                {formatTime(isPlaying ? displayTime : recordingTime)}
            </span>
            <button onClick={handleDelete} className={styles.controlButton}><FaTrash /></button>
        </div>
    );
};

export default AudioEditBar;
