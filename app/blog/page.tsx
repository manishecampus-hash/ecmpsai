import { blogs } from "@/data/blog-data";
import BlogHero from "@/components/blog/blog-hero";
import BlogCategories from "@/components/blog/blog-categories";
import RecommendedPrograms from "@/components/blog/recommended-programs";

export default function BlogPage() {
    const featuredBlog = blogs.find((blog) => blog.featured) ?? blogs[0];

    return (
        <main className="min-h-screen bg-white text-gray-700">
            {/* Blog hero slider */}
            <BlogHero blog={featuredBlog} blogs={blogs.slice(0, 4)} />

            {/* Blog list receives full data so filtering and load more can work */}
            <BlogCategories blogs={blogs} />
            <RecommendedPrograms />
        </main>
    );
}