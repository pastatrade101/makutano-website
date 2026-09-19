import type {
	Capability,
	CredibilityItem,
	LeadershipMember,
	NavItem,
	Partner,
	Service,
	SiteSettings,
	ValueItem
} from './types.js';

/**
 * Every published string on makutano.co.tz, in page order.
 *
 * The API serves this from Supabase once seeded; the frontend also imports it
 * directly so pages still render if the API is unreachable.
 */

export const site: SiteSettings = {
	name: 'Makutano Digital',
	legalName: 'Makutano Digital Company Limited',
	tagline: {
		en: 'One partner. Seven digital capabilities.',
		sw: 'Mshirika mmoja. Huduma saba za kidijitali.'
	},
	description: {
		en: 'Makutano Digital Company Limited — a licensed Tanzanian ICT provider delivering digital advertising, web solutions, software development and digital consultancy from Dodoma.',
		sw: 'Makutano Digital Company Limited — mtoa huduma za TEHAMA aliyesajiliwa Tanzania, akitoa matangazo ya kidijitali, suluhisho za tovuti, utengenezaji wa programu na ushauri wa kidijitali kutoka Dodoma.'
	},
	address: { en: 'Makole, Dodoma, Tanzania', sw: 'Makole, Dodoma, Tanzania' },
	phone: '+255 745 997 711',
	email: 'info@makutano.co.tz',
	website: 'www.makutano.co.tz',
	mapUrl: 'https://www.google.com/maps?q=Makole,+Dodoma,+Tanzania&output=embed',
	mission: {
		en: 'To empower businesses, investors, and institutions across Tanzania with integrated digital solutions — from advertising and software to consultancy and information services — delivered with international standards of quality and local market insight.',
		sw: "Kuwezesha biashara, wawekezaji na taasisi kote Tanzania kwa suluhisho jumuishi za kidijitali — kuanzia matangazo na programu hadi ushauri na huduma za taarifa — zinazotolewa kwa viwango vya kimataifa vya ubora na uelewa wa soko la ndani."
	},
	vision: {
		en: "To be East Africa's most trusted digital partner, recognised for turning emerging technology into practical, measurable growth for the organisations we serve.",
		sw: "Kuwa mshirika wa kidijitali anayeaminika zaidi Afrika Mashariki, anayetambulika kwa kubadili teknolojia mpya kuwa ukuaji wa vitendo na unaopimika kwa mashirika tunayoyahudumia."
	},
	statement: {
		en: 'Makutano Digital Company Limited — a duly licensed ICT services provider operating under the laws of the United Republic of Tanzania.',
		sw: 'Makutano Digital Company Limited — mtoa huduma za TEHAMA aliyesajiliwa kwa mujibu wa sheria za Jamhuri ya Muungano wa Tanzania.'
	},
	developedBy: { en: 'Developed by Moinfotech', sw: 'Imetengenezwa na Moinfotech' },
	registration: [
		{
			label: { en: 'Business License No.', sw: 'Namba ya Leseni' },
			value: 'BL01695972026-2700002767'
		},
		{ label: { en: 'Issuing Office', sw: 'Ofisi Iliyotoa' }, value: 'Dodoma City Council' },
		{
			label: { en: 'Tax Identification No.', sw: 'Namba ya Utambulisho wa Kodi' },
			value: '205-614-818'
		},
		{ label: { en: 'Business Activity', sw: 'Shughuli ya Biashara' }, value: 'ICT Services (Local)' },
		{ label: { en: 'Region / Ward', sw: 'Mkoa / Kata' }, value: 'Dodoma, Makole' },
		{ label: { en: 'Licensed Date', sw: 'Tarehe ya Leseni' }, value: '4 August 2026' }
	],
	socials: [
		{ label: 'LinkedIn', icon: 'linkedin', url: '#' },
		{ label: 'Instagram', icon: 'instagram', url: '#' },
		{ label: 'X', icon: 'x', url: '#' }
	]
};

export const nav: NavItem[] = [
	{ href: '/', label: { en: 'Home', sw: 'Nyumbani' } },
	{ href: '/services', label: { en: 'Services', sw: 'Huduma' } },
	{ href: '/about', label: { en: 'About', sw: 'Kuhusu' } },
	{ href: '/partners', label: { en: 'Partners', sw: 'Washirika' } },
	{ href: '/contact', label: { en: 'Contact', sw: 'Wasiliana' } }
];

