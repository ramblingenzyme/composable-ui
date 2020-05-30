import { emitter } from "../const";
import { useEffect } from "react";

export default function useListen(actionType, handler) {
    useEffect(() => {
        const listener = (action) => {
            if (actionType === "*" || action.type === actionType) {
                handler(action);
            }
        }

        emitter.on("action", listener);
        return () => emitter.off("action", listener);
    }, [actionType, handler]);
}
