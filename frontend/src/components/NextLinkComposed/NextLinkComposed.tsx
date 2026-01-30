"use client";

import * as React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type NextLinkComposedProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  NextLinkProps & {
    href: NextLinkProps["href"];
  };

const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { href, as, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
      <NextLink
        ref={ref}
        href={href}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        {...other}
      />
    );
  }
);

export default NextLinkComposed;
