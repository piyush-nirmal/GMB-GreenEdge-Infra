"use client";

export function Footer() {
  return (
    <footer className="ml-[260px] border-t border-outline-variant bg-surface-container-lowest">
      <div className="flex justify-between items-center py-4 px-6 max-w-[1440px] mx-auto">
        <span className="text-xs font-bold text-on-surface">
          © 2024 GMB SEO Autopilot
        </span>
        <div className="flex gap-6">
          {["Support", "Documentation", "Terms of Service", "Privacy Policy"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-on-surface-variant hover:text-primary transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
