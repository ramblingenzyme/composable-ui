import { emitter } from "../const";
import { useCallback } from "react";

const dispatch = (action) => emitter.emit("action", action);
export default function useDispatch() {
    return dispatch;
}
