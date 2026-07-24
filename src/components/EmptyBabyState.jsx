import { useState } from "react";
import { Button } from "flowbite-react";
import { LiaUserPlusSolid  } from "react-icons/lia";

export function EmptyBabyState({onCreateClick}) {

    return (
        <div className="flex h-full w-full min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">

            <div className="flex max-w-sm flex-col items-center text-center">

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500">
                    <LiaUserPlusSolid className="h-7 w-7" />
                </div>

                <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                    No Baby Profiles Found
                </h2>

                <p className="mb-6 text-base font-normal leading-relaxed text-gray-500 dark:text-gray-400">
                    You haven't added any profiles yet. <br />Create a profile to start tracking daily events.
                </p>

                <Button
                    color="blue"
                    onClick={onCreateClick}
                    size="md"
                    className="px-2 font-medium"
                >
                    Create New Baby Profile
                </Button>

            </div>
        </div>
    );
}

export default EmptyPageState;
