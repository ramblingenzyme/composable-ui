import { useState, useEffect, useRef } from "react";
import { useStore } from "../../state";

const useEditComponent = (id) => {
    const [component, setComponent] = useStore(state => [
        state.components[id] || {},
        state.setComponent
    ])

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

    const updateComponent = (updated) => setComponent(id, {
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
            updateComponent({ name, src: code });
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
