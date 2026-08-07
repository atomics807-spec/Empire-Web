import Link from 'next/link'
import { Briefcase, MapPin, Clock, Users, Heart, Send, CheckCircle, ArrowRight, Utensils, Music, Wine, ChefHat, Mic, UserCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

interface CareersPageProps {
  params: Promise<{ locale: string }>
}

// Mock job openings
const jobOpenings = [
  {
    id: '1',
    title: { en: 'Head Chef', fr: 'Chef Exécutif' },
    department: { en: 'Restaurant', fr: 'Restaurant' },
    type: { en: 'Full-time', fr: 'Temps Plein' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Competitive + Benefits', fr: 'Compétitif + Avantages' },
    description: {
      en: 'Lead our kitchen team and create exceptional dining experiences for our guests.',
      fr: 'Dirigez notre équipe de cuisine et créez des expériences culinaires exceptionnelles pour nos clients.'
    },
    requirements: [
      { en: '5+ years of culinary experience', fr: "5+ années d'expérience culinaire" },
      { en: 'Experience in African cuisine preferred', fr: "Expérience en cuisine africaine préférée" },
      { en: 'Strong leadership and management skills', fr: 'Solides compétences en leadership et gestion' },
      { en: 'HACCP certification', fr: 'Certification HACCP' },
    ],
    icon: ChefHat,
    color: 'restaurant',
  },
  {
    id: '2',
    title: { en: 'DJ / Music Curator', fr: 'DJ / Curateur Musical' },
    department: { en: 'Night Club', fr: 'Boîte de Nuit' },
    type: { en: 'Part-time / Contract', fr: 'Temps Partiel / Contrat' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Performance-based', fr: 'Basé sur Performance' },
    description: {
      en: 'Create unforgettable nights with your music selection and performance skills.',
      fr: 'Créez des nuits inoubliables avec votre sélection musicale et vos compétences de performance.'
    },
    requirements: [
      { en: 'Professional DJ experience', fr: "Expérience professionnelle de DJ" },
      { en: 'Knowledge of African and international music', fr: 'Connaissance de la musique africaine et internationale' },
      { en: 'Own equipment preferred', fr: 'Équipement personnel préféré' },
      { en: 'Available for weekend shifts', fr: 'Disponible pour les shifts de weekend' },
    ],
    icon: Mic,
    color: 'club',
  },
  {
    id: '3',
    title: { en: 'Restaurant Manager', fr: 'Gérant de Restaurant' },
    department: { en: 'Restaurant', fr: 'Restaurant' },
    type: { en: 'Full-time', fr: 'Temps Plein' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Competitive + Benefits', fr: 'Compétitif + Avantages' },
    description: {
      en: 'Ensure excellent service and manage daily restaurant operations.',
      fr: "Assurez un excellent service et gérez les opérations quotidiennes du restaurant."
    },
    requirements: [
      { en: '3+ years of restaurant management', fr: "3+ années de gestion de restaurant" },
      { en: 'Excellent customer service skills', fr: 'Excellentes compétences en service client' },
      { en: 'Knowledge of inventory management', fr: 'Connaissance de la gestion des stocks' },
      { en: 'Bilingual (English/French)', fr: 'Bilingue (Anglais/Français)' },
    ],
    icon: Utensils,
    color: 'restaurant',
  },
  {
    id: '4',
    title: { en: 'Bartender', fr: 'Barman' },
    department: { en: 'Night Club', fr: 'Boîte de Nuit' },
    type: { en: 'Part-time', fr: 'Temps Partiel' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Hourly + Tips', fr: 'Horaire + Pourboires' },
    description: {
      en: 'Craft amazing cocktails and provide excellent service to our club guests.',
      fr: 'Créez de délicieux cocktails et offrez un excellent service à nos clients de boîte de nuit.'
    },
    requirements: [
      { en: '1+ years of bartending experience', fr: "1+ années d'expérience en bar" },
      { en: 'Mixology knowledge', fr: 'Connaissance de la mixologie' },
      { en: 'Available for evening and weekend shifts', fr: 'Disponible pour les shifts de soir et weekend' },
      { en: 'Age 18+', fr: 'Âge 18+' },
    ],
    icon: Wine,
    color: 'club',
  },
  {
    id: '5',
    title: { en: 'Waiter / Waitress', fr: 'Serveur / Serveuse' },
    department: { en: 'Restaurant', fr: 'Restaurant' },
    type: { en: 'Full-time / Part-time', fr: 'Temps Plein / Temps Partiel' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Hourly + Tips', fr: 'Horaire + Pourboires' },
    description: {
      en: 'Provide exceptional dining service to our restaurant guests.',
      fr: 'Offrez un service de restauration exceptionnel à nos clients du restaurant.'
    },
    requirements: [
      { en: 'Previous serving experience', fr: "Expérience de service précédente" },
      { en: 'Excellent communication skills', fr: "Excellentes compétences en communication" },
      { en: 'Professional appearance', fr: "Apparence professionnelle" },
      { en: 'Team player', fr: "Travail d'équipe" },
    ],
    icon: UserCheck,
    color: 'restaurant',
  },
  {
    id: '6',
    title: { en: 'Security Guard', fr: 'Agent de Sécurité' },
    department: { en: 'Night Club', fr: 'Boîte de Nuit' },
    type: { en: 'Full-time', fr: 'Temps Plein' },
    location: 'Limbe, Cameroon',
    salary: { en: 'Competitive', fr: 'Compétitif' },
    description: {
      en: 'Ensure the safety and security of our guests and staff.',
      fr: "Assurez la sécurité de nos clients et de notre personnel."
    },
    requirements: [
      { en: 'Previous security experience', fr: "Expérience de sécurité précédente" },
      { en: 'Physical fitness', fr: 'Forme physique' },
      { en: 'Calm under pressure', fr: 'Calme sous pression' },
      { en: 'Age 21+', fr: 'Âge 21+' },
    ],
    icon: UserCheck,
    color: 'club',
  },
]

const benefits = [
  {
    icon: Heart,
    title: { en: 'Health Benefits', fr: 'Avantages Santé' },
    description: {
      en: 'Comprehensive health insurance coverage for you and your family.',
      fr: 'Couverture d\'assurance maladie complète pour vous et votre famille.'
    },
  },
  {
    icon: Users,
    title: { en: 'Team Environment', fr: 'Environnement d\'Équipe' },
    description: {
      en: 'Work with a passionate and supportive team.',
      fr: 'Travaillez avec une équipe passionnée et supportive.'
    },
  },
  {
    icon: Clock,
    title: { en: 'Flexible Hours', fr: 'Horaires Flexibles' },
    description: {
      en: 'Various shift options to fit your schedule.',
      fr: 'Plusieurs options de shifts pour s\'adapter à votre emploi du temps.'
    },
  },
  {
    icon: ArrowRight,
    title: { en: 'Career Growth', fr: 'Croissance Professionnelle' },
    description: {
      en: ' opportunities for advancement within the company.',
      fr: 'Opportunités d\'avancement au sein de l\'entreprise.'
    },
  },
]

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params
  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-vip-gold/10" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <Badge variant="club" className="mb-4 bg-primary/20 border-primary/50 text-white">
              <Briefcase className="h-4 w-4 mr-2" />
              {isFrench ? 'Rejoignez Notre Équipe' : 'Join Our Team'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isFrench ? 'Carrières chez Empire' : 'Careers at Empire'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {isFrench
                ? 'Vous cherchez à faire partie d\'une équipe dynamique dans l\'un des lieux les plus excitants de Limbe? Rejoignez Empire Hybrid Lounge!'
                : 'Looking to be part of a dynamic team in one of the most exciting venues in Limbe? Join Empire Hybrid Lounge!'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#openings">
                <Button className="bg-primary hover:bg-primary/90">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {isFrench ? 'Voir les Postes' : 'View Openings'}
                </Button>
              </a>
              <a href="#apply">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Send className="h-4 w-4 mr-2" />
                  {isFrench ? 'Postuler Maintenant' : 'Apply Now'}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isFrench ? 'Pourquoi Rejoindre Empire?' : 'Why Join Empire?'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isFrench
                  ? 'Nous offrons bien plus qu\'un simple emploi. Découvrez ce qui rend travailler chez Empire spécial.'
                  : "We offer more than just a job. Discover what makes working at Empire special."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="bg-surface border-border">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {isFrench ? benefit.title.fr : benefit.title.en}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {isFrench ? benefit.description.fr : benefit.description.en}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section id="openings" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {isFrench ? 'Postes Ouverts' : 'Open Positions'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isFrench
                  ? 'Découvrez nos opportunités actuelles et trouvez votre place chez Empire.'
                  : 'Discover our current opportunities and find your place at Empire.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {jobOpenings.map((job) => {
                const Icon = job.icon
                const isRestaurant = job.color === 'restaurant'
                return (
                  <Card key={job.id} className="bg-surface border-border overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isRestaurant ? 'bg-restaurant-accent/20' : 'bg-primary/20'
                        }`}>
                          <Icon className={`h-7 w-7 ${isRestaurant ? 'text-restaurant-accent' : 'text-primary'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {isFrench ? job.title.fr : job.title.en}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={isRestaurant ? 'restaurant' : 'club'} className={isRestaurant ? 'bg-restaurant-accent/20 border-restaurant-accent/50 text-restaurant-accent' : ''}>
                              {isFrench ? job.department.fr : job.department.en}
                            </Badge>
                            <Badge variant="outline" className="border-border text-muted-foreground">
                              {isFrench ? job.type.fr : job.type.en}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {isFrench ? job.description.fr : job.description.en}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{isFrench ? 'Salaire: ' : 'Salary: '}{isFrench ? job.salary.fr : job.salary.en}</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          {isFrench ? 'Exigences:' : 'Requirements:'}
                        </h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isRestaurant ? 'text-restaurant-accent' : 'text-primary'}`} />
                              <span>{isFrench ? req.fr : req.en}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <a href="#apply">
                          <Button className={`w-full ${isRestaurant ? 'bg-restaurant-accent hover:bg-restaurant-accent-light text-restaurant-accent-foreground' : 'bg-primary hover:bg-primary/90'}`}>
                            {isFrench ? 'Postuler pour ce Poste' : 'Apply for This Position'}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-16 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {isFrench ? 'Postuler Maintenant' : 'Apply Now'}
                </h2>
                <p className="text-muted-foreground">
                  {isFrench
                    ? 'Remplissez le formulaire ci-dessous et nous vous contacterons bientôt.'
                    : 'Fill out the form below and we will contact you soon.'}
                </p>
              </div>

              <Card className="bg-surface border-border">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {isFrench ? 'Informations Personnelles' : 'Personal Information'}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {isFrench ? 'Prénom' : 'First Name'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder={isFrench ? 'Votre prénom' : 'Your first name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {isFrench ? 'Nom' : 'Last Name'} *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder={isFrench ? 'Votre nom' : 'Your last name'}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {isFrench ? 'Téléphone' : 'Phone'} *
                          </label>
                          <input
                            type="tel"
                            required
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="+237 6 XX XX XX XX"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Position */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {isFrench ? 'Poste Souhaité' : 'Desired Position'}
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {isFrench ? 'Poste' : 'Position'} *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">{isFrench ? 'Sélectionnez un poste' : 'Select a position'}</option>
                          {jobOpenings.map((job) => (
                            <option key={job.id} value={job.id}>
                              {isFrench ? job.title.fr : job.title.en}
                            </option>
                          ))}
                          <option value="other">{isFrench ? 'Autre' : 'Other'}</option>
                        </select>
                      </div>

                      {locale === 'fr' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Si Autre, précisez
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Poste souhaité"
                          />
                        </div>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {isFrench ? 'Expérience' : 'Experience'}
                      </h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {isFrench ? 'Années d\'expérience' : 'Years of Experience'} *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">{isFrench ? 'Sélectionnez' : 'Select'}</option>
                          <option value="0-1">{isFrench ? 'Moins d\'1 an' : 'Less than 1 year'}</option>
                          <option value="1-3">1-3 {isFrench ? 'ans' : 'years'}</option>
                          <option value="3-5">3-5 {isFrench ? 'ans' : 'years'}</option>
                          <option value="5+">5+ {isFrench ? 'ans' : 'years'}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {isFrench ? 'Lettre de Motivation' : 'Cover Letter'}
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder={isFrench 
                            ? "Parlez-nous de vous et pourquoi vous souhaitez rejoindre Empire..."
                            : "Tell us about yourself and why you want to join Empire..."}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          {isFrench ? 'CV (lien ou fichier)' : 'Resume (link or file)'}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={isFrench ? 'Collez le lien Google Drive...' : 'Paste Google Drive link...'}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      {isFrench ? 'Soumettre la Candidature' : 'Submit Application'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary/20 via-surface to-secondary/20 border-border overflow-hidden">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {isFrench ? 'Des Questions?' : 'Have Questions?'}
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                  {isFrench
                    ? 'N\'hésitez pas à nous contacter pour toute question concernant les opportunités d\'emploi chez Empire Hybrid Lounge.'
                    : "Don't hesitate to contact us for any questions regarding employment opportunities at Empire Hybrid Lounge."}
                </p>
                <Link href={`/${locale}/contact`}>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4 mr-2" />
                    {isFrench ? 'Contactez-Nous' : 'Contact Us'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