/** Shared button and link labels. */
export const ui = {
	letsTalk: { en: "Let's talk", sw: 'Tuzungumze' },
	discoverMore: { en: 'Discover more', sw: 'Gundua zaidi' },
	readMore: { en: 'Read more', sw: 'Soma zaidi' },
	viewDetails: { en: 'View details', sw: 'Angalia zaidi' },
	requestProposal: { en: 'Request a proposal', sw: 'Omba pendekezo' },
	startProject: { en: 'Start a project', sw: 'Anza mradi' },
	moreAboutUs: { en: 'More about us', sw: 'Zaidi kutuhusu' },
	getInTouch: { en: 'Get in touch', sw: 'Wasiliana nasi' },
	sendMessage: { en: 'Send message', sw: 'Tuma ujumbe' },
	callNow: { en: 'Call now', sw: 'Piga simu' },
	sendEmail: { en: 'Send email', sw: 'Tuma barua pepe' },
	office: { en: 'Office', sw: 'Ofisi' },
	quickLinks: { en: 'Quick Links', sw: 'Viungo Muhimu' },
	ourServices: { en: 'Our Services', sw: 'Huduma Zetu' },
	contact: { en: 'Contact', sw: 'Mawasiliano' },
	footerHeading: {
		en: "Let’s make your next move count.",
		sw: 'Tufanikishe hatua yako inayofuata.'
	}
} as const;

/** The scrolling ticker under the hero — English only on the live site. */
export const marqueeItems = [
	'Software Development',
	'Web Solutions',
	'Digital Advertising',
	'Digital Consultancy',
	'Real Estate Services',
	'Digital Currency Operations',
	'Information Services'
];

export const capabilities: Capability[] = [
	{
		id: 'cap-ai',
		title: { en: 'AI-Powered Solutions', sw: 'Suluhisho za AI' },
		description: {
			en: 'We integrate cutting-edge AI and machine learning to create smart, automated, and predictive applications that drive business growth.',
			sw: 'Tunatumia AI na ujifunzaji wa mashine wa kisasa kuunda programu janja, za kiotomatiki, na za kutabiri zinazochochea ukuaji wa biashara.'
		},
		icon: 'spark',
		image: '/images/photos/cap-ai.jpg',
		order: 1
	},
	{
		id: 'cap-web',
		title: { en: 'Web Development', sw: 'Utengenezaji wa Tovuti' },
		description: {
			en: 'From dynamic single-page applications to large-scale enterprise platforms, we build fast, secure, and scalable web solutions.',
			sw: 'Kutoka programu za ukurasa mmoja zinazobadilika hadi majukwaa makubwa ya kibiashara, tunajenga suluhisho za wavuti za haraka, salama, na zinazoweza kukua.'
		},
		icon: 'code',
		image: '/images/photos/cap-web.jpg',
		order: 2
	},
	{
		id: 'cap-mobile',
		title: { en: 'Mobile App Development', sw: 'Utengenezaji wa Programu za Simu' },
		description: {
			en: 'We design and develop beautiful, intuitive, and high-performance native mobile apps for both iOS and Android platforms.',
			sw: 'Tunabuni na kutengeneza programu za simu nzuri, rahisi kutumia, na zenye utendaji wa hali ya juu kwa mifumo ya iOS na Android.'
		},
		icon: 'mobile',
		image: '/images/photos/cap-mobile.jpg',
		order: 3
	}
];

