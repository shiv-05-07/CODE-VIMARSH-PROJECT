import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';

interface Member {
  id: string;
  name: string;
  email: string;
  tech_stack: string;
  github_handle: string;
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      try {
        if (!supabase) {
          console.warn('Supabase is not configured');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching member:', error);
        } else {
          setMember(data);
        }
      } catch (error) {
        console.error('Error fetching member:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-charcoal">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-secondary/60">Loading member details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col min-h-screen bg-charcoal">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-heading text-3xl font-bold text-neon-cyan mb-4">
            Member Not Found
          </h1>
          <Link to="/members">
            <Button className="bg-neon-cyan text-charcoal hover:bg-neon-cyan/90">
              Back to Team
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-charcoal">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="w-full bg-charcoal px-4 py-6">
          <div className="max-w-[100rem] mx-auto">
            <Link to="/members">
              <Button
                variant="ghost"
                className="text-neon-cyan hover:bg-neon-cyan/10 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Team
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full bg-charcoal px-4 py-12">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Profile Information */}
              <div className="flex flex-col justify-center">
                <h1 className="font-heading text-5xl font-bold text-neon-cyan mb-2">
                  {member.name}
                </h1>
                <p className="font-paragraph text-2xl text-secondary/80 mb-8">
                  {member.tech_stack}
                </p>

                {member.email && (
                  <div className="mb-8">
                    <h2 className="font-heading text-lg font-bold text-secondary mb-3">
                      Contact
                    </h2>
                    <p className="font-paragraph text-base text-secondary/70 leading-relaxed">
                      {member.email}
                    </p>
                  </div>
                )}

                {/* GitHub Link */}
                {member.github_handle && (
                  <div className="flex gap-4">
                    <a
                      href={`https://github.com/${member.github_handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-neon-cyan text-charcoal hover:bg-neon-cyan/90 gap-2">
                        <Github className="w-4 h-4" />
                        View GitHub Profile
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
