import { Fragment } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
    loading: boolean
}

function DeleteButton({ loading }: Props) {
    return (<div className="relative hover:opacity-80 transition cursor-pointer">
        {
            !loading ? (
                <Fragment>
                    <AiOutlineDelete size={32} className="fill-white absolute -top-[2px] -right-[2px]" />
                    <AiFillDelete size={28} className="fill-red-600" />
                </Fragment>
            ) : (
                <PiSpinnerGap size={32} className="fill-white animate-spin" />
            )
        }
    </div>);
}

export default DeleteButton;