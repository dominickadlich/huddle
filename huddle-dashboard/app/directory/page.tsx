import DirectoryClient from "./directory-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Directory'
}

export default function Page() {
    return (
        <DirectoryClient />
    )
}