import { Button } from "@heroui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Button as={Link} href="/members" color="primary" variant="bordered">Click me</Button>
    </div>
  );
}
