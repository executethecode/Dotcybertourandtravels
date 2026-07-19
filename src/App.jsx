import { useState } from "react";
import { HashRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";

const navItems = [
  { to: "/", label: "HOME" },
  { to: "/about-us", label: "ABOUT US" },
  { to: "/services", label: "SERVICES" },
  { to: "/visa-services", label: "VISA SERVICES" },
  { to: "/hajj-umrah", label: "HAJJ & UMRAH" },
  { to: "/gallery", label: "GALLERY" },
];

const destinations = [
  { place: "DUBAI", price: "₹15,999" },
  { place: "SAUDI ARABIA", price: "₹18,999" },
  { place: "QATAR", price: "₹16,999" },
  { place: "OMAN", price: "₹17,999" },
  { place: "BAHRAIN", price: "₹16,499" },
  { place: "MALAYSIA", price: "₹19,999" },
];

const packages = [
  { label: "ECONOMY PACKAGE", price: "₹68,999" },
  { label: "DELUXE PACKAGE", price: "₹84,999" },
  { label: "VIP PACKAGE", price: "₹1,24,999" },
];

const services = [
  "Aadhaar Services",
  "PAN Card",
  "Passport",
  "Ayushman Card",
  "Ration Card",
  "Driving License",
  "Voter ID",
  "Pension KYC",
  "Scholarship Forms",
  "Print & Scan",
];

const offers = [
  {
    title: "Summer Fare Drop",
    detail: "Flat 12% off on selected international fares.",
  },
  {
    title: "Umrah Family Pack",
    detail: "Special pricing for families and group bookings.",
  },
  {
    title: "Visa Fast Track",
    detail: "Priority visa processing with dedicated support.",
  },
];

const galleryItems = [
  {
    title: "Dubai Skyline",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Makkah Journey",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Bahrain Escape",
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Oman Adventure",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
  },
];

const blogPosts = [
  {
    title: "How to prepare for your first international trip",
    excerpt: "A practical checklist for smooth travel planning.",
  },
  {
    title: "Visa tips for hassle-free approvals",
    excerpt: "Avoid common mistakes and keep your documents ready.",
  },
  {
    title: "Why travelers prefer agent-assisted bookings",
    excerpt: "Discover the value of expert guidance and support.",
  },
];

const businessPhone = "917250323786";

const openWhatsApp = (message = "") => {
  const whatsappAppUrl = `whatsapp://send?phone=${businessPhone}${message ? `&text=${encodeURIComponent(message)}` : ""}`;
  const whatsappWebUrl = `https://wa.me/${businessPhone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  window.location.href = whatsappAppUrl;

  window.setTimeout(() => {
    window.open(whatsappWebUrl, "_blank", "noopener,noreferrer");
  }, 1200);
};

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

function AppContent() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (!formData.number.trim()) {
      nextErrors.number = "Phone number is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const messageBody = [
      "Inquiry Request",
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone Number: ${formData.number.trim()}`,
      formData.message.trim() ? `Message: ${formData.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    openWhatsApp(messageBody);

    setFormData({ name: "", email: "", number: "", message: "" });
    setErrors({});
    setIsInquiryOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent font-body text-slate-900">
      <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8">
        <nav className="sticky top-4 z-30 rounded-[2rem] border border-amber-100 bg-white/90 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-3">
              <NavLink
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-200 text-lg text-slate-950">
                  ✈️
                </div>
                <div>
                  <p className="text-base font-semibold tracking-[0.05em]">
                    DOT CYBER &amp; TRAVELS
                  </p>
                  <p className="text-xs text-slate-500">
                    Travel • Visa • Digital Services
                  </p>
                </div>
              </NavLink>

              <button
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                type="button"
                aria-label="Toggle navigation"
              >
                ☰
              </button>
            </div>

            <div
              className={`flex flex-col gap-2 rounded-[1.25rem] border border-slate-200 bg-white/90 p-3 shadow-sm lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-3 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${isMenuOpen ? "flex" : "hidden lg:flex"}`}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-center text-sm font-semibold transition ${isActive ? "bg-amber-100 text-amber-700" : "text-slate-700 hover:bg-slate-100 hover:text-amber-600"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <button
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 lg:hidden"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsInquiryOpen(true);
                }}
                type="button"
              >
                INQUIRY NOW
              </button>
            </div>

            <button
              className="hidden rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 lg:inline-flex"
              onClick={() => setIsInquiryOpen(true)}
              type="button"
            >
              INQUIRY NOW
            </button>
          </div>
        </nav>

        {isInquiryOpen && (
          <section className="mt-6 rounded-[2rem] border border-amber-100 bg-white/95 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-600">
                  Inquiry Form
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Share your details and we will contact you soon
                </h3>
              </div>
              <button
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                onClick={() => setIsInquiryOpen(false)}
                type="button"
              >
                CLOSE
              </button>
            </div>

            <form
              className="mt-6 grid gap-4 lg:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name <span className="text-amber-600">*</span>
                </label>
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="name"
                  onChange={handleChange}
                  placeholder="Your Name"
                  type="text"
                  value={formData.name}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-rose-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email <span className="text-amber-600">*</span>
                </label>
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="email"
                  onChange={handleChange}
                  placeholder="Your Email"
                  type="email"
                  value={formData.email}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-rose-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number <span className="text-amber-600">*</span>
                </label>
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="number"
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  type="tel"
                  value={formData.number}
                />
                {errors.number && (
                  <p className="mt-2 text-sm text-rose-500">{errors.number}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="message"
                  onChange={handleChange}
                  placeholder="Tell us about your trip or service"
                  rows="4"
                  value={formData.message}
                />
              </div>

              <div className="lg:col-span-2">
                <button
                  className="w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5"
                  type="submit"
                >
                  SUBMIT INQUIRY
                </button>
              </div>
            </form>
          </section>
        )}

        <main className="pt-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/visa-services" element={<VisaPage />} />
            <Route path="/hajj-umrah" element={<HajjPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="mt-16 space-y-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-slate-600 shadow-sm backdrop-blur">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr_0.95fr_1.1fr] xl:items-start">
            <div className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-slate-900">
                ABOUT DOT CYBER & TRAVELS
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                DOT CYBER & TRAVELS is your trusted partner for travel, visa and
                digital services. We provide best solutions with 100% customer
                satisfaction.
              </p>
            </div>
            <div className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-slate-900">
                QUICK LINKS
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Home · About Us · Services · Visa Services · Hajj & Umrah ·
                Gallery · Blog · Contact
              </p>
            </div>
            <div className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-slate-900">
                CONTACT INFO
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Sher Bazar, Near Coal Depot, Gopalganj, Bihar - 841407
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                +91 7250323786
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                dotcybertravels@gmail.com
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                6:00 AM to 9:00 PM (All Days)
              </p>
            </div>
            <div className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                SEND US A MESSAGE
              </h3>
              <form
                className="mt-4 flex flex-1 flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="name"
                  onChange={handleChange}
                  placeholder="Your Name"
                  type="text"
                  value={formData.name}
                />
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="email"
                  onChange={handleChange}
                  placeholder="Your Email"
                  type="email"
                  value={formData.email}
                />
                <input
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="number"
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  type="tel"
                  value={formData.number}
                />
                <textarea
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                  name="message"
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                />
                {errors.name || errors.email || errors.number ? (
                  <p className="text-sm text-rose-500">
                    Please fill in your name, email, and phone number.
                  </p>
                ) : null}
                <button
                  className="mt-auto rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                  type="submit"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Privacy Policy · Terms & Conditions</span>
            <span>Designed with ❤️ by DOT CYBER</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div className="space-y-8">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-600">
            Explore The World With
          </p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-slate-900">
            DOT CYBER <span className="text-amber-600">&amp;</span> TRAVELS
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Your trusted partner for travel, visa & digital services. We make
            every journey seamless, premium, and stress-free.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
              ✈️ 50+ Destinations
            </span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              🌍 Visa & Travel Support
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              onClick={() =>
                window.open("https://www.akbartravels.com/in/flight", "_blank")
              }
            >
              BOOK FLIGHT
            </button>
            <button
              className="rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              onClick={() =>
                window.open("https://indianvisaonline.gov.in/", "_blank")
              }
            >
              APPLY VISA
            </button>
            <button
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              onClick={() => openWhatsApp()}
            >
              WHATSAPP NOW
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Best Price", subtitle: "Lowest Fare Guarantee" },
              { title: "Fast Service", subtitle: "Quick & Easy Process" },
              { title: "100% Support", subtitle: "24x7 Customer Support" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white to-amber-50 p-6 shadow-sm"
              >
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-cover bg-center shadow-glow"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
          <div className="absolute left-6 top-6 rounded-2xl bg-white/95 px-4 py-3 shadow-xl">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-600">
              Trusted by
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              10k+ travelers
            </p>
          </div>
          <div className="absolute right-6 bottom-6 rounded-2xl border border-white/20 bg-slate-950/70 px-5 py-4 backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-300">
              Premium support
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Visa • Flights • Umrah
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Explore top international destinations with best offers"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.place}
              className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.06)]"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-amber-600">
                {destination.place}
              </p>
              <p className="mt-4 text-2xl font-semibold text-slate-900">
                Starting From {destination.price}
              </p>
              <button className="mt-8 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                BOOK NOW
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Hajj & Umrah Packages"
          title="Spiritual journey made comfortable"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pack) => (
            <article
              key={pack.label}
              className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-amber-50 p-8 shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-slate-600">
                {pack.label}
              </p>
              <p className="mt-5 text-3xl font-semibold text-slate-900">
                {pack.price}
              </p>
              <button className="mt-8 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                VIEW DETAILS
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Our Digital & Cyber Services"
          title="All online services under one roof"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-800"
            >
              {service}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="About Us"
        title="Trusted travel and visa specialists serving every journey with care"
        description="We combine local expertise with a global network to make travel planning effortless for families, students, professionals, and pilgrims."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Our Mission",
            detail:
              "To offer transparent, reliable, and premium travel support from booking to arrival.",
          },
          {
            title: "Our Vision",
            detail:
              "To become the most trusted travel and digital service partner in the region.",
          },
          {
            title: "Why Clients Trust Us",
            detail:
              "Dedicated support, competitive pricing, and a deep understanding of travel requirements.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm"
          >
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Services"
        title="End-to-end travel and digital support for every need"
        description="We help you plan, process, and travel with confidence from flight reservations to document support."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: "Flight Booking",
            detail: "Airfare assistance for domestic and international routes.",
          },
          {
            title: "Visa Assistance",
            detail:
              "Document guidance, application support, and real-time updates.",
          },
          {
            title: "Umrah & Hajj packages",
            detail: "Comfortable and well-managed pilgrimage travel plans.",
          },
          {
            title: "Digital Services",
            detail: "Aadhaar, PAN, passport, and public service support.",
          },
          {
            title: "Hotel & Transport",
            detail: "Trusted stay and transfer arrangements for every trip.",
          },
          {
            title: "Customer Support",
            detail: "Round-the-clock assistance before and during travel.",
          },
        ].map((service) => (
          <div
            key={service.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {service.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisaPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Visa Services"
        title="Fast, reliable visa guidance for every destination"
        description="From tourist and business visas to student and family travel documentation, we keep the process simple and organized."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Tourist Visa",
            detail: "Ideal for leisure travel and family visits.",
          },
          {
            title: "Business Visa",
            detail: "Professional travel support for meetings and conferences.",
          },
          {
            title: "Student Visa",
            detail: "Guidance for academic and training programs abroad.",
          },
          {
            title: "Medical Visa",
            detail: "Support for treatment and medical travel arrangements.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-sky-50 p-8 shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HajjPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Hajj & Umrah"
        title="Pilgrimage travel made comfortable, safe, and memorable"
        description="We arrange packages that focus on comfort, guidance, and dependable support throughout the journey."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pack) => (
          <article
            key={pack.label}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-amber-50 p-8 shadow-sm"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-slate-600">
              {pack.label}
            </p>
            <p className="mt-5 text-3xl font-semibold text-slate-900">
              {pack.price}
            </p>
            <button className="mt-8 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              CHOOSE PACKAGE
            </button>
          </article>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { value: "10,000+", label: "Happy Customers" },
          { value: "5,000+", label: "Flight Bookings" },
          { value: "3,000+", label: "Visa Processed" },
          { value: "24/7", label: "Support Available" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-center"
          >
            <p className="font-display text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OffersPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Offers"
        title="Special deals that make travel planning even better"
        description="Grab the latest seasonal offers and customized travel packages built for value and comfort."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.title}
            className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-amber-50 p-8 shadow-sm"
          >
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              {offer.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {offer.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Gallery"
        title="A glimpse of the journeys we help create"
        description="From iconic skylines to sacred destinations, every trip is carefully curated with care."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {galleryItems.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Blog"
        title="Travel insights, visa tips, and planning guidance"
        description="Stay informed with practical advice that helps you prepare for your next trip."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.title}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              {post.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
