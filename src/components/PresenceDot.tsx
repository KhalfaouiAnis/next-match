import { Member } from "@/generated/prisma"
import usePresenceStore from "@/hooks/usePresenceStore"
import { Fragment } from "react"
import { GoDot, GoDotFill } from "react-icons/go"
import { useShallow } from "zustand/shallow"

type Props = {
    member: Member
}

export default function PresenceDot({ member }: Props) {
    const { members } = usePresenceStore(useShallow(state => state))

    const isOnline = members.indexOf(member.userId) !== -1;

    if (!isOnline) return null;

    return (
        <Fragment>
            <GoDot size={36} className="fill-white absolute -top-[2px] -right-[2px]" />
            <GoDotFill size={32} className="fill-green-500" />
        </Fragment>
    )
}