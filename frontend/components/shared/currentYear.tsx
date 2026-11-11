"use client";

import { Suspense } from "react";

export default function CurrentYear() {
    return <>
        <Suspense fallback={"..."}>
            {new Date().getFullYear()}
        </Suspense>
    </>
}