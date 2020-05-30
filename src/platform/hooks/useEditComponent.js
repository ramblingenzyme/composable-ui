import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { toComponent } from "../utils"
import { componentStateFamily, selectComponentScope } from "../state";
import { setItem } from "../storage.js";

const useEditComponent = (id) => {
    const [component, setComponent] = useRecoilState(componentStateFamily(id));
    const componentScope = useRecoilValue(selectComponentScope);
    const [name, setName] = useState(component.name);
    const [code, setCode] = useState(component.src);
    const [error, setError] = useState(null);

    const changeName = (newName) => {
        setName(newName);
        setComponent({
            ...component,
            name: newName,
        });
        setError(null);
    };

    const changeCode = (newCode) => {
        setCode(newCode);
        setError(null);
    };

    const updateComponent = () => {
        setComponent({
            ...component,
            name,
            src: code,
            fn: toComponent(name, code, componentScope),
        });
        setItem(
            id,
            JSON.stringify({ name, src: code })
        );
    };

    const handleSubmit = () => {
        try {
            updateComponent();
        } catch(e) {
            console.log(e);
            setError(e.message);
        } finally {
            event.preventDefault();
        }
    };

    return {
        changeCode,
        changeName,
        code,
        error,
        handleSubmit,
        name,
    }
}

export default useEditComponent;
