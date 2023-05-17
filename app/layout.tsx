import React from "react";
import '@/styles/globals.css';
import Nav from "@/components/Nav";

export const metadata = {
  title: 'Promotopia',
  description: 'Discover and Share AI Prompts'
}

// function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
const RootLayout: React.FC<React.ComponentProps<'html'>> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          { children }
        </main>
      </body>
    </html>
  )
};

export default RootLayout;
