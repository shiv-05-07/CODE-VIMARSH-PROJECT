import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/projects', label: 'Projects' },
    { path: '/members', label: 'Members' },
    { path: '/roadmap', label: 'Roadmap' },
    { path: '/join', label: 'Join' },
  ];

  // Generate random page content for new tabs
  const generatePageContent = (platform: string) => {
    const randomId = Math.random().toString(36).substring(7);
    const timestamp = new Date().toLocaleString();
    
    const contentMap: Record<string, { title: string; description: string; content: string }> = {
      GitHub: {
        title: 'Code Vimarsh - GitHub Repository',
        description: 'Explore our open-source projects and contributions',
        content: `
          <div style="font-family: 'Open Sans', sans-serif; background: #0a0a0a; color: #ffffff; min-height: 100vh; padding: 40px 20px;">
            <div style="max-width: 1200px; margin: 0 auto;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 40px; border-bottom: 1px solid rgba(0, 245, 255, 0.1); padding-bottom: 20px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" stroke-width="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 12h8M12 8v8"/>
                </svg>
                <h1 style="font-size: 28px; font-weight: bold; margin: 0;">Code Vimarsh</h1>
              </div>
              <div style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #00f5ff; margin-top: 0;">Repository: code-vimarsh-core</h2>
                <p style="color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
                  The core architecture and foundational systems for Code Vimarsh community platform. This repository contains the intellectual deliberation framework and collaborative discourse tools.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-top: 16px;">
                  <div style="background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 6px; text-align: center;">
                    <div style="color: #00f5ff; font-weight: bold; font-size: 20px;">${Math.floor(Math.random() * 500) + 100}</div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Stars</div>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 6px; text-align: center;">
                    <div style="color: #00f5ff; font-weight: bold; font-size: 20px;">${Math.floor(Math.random() * 50) + 10}</div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Forks</div>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 6px; text-align: center;">
                    <div style="color: #00f5ff; font-weight: bold; font-size: 20px;">${Math.floor(Math.random() * 30) + 5}</div>
                    <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Contributors</div>
                  </div>
                </div>
              </div>
              <div style="color: rgba(255, 255, 255, 0.5); font-size: 12px; text-align: center;">
                Generated: ${timestamp} | ID: ${randomId}
              </div>
            </div>
          </div>
        `
      },
      Twitter: {
        title: 'Code Vimarsh - Twitter/X Profile',
        description: 'Follow us for updates on deliberation and discourse',
        content: `
          <div style="font-family: 'Open Sans', sans-serif; background: #0a0a0a; color: #ffffff; min-height: 100vh; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 40px; border-bottom: 1px solid rgba(0, 245, 255, 0.1); padding-bottom: 20px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#00f5ff">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"/>
                </svg>
                <h1 style="font-size: 28px; font-weight: bold; margin: 0;">@CodeVimarsh</h1>
              </div>
              <div style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 16px; line-height: 1.5;">
                  🧠 Intellectual deliberation in action. Today we discussed architectural patterns that scale with purpose, not just performance.
                </p>
                <div style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">
                  ${timestamp}
                </div>
              </div>
              <div style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 16px; line-height: 1.5;">
                  ✨ New project launched: A framework for collaborative discourse in distributed teams. Check it out!
                </p>
                <div style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">
                  ${new Date(Date.now() - 3600000).toLocaleString()}
                </div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px;">
                <div style="text-align: center; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 18px;">${Math.floor(Math.random() * 5000) + 1000}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 11px;">Followers</div>
                </div>
                <div style="text-align: center; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 18px;">${Math.floor(Math.random() * 500) + 100}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 11px;">Following</div>
                </div>
                <div style="text-align: center; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 18px;">${Math.floor(Math.random() * 2000) + 500}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 11px;">Posts</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      LinkedIn: {
        title: 'Code Vimarsh - LinkedIn Company Page',
        description: 'Connect with us on LinkedIn',
        content: `
          <div style="font-family: 'Open Sans', sans-serif; background: #0a0a0a; color: #ffffff; min-height: 100vh; padding: 40px 20px;">
            <div style="max-width: 800px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(0, 245, 255, 0.05)); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 12px; padding: 40px; margin-bottom: 32px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 20px;">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="#00f5ff">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  <h1 style="font-size: 32px; font-weight: bold; margin: 0;">Code Vimarsh</h1>
                </div>
                <p style="color: rgba(255, 255, 255, 0.7); font-size: 16px; margin: 0;">
                  Architects of Deliberate Software Development
                </p>
              </div>
              <div style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #00f5ff; margin-top: 0;">About Us</h2>
                <p style="color: rgba(255, 255, 255, 0.7); line-height: 1.6; margin: 0;">
                  Code Vimarsh is a community dedicated to intellectual deliberation in software development. We believe in deep discourse, collaborative refinement, and architectural excellence. Our mission is to elevate the standards of software craftsmanship through thoughtful, deliberate practices.
                </p>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; text-align: center; border: 1px solid rgba(0, 245, 255, 0.1);">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 24px;">${Math.floor(Math.random() * 5000) + 1000}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Followers</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; text-align: center; border: 1px solid rgba(0, 245, 255, 0.1);">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 24px;">${Math.floor(Math.random() * 100) + 20}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Employees</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; text-align: center; border: 1px solid rgba(0, 245, 255, 0.1);">
                  <div style="color: #00f5ff; font-weight: bold; font-size: 24px;">${Math.floor(Math.random() * 50) + 10}</div>
                  <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Posts</div>
                </div>
              </div>
              <div style="color: rgba(255, 255, 255, 0.5); font-size: 12px; text-align: center;">
                Generated: ${timestamp} | ID: ${randomId}
              </div>
            </div>
          </div>
        `
      },
      Email: {
        title: 'Code Vimarsh - Contact Us',
        description: 'Get in touch with the Code Vimarsh team',
        content: `
          <div style="font-family: 'Open Sans', sans-serif; background: #0a0a0a; color: #ffffff; min-height: 100vh; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 40px; border-bottom: 1px solid rgba(0, 245, 255, 0.1); padding-bottom: 20px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <h1 style="font-size: 28px; font-weight: bold; margin: 0;">Contact Us</h1>
              </div>
              <div style="background: rgba(0, 245, 255, 0.05); border: 1px solid rgba(0, 245, 255, 0.2); border-radius: 12px; padding: 32px; margin-bottom: 24px;">
                <h2 style="color: #00f5ff; margin-top: 0;">Get in Touch</h2>
                <p style="color: rgba(255, 255, 255, 0.7); line-height: 1.6; margin-bottom: 24px;">
                  Have questions about Code Vimarsh? Want to collaborate? We'd love to hear from you. Reach out to our team and let's start a conversation about deliberate software development.
                </p>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; margin-bottom: 16px; border-left: 3px solid #00f5ff;">
                  <div style="color: #00f5ff; font-weight: bold; margin-bottom: 4px;">Email</div>
                  <div style="color: rgba(255, 255, 255, 0.7);">hello@codevimarsh.dev</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; margin-bottom: 16px; border-left: 3px solid #00f5ff;">
                  <div style="color: #00f5ff; font-weight: bold; margin-bottom: 4px;">Response Time</div>
                  <div style="color: rgba(255, 255, 255, 0.7);">Usually within 24 hours</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #00f5ff;">
                  <div style="color: #00f5ff; font-weight: bold; margin-bottom: 4px;">Inquiry ID</div>
                  <div style="color: rgba(255, 255, 255, 0.7);">${randomId}</div>
                </div>
              </div>
              <div style="text-align: center;">
                <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">
                  Generated: ${timestamp}
                </p>
              </div>
            </div>
          </div>
        `
      }
    };

    return contentMap[platform] || contentMap['GitHub'];
  };

  const handleSocialClick = (label: string) => {
    const pageData = generatePageContent(label);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${pageData.title}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${pageData.description}">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: 'Open Sans', sans-serif;
              }
            </style>
          </head>
          <body>
            ${pageData.content}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <footer className="bg-charcoal border-t border-neon-cyan/10 mt-auto">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-neon-cyan" />
              <span className="font-heading text-xl font-bold text-white">
                Code Vimarsh
              </span>
            </div>
            <p className="font-paragraph text-sm text-white/70 max-w-xs">
              The art of intellectual deliberation. We don't just ship code; we architect solutions through discourse, logic, and collaborative refinement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-white/70 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-white">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleSocialClick(social.label)}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center text-white hover:bg-neon-cyan hover:text-charcoal transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neon-cyan/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-white/70">
              © {currentYear} Code Vimarsh. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-white/70">
              Built with deliberation and excellence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
