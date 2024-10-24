import React, { useState } from 'react';
import {useManagementContext} from "../../infra/context-api/management/ManagementContextProvider";
import {CanvasItemType} from "../components/canvas/CanvasItemType";
import Header from "../components/header/Header";
import Canvas from "../components/canvas/Canvas";
import {useLocation} from "react-router-dom";

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
                <Canvas items={items} setItems={setItems}/>
            </div>
        </div>
    );
};

export default Note;
