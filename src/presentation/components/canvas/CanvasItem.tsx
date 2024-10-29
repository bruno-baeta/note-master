// components/CanvasItem.tsx
import React from 'react';
import { CanvasItemType } from "./CanvasItemType";
import AudioItem from "./Items/audio-item/AudioItem";

interface CanvasItemProps {
    item: CanvasItemType;
}

const CanvasItem: React.FC<CanvasItemProps> = ({ item }) => {
    switch (item.type) {
        case 'Audio':
            return <AudioItem item={item} />;
        default:
            return <div>{item.content}</div>;
    }
};

export default CanvasItem;
