"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export function HowItWorksTimeline() {
    const data = [
        {
            title: "Step 1",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                            Start Beaming
                        </h3>
                        <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-400">
                            Turn on your beam to be visible to professionals nearby. You&rsquo;re in control — beam when you&rsquo;re open to connect.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <Image
                                src="/steps/start-beaming.png"
                                alt="Start beaming on Beam app"
                                width={200}
                                height={400}
                                className="w-40 md:w-48 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                            />
                            {/* Gradient background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Step 2",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                            Connect & Get Approved
                        </h3>
                        <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-400">
                            The person you reached out to gets a notification. If they accept, you&rsquo;re both instantly connected.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <Image
                                    src="/steps/send-connection-request.png"
                                    alt="Send connection request on Beam"
                                    width={150}
                                    height={300}
                                    className="w-32 md:w-36 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                                />
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                            </div>
                            <div className="relative">
                                <Image
                                    src="/steps/approved-request.png"
                                    alt="Approved connection request on Beam"
                                    width={150}
                                    height={300}
                                    className="w-32 md:w-36 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                                />
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Step 3",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                            Jump on a Call
                        </h3>
                        <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-400">
                            No messaging. No LinkedIn DMs. Just a voice call — fast, personal, and on your terms.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <Image
                                src="/steps/jump-on-a-call.png"
                                alt="Jump on a call feature in Beam"
                                width={200}
                                height={400}
                                className="w-40 md:w-48 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                            />
                            {/* Gradient background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Step 4",
            content: (
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                            Connect & Grow
                        </h3>
                        <p className="text-sm md:text-base font-normal text-neutral-600 dark:text-neutral-400">
                            Keep in touch, follow up, or move on — Beam helps you have real conversations with real people, right where you are.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <Image
                                    src="/steps/ongoing-call.png"
                                    alt="Ongoing call in Beam app"
                                    width={150}
                                    height={300}
                                    className="w-32 md:w-36 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                                />
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                            </div>
                            <div className="relative">
                                <Image
                                    src="/steps/connection-finalized.png"
                                    alt="Connection finalized in Beam"
                                    width={150}
                                    height={300}
                                    className="w-32 md:w-36 h-auto rounded-2xl object-contain shadow-xl border border-gray-200 dark:border-gray-700"
                                />
                                {/* Gradient background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-2xl -z-10 transform scale-105 blur-xl opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="relative w-full overflow-clip bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
            <Timeline
                data={data}
                headerTitle="How Beam Works"
                headerDescription="Tap. Connect. Talk. That's it."
            />
        </div>
    );
} 