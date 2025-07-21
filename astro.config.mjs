// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.saaspegasus.com/',
	redirects: {
		'/api-keys': '/apis',
		'/using-virtualenvs': '/python/setup/',
	},
	prefetch: true,
	integrations: [
		starlight({
			plugins: [starlightLinksValidator({
				errorOnLocalLinks: false,
			})],
			components: {
				Footer: './src/components/Footer.astro',
			},
			title: 'Pegasus',
			description: 'Documentation for SaaS Pegasus - the Django SaaS boilerplate',
			favicon: '/favicon.svg',
			social: [
				{ 
					icon: 'github', 
					label: 'GitHub', 
					href: 'https://github.com/saaspegasus/pegasus-docs' 
				}
			],
			customCss: [
        './src/styles/custom.css',
      ],
			head: [
				// Google Analytics
				{
					tag: 'script',
					attrs: {
						async: true,
						src: 'https://www.googletagmanager.com/gtag/js?id=UA-94102737-10',
					},
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'UA-94102737-10');
					`,
				},
				// Scriv chat integration
				{
					tag: 'script',
					attrs: {
						type: 'module',
						src: 'https://unpkg.com/scriv-chat@0.2.0/dist/scriv-chat/scriv-chat.esm.js',
					},
				},
			],
			sidebar: [
				{ label: 'Getting Started', slug: 'getting-started' },
				{ label: 'GitHub Integration', slug: 'github' },
				{ label: 'Customizations', slug: 'customizations' },
				{ label: 'Configuration', slug: 'configuration' },
				{ label: 'Code Structure', slug: 'code-structure' },
				{
					label: 'Python',
					autogenerate: { directory: 'python' },
					collapsed: true,
				},
				{
					label: 'Front End',
					autogenerate: { directory: 'front-end' },
					collapsed: true,
				},
				{
					label: 'CSS',
					autogenerate: { directory: 'css' },
					collapsed: true,
				},
				{ label: 'Page Metadata', slug: 'page-metadata' },
				{ label: 'Docker', slug: 'docker' },
				{ label: 'Teams', slug: 'teams' },
				{ label: 'Subscriptions', slug: 'subscriptions' },
				{ label: 'Payments', slug: 'payments' },
				{ label: 'Forms', slug: 'forms' },
				{ label: 'APIs', slug: 'apis' },
				{
					label: 'AI',
					autogenerate: { directory: 'ai' },
					collapsed: true,
				},
				{ label: 'Internationalization', slug: 'internationalization' },
				{ label: 'Wagtail', slug: 'wagtail' },
				{ label: 'Feature Flags', slug: 'flags' },
				{ label: 'Celery', slug: 'celery' },
				{ label: 'Async Support', slug: 'async' },
				{
					label: 'Deployment',
					autogenerate: { directory: 'deployment' },
					collapsed: true,
				},
				{ label: 'GitHub Actions', slug: 'github-actions' },
				{ label: 'Cookbooks', slug: 'cookbooks' },
				{
					label: 'Experimental',
					autogenerate: { directory: 'experimental' },
					collapsed: true,
				},
				{ label: 'Upgrading', slug: 'upgrading' },
				{
					label: 'Community',
					autogenerate: { directory: 'community' },
					collapsed: true,
				},
				{
					label: 'Marketplace',
					autogenerate: { directory: 'marketplace' },
					collapsed: true,
				},
				{ label: 'Release Notes', slug: 'release-notes' },
			],
		}),
	],
});
