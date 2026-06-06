import { createContext, Dispatch, SetStateAction } from "react";

interface createContextInterface {
    isEditMode: boolean;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
    misclickWarning: boolean,
    setMisclickWarning: Dispatch<SetStateAction<boolean>>;
    pendingHref: string | null,
    setPendingHref: Dispatch<SetStateAction<string | null>>;
}

export const EditModeContext = createContext<createContextInterface>({
    isEditMode: false,
    setIsEditMode: () => {},
    misclickWarning: false,
    setMisclickWarning: () => {},
    pendingHref: null,
    setPendingHref: () => {}
})