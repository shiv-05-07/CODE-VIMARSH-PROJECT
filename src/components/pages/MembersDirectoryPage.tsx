import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MembersDirectoryPage() {
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
        console.error('Error fetching members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = members.filter((member) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (member.name?.toLowerCase().includes(searchLower) || false) ||
        (member.role?.toLowerCase().includes(searchLower) || false)
      );
    });
    setFilteredMembers(filtered);
  }, [searchQuery, members]);

  return (
    <div className="flex flex-col min-h-screen bg-charcoal">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-b from-charcoal to-charcoal/95 py-16 px-4">
          <div className="max-w-[100rem] mx-auto">
            <h1 className="font-heading text-6xl font-bold text-neon-cyan mb-4">
              Our Team
            </h1>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl">
              Meet the talented individuals driving innovation and excellence
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full bg-charcoal px-4 py-12">
          <div className="max-w-[100rem] mx-auto">
            {/* Search Bar */}
            <div className="mb-12">
              <Input
                type="text"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md bg-charcoal border-neon-cyan/30 text-secondary placeholder:text-secondary/50 focus:border-neon-cyan focus:ring-neon-cyan/20"
              />
            </div>

            {/* Members Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-secondary/60">Loading team members...</div>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-secondary/60">
                  {searchQuery ? 'No members found matching your search.' : 'No team members available.'}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMembers.map((member) => (
                  <div
                    key={member._id}
                    className="group relative bg-charcoal border border-neon-cyan/30 rounded-xl overflow-hidden hover:border-neon-cyan/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/20"
                  >
                    {/* Profile Image Container */}
                    <div className="relative w-full h-64 bg-charcoal/50 overflow-hidden">
                      {member.profilePicture ? (
                        <Image
                          src={member.profilePicture}
                          alt={member.name || 'Team member'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={400}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-cyan/10 to-neon-cyan/5">
                          <div className="text-neon-cyan/30 text-4xl font-heading font-bold">
                            {member.name?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-bold text-neon-cyan mb-2">
                        {member.name}
                      </h3>
                      <p className="font-paragraph text-sm text-secondary/70 mb-4">
                        {member.role}
                      </p>

                      {member.bio && (
                        <p className="font-paragraph text-sm text-secondary/60 mb-6 line-clamp-2">
                          {member.bio}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link to={`/members/${member._id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan"
                          >
                            View Profile
                          </Button>
                        </Link>

                        {member.linkedInUrl && (
                          <a
                            href={member.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan"
                            >
                              <Linkedin className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
