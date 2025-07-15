import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js App Router",
    excerpt: "Learn how to build modern web applications with Next.js 13+ App Router and its powerful features.",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Development",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
    author: "Jane Smith",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Technology",
  },
  {
    id: 3,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Master the art of creating beautiful, responsive user interfaces using Tailwind CSS.",
    author: "Mike Johnson",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Design",
  },
  {
    id: 4,
    title: "TypeScript Best Practices",
    excerpt: "Essential TypeScript patterns and practices for building maintainable applications.",
    author: "Sarah Wilson",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Development",
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest insights, tutorials, and news from our team.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/30">FEATURED</div>
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{featuredPost.category}</Badge>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                  <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                  <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button>Read More</Button>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Regular Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to our newsletter to get the latest blog posts delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contact">
              <Button>Subscribe Now</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
