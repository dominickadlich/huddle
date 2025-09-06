'use client'

import { 
    AtSymbolIcon,
    KeyIcon, 
    ExclamationCircleIcon 
} from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { Button } from "./button"
import { useActionState } from "react"
import { authenticate } from "../lib/actions"
import { useSearchParams } from "next/navigation"
import { error } from 'console';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callback') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        
    )
}