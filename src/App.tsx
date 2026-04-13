/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Bus,
  Palette,
  Utensils,
  Sun,
  Baby,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

// --- Data ---

const BRAND_IMAGES = [
  "https://places.googleapis.com/v1/places/ChIJW42lzbJtpw0Rea0ELvLzQ7Y/photos/AU_ZVEE765ZHW84oUkPyAbLNb-6eIhvhGkzJohOKRXMA8HDGtI-jnUSrtXSk8z6e24mTzNSkUsdGw4V-JR6Uj1zkvd-IJRJjudefETIRN3P250VeiiiXZUWrQ24jV_VPY60qNGNKWRv6YWmbtGbIwGyDUH1RUX2B-zQ6idkiGwykFEh9KfX-4knycPf1K20gLjoK3_R6BHNK1u7zGRlaYXqrgjhkw0KNzkVrnrME0q0GB5xQHuYw8aipnXxCMvygWWz_pRRj3hqBhp3mDHWmh02yDlhEKF_BqtH96jdEW7T03FRKyQ/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJW42lzbJtpw0Rea0ELvLzQ7Y/photos/AU_ZVEEZsOov2pNpo7q_kMAqP3zV3RSwRJ-5WTTGV4v6ET-293e3DJOzTPhWmtxjsvVRrFJflc7A-H96LIJAX9aKo-0rnGyT1r0ouFl8zGsfeJbAmHS17uspKczM3vlZby3vzpUfgFeefcJcfEwr7HnPhO5Opfh_qXodb9cGI0gpyWIJBAfUgZGKK2p7u7XhYVLR4nroj2gi7Pz2eCc7zKhIyOi-iWgYL1K8ln9pQCevfvmHjGIxnxfMzlbW9kR12ULK_Hy1an0KxS8GwYpTTRzmnCoALGi3FhdsERd2Uub5xaHFGw/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJW42lzbJtpw0Rea0ELvLzQ7Y/photos/AU_ZVEGrmspy7s5WomdHEl9MELsIQHLoiKj-UI6v85Nww8XdSunjD4Y09A51eZQPjNUlPn77Jzt2zHCX9JR-zr2j97WYydTx99b64Qwl2ZcI3Woc0oi2rVuJT8cdh15A2EexLCifD509Ez2I61utq8fQzDIbMltZTTEBG7u3vhuF5wYmHcmS5wztsvN5TcaAV9DbT7OiiWjzwXAg1pidc7NHumaL81yTQfkNWYjKK-aU4sjxWDZ9Geg0tQbakTly-uwUlYYO8LxgJi5ttOTheFPS6pATqn8Dzke0FTGRsv8CKPXWWQ/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis",
  "https://places.googleapis.com/v1/places/ChIJW42lzbJtpw0Rea0ELvLzQ7Y/photos/AU_ZVEHXG4OCSpi4eXaTxcjKI4mGvzIRk2Rb_X0c6vI8QrEIeSLA0FMsc1DfkKOQpj37sw_tVJCwzJURkfieJd7ztpBbLORokiDoLWzHSO7vu8lpVevo5k13kv-eyiq2t9DH-yzCOEdN-61fjbK9XPoL__UdRpT9pmYsXwA2HSk_5ikrtyTrSlyOgxG2qxelm91faeAZWCey5PyTtMs15PI0sn7ab2LmPk9o2FJbStnfOwNMiSvLPQMPX_F8RGlsafrV30fEAtJhxiGmA_oFFJpUmZZ-XNYqHDqJXShEmXKI4oNoWA/media?maxHeightPx=800&maxWidthPx=800&key=AIzaSyA0XH2iy5HwKuPkyiJIXytC7IiD8KlKHis"
];

