import { Skeleton } from "@chakra-ui/react";

export default function BooksSkeleton() {
    return (
        <>
            {Array.from(Array(8).keys()).map((sk) => (
                <Skeleton key={sk} height="20px" />
            ))}
            <Skeleton height="20px" />
        </>
    );
}
