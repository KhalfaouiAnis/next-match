"use client";

import { useMessageStore } from "@/hooks/useMessageStore";
import { NavbarItem } from "@heroui/navbar"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/shallow";

type Props = {
    href: string;
    label: string
}

export default function NavLink({ href, label }: Props) {
    const unreadCount = useMessageStore(useShallow(state => state.unreadCount))
    const pathname = usePathname()
    return (
        <NavbarItem isActive={pathname === href} as={Link} href={href}>
            <span>
                {label}
            </span>
            {href === '/messages' && (
                <span className="ml-1">
                    {unreadCount}
                </span>
            )}
        </NavbarItem>
    )
}