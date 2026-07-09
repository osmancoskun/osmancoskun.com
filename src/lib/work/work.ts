export type WorkItem = {
	title: string;
	description: string;
	highlights: string[];
	tags?: string[];
};

export const workItems: WorkItem[] = [
	{
		title: 'Currency Exchange Platform',
		description:
			'Fullstack web solution for a currency exchange business, covering daily sales operations and regulatory reporting.',
		highlights: [
			'Sales tracking across branches and transactions',
			'Daily exchange rate management and updates',
			'Automated tax reporting workflows',
			'Delivered end-to-end as a freelance engagement'
		],
		tags: ['fintech', 'web', 'automation']
	},
	{
		title: 'Automotive Gallery System',
		description:
			'Web platform for an automotive gallery to manage vehicle inventory, pricing, and customer payments.',
		highlights: [
			'Vehicle inventory and listing management',
			'Tax calculation workflows for sales',
			'Online payment integration',
			'Built to support day-to-day gallery operations'
		],
		tags: ['automotive', 'web', 'payments']
	},
	{
		title: 'Holding Company Platform',
		description:
			'Business operations platform for a holding company managing multiple subsidiaries under one structure.',
		highlights: [
			'Multi-business tracking across different company units',
			'Advanced analytics and reporting for management',
			'Dashboard-driven overview of group performance',
			'Consolidated view to support decision-making'
		],
		tags: ['enterprise', 'analytics', 'web']
	}
];
