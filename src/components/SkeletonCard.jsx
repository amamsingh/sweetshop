import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={twMerge(clsx("animate-pulse bg-gray-200 rounded-md", className))}
            {...props}
        />
    );
};

export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
            <Skeleton className="h-56 w-full rounded-none" />
            <div className="p-5 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
