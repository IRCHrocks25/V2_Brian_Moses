import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user (change password in production!)
  const adminEmail = process.env.ADMIN_EMAIL || "admin@brianmoses.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash: hash, role: "admin", name: "Admin" },
    update: {},
  });
  console.log("Admin user:", admin.email);

  // Create regular user (optional)
  const userEmail = process.env.USER_EMAIL || "user@brianmoses.com";
  const userPassword = process.env.USER_PASSWORD || "user123";
  const userHash = await bcrypt.hash(userPassword, 12);

  await prisma.user.upsert({
    where: { email: userEmail },
    create: { email: userEmail, passwordHash: userHash, role: "user", name: "User" },
    update: {},
  });
  console.log("User:", userEmail);

  // Seed default content (from current site)
  const defaults: { key: string; value: string; page: string; section: string }[] = [
    { key: "bg.hero.home", value: "/images/Frame 8.png", page: "home", section: "Backgrounds" },
    { key: "bg.hero.keynote", value: "/hero_section1.png", page: "keynote", section: "Backgrounds" },
    { key: "bg.achievements", value: "", page: "home", section: "Backgrounds" },
    { key: "bg.video.thumbnail", value: "/hero_section1.png", page: "keynote", section: "Backgrounds" },
    { key: "hero.headline", value: "Attract, Don't Chase.", page: "home", section: "Hero" },
    { key: "hero.subheadline", value: "More of What Your Doing Won't Fix Your Business - Systems Will.", page: "home", section: "Hero" },
    { key: "hero.paragraph1", value: "A Proven System that helps you close more deals - without chasing leads, spending tons of money for leads, or burning out.", page: "home", section: "Hero" },
    { key: "hero.paragraph2", value: "Brian Moses opens his entire playbook - built from selling over 3,500 homes - and walks you step-by-step through exactly what to do.", page: "home", section: "Hero" },
    { key: "hero.paragraph3", value: "Follow the system, and the results take care of themselves.", page: "home", section: "Hero" },
    { key: "hero.tagline", value: "For Agents who want consistency and predictability in their business --- Clear. Practical. No hype.", page: "home", section: "Hero" },
    { key: "hero.ctaText", value: "See the System", page: "home", section: "Hero" },
    { key: "hero.ctaUrl", value: "https://inner-circle.brianmoses.com/how-to-get-3-new-listings-fast-page", page: "home", section: "Hero" },
    { key: "achievements.heading", value: "Here's Why Agents Trust Brian's System", page: "home", section: "Achievements" },
    { key: "achievements.subheading", value: "Brian Has Inspired More Than 50,000 Real Estate Agents & Industry Professionals Across North America Including All Major Brands", page: "home", section: "Achievements" },
    { key: "achievements.item1", value: "Named one of the 125 Most Influential People in Real Estate (Success Magazine)", page: "home", section: "Achievements" },
    { key: "achievements.item2", value: "Ranked #2 Worldwide in a major real estate franchise, 7 years in the Top 10", page: "home", section: "Achievements" },
    { key: "achievements.item3", value: "Brian Moses coaches and trains North America's most successful agents. These agents average over $1 Million Dollars in Annual Income and you can too.", page: "home", section: "Achievements" },
    { key: "meta.title", value: "Brian Moses | #2 Worldwide Real Estate Coach & Keynote Speaker | Attract, Don't Chase", page: "all", section: "Meta" },
    { key: "meta.description", value: "Discover the proven Attract, Don't Chase system from Brian Moses — a #2 worldwide ranked real estate agent, top real estate coach, and in‑demand keynote speaker.", page: "all", section: "Meta" },
  ];

  for (const d of defaults) {
    await prisma.contentItem.upsert({
      where: { key: d.key },
      create: d,
      update: {},
    });
  }
  console.log("Seeded", defaults.length, "content items");

  // Seed testimonials if none exist
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    const { DEFAULT_TESTIMONIALS } = await import("../lib/default-testimonials");
    await prisma.testimonial.createMany({
      data: DEFAULT_TESTIMONIALS,
    });
    console.log("Seeded testimonials");
  }

  // Seed sample CTAs if none exist
  const count = await prisma.cTA.count();
  if (count === 0) {
    await prisma.cTA.createMany({
      data: [
        { text: "See the System", url: "https://inner-circle.brianmoses.com/how-to-get-3-new-listings-fast-page", style: "primary", placement: "hero", page: "home", order: 0, isActive: true },
        { text: "Login", url: "https://hub.freedombuildersinnercircle.com/login", style: "outline", placement: "navbar", page: "all", order: 0, isActive: true },
      ],
    });
    console.log("Seeded CTAs");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
