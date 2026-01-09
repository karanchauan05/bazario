import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Classified Ads",
    description: "Get in touch with our support team.",
};

export default function ContactPage() {
    return (
        <Container className="py-10">
            <div className="mx-auto max-w-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
                    <p className="mt-2 text-muted-foreground">
                        Have a question or need help? Send us a message.
                    </p>
                </div>

                <form className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="How can we help?" className="min-h-[120px]" />
                    </div>
                    <Button className="w-full">Send Message</Button>
                </form>
            </div>
        </Container>
    );
}
