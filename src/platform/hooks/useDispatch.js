import { useCallback } from "react";
import { emitter } from "../../const/emitter";

const useDispatch =
  (id = "default") =>
  () =>
  (action) => {
    return emitter.emit(`${id}_action`, action);
  };

export default useDispatch;
