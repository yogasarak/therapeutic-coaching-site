'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { formatDate } from '@/utils'

// Simple Skip Links
export const SkipLinks: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: '-100px', left: 0, zIndex: 9999 }}>
      <a 
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={(e) => {
          e.target.style.position = 'static'
          e.target.style.width = 'auto'
          e.target.style.height = 'auto'
          e.target.style.background = 'var(--color-primary)'
          e.target.style.color = 'white'
          e.target.style.padding = '0.5rem 1rem'
        }}
      >
        Skip to main content
      </a>
    </div>
  )
}

// Simple Story Section
export const StorySection: React.FC = () => {
  return (
    <section id="story" style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>My Story & Approach</h2>
        <div className="story-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          marginTop: 'var(--spacing-xl)',
        }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: 'var(--spacing-lg)', fontWeight: '500' }}>
              Every journey begins with a single step, and mine started with the 
              profound realization that healing happens in relationship.
            </p>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              With over a decade of experience in therapeutic coaching, I&apos;ve had the 
              privilege of walking alongside hundreds of individuals as they&apos;ve discovered 
              their inner resilience, processed life&apos;s challenges, and created meaningful 
              change in their lives.
            </p>
          </div>
          <div style={{
            height: '400px',
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--border-radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Professional Photo<br />
              (Warm, approachable portrait)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple Services Section
export const ServicesSection: React.FC = () => {
  return (
    <section id="services" style={{ padding: '4rem 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          Services & Programs
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'var(--spacing-xl)',
          marginTop: 'var(--spacing-xl)',
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
          }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
              Individual Coaching Sessions
            </h3>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              One-on-one therapeutic coaching sessions tailored to your unique needs and goals.
            </p>
            <div style={{ textAlign: 'center', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
              <strong>Starting at $150/session</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple Testimonials Section
export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #2D5A8710 0%, #8FBC8F10 100%)',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>What Clients Say</h2>
        <div style={{
          backgroundColor: 'var(--color-background)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-md)',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <blockquote style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            fontStyle: 'italic',
            marginBottom: 'var(--spacing-lg)',
            border: 'none',
            padding: 0,
          }}>
            &ldquo;Working with this therapeutic coach has been life-changing. I finally found the tools 
            and support I needed to break through years of self-doubt and anxiety.&rdquo;
          </blockquote>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Sarah M.</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Marketing Professional
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple Blog Section
interface BlogSectionProps {
  readonly posts: ReadonlyArray<BlogPost>
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const displayPosts = posts.slice(0, 3)

  return (
    <section id="blog" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Latest Insights</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            Thoughts on personal growth, healing, and the therapeutic journey
          </p>
        </div>

        {displayPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
            <p>Blog posts coming soon!</p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'var(--spacing-xl)',
            }}>
              {displayPosts.map(post => (
                <article key={post.slug} style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--border-radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                }}>
                  <Link href={`/blog/${post.slug}`} style={{ display: 'block', color: 'inherit' }}>
                    <div style={{ padding: 'var(--spacing-xl)' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-md)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                      }}>
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h3 style={{
                        marginBottom: 'var(--spacing-md)',
                        fontSize: '1.3rem',
                        lineHeight: '1.3',
                      }}>
                        {post.title}
                      </h3>
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
              <Link href="/blog" className="btn-primary">
                View All Posts →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// Simple Contact Section
export const ContactSection: React.FC = () => {
  return (
    <section id="contact" style={{ padding: '4rem 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Get In Touch</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Ready to begin your transformation journey? I&apos;d love to hear from you.
          </p>
        </div>
        
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginTop: 'var(--spacing-xl)',
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Name *</label>
              <input 
                type="text" 
                required 
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '2px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email *</label>
              <input 
                type="email" 
                required 
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '2px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Message *</label>
              <textarea 
                required 
                rows={5}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '2px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
          
          <div>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
              Let&apos;s Connect
            </h3>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              I offer a free 15-minute consultation call to see if we&apos;re a good fit.
            </p>
            <div style={{
              backgroundColor: 'var(--color-background)',
              padding: 'var(--spacing-xl)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <strong>Email:</strong> hello@therapeuticcoaching.com
              </div>
              <div>
                <strong>Response Time:</strong> Within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}