import type { Localized } from '@makutano/shared';

interface ServiceDetail {
	outcome: Localized;
	lead: Localized;
	scope: Localized[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
	'digital-advertising': {
		outcome: { en: 'Be seen. Be remembered.', sw: 'Onekana. Kumbukwa.' },
		lead: { en: 'Connect your brand with the people who matter. Bring your message, creative direction, and digital presence into one focused effort.', sw: 'Unganisha chapa yako na watu muhimu. Weka ujumbe, ubunifu, na uwepo wako wa kidijitali katika mkakati mmoja.' },
		scope: [{ en: 'Campaign planning & audience focus', sw: 'Mipango ya kampeni na walengwa' }, { en: 'Digital creative & brand messaging', sw: 'Ubunifu na ujumbe wa chapa' }, { en: 'Campaign measurement & refinement', sw: 'Tathmini na uboreshaji wa kampeni' }]
	},
	'software-development': {
		outcome: { en: 'Built around your business.', sw: 'Imejengwa kwa biashara yako.' },
		lead: { en: 'Turn the way you work into software that fits. From a new product idea to an internal workflow, we connect design, engineering, and practical business needs.', sw: 'Badilisha namna unavyofanya kazi kwa programu inayokufaa. Kutoka wazo la bidhaa hadi shughuli za ndani, tunaunganisha ubunifu, uhandisi, na mahitaji ya biashara.' },
		scope: [{ en: 'Custom business applications & SaaS', sw: 'Programu maalumu za biashara na SaaS' }, { en: 'Mobile experiences & connected systems', sw: 'Programu za simu na mifumo iliyounganishwa' }, { en: 'AI-enabled tools & workflow automation', sw: 'Zana za AI na kurahisisha kazi kiotomatiki' }]
	},
	'web-solutions': {
		outcome: { en: 'Your next great first impression.', sw: 'Mvuto wa kwanza unaokutambulisha.' },
		lead: { en: 'Make every visit feel clear, useful, and unmistakably yours. We build websites and portals that connect your organisation with its customers and communities.', sw: 'Fanya kila ziara iwe wazi, yenye manufaa, na inayotambulisha chapa yako. Tunajenga tovuti na mifumo inayounganisha taasisi yako na wateja na jamii.' },
		scope: [{ en: 'Business websites & customer portals', sw: 'Tovuti za biashara na mifumo ya wateja' }, { en: 'Responsive layouts across devices', sw: 'Muonekano unaofaa vifaa mbalimbali' }, { en: 'Ongoing website maintenance', sw: 'Matengenezo endelevu ya tovuti' }]
	},
	'digital-consultancy': {
		outcome: { en: 'A clearer way forward.', sw: 'Njia iliyo wazi ya kusonga mbele.' },
		lead: { en: 'Bring clarity to your next technology decision. Connect your goals, current systems, and priorities before committing to a direction.', sw: 'Pata uwazi katika uamuzi wako ujao wa teknolojia. Unganisha malengo, mifumo iliyopo, na vipaumbele kabla ya kuchagua mwelekeo.' },
		scope: [{ en: 'Digital needs & opportunity review', sw: 'Tathmini ya mahitaji na fursa za kidijitali' }, { en: 'Technology strategy & priorities', sw: 'Mkakati wa teknolojia na vipaumbele' }, { en: 'Implementation planning', sw: 'Mipango ya utekelezaji' }]
	},
	'real-estate-services': {
		outcome: { en: 'Local knowledge. Practical support.', sw: 'Uelewa wa ndani. Msaada wa vitendo.' },
		lead: { en: 'Support for property decisions and day-to-day management, with a clearly defined fee or contract-based engagement.', sw: 'Msaada katika maamuzi ya mali na usimamizi wa kila siku, kwa huduma zilizoainishwa kupitia ada au mkataba.' },
		scope: [{ en: 'Real estate brokerage', sw: 'Udalali wa ardhi na majengo' }, { en: 'Property management', sw: 'Usimamizi wa mali' }, { en: 'Property consultancy', sw: 'Ushauri kuhusu mali' }]
	},
	'digital-currency-operations': {
		outcome: { en: 'Explore a changing digital space.', sw: 'Gundua dunia ya kidijitali inayobadilika.' },
		lead: { en: 'Start with a conversation about your requirements. The scope and suitability of a digital currency engagement are considered before any work is agreed.', sw: 'Anza kwa mazungumzo kuhusu mahitaji yako. Wigo na ufaafu wa huduma za sarafu za kidijitali huzingatiwa kabla ya kukubaliana kazi.' },
		scope: [{ en: 'Discuss your requirements', sw: 'Jadili mahitaji yako' }, { en: 'Define the proposed scope', sw: 'Fafanua wigo unaopendekezwa' }, { en: 'Confirm the engagement approach', sw: 'Thibitisha namna ya ushirikiano' }]
	},
	'information-services': {
		outcome: { en: 'Make information more useful.', sw: 'Fanya taarifa ziwe na manufaa zaidi.' },
		lead: { en: 'Tell us what information your organisation needs to work better. We shape the engagement around the value it can bring to your team, clients, and partners.', sw: 'Tuambie taarifa ambazo taasisi yako inahitaji kufanya kazi vizuri zaidi. Tunapanga huduma kulingana na thamani kwa timu, wateja, na washirika wako.' },
		scope: [{ en: 'Information needs & intended use', sw: 'Mahitaji ya taarifa na matumizi yake' }, { en: 'Organisation & presentation of information', sw: 'Mpangilio na uwasilishaji wa taarifa' }, { en: 'A scope tailored to your organisation', sw: 'Wigo unaolingana na taasisi yako' }]
	}
};

export const deliverySteps = [
	{ icon: 'users', title: { en: 'Understand', sw: 'Kuelewa' }, text: { en: 'Start with your goals, your audience, and the problem worth solving.', sw: 'Tunaanza na malengo, walengwa, na changamoto inayohitaji suluhisho.' } },
	{ icon: 'target', title: { en: 'Shape', sw: 'Kupanga' }, text: { en: 'Agree on the scope, priorities, and a practical direction for the work.', sw: 'Tunakubaliana wigo, vipaumbele, na mwelekeo wa kazi.' } },
	{ icon: 'code', title: { en: 'Create', sw: 'Kuunda' }, text: { en: 'Bring the plan to life, with space for feedback along the way.', sw: 'Tunatekeleza mpango huku tukipokea maoni katika kila hatua.' } },
	{ icon: 'chart', title: { en: 'Refine', sw: 'Kuboresha' }, text: { en: 'Review the outcome and identify what the next improvement should be.', sw: 'Tunapitia matokeo na kutambua uboreshaji unaofuata.' } }
];
