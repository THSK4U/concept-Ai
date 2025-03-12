import IdeaProcessor from "@/components/idea-processor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Concept to Specification Generator",
  description: "Transform your ideas into structured specifications and class diagrams",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Concept to Specification Generator</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Transform Your Ideas</h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Input your core concept and let AI organize related ideas, generate specifications, and create class
              diagrams to jumpstart your project planning.
            </p>
          </div>
          <IdeaProcessor />
        </section>
      </main>
    </div>
  )
}

