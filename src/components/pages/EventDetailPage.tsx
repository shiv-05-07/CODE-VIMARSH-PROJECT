import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, ArrowLeft, Clock } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { BaseCrudService } from '@/integrations';
import { Events } from '@/entities';
import { Image } from '@/components/ui/image';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Events | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      const eventData = await BaseCrudService.getById<Events>('events', id);
      setEvent(eventData);
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">Event not found</h2>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-neon-cyan font-paragraph hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />

      <section className="w-full py-12 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-neon-cyan font-paragraph mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {event.eventImage && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-neon-cyan/10">
                    <Image
                      src={event.eventImage}
                      alt={event.eventName || 'Event image'}
                      className="w-full h-full object-cover"
                      width={1200}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold ${
                      event.isUpcoming
                        ? 'bg-neon-cyan/20 text-neon-cyan'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {event.isUpcoming ? 'Upcoming' : 'Past Event'}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {event.eventName}
                </h1>

                <div className="prose prose-invert max-w-none">
                  <p className="font-paragraph text-lg text-white/80 leading-relaxed whitespace-pre-wrap">
                    {event.eventDescription}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-neon-cyan/10 sticky top-24"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-6">Event Details</h3>

                <div className="space-y-4">
                  {event.eventDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm text-white/60 mb-1">Date</p>
                        <p className="font-paragraph text-white">
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.eventTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm text-white/60 mb-1">Time</p>
                        <p className="font-paragraph text-white">{event.eventTime}</p>
                      </div>
                    </div>
                  )}

                  {event.eventLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm text-white/60 mb-1">Location</p>
                        <p className="font-paragraph text-white">{event.eventLocation}</p>
                      </div>
                    </div>
                  )}
                </div>

                {event.registrationUrl && event.isUpcoming && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-neon-cyan text-charcoal px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-neon-cyan/90 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
