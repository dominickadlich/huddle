import { createContext, Dispatch, SetStateAction } from "react";

interface createContextInterface {
    isEditMode: boolean;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
}

export const EditModeContext = createContext<createContextInterface>({
    isEditMode: false,
    setIsEditMode: () => {}
})