export const services: Service[] = [
	{
		id: 'svc-software',
		slug: 'software-development',
		number: '01',
		title: { en: 'Software Development', sw: 'Utengenezaji wa Programu' },
		description: {
			en: 'Custom software solutions, including Software as a Service (SaaS) products tailored to client operational needs.',
			sw: 'Suluhisho maalum za programu, ikiwemo bidhaa za Software as a Service (SaaS) zilizoundwa kwa mahitaji ya uendeshaji wa mteja.'
		},
		icon: 'code',
		isPrimary: false,
		order: 1
	},
	{
		id: 'svc-web',
		slug: 'web-solutions',
		number: '02',
		title: { en: 'Web Solutions', sw: 'Suluhisho za Tovuti' },
		description: {
			en: 'Development and ongoing maintenance of web portals and related online platforms, built to modern performance and security standards.',
			sw: 'Utengenezaji na matengenezo endelevu ya mifumo ya tovuti na majukwaa ya mtandaoni, kwa viwango vya kisasa vya utendaji na usalama.'
		},
		icon: 'layers',
		isPrimary: false,
		order: 2
	},
	{
		id: 'svc-advertising',
		slug: 'digital-advertising',
		number: '03',
		title: { en: 'Digital Advertising', sw: 'Matangazo ya Kidijitali' },
		description: {
			en: 'Our primary business activity — comprehensive digital advertising services designed to build brand visibility and drive measurable client growth.',
			sw: 'Shughuli yetu kuu ya biashara — huduma kamili za matangazo ya kidijitali zilizoundwa kujenga mwonekano wa chapa na kuchochea ukuaji unaopimika wa mteja.'
		},
		icon: 'megaphone',
		isPrimary: true,
		order: 3
	},
	{
		id: 'svc-consultancy',
		slug: 'digital-consultancy',
		number: '04',
		title: { en: 'Digital Consultancy', sw: 'Ushauri wa Kidijitali' },
		description: {
			en: 'Expert advisory services across digital domains, helping organisations plan and execute their technology strategy.',
			sw: 'Huduma za ushauri wa kitaalam katika nyanja za kidijitali, kusaidia taasisi kupanga na kutekeleza mikakati ya teknolojia.'
		},
		icon: 'target',
		isPrimary: false,
		order: 4
	},
	{
		id: 'svc-real-estate',
		slug: 'real-estate-services',
		number: '05',
		title: { en: 'Real Estate Services', sw: 'Huduma za Ardhi na Majengo' },
		description: {
			en: 'Fee- and contract-based real estate brokerage, management, and consultancy services.',
			sw: 'Huduma za udalali, usimamizi na ushauri wa ardhi na majengo kwa ada na mikataba.'
		},
		icon: 'building',
		isPrimary: false,
		order: 5
	},
	{
		id: 'svc-currency',
		slug: 'digital-currency-operations',
		number: '06',
		title: { en: 'Digital Currency Operations', sw: 'Shughuli za Sarafu za Kidijitali' },
		description: {
			en: 'Cryptocurrency-related activities conducted in full compliance with prevailing laws and regulations.',
			sw: 'Shughuli zinazohusiana na sarafu za kidijitali zinazofanywa kwa kufuata kikamilifu sheria na kanuni zilizopo.'
		},
		icon: 'coin',
		isPrimary: false,
		order: 6
	},
	{
		id: 'svc-information',
		slug: 'information-services',
		number: '07',
		title: { en: 'Information Services', sw: 'Huduma za Taarifa' },
		description: {
			en: 'Additional information service activities undertaken as they create value for our clients and partners.',
			sw: 'Shughuli za ziada za huduma za taarifa zinazofanywa zinapoleta thamani kwa wateja na washirika wetu.'
		},
		icon: 'info',
		isPrimary: false,
		order: 7
	}
];

export const values: ValueItem[] = [
	{
		id: 'val-innovation',
		title: { en: 'Innovation First', sw: 'Ubunifu Kwanza' },
		description: {
			en: 'We harness cutting-edge web and mobile technologies to create practical, future-ready solutions.',
			sw: 'Tunatumia teknolojia za kisasa za wavuti na simu kuunda suluhisho la vitendo na la baadaye.'
		},
		icon: 'spark',
		order: 1
	},
	{
		id: 'val-collaboration',
		title: { en: 'Collaboration', sw: 'Ushirikiano' },
		description: {
			en: 'We believe in co-creating with our clients, ensuring that every solution reflects both sides of the need.',
			sw: 'Tunaamini katika kubuni pamoja na wateja wetu, kuhakikisha kila suluhisho linaakisi mahitaji ya pande zote mbili.'
		},
		icon: 'handshake',
		order: 2
	},
	{
		id: 'val-impact',
		title: { en: 'Impact Driven', sw: 'Matokeo Yenye Athari' },
		description: {
			en: 'Every product we build aims to improve lives, empower organizations, and strengthen connections.',
			sw: 'Kila bidhaa tunayounda inalenga kuboresha maisha, kuwezesha mashirika, na kuimarisha mahusiano.'
		},
		icon: 'target',
		order: 3
	},
	{
		id: 'val-integrity',
		title: { en: 'Integrity & Transparency', sw: 'Uadilifu na Uwazi' },
		description: {
			en: 'We value honesty, clear communication, and accountability in every project.',
			sw: 'Tunathamini uaminifu, mawasiliano wazi, na uwajibikaji katika kila mradi.'
		},
		icon: 'shield',
		order: 4
	},
	{
		id: 'val-excellence',
		title: { en: 'Excellence in Delivery', sw: 'Ubora katika Utoaji' },
		description: {
			en: 'Quality is at the heart of our work; we ensure reliable, scalable, and user-friendly solutions.',
			sw: 'Ubora ndio msingi wa kazi yetu; tunahakikisha suluhisho za kuaminika, zinazoweza kukua, na rafiki kwa mtumiaji.'
		},
		icon: 'check-badge',
		order: 5
	}
];

