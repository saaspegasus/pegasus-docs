// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import starlightLlmsTxt from 'starlight-llms-txt'

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.saaspegasus.com/',
  redirects: {
    '/api-keys': '/apis',
    '/using-virtualenvs': '/python/setup/',
    '/python/': '/python/setup/',
    '/front-end/': '/front-end/overview/',
    '/css/': '/css/overview/',
    '/ai/': '/ai/development/',
    '/deployment/': '/deployment/overview/',
    '/experimental/': '/experimental/react-front-end/',
    '/community/': '/community/digital-ocean-spaces/',
    '/deployment/google-cloud-github-actions/': '/community/google-cloud-github-actions/',
  },
  prefetch: true,
  integrations: [
    starlight({
      plugins: [
        starlightLinksValidator({
          errorOnLocalLinks: false,
        }),
        starlightLlmsTxt({
          details: "SaaS Pegasus is a Django-backed SaaS boilerplate that puts you in control. " +
            "You choose the technologies and features you want included, and Pegasus generates a unique codebase for your project. " +
            "Instead of starting with Django's default skeleton project, you start with a bunch of extra work done for you—and nothing you don't need.",
          promote: ['index*', 'getting-started*', 'python/uv*', 'code-structure*', 'configuration*', '!*/*'],
          exclude: ['release-nodes*', 'marketplace/*', 'community/*'],
          customSets: [
            {
              label: 'Front End',
              description: 'Pegasus\'s front-end architecture is a hybrid model, with a front-end codebase\n' +
                'that is compiled and used directly in Django templates via Django\'s static files infrastructure.',
              paths: ['front-end/**'],
            },
            {
              label: 'CSS',
              description: 'Documentation on Pegasus CSS setup and options.',
              paths: ['css/**'],
            },
            {
              label: 'Deployment',
              description: 'Documentation for deploying Pegasus projects to different hosting providers.',
              paths: ['css/**'],
            },
          ],
        }),
      ],
      components: {
        PageSidebar: './src/components/PageSidebar.astro',
      },
      title: 'SaaS Pegasus',
      description: 'Documentation for SaaS Pegasus - the Django SaaS boilerplate',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/images/hero.png',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/saaspegasus/pegasus-docs'
        },
        {
          icon: 'x.com',
          label: 'x.com',
          href: 'https://x.com/saaspegasus'
        },
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
        {label: 'Getting Started', slug: 'getting-started'},
        {label: 'GitHub Integration', slug: 'github'},
        {label: 'Customizations', slug: 'customizations'},
        {label: 'Settings and Configuration', slug: 'configuration'},
        {label: 'Code Structure', slug: 'code-structure'},
        {
          label: 'Python',
          autogenerate: {directory: 'python'},
          collapsed: true,
        },
        {
          label: 'Front End',
          collapsed: true,
          items: [
            'front-end/overview',
            'front-end/vite',
            'front-end/webpack',
            'front-end/design-patterns',
            'front-end/troubleshooting',
            'front-end/migrating',
          ],
        },
        {
          label: 'CSS',
          autogenerate: {directory: 'css'},
          collapsed: true,
        },
        {label: 'Page Metadata', slug: 'page-metadata'},
        {label: 'Docker', slug: 'docker'},
        {label: 'Teams', slug: 'teams'},
        {label: 'Subscriptions', slug: 'subscriptions'},
        {label: 'E-Commerce / Payments', slug: 'payments'},
        {label: 'Forms', slug: 'forms'},
        {label: 'APIs', slug: 'apis'},
        {
          label: 'AI',
          autogenerate: {directory: 'ai'},
          collapsed: true,
        },
        {label: 'Internationalization', slug: 'internationalization'},
        {label: 'Wagtail', slug: 'wagtail'},
        {label: 'Feature Flags', slug: 'flags'},
        {label: 'Celery', slug: 'celery'},
        {label: 'Async and Websockets', slug: 'async'},
        {
          label: 'Deployment',
          collapsed: true,
          items: [
            'deployment/overview',
            'deployment/digital-ocean',
            'deployment/fly',
            'deployment/heroku',
            'deployment/google-cloud',
            'deployment/kamal',
            'deployment/render',
            'deployment/production-checklist',
            'deployment/troubleshooting',
          ],
        },
        {label: 'GitHub Actions', slug: 'github-actions'},
        {label: 'Cookbooks', slug: 'cookbooks'},
        {
          label: 'Experimental',
          autogenerate: {directory: 'experimental'},
          collapsed: true,
        },
        {label: 'Upgrading and Changing Project Settings', slug: 'upgrading'},
        {
          label: 'Community',
          autogenerate: {directory: 'community'},
          collapsed: true,
        },
        {
          label: 'Marketplace',
          autogenerate: {directory: 'marketplace'},
          collapsed: true,
        },
        {label: 'Release Notes', slug: 'release-notes'},
      ],
    }),
  ],
});
