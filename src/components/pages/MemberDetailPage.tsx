import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Linkedin } from 'lucide-react';
import Footer from '../Footer';

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<TeamMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      try {
        const data = await BaseCrudService.getById<TeamMembers>('teammembers', id);
        setMember(data);
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
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-secondary/60">Loading member details...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center">
        <h1 className="font-heading text-3xl font-bold text-neon-cyan mb-4">
          Member Not Found
        </h1>
        <Link to="/members">
          <Button className="bg-neon-cyan text-charcoal hover:bg-neon-cyan/90">
            Back to Team
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
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
            {/* Profile Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-neon-cyan/30">
                {member.profilePicture ? (
                  <Image
                    src={member.profilePicture}
                    alt={member.name || 'Team member'}
                    className="w-full h-full object-cover"
                    width={500}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-cyan/10 to-neon-cyan/5">
                    <div className="text-neon-cyan/30 text-8xl font-heading font-bold">
                      {member.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex flex-col justify-center">
              <h1 className="font-heading text-5xl font-bold text-neon-cyan mb-2">
                {member.name}
              </h1>
              <p className="font-paragraph text-2xl text-secondary/80 mb-8">
                {member.role}
              </p>

              {member.bio && (
                <div className="mb-8">
                  <h2 className="font-heading text-lg font-bold text-secondary mb-3">
                    About
                  </h2>
                  <p className="font-paragraph text-base text-secondary/70 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              )}

              {/* LinkedIn Link */}
              {member.linkedInUrl && (
                <div className="flex gap-4">
                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-neon-cyan text-charcoal hover:bg-neon-cyan/90 gap-2">
                      <Linkedin className="w-4 h-4" />
                      View LinkedIn Profile
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
