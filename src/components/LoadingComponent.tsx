import { Spinner } from "@heroui/spinner";

export default function LoadingComponent({ label }: { label?: string }) {
    return (
        <div className="fixed vertical-center flex justify-center items-center">
            <Spinner label={label || 'Loading...'}
                color="secondary"
                labelColor="secondary"
            />
        </div>
    )
}