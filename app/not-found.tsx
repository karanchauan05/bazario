import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function NotFound() {
    return (
        <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-4 text-red-600">
                <AlertCircle className="h-10 w-10" />
            </div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Page Not Found</h1>
            <p className="mb-8 max-w-md text-muted-foreground">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or renamed.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/">Go to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/categories">Browse Categories</Link>
                </Button>
            </div>
        </Container>
    );
}