export const credibility: CredibilityItem[] = [
	{
		id: 'cred-expertise',
		title: { en: 'Proven Expertise', sw: 'Utaalamu Uliothibitika' },
		description: {
			en: 'Our team has strong experience in developing web and mobile applications across diverse industries.',
			sw: 'Timu yetu ina uzoefu mkubwa katika kutengeneza programu za wavuti na simu katika sekta mbalimbali.'
		},
		icon: 'award',
		order: 1
	},
	{
		id: 'cred-client',
		title: { en: 'Client-Centered Approach', sw: 'Mkabala Unaomlenga Mteja' },
		description: {
			en: 'We put our clients first, listening and tailoring solutions that bridge gaps effectively.',
			sw: 'Tunawaweka wateja wetu mbele, tukisikiliza na kurekebisha suluhisho zinazoziba mapengo kwa ufanisi.'
		},
		icon: 'users',
		order: 2
	},
	{
		id: 'cred-partnerships',
		title: { en: 'Trusted Partnerships', sw: 'Ushirikiano wa Kuaminika' },
		description: {
			en: 'Organizations and individuals rely on us to deliver solutions that truly unite and create value.',
			sw: 'Mashirika na watu binafsi wanategemea sisi kutoa suluhisho zinazounganisha kweli na kuongeza thamani.'
		},
		icon: 'handshake',
		order: 3
	},
	{
		id: 'cred-growth',
		title: { en: 'Continuous Growth', sw: 'Ukuaji Endelevu' },
		description: {
			en: 'We stay ahead of digital trends, ensuring our solutions remain relevant and impactful.',
			sw: 'Tunabaki mbele ya mienendo ya kidijitali, kuhakikisha suluhisho zetu zinabaki muhimu na zenye athari.'
		},
		icon: 'chart',
		order: 4
	},
	{
		id: 'cred-security',
		title: {
			en: 'Commitment to Security & Reliability',
			sw: 'Dhamira ya Usalama na Kutegemewa'
		},
		description: {
			en: 'We prioritize secure, stable, and dependable technologies for long-term trust.',
			sw: 'Tunapa kipaumbele teknolojia salama, thabiti, na za kutegemewa kwa uaminifu wa muda mrefu.'
		},
		icon: 'shield',
		order: 5
	}
];

export const partners: Partner[] = [
	{
		id: 'ptr-ilboru',
		slug: 'ilboru-saccos',
		name: 'Ilboru Saccos',
		sector: { en: 'Financial services', sw: 'Huduma za fedha' },
		description: {
			en: 'Our client and partner in financial services. We built the Ilboru Saccos platform using our own SACCOS system to support its digital operations.',
			sw: 'Mteja na mshirika wetu katika huduma za fedha. Tumejenga jukwaa la Ilboru Saccos kwa kutumia mfumo wetu wa SACCOS kusaidia shughuli zake za kidijitali.'
		},
		url: 'https://ias.co.tz',
		logo: '/images/partners/ilboru.svg',
		order: 1
	},
	{
		id: 'ptr-moinfotech',
		slug: 'moinfotech',
		name: 'Moinfotech',
		sector: { en: 'Technology', sw: 'Teknolojia' },
		description: {
			en: 'Our technology development partner, collaborating with us on software engineering and platform delivery.',
			sw: 'Mshirika wetu wa uendelezaji wa teknolojia, tunayeshirikiana naye katika uhandisi wa programu na utoaji wa mifumo.'
		},
		url: 'https://moinfo.co.tz',
		logo: '/images/partners/moinfotech.svg',
		order: 2
	},
	{
		id: 'ptr-smartclass',
		slug: 'smartclass',
		name: 'SmartClass',
		sector: { en: 'Education', sw: 'Elimu' },
		description: {
			en: 'Our AI-powered learning product for primary and secondary students, bringing together tutoring, adaptive practice, practical simulations, and parent insights.',
			sw: 'Bidhaa yetu ya kujifunza kwa AI kwa wanafunzi wa msingi na sekondari, yenye mafunzo, mazoezi, majaribio shirikishi, na taarifa kwa wazazi.'
		},
		tag: { en: 'Our product', sw: 'Bidhaa yetu' },
		url: 'https://smartclass.co.tz/home',
		logo: '/images/partners/smartclass.svg',
		order: 3
	}
];

