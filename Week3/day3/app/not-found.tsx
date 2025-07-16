"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-16 w-16 text-primary/30" />
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Page Not Found</CardTitle>
            <CardDescription className="text-lg">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you might
              have entered the wrong URL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Go Back</span>
              </Button>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Popular Pages</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <Link href="/products">
                  <Button variant="ghost" className="w-full justify-start">
                    Products
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="ghost" className="w-full justify-start">
                    Blog
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" className="w-full justify-start">
                    Contact
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                If you believe this is an error, please{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact our support team
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
