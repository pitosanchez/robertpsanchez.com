import { useState } from "react";
import { motion } from "framer-motion";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "upcoming" | "past";
  image: string;
  registrationLink?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Health Equity Summit 2024",
    date: "April 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual Event",
    description:
      "Join us for a day of discussions on advancing health equity through community engagement and policy change.",
    type: "upcoming",
    image: "/event-1.jpg",
    registrationLink: "#",
  },
  {
    id: 2,
    title: "Living Donor Awareness Workshop",
    date: "April 20, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center, Bronx",
    description:
      "Learn about the importance of living kidney donation and how you can make a difference.",
    type: "upcoming",
    image: "/event-2.jpg",
    registrationLink: "#",
  },
  {
    id: 3,
    title: "Cultural Humility in Healthcare",
    date: "March 10, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Virtual Event",
    description:
      "A workshop on understanding and implementing cultural humility in healthcare settings.",
    type: "past",
    image: "/event-3.jpg",
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredEvents = events.filter((event) => event.type === activeTab);

  return (
    <section id="events" className="bg-[#E9E9ED] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-[#2D6FAB] mb-10 text-center tracking-wide">
          Events & Workshops
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === "upcoming"
                ? "bg-[#2D6FAB] text-white"
                : "bg-white text-gray-700 hover:bg-[#2D6FAB] hover:text-white"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === "past"
                ? "bg-[#2D6FAB] text-white"
                : "bg-white text-gray-700 hover:bg-[#2D6FAB] hover:text-white"
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-sm font-medium">{event.date}</span>
                  <h3 className="text-xl font-semibold mt-1">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {event.time}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{event.description}</p>
                {event.registrationLink && (
                  <a
                    href={event.registrationLink}
                    className="inline-block bg-[#2D6FAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4e7a] transition-colors"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Calendar Integration */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Add to Calendar</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our calendar to stay updated with all upcoming events
            and workshops.
          </p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-[#2D6FAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4e7a] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Google Calendar
            </button>
            <button className="flex items-center gap-2 bg-[#2D6FAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4e7a] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              iCal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
