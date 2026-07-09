export type ExperienceItem = {
	company: string;
	companyUrl?: string;
	role: string;
	period: string;
	schedule?: string;
	location: string;
	highlights: string[];
	tags?: string[];
};

export const experienceItems: ExperienceItem[] = [
	{
		company: 'TUBITAK',
		companyUrl: 'https://www.tubitak.gov.tr/',
		role: 'Software Engineer',
		period: 'Feb 2023 – Present',
		location: 'Ankara, TR',
		highlights: [
			'Member of the Liderahenk team, developing the Ahenk agent in Go',
			'Application development for GNU/Linux Pardus operating system',
			'Developing extensions for the GNOME desktop environment',
			'Backend and frontend web development using modern frameworks',
			'Interactive 3D model rotation projects using Three.js'
		],
		tags: ['Go', 'Python', 'GTK3/GTK4', 'Shell Scripting', 'GJS', 'Web Technologies', 'Three.js']
	},
	{
		company: 'Adonis Tech Solutions',
		role: 'Software Engineer',
		period: 'Jan 2023 – Jan 2024',
		schedule: 'Part-time',
		location: 'Larnaca, Cyprus',
		highlights: [
			'Built Telegram bots and automation flows using Telethon, FastAPI, Quart, and OpenAI',
			'Developed a management panel with Svelte, Firebase, and DaisyUI',
			'Delivered a centralized hub for Telegram bot and group management'
		],
		tags: ['Python', 'FastAPI', 'Quart', 'Svelte', 'Firebase', 'DaisyUI', 'Telethon', 'OpenAI']
	},
	{
		company: 'Arniva',
		role: 'Fullstack Web Developer',
		period: 'Dec 2021 – Sep 2022',
		location: 'Muğla, TR',
		highlights: [
			'Developed a comprehensive tourism platform with multi-role architecture',
			'Built admin panel, customer booking system, and business management dashboard',
			'Implemented real-time features using WebSocket technology'
		],
		tags: ['Node.js', 'Express', 'MySQL', 'SocketIO', 'Svelte', 'Framework7', 'Bootstrap5']
	},
	{
		company: 'Kaya Artemis Resort Hotel & Casino',
		role: 'IT Specialist',
		period: 'Jun 2021 – Oct 2021',
		location: 'Famagusta, Cyprus',
		highlights: [
			'Maintained the local business network and kept devices connected and operational',
			'Formatted and prepared computers for daily use',
			'Fixed printer issues and performed hardware maintenance',
			'Configured routers and network switches'
		]
	},
	{
		company: 'Sole Bilgisayar Yazılım',
		role: 'Intern',
		period: 'Aug 2020 – Sep 2020',
		location: 'Kağıthane, Istanbul, TR',
		highlights: [
			'Learned Android application development with Java and Kotlin',
			'Built a weather application using the OpenWeatherMap API'
		],
		tags: ['Android Studio', 'Kotlin', 'Java']
	},
	{
		company: 'Famagusta Newtech',
		role: 'Intern',
		period: 'Jun 2018 – Jul 2018',
		location: 'Famagusta, Cyprus',
		highlights: [
			'Installed and configured server operating systems',
			'Created user groups and managed file sharing settings',
			'Handled server backups and file recovery tasks'
		]
	}
];
