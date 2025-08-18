import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
    className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

export function SkeletonCardSmall({ className }: SkeletonCardProps) {
    return (
        <div className={`flex flex-col space-y-3 ${className}`}>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

interface SkeletonCardGroupProps {
    count?: number;
    className?: string;
}

export function SkeletonCardGroup({ count = 1 }: SkeletonCardGroupProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </>
    );
}

export function SkeletonCardGroupSmall({ count = 1 }: SkeletonCardGroupProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCardSmall key={i} />
            ))}
        </>
    );
}
