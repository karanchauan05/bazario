"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/data/categories";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { StorageService } from "@/lib/storage";
import { Listing, CategoryId } from "@/lib/types";

interface FormData {
    title: string;
    category: string;
    price: string;
    location: string;
    description: string;
    condition: string;
    images: string[];
}

interface FormErrors {
    title?: string;
    category?: string;
    price?: string;
    location?: string;
    description?: string;
    condition?: string;
    images?: string;
}

export function PostAdForm() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        category: "",
        price: "",
        location: "",
        description: "",
        condition: "Good", // Default
        images: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price) newErrors.price = "Price is required";
        if (Number(formData.price) < 0) newErrors.price = "Price cannot be negative";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (formData.description.length < 20) newErrors.description = "Description needs to be at least 20 chars";
        // Mock image validation - in real app check file input
        if (formData.images.length === 0) newErrors.images = "At least one image is required (Mock: click upload)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    // ... inside PostAdForm ...

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // Create Listing Object
        const newListing: Listing = {
            id: `local-${Date.now()}`,
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category as CategoryId,
            condition: formData.condition as any,
            images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=300&auto=format&fit=crop'],
            postedAt: new Date().toISOString(),
            currency: '$',
            location: formData.location,
            seller: {
                id: 'local-user',
                name: "You (Local User)",
                joined: new Date().toISOString(),
                rating: 0,
                verified: false
            },
            attributes: {
                "Source": "Local"
            },
            featured: false
        };

        await new Promise((resolve) => setTimeout(resolve, 800)); // Small delay for UX
        StorageService.saveListing(newListing);

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    // Mock Image Upload
    const handleMockUpload = () => {
        // Add a placeholder image
        if (formData.images.length >= 5) return;
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, `https://source.unsplash.com/random/400x300?sig=${Math.random()}`]
            // Note: unsplash source is deprecated often, using a static one closely for safety if needed, 
            // but let's stick to a reliable placeholder or just the ones we used in data.
            // Let's use a generic placeholder to avoid broken images if unsplash source is down.
            // Actually, just reusing one from our mock data or a placeholder service.
        }));
        // Clear error
        if (errors.images) setErrors(prev => ({ ...prev, images: undefined }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Upload className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Ad Posted Successfully!</h2>
                <p className="text-muted-foreground">Your ad is now under review and will be live shortly.</p>
                <Button onClick={() => { setIsSubmitted(false); setFormData({ title: "", category: "", price: "", location: "", description: "", condition: "Good", images: [] }) }}>
                    Post Another Ad
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
            {/* Item Details Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-primary">Item Details</h2>
                    <p className="text-muted-foreground mt-1">Tell us about what you're selling.</p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm space-y-6">
                    <div className="grid gap-3">
                        <Label htmlFor="title" className="text-base font-semibold text-stone-700">Ad Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g., iPhone 14 Pro Max 256GB - Deep Purple"
                            value={formData.title}
                            onChange={handleChange}
                            className={`h-12 rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all ${errors.title ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
                        />
                        {errors.title && <p className="text-sm text-destructive font-medium flex items-center gap-1">Please enter a valid title</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="category" className="text-base font-semibold text-stone-700">Category</Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    name="category"
                                    className={`flex h-12 w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm ring-offset-background focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${errors.category ? "border-destructive" : ""}`}
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            {errors.category && <p className="text-sm text-destructive font-medium">Category is required</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="price" className="text-base font-semibold text-stone-700">Price ($)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className={`h-12 rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all ${errors.price ? "border-destructive" : ""}`}
                            />
                            {errors.price && <p className="text-sm text-destructive font-medium">Valid price is required</p>}
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="condition" className="text-base font-semibold text-stone-700">Condition</Label>
                        <div className="relative">
                            <select
                                id="condition"
                                name="condition"
                                className="flex h-12 w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-2 text-sm ring-offset-background focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                value={formData.condition}
                                onChange={handleChange}
                            >
                                <option value="New">New (Brand New / Sealed)</option>
                                <option value="Like New">Like New (Open Box / Pristine)</option>
                                <option value="Good">Good (Minor wear)</option>
                                <option value="Fair">Fair (Visible wear)</option>
                                <option value="Poor">Poor (Functional issues)</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="description" className="text-base font-semibold text-stone-700">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your item in detail (features, history, defects)..."
                            className={`min-h-[150px] rounded-xl border-stone-200 bg-stone-50 focus:bg-white p-4 text-base transition-all ${errors.description ? "border-destructive" : ""}`}
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className="text-sm text-destructive font-medium">Please provide a detailed description (20+ chars)</p>}
                    </div>

                    <div className="grid gap-3">
                        <Label className="text-base font-semibold text-stone-700">Photos</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                            {/* Mock Upload Button */}
                            <div
                                onClick={handleMockUpload}
                                className={`aspect-square rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-all group ${errors.images ? "border-destructive/50 bg-destructive/5" : ""}`}
                            >
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                    <Upload className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Add Photo</span>
                            </div>

                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 shadow-sm group">
                                    <Image src={'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=300&auto=format&fit=crop'} alt="Upload preview" fill className="object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {errors.images && <p className="text-sm text-destructive font-medium">At least one photo is required</p>}
                    </div>
                </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-primary">Contact Info</h2>
                    <p className="text-muted-foreground mt-1">Where is the item located?</p>
                </div>

                <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm">
                    <div className="grid gap-3">
                        <Label htmlFor="location" className="text-base font-semibold text-stone-700">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="City, State"
                            value={formData.location}
                            onChange={handleChange}
                            className={`h-12 rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all ${errors.location ? "border-destructive" : ""}`}
                        />
                        {errors.location && <p className="text-sm text-destructive font-medium">Location is required</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-stone-200">
                <Button type="button" variant="ghost" className="h-12 rounded-full px-8 text-muted-foreground hover:text-foreground">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="h-12 rounded-full px-10 bg-primary hover:bg-primary/90 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    {isSubmitting ? "Posting..." : "Post Now"}
                </Button>
            </div>
        </form >
    );
}
