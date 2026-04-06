import { requireSession } from "@/utils/session";

export default async function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireSession();

    return <>{children}</>;
}
