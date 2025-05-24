"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { FloatingDarkModeToggle } from "@/components/floating-dark-mode-toggle";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { HowItWorksTimeline } from "@/components/how-it-works-timeline";
import {
  Zap,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  MessageCircle,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        // Handle error - could add a toast notification here
        console.error('Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show floating CTA when user reaches bottom of page
  useEffect(() => {
    const handleScroll = () => {
      if (!isSubmitted) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.offsetHeight;

        // Show CTA when user is within 200px of the bottom
        if (scrollPosition >= documentHeight - 200) {
          // Handle floating CTA logic here if needed
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-background dark:bg-background relative overflow-hidden">
      {/* Background Logo Pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-32 right-16 w-20 h-20 bg-primary/20 transform -rotate-45" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute bottom-32 left-16 w-16 h-16 bg-primary/15 transform rotate-45" style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-4 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-20"></div>
              <Image src="/logo.svg" alt="Beam Logo" width={48} height={48} className="w-12 h-12 relative z-10" />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Beam
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Badge variant="secondary" className="hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Users className="w-3 h-3 mr-1" />
              100+ Early Signups
            </Badge>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-10 lg:pr-8">
            <div className="space-y-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
                <Globe className="w-3 h-3 mr-2" />
                Professional Networking
              </Badge>

              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Show Up,
                  <br />
                  <span className="text-primary">Get Noticed.</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  Share your skills. Talk to the right people. No noise. Just networking.
                </p>
              </div>
            </div>

            {/* Waitlist Form */}
            <div className="space-y-6">
              {!isSubmitted ? (
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email for early access"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 text-base bg-white/90 dark:bg-gray-900/90 border-primary/30 focus:border-primary focus:ring-primary/20 rounded-xl pr-32"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary h-10 px-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <span className="hidden sm:inline mr-2">Join</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-primary/10 dark:from-green-950/10 dark:to-primary/5 p-8 rounded-2xl border border-green-200 dark:border-green-700/30">
                  <div className="flex items-center space-x-4 text-primary dark:text-primary-foreground">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900 dark:text-white">You&rsquo;re on the list!</p>
                      <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                        We&rsquo;ll send you exclusive updates and notify you first when Beam launches
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <Iphone15Pro
                  className="w-64 h-auto sm:w-72 lg:w-80 drop-shadow-2xl"
                  src="/screenshot.png"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section className="relative">
        <HowItWorksTimeline />

        {/* Video Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See Beam in Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Watch a quick demo of how Beam works — from connection to conversation.
            </p>

            {/* YouTube Video Embed */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl bg-gray-100 dark:bg-gray-800">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/Vw-Y_zKqdFE?rel=0&modestbranding=1&showinfo=0"
                  title="Beam App Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Beam Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Built for real professionals who want authentic connections without the noise
              </p>
            </div>

            {/* Features - Unique Layout */}
            <div className="space-y-12">
              {/* Main Feature - Beam Mode */}
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/20">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Beam Mode = You&rsquo;re Available
                        </h3>
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Turn it on when you&rsquo;re open to connect. Stay private when you&rsquo;re not.
                      </p>
                    </div>
                    <div className="w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* AI Identity Check */}
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/8 to-primary/3 rounded-3xl p-8 lg:p-12 border border-primary/15">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/80 rounded-xl flex items-center justify-center">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          AI-Powered Identity Check
                        </h3>
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Our Agent asks smart, quick technical questions to help verify users&rsquo; fields — so you know who you&rsquo;re talking to.
                      </p>
                    </div>
                    <div className="w-20 h-20 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>

              {/* Voice Calls */}
              <div className="relative">
                <div className="bg-gradient-to-r from-primary/6 to-primary/2 rounded-3xl p-8 lg:p-12 border border-primary/10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/70 rounded-xl flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Voice Calls Over Text
                        </h3>
                      </div>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        Skip cold messages. Talk directly in real-time when you both connect.
                      </p>
                    </div>
                    <div className="w-20 h-20 bg-primary/12 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Row Features */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="bg-gradient-to-r from-primary/4 to-primary/1 rounded-3xl p-6 lg:p-8 border border-primary/8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/60 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          You&rsquo;re in Control
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        You approve every connection. No one can call you without your okay.
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary/8 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-r from-primary/4 to-primary/1 rounded-3xl p-6 lg:p-8 border border-primary/8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/60 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Location-Based Discovery
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        See professionals who are physically nearby — no endless searches.
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary/8 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/30" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary/25" style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-3">
          <div className="absolute top-16 left-16 w-24 h-24 bg-primary/20" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-primary/15" style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/25" style={{ borderRadius: '70% 30% 60% 40% / 50% 70% 30% 50%' }}></div>
        </div>

        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-gradient-to-r from-primary to-green-900/50 text-white relative">
          <CardContent className="p-12 text-center">
            <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to <span className="text-white/40">Beam</span>?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start meeting the right people — nearby and now.
              Join Beam early.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => {
                document
                  .querySelector('section')
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src="/logo.svg" alt="Beam Logo" width={24} height={24} className="w-6 h-6" />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Beam
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Beam All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Dark Mode Toggle */}
      <FloatingDarkModeToggle />
    </div>
  );
}
