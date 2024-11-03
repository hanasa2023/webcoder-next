import type { Metadata } from 'next'

import localFont from 'next/font/local'

import './globals.css'

import React from 'react'

import { TopBar } from '@/components/topBar'
import { SideBar } from '@/components/sidebar'
import { TerminalPanel } from '@/components/terminal-panel'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col w-full h-screen">
          <TopBar />
          <div className="flex w-full h-full">
            <SideBar />
            <div className="flex w-full h-full">
              {children}
              <div className="flex w-full h-40">
                <TerminalPanel />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
