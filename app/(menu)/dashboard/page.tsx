"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
export default function DashboardPage() {
    return (
        <div className="h-full">
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      height="100%"
      locale={jaLocale}
    />
        </div>
    )
}