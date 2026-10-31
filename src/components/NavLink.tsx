'use client';

import React from 'react';

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  href: string;
  onNavigate: (url: string) => void;
  /** Runs before client-side navigation (e.g. closing a menu). */
  onClick?: () => void;
}

/**
 * A real <a href> so crawlers can follow internal links; normal clicks still navigate client-side,
 * while modified clicks (new tab, etc.) fall through to the browser.
 */
export function NavLink({ href, onNavigate, onClick, className = '', children, ...rest }: NavLinkProps) {
  const hasDisplay = /(^|\s)(flex|grid|block|inline|inline-block|inline-flex|hidden)(\s|$)/.test(className);
  return (
    <a
      {...rest}
      href={href}
      className={hasDisplay ? className : `inline-block ${className}`.trim()}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}
