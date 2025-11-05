import Link, { LinkProps } from "next/link";
import { Link as MLink, LinkProps as MuiLinkProps } from "@mui/material";

export default function MuiLink(props: MuiLinkProps & LinkProps) {
  return <MLink {...props} component={Link} />;
}
