import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Patient",
    organization: "Bronx Community",
    content:
      "When I was diagnosed with kidney disease, I felt lost and alone. Robert's patient advocacy program at Einstein helped me understand my condition and navigate the healthcare system. His bilingual support and cultural understanding made all the difference in my journey to finding a living donor.",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Patient",
    organization: "Harlem Community",
    content:
      "The workshops Robert led at Mount Sinai were life-changing. He helped me understand my FSGS diagnosis and connected me with other patients who shared similar experiences. His approach to patient education is both informative and empowering.",
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    role: "Nephrologist",
    organization: "Bronx Medical Center",
    content:
      "Robert's work in patient advocacy has transformed how we approach kidney disease education in our community. His ability to bridge the gap between medical professionals and patients has significantly improved our patient outcomes and engagement rates.",
  },
  {
    id: 4,
    name: "Aisha Thompson",
    role: "Patient",
    organization: "Bronx Community",
    content:
      "As someone living with IgA Nephropathy, I was struggling to find resources that spoke to my experience. Robert's advocacy work helped me access the right care and support. His dedication to serving our community is truly remarkable.",
  },
  {
    id: 5,
    name: "Dr. Michael Chen",
    role: "Transplant Coordinator",
    organization: "Harlem Hospital",
    content:
      "Robert's innovative approach to increasing living donor awareness in our community has been invaluable. His work with The Jentosy Project has helped us reach more potential donors and improve transplant outcomes for our patients.",
  },
  {
    id: 6,
    name: "Carlos Mendez",
    role: "Patient",
    organization: "Harlem Community",
    content:
      "The support groups Robert facilitates have been a lifeline for me and my family. His understanding of both the medical and social aspects of kidney disease has helped us navigate this journey with more confidence and hope.",
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
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-[#E9E9ED] rounded-2xl p-8 md:p-12 h-full flex flex-col items-center justify-center">
                  <div className="flex-1 text-center">
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
      </div>
    </section>
  );
};

export default Testimonials;
