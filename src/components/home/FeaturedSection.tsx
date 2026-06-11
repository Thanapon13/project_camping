"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Clock, MapPin } from "lucide-react";

const featuredLandmarks = [
  {
    id: "1",
    name: "Grand Palace",
    province: "Bangkok",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
    visitors: "2.5M",
    trending: true,
  },
  {
    id: "2",
    name: "Phi Phi Islands",
    province: "Krabi",
    image:
      "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&h=600&fit=crop",
    visitors: "1.8M",
    trending: true,
  },
  {
    id: "3",
    name: "Doi Inthanon",
    province: "Chiang Mai",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&h=600&fit=crop",
    visitors: "980K",
    trending: false,
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Featured Destinations
            </h2>
            <p className="mt-2 text-muted-foreground">
              Most popular landmarks loved by travelers
            </p>
          </div>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:row-span-2 group cursor-pointer"
          >
            <Image
              src={featuredLandmarks[0].image}
              alt={featuredLandmarks[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
              {featuredLandmarks[0].trending && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium w-fit mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </div>
              )}
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {featuredLandmarks[0].name}
              </h3>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {featuredLandmarks[0].province}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {featuredLandmarks[0].visitors} visitors
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Featured Cards */}
          {featuredLandmarks.slice(1).map((landmark, index) => (
            <motion.div
              key={landmark.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative rounded-3xl overflow-hidden aspect-[16/9] group cursor-pointer"
            >
              <Image
                src={landmark.image}
                alt={landmark.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {landmark.trending && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium w-fit mb-3">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">
                  {landmark.name}
                </h3>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{landmark.province}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {landmark.visitors} visitors
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
