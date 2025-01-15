import Link from "next/link";
import { SignInButton } from "./sign-in-button";
import { siteConfig } from "@/config/site.config";

export function SiteHeader() {
  return (
    <header role="banner" className="w-screen">
      <div className="flex items-center justify-between p-2">
        <Link href={siteConfig.url}>
          <h1 id="site-title" className="text-2xl font-black">
            {siteConfig.name}
          </h1>
        </Link>
        <div className="space-x-2">
          <SignInButton />
        </div>
      </div>
    </header>
  );
}
