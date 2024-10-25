import React, { useState, useRef, useEffect } from 'react';
import Header from "../components/header/Header";
import {useManagementContext} from "../../infra/context-api/management/ManagementContextProvider";
import {useLocation} from "react-router-dom";
import {CanvasItemType} from "../components/canvas/CanvasItemType";
import Canvas from "../components/canvas/Canvas";

const Note: React.FC = () => {
    const location = useLocation();
    const { noteName } = location.state || {};
    const [ items, setItems] = useState<CanvasItemType[]>([]);
    const { user, users } = useManagementContext()

    return (
        <div>
            <Header
                newButtonIsEnabled={false}
                user={user}
                users={users}
                title={noteName}
            />
            <div>
                <Canvas />
            </div>
        </div>
    );
};

export default Note;
