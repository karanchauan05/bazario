import { Container } from "@/components/layout/container";
import { PostAdForm } from "@/components/features/PostAdForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Post a Free Ad - Classified Ads",
    description: "Sell your items quickly and easily. Post a free classified ad today.",
};

export default function PostAdPage() {
    return (
        <Container className="py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Post Your Ad</h1>
                <p className="mt-2 text-muted-foreground">
                    It&apos;s free and takes less than a minute.
                </p>
            </div>
            <PostAdForm />
        </Container>
    );
}
