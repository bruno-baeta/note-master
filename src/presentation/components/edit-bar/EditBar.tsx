// components/edit-bar/EditBar.tsx
import React from 'react';
import { CanvasItemType } from "../canvas/CanvasItemType";
import TextEditBar from "./text-edit-bar/TextEditBar";
import ImageEditBar from "./image-edit-bar/ImageEditBar";
import AudioEditBar from "./audio-edit-bar/AudioEditBar";

interface EditBarProps {
    selectedItem: CanvasItemType | null;
}

const EditBar: React.FC<EditBarProps> = ({ selectedItem }) => {
    if (!selectedItem) return null;

    switch (selectedItem.type) {
        case 'Texto':
            return <TextEditBar item={selectedItem} />;
        case 'Imagem':
            return <ImageEditBar item={selectedItem} />;
        case 'Audio':
            return <AudioEditBar item={selectedItem} />;
        default:
            return null;
    }
};

export default EditBar;