const SERVICES = [
  {
    name: "Frais d'Inscription Annuelle",
    price: "1500 MAD",
    description: "Frais d'inscription annuels garantissant la place de votre enfant pour l'année académique, incluant les fournitures scolaires de base, l'assurance et les frais administratifs.",
    icon: GraduationCap,
    category: "Administratif"
  },
  {
    name: "Scolarité Mensuelle - Journée Complète",
    price: "1200 MAD",
    description: "Éducation complète de la petite enfance en journée complète couvrant le français, l'arabe, la motricité et le jeu créatif de 8h00 à 17h00.",
    icon: Baby,
    category: "Éducation"
  },
  {
    name: "Cantine Scolaire / Programme Déjeuner",
    price: "500 MAD",
    description: "Abonnement mensuel pour des repas chauds et collations nutritifs et équilibrés préparés quotidiennement sur place.",
    icon: Utensils,
    category: "Nutrition"
  },
  {
    name: "Transport Scolaire",
    price: "350 MAD",
    description: "Service de mini-bus mensuel sûr et fiable pour le ramassage et le dépôt des élèves dans le quartier Yaakoub El Mansour.",
    icon: Bus,
    category: "Logistique"
  },
  {
    name: "Activités Extrascolaires - Arts & Artisanat",
    price: "250 MAD",
    description: "Frais mensuels pour des ateliers créatifs hebdomadaires incluant la peinture, la poterie et le bricolage de base.",
    icon: Palette,
    category: "Créatif"
  },
  {
    name: "Service de Garderie Après l'École",
    price: "300 MAD",
    description: "Services de garde prolongés disponibles de 17h00 à 19h00 pour les parents qui travaillent, incluant des jeux éducatifs supervisés.",
    icon: Clock,
    category: "Garde"
  },
  {
    name: "Programme de Camp d'Été",
    price: "1000 MAD",
    description: "Un club d'été d'un mois rempli de plaisir, comprenant des activités nautiques de plein air, des jeux interactifs et des ateliers artistiques en juillet.",
    icon: Sun,
    category: "Saisonnier"
  }
];

const REVIEWS = [
  {
    author: "Atelier Oum Jana",
    rating: 5,
    text: "Maryam Foundation is one of the best educational institutions in terms of early childhood education, both pedagogically and in terms of the director and teachers, who are among the kindest people I know. Their treatment is excellent, based on my experience. May God bless your efforts."
  },
  {
    author: "Yahya Hrchaoui",
    rating: 5,
    text: "An excellent school with a refined approach and highly qualified educational staff who care for children in all educational and developmental aspects. I recommend it to every parent seeking a good education for their children."
  },
  {
    author: "Lamia Chelh",
    rating: 2,
    text: "Good educational standards and excellent service. Maryam Foundation remains one of the best institutions 🥰"
  }
];

// --- Components ---

