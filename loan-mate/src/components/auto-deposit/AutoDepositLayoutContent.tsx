"use client";

import NavigationBar from "@/components/ui/navigation/BackRouteNavigation";
import { useNavigation } from "@/components/ui/navigation/NavigationContext";

export default function AutoDepositLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const { title, showBack, right, isVisible } = useNavigation();

    return (
        <div className="flex flex-col h-screen bg-white">
            {isVisible && (
                <NavigationBar
                    title={title}
                    showBack={showBack}
                    right={right}
                />
            )}

            <main className="flex-1 overflow-auto px-4">
                {children}
            </main>
        </div>
    );
}
