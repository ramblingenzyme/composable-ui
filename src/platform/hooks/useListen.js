import { useEffect } from "react";
import { emitter } from "../const";

const useListen = (id = "default") => (actionType, handler) => {
    useEffect(() => {
        const listener = (action) => {
            if (actionType === "*" || action.type === actionType) {
                handler(action);
            }
        }

        emitter.on(`${id}_action`, listener);
        return () => emitter.off(`${id}_action`, listener);
    }, [actionType, handler]);
}

export default useListen;