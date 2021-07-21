import React from "react";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <>
      <div>Hello world</div>
      <Link href="/user/foo">User Foo</Link>
      <Link href="/user/bar">User Bar</Link>
    </>
  );
}
