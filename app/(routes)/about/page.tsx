import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Classified Ads",
    description: "Learn more about our mission to safe and easy local trading.",
};

export default function AboutPage() {
    return (
        <Container className="py-10">
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Building the safest and most convenient local marketplace.
                    </p>
                </div>

                <div className="space-y-4 text-muted-foreground">
                    <p>
                        Founded in 2024, our platform helps neighbors buy and sell used goods. We believe in the power of the circular economy to reduce waste and help people save money.
                    </p>
                    <p>
                        Whether you are looking for a vintage sofa, a slightly used smartphone, or want to give your old bike a new home, we make the process simple and secure.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="rounded-lg border bg-card p-6 text-center">
                        <h3 className="font-semibold text-lg text-foreground mb-2">Safe</h3>
                        <p className="text-sm">Verified users and fraud protection guidelines.</p>
                    </div>
                    <div className="rounded-lg border bg-card p-6 text-center">
                        <h3 className="font-semibold text-lg text-foreground mb-2">Local</h3>
                        <p className="text-sm">Connect with real people in your neighborhood.</p>
                    </div>
                    <div className="rounded-lg border bg-card p-6 text-center">
                        <h3 className="font-semibold text-lg text-foreground mb-2">Free</h3>
                        <p className="text-sm">No listing fees for regular sellers.</p>
                    </div>
                </div>
            </div>
        </Container>
    );
}
