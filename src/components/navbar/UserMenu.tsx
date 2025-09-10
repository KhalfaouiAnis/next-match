'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown"
import { Avatar } from "@heroui/avatar"
import Link from "next/link"
import { signOutUser } from "@/app/actions/authActions"
import { transformImageUrl } from "@/lib/util"
import { signOut } from "next-auth/react"

type Props = {
    userInfo :{name: string | null, image: string | null} | null
}

export default function UserMenu({ userInfo }: Props) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform cursor-pointer"
                    color="secondary"
                    name={userInfo?.name || 'user avatar'}
                    size="sm"
                    src={transformImageUrl(userInfo?.image) || '/images/user.png'}
                />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem key="username" isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
                        Signed in as {userInfo?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key="edit-profile-link" as={Link} href="/members/edit" >
                    Edit profile
                </DropdownItem>
                <DropdownItem key="signout-link" color="danger" onPress={async() => await signOut({redirect:true, redirectTo: "/"})} >
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}