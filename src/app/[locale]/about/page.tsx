import Link from 'next/link'
import { MapPin, Clock, Users, Award, Heart, Sparkles, Star, Utensils, Music } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const isFrench = locale === 'fr'

  const stats = [
    { value: '2018', label: isFrench ? 'Fondé' : 'Founded' },
    { value: '50+', label: isFrench ? 'Employés' : 'Employees' },
    { value: '10K+', label: isFrench ? 'Clients Satisfaits' : 'Happy Customers' },
    { value: '500+', label: isFrench ? 'Événements' : 'Events Hosted' },
  ]

  const values = [
    {
      icon: Heart,
      title: isFrench ? 'Passion' : 'Passion',
      description: isFrench
        ? 'Nous mettons tout notre cœur dans chaque plat servi et chaque événement organisé.'
        : 'We put our whole heart into every dish served and every event organized.',
    },
    {
      icon: Star,
      title: isFrench ? 'Excellence' : 'Excellence',
      description: isFrench
        ? 'Nous recherchons constamment l\'excellence dans tous les aspects de notre service.'
        : 'We constantly strive for excellence in all aspects of our service.',
    },
    {
      icon: Users,
      title: isFrench ? 'Communauté' : 'Community',
      description: isFrench
        ? 'Empire Hybrid Lounge est plus qu\'un lieu : c\'est une communauté qui célèbre la vie.'
        : 'Empire Hybrid Lounge is more than a venue: it\'s a community celebrating life.',
    },
    {
      icon: Sparkles,
      title: isFrench ? 'Innovation' : 'Innovation',
      description: isFrench
        ? 'Nous combinons tradition et modernité pour créer des expériences uniques.'
        : 'We blend tradition and modernity to create unique experiences.',
    },
  ]

  const team = [
    {
      name: 'Dr. Emmanuel Tebep',
      role: isFrench ? 'Propriétaire & Directeur Général' : 'Owner & Managing Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Chef Marie Nguema',
      role: isFrench ? 'Chef Exécutif' : 'Executive Chef',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
    },
    {
      name: 'Jean Claude Fozeu',
      role: isFrench ? 'Directeur de la Nuit' : 'Night Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-3xl">
              <Badge variant="vip" className="mb-6 bg-vip-gold/20 border-vip-gold/50 text-vip-gold">
                <Heart className="h-4 w-4 mr-2" />
                {isFrench ? 'Notre Histoire' : 'Our Story'}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {isFrench ? 'Bienvenue à Empire Hybrid Lounge' : 'Welcome to Empire Hybrid Lounge'}
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {isFrench
                  ? 'Où la gastronomie rencontre la vie nocturne. Depuis 2018, nous offrons une expérience unique à Limbe, au Cameroun.'
                  : 'Where fine dining meets nightlife. Since 2018, we\'ve been offering a unique experience in Limbe, Cameroon.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/restaurant`}>
                  <Button className="bg-restaurant-accent hover:bg-restaurant-accent-light text-restaurant-accent-foreground">
                    <Utensils className="h-4 w-4 mr-2" />
                    {isFrench ? 'Découvrir le Restaurant' : 'Explore Restaurant'}
                  </Button>
                </Link>
                <Link href={`/${locale}/events`}>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Music className="h-4 w-4 mr-2" />
                    {isFrench ? 'Voir les Événements' : 'View Events'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-surface border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isFrench ? 'Notre Histoire' : 'Our Story'}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {isFrench
                      ? 'Empire Hybrid Lounge est né d\'une vision simple mais ambitieuse : créer un espace qui répond à tous les besoins de divertissement de Limbe sous un même toit.'
                      : 'Empire Hybrid Lounge was born from a simple yet ambitious vision: to create a space that fulfills all entertainment needs in Limbe under one roof.'}
                  </p>
                  <p>
                    {isFrench
                      ? 'Pendant la journée, notre restaurant offre une expérience gastronomique exceptionnelle avec des plats locaux et internationaux préparés par notre équipe de chefs talentueux. Le soir, nous nous transformons en boîte de nuit animée avec les meilleurs DJs et des événements exclusifs.'
                      : 'During the day, our restaurant offers an exceptional culinary experience with local and international dishes prepared by our talented team of chefs. In the evening, we transform into an exciting nightclub with the best DJs and exclusive events.'}
                  </p>
                  <p>
                    {isFrench
                      ? 'Situé face au Terrain Communautaire de Limbe, notre établissement est devenu un lieu de prédilection pour les amateurs de bonne cuisine et de vie nocturne de qualité.'
                      : 'Located opposite the Limbe Community Field, our establishment has become a destination of choice for food lovers and quality nightlife enthusiasts.'}
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                  alt={isFrench ? 'Notre restaurant' : 'Our restaurant'}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-xl -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isFrench ? 'Nos Valeurs' : 'Our Values'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isFrench
                  ? 'Ces principes guident chaque décision que nous prenons et chaque expérience que nous créons.'
                  : 'These principles guide every decision we make and every experience we create.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="bg-surface border-border">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Two Experiences Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isFrench ? 'Deux Expériences, Un Seul Endroit' : 'Two Experiences, One Destination'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isFrench
                  ? 'Empire Hybrid Lounge vous propose le meilleur des deux mondes.'
                  : 'Empire Hybrid Lounge offers you the best of both worlds.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Restaurant Card */}
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80"
                    alt="Restaurant"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="restaurant" className="bg-restaurant-accent/20 border-restaurant-accent/50 text-restaurant-accent">
                      <Utensils className="h-4 w-4 mr-2" />
                      08:00 - 17:30
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {isFrench ? 'Restaurant Empire' : 'Empire Restaurant'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isFrench
                      ? 'Savourez des plats délicieux préparés avec des ingrédients frais et locaux dans une ambiance chaleureuse et accueillante.'
                      : 'Enjoy delicious dishes prepared with fresh, local ingredients in a warm and welcoming ambiance.'}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-restaurant-accent" />
                      {isFrench ? 'Cuisine locale et internationale' : 'Local and international cuisine'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-restaurant-accent" />
                      {isFrench ? 'Options dine-in et takeaway' : 'Dine-in and takeaway options'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-restaurant-accent" />
                      {isFrench ? 'Service de cuisine professionnel' : 'Professional kitchen service'}
                    </li>
                  </ul>
                  <Link href={`/${locale}/restaurant`}>
                    <Button variant="outline" className="w-full border-restaurant-accent text-restaurant-accent hover:bg-restaurant-accent/10">
                      {isFrench ? 'Voir le Menu' : 'View Menu'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Club Card */}
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80"
                    alt="Night Club"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="club" className="bg-primary/20 border-primary/50 text-white">
                      <Music className="h-4 w-4 mr-2" />
                      20:00 - 06:00
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {isFrench ? 'Empire Night Club' : 'Empire Night Club'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isFrench
                      ? 'Vivez des soirées inoubliables avec les meilleurs DJs, des événements exclusifs et une ambiance électrique.'
                      : 'Experience unforgettable nights with the best DJs, exclusive events, and an electric atmosphere.'}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {isFrench ? 'Événements weekly et specials' : 'Weekly and special events'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {isFrench ? 'Zones VIP et VVIP' : 'VIP and VVIP areas'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {isFrench ? 'Réservation de tables disponible' : 'Table reservations available'}
                    </li>
                  </ul>
                  <Link href={`/${locale}/events`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {isFrench ? 'Voir les Événements' : 'View Events'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isFrench ? 'Notre Équipe' : 'Our Team'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isFrench
                  ? 'Découvrez les personnes qui font d\'Empire Hybrid Lounge une expérience unique.'
                  : 'Meet the people who make Empire Hybrid Lounge a unique experience.'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="bg-surface border-border overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-4 text-center -mt-12 relative">
                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {isFrench ? 'Nous Trouver' : 'Find Us'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {isFrench ? 'Adresse' : 'Address'}
                      </h3>
                      <p className="text-muted-foreground">
                        {isFrench
                          ? 'Route Sappa, Face au Terrain Communautaire de Limbe, Limbé, Cameroun'
                          : 'Sappa Road, Opposite Limbe Community Field, Limbe, Cameroon'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-restaurant-accent/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-restaurant-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {isFrench ? 'Horaires' : 'Hours'}
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-restaurant-accent" />
                          {isFrench ? 'Restaurant' : 'Restaurant'}: 08:00 - 17:30
                        </p>
                        <p className="flex items-center gap-2">
                          <Music className="h-4 w-4 text-primary" />
                          {isFrench ? 'Night Club' : 'Night Club'}: 20:00 - 06:00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href={`/${locale}/contact`}>
                    <Button className="bg-primary hover:bg-primary/90">
                      {isFrench ? 'Nous Contacter' : 'Contact Us'}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.195%2C4.015%2C9.215%2C4.035&layer=mapnik&marker=4.0250%2C9.2050"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Empire Hybrid Lounge Location"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