/**
 * TODO(client): both entries still carry `[Full Name]` and a placeholder
 * portrait. Names, degrees and years of experience are still to be supplied.
 */
export const leadership: LeadershipMember[] = [
	{
		id: 'ldr-ceo',
		name: '[Full Name]',
		role: { en: 'Chief Executive Officer', sw: 'Afisa Mkuu Mtendaji' },
		bio: {
			en: "Holds overall responsibility for the company's strategic direction, partnerships, and growth. Degree-qualified."
		},
		image: '/images/leadership/placeholder.svg',
		order: 1
	},
	{
		id: 'ldr-md',
		name: '[Full Name]',
		role: { en: 'Managing Director', sw: 'Mkurugenzi Mtendaji' },
		bio: {
			en: 'Oversees day-to-day operations, service delivery, and client engagement across all business lines. Degree-qualified.'
		},
		image: '/images/leadership/placeholder.svg',
		order: 2
	}
];

/** Prose blocks reused across Home and About. */
export const prose = {
	whoWeAre: {
		en: 'Operating at the intersection of technology, real estate, and information services, we exist to give businesses, investors, and institutions a single, trusted partner for building and scaling their digital presence.',
		sw: "Tukifanya kazi katika teknolojia, ardhi na majengo, na huduma za taarifa, tunazipa biashara, wawekezaji na taasisi mshirika mmoja wa kuaminika wa kujenga na kukuza uwepo wao wa kidijitali."
	},
	valueProposition: {
		en: 'Our core value proposition centres on digital advertising as our primary line of business, complemented by web solutions, software development, digital consultancy, and emerging digital currency services. We solve a specific market problem: the shortage of integrated, locally-grounded digital partners who understand both global technology standards and the practical realities of operating in the Tanzanian and East African market.',
		sw: "Tunajikita katika matangazo ya kidijitali kama shughuli yetu kuu, pamoja na suluhisho za tovuti, utengenezaji wa programu, ushauri wa kidijitali na huduma za sarafu za kidijitali zinazoibuka. Tunashughulikia hitaji la washirika wa kidijitali wanaotoa huduma jumuishi, wenye uelewa wa viwango vya kimataifa vya teknolojia na mazingira ya biashara Tanzania na Afrika Mashariki."
	},
	leadershipIntro: {
		en: 'Makutano Digital is led by a two-member executive team holding overall responsibility for strategy, operations, and client delivery.',
		sw: "Makutano Digital inaongozwa na timu ya viongozi wawili wenye jukumu la mkakati, uendeshaji na utoaji wa huduma kwa wateja."
	},
	heroLead: {
		en: "We bridge the gap between opportunity and execution in Tanzania's fast-growing digital economy.",
		sw: 'Tunaunganisha fursa na utekelezaji katika uchumi wa kidijitali unaokua kwa kasi wa Tanzania.'
	}
} as const;

/** Short home-page checklist under "Who we are". */
export const whoWeAreChecklist = [
	{ en: 'Innovation First', sw: 'Ubunifu Kwanza' },
	{ en: 'Collaboration', sw: 'Ushirikiano' },
	{ en: 'Impact Driven', sw: 'Matokeo Yenye Athari' },
	{ en: 'Excellence in Delivery', sw: 'Ubora katika Utoaji' }
];
