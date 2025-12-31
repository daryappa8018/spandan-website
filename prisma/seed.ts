// prisma/seed.ts
// Database seed script - creates initial admin user and sample data
// Run: npm run db:seed

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@spandan.edu';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const adminName = process.env.ADMIN_NAME || 'Admin User';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', {
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  // Create impact summary
  await prisma.impactSummary.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      yearsActive: 2,
      totalEvents: 28,
      peopleReached: '2,400+',
      volunteers: 45,
    },
  });

  console.log('✅ Impact summary initialized');

  // Create sample site settings
  const settings = [
    { key: 'site_email', value: 'spandan@college.edu', category: 'contact' },
    { key: 'site_phone', value: '+91 98765 43210', category: 'contact' },
    { key: 'site_location', value: 'College Campus, Karnal, Haryana', category: 'contact' },
    { key: 'instagram_handle', value: '@spandan_club', category: 'social' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/spandan', category: 'social' },
    { key: 'founded_year', value: '2023', category: 'general' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ Site settings initialized');

  // Create sample partners
  const partners = [
    'District Red Cross Society, Karnal',
    'Civil Hospital Blood Bank',
    'Government Primary Schools (8 schools)',
    'Village Panchayats (18 villages)',
    'District Health Department',
  ];

  for (let i = 0; i < partners.length; i++) {
    await prisma.partner.upsert({
      where: { id: `partner-${i + 1}` },
      update: { name: partners[i] },
      create: {
        id: `partner-${i + 1}`,
        name: partners[i],
        order: i + 1,
      },
    });
  }

  console.log('✅ Partners initialized');

  console.log('🎉 Database seed completed!');
  console.log('\n📝 Login credentials:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('\n⚠️  Please change the password after first login!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });