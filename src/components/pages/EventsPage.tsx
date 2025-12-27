import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';

export default function EventsPage() {
  const [events, setEvents] = useState<Events[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    const fetchEvents = async () => {
      const { items } = await BaseCrudService.getAll<Events>('events');
      const sorted = items.sort((a, b) => {
        const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
        const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
        return dateB - dateA;
      });
      setEvents(sorted);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (filter === 'upcoming') return event.isUpcoming;
    if (filter === 'past') return !event.isUpcoming;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-charcoal py-20">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Events & Gatherings
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-white/80">
              Join us for thoughtful discussions, workshops, and collaborative sessions where we explore the art of deliberate software architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-charcoal py-8 border-b border-neon-cyan/10">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {(['all', 'upcoming', 'past'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-neon-cyan text-charcoal'
                    : 'bg-transparent text-white border border-neon-cyan/30 hover:bg-neon-cyan/10'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full py-16 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/events/${event._id}`}
                    className="block bg-gray-800/50 rounded-xl overflow-hidden border border-neon-cyan/10 hover:border-neon-cyan/30 transition-all hover:shadow-lg hover:shadow-neon-cyan/10 group"
                  >
                    {event.eventImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={event.eventImage}
                          alt={event.eventName || 'Event image'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={600}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold ${
                            event.isUpcoming
                              ? 'bg-neon-cyan/20 text-neon-cyan'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {event.isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                        {event.eventName}
                      </h3>
                      <p className="font-paragraph text-sm text-white/70 mb-4 line-clamp-2">
                        {event.eventDescription}
                      </p>
                      <div className="space-y-2">
                        {event.eventDate && (
                          <div className="flex items-center gap-2 text-white/60">
                            <Calendar className="w-4 h-4" />
                            <span className="font-paragraph text-sm">
                              {new Date(event.eventDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        {event.eventTime && (
                          <div className="flex items-center gap-2 text-white/60">
                            <Clock className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{event.eventTime}</span>
                          </div>
                        )}
                        {event.eventLocation && (
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span className="font-paragraph text-sm">{event.eventLocation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-neon-cyan/30 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-white/60">
                No {filter !== 'all' ? filter : ''} events found.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
