'use client'

import { usePostHog } from 'posthog-js/react'
import { useEffect } from "react"
import { usePageContext } from "vike-react/usePageContext"

export default function PostHogPageView() {
    const pathname = usePageContext()?.urlParsed.pathname
    const posthog = usePostHog()

    useEffect(() => {
        if (pathname && posthog) {
            posthog.capture('$pageview', { "$current_url" : pathname})
        }
    }, [pathname, posthog])

    return null
}