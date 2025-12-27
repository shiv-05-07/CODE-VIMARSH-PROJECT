import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      try {
        const data = await BaseCrudService.getById<TeamMembers>('teammembers', id);
        setMember(data);
      } catch (error) {
        console.error('Error fetching team member:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-paragraph text-white/70">Loading member details...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white mb-4">Member Not Found</h1>
          <button
            onClick={() => navigate('/members')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-charcoal font-heading font-semibold rounded-lg hover:bg-neon-cyan/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header with Back Button */}
      <div className="bg-charcoal border-b border-neon-cyan/10 py-6">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/members')}
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-paragraph">Back to Members</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Picture and Quick Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Profile Picture */}
              <div className="rounded-xl overflow-hidden border border-neon-cyan/20 bg-gradient-to-b from-neon-cyan/10 to-charcoal">
                {member.profilePicture ? (
                  <Image
                    src={member.profilePicture}
                    alt={member.name || 'Team member'}
                    className="w-full h-auto object-cover"
                    width={400}
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-neon-cyan/5">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto">
                        <span className="text-6xl font-bold text-neon-cyan">
                          {member.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                {member.linkedInUrl && (
                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal border border-neon-cyan/30 rounded-lg text-white hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-neon-cyan" />
                    <span className="font-paragraph text-sm">LinkedIn Profile</span>
                  </a>
                )}
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal border border-neon-cyan/30 rounded-lg text-white hover:bg-neon-cyan/10 hover:border-neon-cyan/50 transition-colors">
                  <Mail className="w-5 h-5 text-neon-cyan" />
                  <span className="font-paragraph text-sm">Contact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Name and Role */}
            <div>
              <h1 className="font-heading text-5xl font-bold text-white mb-2">
                {member.name}
              </h1>
              <p className="font-paragraph text-2xl text-neon-cyan">
                {member.role}
              </p>
            </div>

            {/* Bio Section */}
            <div className="bg-charcoal border border-neon-cyan/20 rounded-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-4">About</h2>
              <p className="font-paragraph text-base text-white/80 leading-relaxed whitespace-pre-wrap">
                {member.bio}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal border border-neon-cyan/20 rounded-xl p-6">
                <h3 className="font-heading text-lg font-semibold text-neon-cyan mb-2">Role</h3>
                <p className="font-paragraph text-white">{member.role}</p>
              </div>
              <div className="bg-charcoal border border-neon-cyan/20 rounded-xl p-6">
                <h3 className="font-heading text-lg font-semibold text-neon-cyan mb-2">Member ID</h3>
                <p className="font-paragraph text-white text-sm break-all">{member._id}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="text-sm text-white/50 space-y-1">
              {member._createdDate && (
                <p className="font-paragraph">
                  Joined: {new Date(member._createdDate).toLocaleDateString()}
                </p>
              )}
              {member._updatedDate && (
                <p className="font-paragraph">
                  Last updated: {new Date(member._updatedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
