// This can be placed in your layout or specific pages
import { UserButton } from "@clerk/nextjs";
import React from "react";

// Example usage within a header component
const Header = () => {
  return (
    <header>
      <UserButton />
    </header>
  );
};
