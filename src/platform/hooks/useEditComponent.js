import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { toComponent } from "../utils"
import { componentStateFamily } from "../state";
import { setItem } from "../storage.js";

const useEditComponent = (id) => {
    const [component, setComponent] = useRecoilState(componentStateFamily(id));
    const [name, setName] = useState(component.name);
    const [code, setCode] = useState(component.src);
    const [error, setError] = useState(null);
    const previousId = useRef(id);

    useEffect(() => {
        if (id !== previousId.current) {
            setName(component.name);
            setCode(component.src);
            setError(null);
            previousId.current = id;
        }
    }, [id, component])

    const updateComponent = (updated) => setComponent({
        ...component,
        ...updated,
    })

    const changeName = (newName) => {
        setName(newName);
        setError(null);
    };

    const changeCode = (newCode) => {
        setCode(newCode);
        setError(null);
    };

    const handleSubmit = (event) => {
        try {
            // Update name separately so that it goes through if the code fails
            updateComponent({ name });
            updateComponent({ src: code, fn: toComponent(name, code) });
            setItem(id, JSON.stringify({ name, src: code }));
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
