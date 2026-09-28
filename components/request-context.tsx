"use client"

import * as React from "react"

import { serviceOptions, type ServiceOption } from "@/lib/site"

type RequestState = {
  service: ServiceOption
  setService: (service: ServiceOption) => void
  // Bumped whenever a service card sends the visitor to the form, so the form
  // can flash and move focus. `preselected` says whether a service was chosen.
  highlight: { count: number; preselected: boolean }
  requestForm: (service?: ServiceOption) => void
}

const RequestContext = React.createContext<RequestState | null>(null)

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = React.useState<ServiceOption>(serviceOptions[0])
  const [highlight, setHighlight] = React.useState({
    count: 0,
    preselected: false,
  })

  const requestForm = React.useCallback((wanted?: ServiceOption) => {
    if (wanted) setService(wanted)
    setHighlight((h) => ({ count: h.count + 1, preselected: !!wanted }))
  }, [])

  return (
    <RequestContext value={{ service, setService, highlight, requestForm }}>
      {children}
    </RequestContext>
  )
}

export function useRequest() {
  const ctx = React.use(RequestContext)
  if (!ctx) throw new Error("useRequest must be used inside <RequestProvider>")
  return ctx
}