const SectionTitle = ({ title, subtitle, mono = false }: { title: string, subtitle?: string, mono?: boolean }) => (
  <div className="mb-16">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-4 ${mono ? 'font-mono' : 'font-sans'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl font-mono text-gray-500 max-w-2xl"
      >
        // {subtitle}
      </motion.p>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b-4 border-bauhaus-blue py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6">
        {/* Desktop Split Nav */}
        <div className="hidden md:grid grid-cols-3 items-center">
          <div className="flex gap-8 font-mono text-sm uppercase tracking-widest">
            {navLinks.slice(0, 2).map(link => (
              <a key={link.name} href={link.href} className="hover:text-bauhaus-red transition-all">{link.name}</a>
            ))}
          </div>
          
          <div className="flex justify-center">
            <a href="#" className="text-2xl font-bold font-mono tracking-tighter border-4 border-black px-4 py-1 bg-bauhaus-yellow text-black sharp-shadow-sm">
              MERYEM.EDU
            </a>
          </div>

          <div className="flex justify-end gap-8 font-mono text-sm uppercase tracking-widest">
            {navLinks.slice(2).map(link => (
              <a key={link.name} href={link.href} className="hover:text-bauhaus-red transition-all">{link.name}</a>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex justify-between items-center">
          <a href="#" className="text-xl font-bold font-mono tracking-tighter border-4 border-black px-3 py-1 bg-bauhaus-yellow text-black">
            MERYEM.EDU
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 border-4 border-black bg-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b-4 border-black p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 font-mono text-2xl uppercase font-bold">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="hover:translate-x-4 transition-transform">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#F1FAEE]">
      {/* Bauhaus Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-bauhaus-light-blue opacity-20 -z-10" />
      <div className="absolute bottom-20 left-10 w-40 h-40 border-8 border-bauhaus-red -z-10" />
      <div className="absolute top-40 right-20 w-60 h-60 bg-bauhaus-yellow -z-10 opacity-20 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-sm uppercase tracking-[0.3em] mb-6 border-b-4 border-bauhaus-red pb-1">
                Rabat, Maroc // Fondé en 1998
              </span>
              <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.85] mb-8">
                Façonner <br />
                <span className="text-bauhaus-red">des Avenirs</span> <br />
                Brillants.
              </h1>
              <p className="text-xl md:text-2xl font-sans text-gray-700 max-w-xl mb-10 leading-relaxed">
                Un environnement stimulant où le potentiel de chaque enfant est nourri par une éducation de qualité et des soins attentifs.
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#contact" className="px-8 py-4 bg-bauhaus-red text-white font-mono uppercase tracking-widest text-sm border-4 border-black sharp-shadow-hover transition-sharp">
                  S'inscrire
                </a>
                <a href="#services" className="px-8 py-4 bg-white text-black font-mono uppercase tracking-widest text-sm border-4 border-black hover:bg-bauhaus-yellow transition-sharp">
                  Nos Programmes
                </a>
              </div>
            </motion.div>
          </div>

          {/* Asymmetrical Image Grid */}
          <div className="lg:col-span-5 relative h-[600px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 right-0 w-4/5 h-4/5 border-8 border-bauhaus-blue overflow-hidden sharp-shadow-red"
            >
              <img 
                src={BRAND_IMAGES[0]} 
                alt="School Environment" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-3/5 h-3/5 border-8 border-bauhaus-yellow overflow-hidden bg-white p-2 sharp-shadow-blue"
            >
              <img 
                src={BRAND_IMAGES[1]} 
                alt="Classroom Activity" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-bauhaus-blue flex items-center justify-center text-white font-mono text-xs uppercase tracking-tighter text-center p-2 border-4 border-black">
              Qualité Éducative
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white border-y-8 border-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-full h-full border-8 border-bauhaus-yellow -z-10" />
            <img 
              src={BRAND_IMAGES[2]} 
              alt="About Meryem School" 
              className="w-full aspect-square object-cover border-8 border-black sharp-shadow-red"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-bauhaus-blue text-white border-4 border-black p-6 sharp-shadow-yellow max-w-[200px]">
              <p className="font-mono text-xs uppercase font-bold">
                "Un environnement chaleureux et stimulant pour chaque enfant."
              </p>
            </div>
          </div>

          <div>
            <SectionTitle 
              title="Notre Mission" 
              subtitle="Excellence Pédagogique à Rabat"
            />
            <div className="space-y-8">
              <p className="text-xl text-gray-800 leading-relaxed">
                L'Établissement Meryem est une école maternelle privée dédiée à fournir une éducation de haute qualité. Notre approche combine une supervision pédagogique attentive avec des activités éducatives adaptées à chaque âge.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Environnement Sécurisé", desc: "La sécurité est notre priorité absolue avec une surveillance 24/7.", icon: ShieldCheck, color: 'bg-bauhaus-red' },
                  { title: "Personnel Qualifié", desc: "Des éducateurs expérimentés et passionnés par le développement précoce.", icon: GraduationCap, color: 'bg-bauhaus-yellow' },
                  { title: "Apprentissage Bilingue", desc: "Exposition précoce aux langues française et arabe.", icon: Baby, color: 'bg-bauhaus-blue' },
                  { title: "Croissance Créative", desc: "Focus sur la motricité et le jeu imaginatif.", icon: Palette, color: 'bg-bauhaus-light-blue' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white border-4 border-black sharp-shadow-sm"
                  >
                    <div className={`w-12 h-12 ${item.color} flex items-center justify-center text-white mb-4 border-2 border-black`}>
                      <item.icon size={24} />
                    </div>
                    <h4 className="font-bold uppercase mb-2 font-mono">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const colors = ['sharp-shadow-red', 'sharp-shadow-yellow', 'sharp-shadow-blue', 'sharp-shadow-red', 'sharp-shadow-yellow', 'sharp-shadow-blue', 'sharp-shadow-red'];
  const iconColors = ['bg-bauhaus-red', 'bg-bauhaus-yellow', 'bg-bauhaus-blue', 'bg-bauhaus-red', 'bg-bauhaus-yellow', 'bg-bauhaus-blue', 'bg-bauhaus-red'];

  return (
    <section id="services" className="py-24 bg-[#F1FAEE]">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Nos Programmes" 
          subtitle="Services Complets de Soins et d'Éducation"
          mono
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative bg-white border-4 border-black p-8 transition-sharp ${colors[i]} hover:translate-x-[-4px] hover:translate-y-[-4px] flex flex-col h-full`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 ${iconColors[i]} text-white border-2 border-black`}>
                  <service.icon size={24} />
                </div>
                <span className="font-mono text-2xl font-bold">{service.price}</span>
              </div>
              
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                {service.category}
              </span>
              <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight leading-none">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm mb-8 flex-grow">
                {service.description}
              </p>
              
              <button className={`w-full py-3 border-4 border-black font-mono text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors`}>
                En savoir plus
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-bauhaus-blue text-white border-y-8 border-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionTitle 
            title="Galerie" 
            subtitle="La Vie à l'Établissement Meryem"
          />
          <div className="font-mono text-sm uppercase tracking-widest border-4 border-bauhaus-yellow bg-bauhaus-red px-6 py-3 mb-16 sharp-shadow-sm">
            // Voyage Visuel
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[800px]">
          <div className="md:col-span-2 md:row-span-2 border-8 border-bauhaus-yellow overflow-hidden group sharp-shadow-red">
            <img 
              src={BRAND_IMAGES[0]} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Gallery 1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-2 border-8 border-bauhaus-red overflow-hidden group sharp-shadow-yellow">
            <img 
              src={BRAND_IMAGES[3]} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Gallery 2"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="border-8 border-white overflow-hidden group">
            <img 
              src={BRAND_IMAGES[1]} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Gallery 3"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="border-8 border-bauhaus-light-blue overflow-hidden group">
            <img 
              src={BRAND_IMAGES[2]} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              alt="Gallery 4"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const shadows = ['sharp-shadow-red', 'sharp-shadow-yellow', 'sharp-shadow-blue'];
  const colors = ['border-bauhaus-red', 'border-bauhaus-yellow', 'border-bauhaus-blue'];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Témoignages" 
          subtitle="Ce que disent les parents de nous"
          mono
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`p-10 border-8 ${colors[i]} relative bg-white ${shadows[i]}`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starI) => (
                  <Star 
                    key={starI} 
                    size={16} 
                    fill={starI < review.rating ? "black" : "none"} 
                    className={starI < review.rating ? "text-black" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-lg italic mb-8 font-sans leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-black flex items-center justify-center text-white font-mono font-bold border-2 border-white`}>
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="font-bold uppercase font-mono text-sm">{review.author}</h4>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Parent Vérifié</span>
                </div>
              </div>
              <div className={`absolute -top-4 -right-4 w-12 h-12 border-4 border-black bg-white flex items-center justify-center`}>
                <span className="font-mono font-bold">0{i+1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-bauhaus-light-blue/20 border-t-8 border-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <SectionTitle 
              title="Contact" 
              subtitle="Entrez en contact avec notre équipe"
            />
            
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-bauhaus-red text-white border-4 border-black sharp-shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-mono uppercase font-bold mb-2">Emplacement</h4>
                  <a 
                    href="https://maps.google.com/maps?q=City+Yaakoub+El+Mansour+Amal5,+N%C2%B0679+Av.+Al+Massira,+Rabat+10150,+Morocco" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg hover:underline decoration-bauhaus-red decoration-4 underline-offset-4"
                  >
                    City Yaakoub El Mansour Amal5, N°679 Av. Al Massira, Rabat 10150, Morocco
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-4 bg-bauhaus-yellow text-black border-4 border-black sharp-shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-mono uppercase font-bold mb-2">Téléphone</h4>
                  <p className="text-2xl font-bold">06 88 63 80 03</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-4 bg-bauhaus-blue text-white border-4 border-black sharp-shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-mono uppercase font-bold mb-2">Email</h4>
                  <p className="text-lg">ÉtablissementMeryem@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white text-black border-4 border-black sharp-shadow-sm">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-mono uppercase font-bold mb-2">Horaires</h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm font-mono">
                    <span className="text-bauhaus-red font-bold">Lun - Ven :</span> <span>7h30 - 17h00</span>
                    <span className="text-gray-400">Sam - Dim :</span> <span className="text-gray-400">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Form */}
          <div className="lg:col-span-7">
            <div className="border-8 border-black sharp-shadow-yellow bg-white p-2">
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent('City Yaakoub El Mansour Amal5, N°679 Av. Al Massira, Rabat 10150, Morocco')}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                width="100%" 
                height="450" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen 
                title="Google Map"
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 bg-bauhaus-blue text-white border-4 border-black sharp-shadow-red">
                <h3 className="text-xl font-bold uppercase font-mono mb-4">Visitez-nous</h3>
                <p className="text-sm text-gray-200">Nous accueillons les parents pour visiter nos installations pendant les heures de classe. Veuillez appeler à l'avance pour planifier une visite.</p>
              </div>
              <div className="p-8 bg-bauhaus-yellow border-4 border-black flex items-center justify-between group cursor-pointer hover:bg-black hover:text-white transition-colors sharp-shadow-blue">
                <span className="font-mono uppercase font-bold">Télécharger la Brochure</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-4">MERYEM.</h2>
            <p className="font-mono text-gray-500 uppercase tracking-widest">// Façonner des avenirs plus brillants depuis 1998</p>
          </div>
          <div className="flex flex-col gap-4 items-start md:items-end">
            <p className="text-xl max-w-xs md:text-right">
              Fournir un environnement chaleureux et stimulant pour le développement de la petite enfance.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'TW'].map(social => (
                <div key={social} className="w-10 h-10 border border-white flex items-center justify-center font-mono text-xs hover:bg-white hover:text-black transition-colors cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-gray-800 pt-12 mb-12">
          <div>
            <h5 className="font-mono uppercase text-xs text-gray-500 mb-6">Navigation</h5>
            <ul className="space-y-3 uppercase text-sm tracking-widest">
              <li><a href="#about" className="hover:text-gray-400">À propos</a></li>
              <li><a href="#services" className="hover:text-gray-400">Services</a></li>
              <li><a href="#gallery" className="hover:text-gray-400">Galerie</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono uppercase text-xs text-gray-500 mb-6">Programmes</h5>
            <ul className="space-y-3 uppercase text-sm tracking-widest">
              <li><a href="#" className="hover:text-gray-400">Crèche</a></li>
              <li><a href="#" className="hover:text-gray-400">Maternelle</a></li>
              <li><a href="#" className="hover:text-gray-400">Camp d'été</a></li>
              <li><a href="#" className="hover:text-gray-400">Arts & Artisanat</a></li>
            </ul>
          </div>
          <div className="col-span-2">
            <h5 className="font-mono uppercase text-xs text-gray-500 mb-6">Newsletter</h5>
            <div className="flex border-b border-white pb-2 max-w-md">
              <input 
                type="email" 
                placeholder="VOTRE@EMAIL.COM" 
                className="bg-transparent border-none outline-none flex-grow font-mono text-sm"
              />
              <button className="font-mono text-xs uppercase tracking-widest">S'abonner</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-600">
          <p>© 2024 Établissement Meryem. Tous droits réservés.</p>
          <p>Conçu avec les principes du Bauhaus</p>
          <div className="flex gap-8">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-white selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
