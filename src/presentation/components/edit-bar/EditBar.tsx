import React from 'react';
import {CanvasItemType} from "../canvas/CanvasItemType";
import TextEditBar from "./text-edit-bar/TextEditBar";

interface EditBarProps {
    selectedItem: CanvasItemType | null;
}

const EditBar: React.FC<EditBarProps> = ({ selectedItem }) => {
    if (!selectedItem) return null;

    switch (selectedItem.type) {
        case 'Texto':
            return <TextEditBar item={selectedItem} />;
        default:
            return null;
    }
};

export default EditBar;
