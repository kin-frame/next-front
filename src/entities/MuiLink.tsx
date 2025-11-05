import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Link as MLink, LinkProps as MuiLinkProps } from "@mui/material";
import { atom, useAtom } from "jotai";

const linkSearchAtom = atom<string>();

export default function MuiLink({
  save,
  load,
  href,
  ...props
}: MuiLinkProps &
  LinkProps & {
    /** 링크를 클릭할 때 현재 searchParams를 sessionStorage에 저장 */
    save?: boolean;
    /** 링크를 클릭할 때 sessionStorage에 저장된 searchParams를 이동하려는 Link에 붙임. 기존 searchParams는 삭제 */
    load?: boolean;
  }) {
  const searchParams = useSearchParams();
  const [atom, setAtom] = useAtom(linkSearchAtom);

  const nextHref = useMemo(() => {
    if (!load) return href;

    const url = new URL(href, "http://localhost");
    const newSearch = mergeSearchParams(
      url.searchParams,
      new URLSearchParams(atom)
    );

    return `${url.pathname}?${newSearch.toString()}`;
  }, [atom, href, load]);

  return (
    <MLink
      {...props}
      component={Link}
      href={nextHref}
      onClick={() => {
        if (save) {
          setAtom(searchParams.toString());
        }
      }}
    />
  );
}

function mergeSearchParams(base: URLSearchParams, next: URLSearchParams) {
  const merged = new URLSearchParams(base); // 기존 값 복사

  for (const [key, value] of next.entries()) {
    merged.set(key, value); // 같은 키가 있으면 덮어씀
  }

  return merged;
}
