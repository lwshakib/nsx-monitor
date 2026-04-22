import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { Menu } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import Logo from "../Logo"
import { DOWNLOAD_URLS } from "../../app/lib/constants"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [downloadUrl, setDownloadUrl] = React.useState<string>(DOWNLOAD_URLS.win)

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.indexOf("Mac") !== -1) setDownloadUrl(DOWNLOAD_URLS.mac)
    else if (userAgent.indexOf("Linux") !== -1) setDownloadUrl(DOWNLOAD_URLS.lin)
  }, [])

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // height of the fixed nav
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsOpen(false)
    }
  }

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Dashboard", id: "engine" },
    { name: "Documentation", id: "topology" },
  ]

  return (
    <nav className="border-ui-border bg-brand-bg/40 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300 dark:bg-black/40">
      <div className="ui-container flex h-20 items-center justify-between border-none px-6 md:px-10">
        <Logo />

        {/* Desktop Links */}
        <div className="text-ui-text-muted hidden items-center gap-8 font-mono text-[10px] tracking-widest lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="hover:text-ui-text group flex items-center gap-2 transition-colors duration-300"
            >
              <span className="bg-ui-border group-hover:bg-ui-text h-1 w-1 rounded-full transition-colors"></span>
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/lwshakib/nsx-monitor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ui-text group ml-4 flex items-center gap-2 transition-colors duration-300"
          >
            <Icon icon="ri:github-fill" className="text-xl" />
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* Download Button (Desktop Only) */}
          <a
            href={downloadUrl}
            className="text-brand-bg bg-ui-text border-ui-border hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_var(--accent-glow)] transition-all hover:opacity-80 active:scale-95 md:flex"
          >
            Download
            <Icon icon="solar:download-bold-duotone" />
          </a>

          {/* Mobile Menu with Shadcn Sheet */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-ui-text hover:bg-brand-surface rounded-lg"
                >
                  <Menu size={24} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-ui-border flex h-full w-[85%] flex-col border-l bg-background p-0 shadow-2xl backdrop-blur-none sm:max-w-sm"
              >
                <SheetHeader className="border-ui-border flex h-20 flex-row items-center justify-between border-b px-6">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col p-8 md:p-10">
                  <nav className="flex flex-col gap-4">
                    <p
                      className="text-ui-text-muted/50 sidebar-item-anim mb-4 px-2 text-[10px] tracking-[0.2em]"
                      style={{ animationDelay: "0.1s" }}
                    >
                      Navigation
                    </p>
                    {navLinks.map((link, index) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => scrollToSection(e, link.id)}
                        className="text-ui-text-muted hover:text-ui-text group hover:bg-ui-text/5 sidebar-item-anim flex items-center gap-4 rounded-xl px-2 py-3 text-xs tracking-[0.2em] transition-colors"
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                        <span className="bg-ui-border group-hover:bg-ui-text h-1.5 w-1.5 scale-75 rounded-full transition-all group-hover:scale-100"></span>
                        {link.name}
                      </a>
                    ))}

                    <div
                      className="bg-ui-border/50 sidebar-item-anim my-6 h-[1px] w-full"
                      style={{
                        animationDelay: `${0.2 + navLinks.length * 0.1}s`,
                      }}
                    ></div>

                    <p
                      className="text-ui-text-muted/50 sidebar-item-anim mb-4 px-2 text-[10px] tracking-[0.2em]"
                      style={{
                        animationDelay: `${0.3 + navLinks.length * 0.1}s`,
                      }}
                    >
                      External
                    </p>
                    <a
                      href="https://github.com/lwshakib/nsx-monitor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ui-text-muted hover:text-ui-text hover:bg-ui-text/5 sidebar-item-anim flex items-center gap-4 rounded-xl px-2 py-3 text-xs tracking-[0.2em] transition-colors"
                      style={{
                        animationDelay: `${0.4 + navLinks.length * 0.1}s`,
                      }}
                    >
                      <Icon icon="ri:github-fill" className="text-lg" />
                      Repository
                    </a>
                  </nav>

                  <div className="mt-auto pb-6">
                    <a
                      href={downloadUrl}
                      onClick={() => setIsOpen(false)}
                      className="text-brand-bg bg-ui-text sidebar-item-anim flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-[10px] font-bold tracking-[0.2em] shadow-[0_10px_30px_-10px_var(--accent-glow)] transition-all active:scale-[0.98]"
                      style={{
                        animationDelay: `${0.5 + navLinks.length * 0.1}s`,
                      }}
                    >
                      Download App
                      <Icon
                        icon="solar:download-bold-duotone"
                        className="text-base"
                      />
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
