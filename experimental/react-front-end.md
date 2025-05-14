Standalone React Front End
==========================

*Added in version 2024.4. Expanded in version 2025.4.1.*

SaaS Pegasus's default React integration is based on a hybrid-model for reasons
[outlined here](https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/client-server-architectures/#enter-the-hybrid-architecture).
The hybrid model is still recommended for the overwhelming majority of Pegasus projects using React.
However, there are valid reasons to run a completely separate React front---including access to dedicated tooling and libraries,
isolating your front end and back end code, and working with AI-based tools that generate single-page applications.

Pegasus experimentally ships with a decoupled front end *example* single page application that can be used as a starting point for building
out a decoupled front end / SPA with React.
It uses [Vite](https://vitejs.dev/) as a development server and build tool.

The features it includes are:

- A standalone Vite / React application.
- Authentication via headless allauth and sessions---including sign up, login, social login, email confirmation,
  two-factor authentication, and logout functionality.
- A sample profile page which shows how to retrieve data from the logged in user (via the back end APIs) and display it.
- The employee lifecycle demo that ships with Pegasus (if enabled), showing a full create, update, delete (CRUD) workflow.

The standalone front end is *only available on TailwindCSS* and uses DaisyUI for styling.

**The standalone is not intended to be a replacement for Pegasus's UI, but a reference example you can use
as a starting point to build standalone, single-page-applications with Pegasus and React.**

Here's a demo:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto; margin-bottom: 1em;">
    <iframe src="https://www.youtube.com/embed/8CcTs2SdMLk" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>


And here are some technical details:

## Running the front end

*If you are using Docker, your front end should start in a separate container after running `make init`.*

The front end lives in the `/frontend` folder of your project.
To set it up for the first time, first go into the directory:

```
cd frontend
```

And install npm packages:

```
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Then run the dev server:

```
npm run dev
```

Note: your Django backend must also be running for the front end to work,
and you must also [build your Django front end](/front-end/overview.md) for styles to work.

## Authentication

Authentication uses session-based authentication against the Django backend (previous versions of the front end used JWTs).
The authentication implementation borrows heavily from the [allauth example](https://github.com/pennersr/django-allauth/tree/main/examples/react-spa) project.
In particular, the `src/lib/` and `src/allauth_auth/` folders have been copied in from that project and lightly modified to work with Pegasus.

Authentication is primarily handled via *authenticated routes* and *authentication context*.
You can see an example of how to set this up in the profile page.

Any page in your application that requires login can be wrapped in the `AuthenticatedRoute` component.
For example, like this:

```jsx
<AuthenticatedRoute>
  <p>Hello authenticated user!</p>
</AuthenticatedRoute>
```

Alternatively, if you make a page a child of the `<Dashboard>` component this will be automatically configured for you.
See `main.tsx` as an example of how this is set up.

When using the `AuthenticatedRoute`, if the user is not logged in they will be redirected to the login page.
If they are logged in, they will be able to access the route, and you can assume access
to the user object and other APIs that require login.

If you want to access user data you can use the `useAuthInfo` helper function which returns an `AuthContext` context.
Here is a simplified example taken from the Profile page:

```jsx
import { useAuthInfo } from "../../allauth_auth/hooks";

export default function Profile() {
  const { user } = useAuthInfo();
  return <p>The user's email address is: {user?.email}</p>
}
```
## Backend API access

The front end uses the [same api client](apis.md#api-clients) as the backend / hybrid model.
The API client is installed as a local npm package.

Authentication is handled via sessions and does not require any additional configuration.
Here is a basic example from the employee app demo:

```jsx
import {PegasusApi} from "api-client";
import EmployeeApplication from "../../../../assets/javascript/pegasus/examples/react/App.jsx";
import {getApiConfiguration} from "../../api/utils.tsx";

export default function EmployeeApp() {
  const client = new PegasusApi(getApiConfiguration());
  return (
    <EmployeeApplication client={client} urlBase="/dashboard/employees" />
  );
}
```

## Routing

Routing is handled by [React Router](https://reactrouter.com/en/main).

The main routes for the project are configured in `main.tsx`, and you can also include child routes
by following the pattern used by the employee demo.

## URLs in Emails

Some workflows, like email confirmation and password reset, require sending the user a link to your site.
Allauth only supports a single link for the entire application so you need to choose whether that link should
go to your Django application or your React front end.

To use the React front end's pages for these workflows, you can set `USE_HEADLESS_URLS = True` in your settings or environment variables.
This will configure the [`HEADLESS_FRONTEND_URLS` setting](https://docs.allauth.org/en/dev/headless/configuration.html) to work with the built-in front end.

## Known Limitations

This is an experimental feature meant to provide a starting point for building a standalone React front end against your Pegasus app.
It is *not* a complete, production-ready app, in the same way that standard Pegasus is.

Here are some of the larger limitations:

- Only a very limited subset of Pegasus functionality is available in the front end.
- The front end styles only support Tailwind CSS.
- Internationalization (translations) are not supported.
- There is not yet any guidance/support for production deployment of the front end.

## Troubleshooting

**I'm getting a "URI malformed" error when I load the app.**

This is likely because your `frontend/.env` file does not exist, or your `VITE_APP_BASE_URL` is not
properly set inside it. See `frontend/.env.example` for an example `.env` file suitable for development.

## Feedback

If you have any feedback on this feature I would love to hear it!
Feedback could include bug reports, feature requests, or any suggested architectural changes. 
