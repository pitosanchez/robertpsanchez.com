import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Medical Director",
    organization: "Mount Sinai Hospital",
    content:
      "Robert's dedication to health equity and patient advocacy has transformed our approach to community engagement. His work with The Jentosy Project has been instrumental in increasing living donor awareness.",
    image: "/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    role: "Community Health Worker",
    organization: "Bronx Health Center",
    content:
      "Working with Robert has been transformative for our community. His cultural humility and deep understanding of healthcare disparities have helped us reach and serve more patients effectively.",
    image: "/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Patient Advocate",
    organization: "Kidney Forward",
    content:
      "Robert's leadership in the kidney health community has been invaluable. His innovative approaches to patient education and support have made a real difference in countless lives.",
    image: "/testimonial-3.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="bg-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-[#2D6FAB] mb-10 text-center tracking-wide">
          What People Say
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-[#E9E9ED] rounded-2xl p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-full border-4 border-[#2D6FAB]"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-4xl text-[#2D6FAB] mb-4">"</div>
                    <p className="text-lg md:text-xl text-gray-700 mb-6">
                      {testimonials[currentIndex].content}
                    </p>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].role} at{" "}
                        {testimonials[currentIndex].organization}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-[#2D6FAB] text-white hover:bg-[#1e4e7a] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#2D6FAB]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-[#2D6FAB] text-white hover:bg-[#1e4e7a] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Share Your Story</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have you been impacted by our work? We'd love to hear your story and
            potentially feature it here.
          </p>
          <button className="bg-[#2D6FAB] text-white px-8 py-3 rounded-lg hover:bg-[#1e4e7a] transition-colors">
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
