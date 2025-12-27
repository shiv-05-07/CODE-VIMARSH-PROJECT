import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { Search, Linkedin } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function MembersDirectoryPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMembers[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMembers[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { items } = await BaseCrudService.getAll<TeamMembers>('teammembers');
        setMembers(items);
        setFilteredMembers(items);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = members.filter((member) => {
      const nameMatch = member.name?.toLowerCase().includes(query) || false;
      const roleMatch = member.role?.toLowerCase().includes(query) || false;
      return nameMatch || roleMatch;
    });
    setFilteredMembers(filtered);
  }, [searchQuery, members]);

  const handleViewProfile = (memberId: string) => {
    navigate(`/members/${memberId}`);
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header Section */}
      <div className="bg-charcoal border-b border-neon-cyan/10 py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Team Members
            </h1>
            <p className="font-paragraph text-lg text-white/70 max-w-2xl">
              Meet the brilliant minds behind Code Vimarsh. Our team is dedicated to intellectual deliberation and collaborative excellence.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-cyan/50" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-charcoal border border-neon-cyan/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 transition-colors font-paragraph"
            />
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-paragraph text-white/70">Loading team members...</p>
            </div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-xl text-white/70">
              {searchQuery ? 'No members found matching your search.' : 'No team members available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member._id}
                className="group bg-charcoal border border-neon-cyan/20 rounded-xl overflow-hidden hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10"
              >
                {/* Profile Picture */}
                <div className="relative h-64 bg-gradient-to-b from-neon-cyan/10 to-charcoal overflow-hidden">
                  {member.profilePicture ? (
                    <Image
                      src={member.profilePicture}
                      alt={member.name || 'Team member'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neon-cyan/5">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-neon-cyan">
                            {member.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Name and Role */}
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-paragraph text-sm text-neon-cyan mb-4">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="font-paragraph text-sm text-white/70 mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewProfile(member._id)}
                      className="flex-1 px-4 py-2 bg-neon-cyan text-charcoal font-heading font-semibold rounded-lg hover:bg-neon-cyan/90 transition-colors"
                    >
                      View Profile
                    </button>
                    {member.linkedInUrl && (
                      <a
                        href={member.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-neon-cyan/30 text-neon-cyan rounded-lg hover:bg-neon-cyan/10 transition-colors flex items-center justify-center"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!isLoading && filteredMembers.length > 0 && (
          <div className="mt-12 text-center">
            <p className="font-paragraph text-sm text-white/50">
              Showing {filteredMembers.length} of {members.length} team members
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
