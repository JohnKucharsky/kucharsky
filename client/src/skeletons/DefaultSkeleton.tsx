import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function DefaultSkeleton() {
    return (
        <Box margin={"3rem auto"} width={800}>
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="4" />
            {Array.from(Array(10).keys()).map((sk) => (
                <Skeleton key={sk} height="50px" />
            ))}
        </Box>
    );
}
