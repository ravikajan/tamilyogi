Title: Credentials

URL Source: https://authjs.dev/getting-started/authentication/credentials

Markdown Content:
Credentials

===============
[Skip to content](https://authjs.dev/getting-started/authentication/credentials#reach-skip-nav)

Migrating from NextAuth.js v4? Read[**our migration guide**](https://authjs.dev/getting-started/migrating-to-v5).

[![Image 1: Auth.js Logo](https://authjs.dev/img/etc/logo-sm.webp)Auth.js](https://authjs.dev/)

[Getting Started](https://authjs.dev/getting-started)[Guides](https://authjs.dev/guides/debugging)[API reference](https://authjs.dev/reference/overview)[Concepts](https://authjs.dev/concepts)[Security](https://authjs.dev/security)

Search K[](https://github.com/nextauthjs/next-auth)

AI Ask AI

[](https://github.com/nextauthjs/next-auth)

26.9k

[![Image 2: Discord Logo](https://authjs.dev/img/providers/discord.svg)](https://discord.authjs.dev/?utm_source=docs "Join our Discord")

System

Search K

*   [Introduction](https://authjs.dev/getting-started)
*   [Migrate to NextAuth.js v5](https://authjs.dev/getting-started/migrating-to-v5)
*   Getting Started
*   [Installation](https://authjs.dev/getting-started/installation)
*   [Authentication](https://authjs.dev/getting-started/authentication)

    *   [OAuth](https://authjs.dev/getting-started/authentication/oauth)
    *   [Magic Links](https://authjs.dev/getting-started/authentication/email)
    *   [Credentials](https://authjs.dev/getting-started/authentication/credentials)
    *   [WebAuthn 🔬](https://authjs.dev/getting-started/authentication/webauthn)

*   [Database](https://authjs.dev/getting-started/database)
*   Session Management

    *   [Signin and Signout](https://authjs.dev/getting-started/session-management/login)
    *   [Get Session](https://authjs.dev/getting-started/session-management/get-session)
    *   [Protecting Resources](https://authjs.dev/getting-started/session-management/protecting)
    *   [Custom Pages](https://authjs.dev/getting-started/session-management/custom-pages)

*   [Deployment](https://authjs.dev/getting-started/deployment)
*   [TypeScript](https://authjs.dev/getting-started/typescript)
*   Connections
*   Providers

    *   [42 School](https://authjs.dev/getting-started/providers/42-school)
    *   [Apple](https://authjs.dev/getting-started/providers/apple)
    *   [Asgardeo](https://authjs.dev/getting-started/providers/asgardeo)
    *   [Auth0](https://authjs.dev/getting-started/providers/auth0)
    *   [Authentik](https://authjs.dev/getting-started/providers/authentik)
    *   [Azure Ad](https://authjs.dev/getting-started/providers/azure-ad)
    *   [Azure Ad B2c](https://authjs.dev/getting-started/providers/azure-ad-b2c)
    *   [Azure Devops](https://authjs.dev/getting-started/providers/azure-devops)
    *   [BankID Norge](https://authjs.dev/getting-started/providers/bankid-no)
    *   [Battlenet](https://authjs.dev/getting-started/providers/battlenet)
    *   [Beyondidentity](https://authjs.dev/getting-started/providers/beyondidentity)
    *   [Bitbucket](https://authjs.dev/getting-started/providers/bitbucket)
    *   [Box](https://authjs.dev/getting-started/providers/box)
    *   [Boxyhq Saml](https://authjs.dev/getting-started/providers/boxyhq-saml)
    *   [Bungie](https://authjs.dev/getting-started/providers/bungie)
    *   [Click Up](https://authjs.dev/getting-started/providers/click-up)
    *   [Cognito](https://authjs.dev/getting-started/providers/cognito)
    *   [Coinbase](https://authjs.dev/getting-started/providers/coinbase)
    *   [Credentials](https://authjs.dev/getting-started/providers/credentials)
    *   [Descope](https://authjs.dev/getting-started/providers/descope)
    *   [Discord](https://authjs.dev/getting-started/providers/discord)
    *   [Dribbble](https://authjs.dev/getting-started/providers/dribbble)
    *   [Dropbox](https://authjs.dev/getting-started/providers/dropbox)
    *   [Duende Identity Server6](https://authjs.dev/getting-started/providers/duende-identity-server6)
    *   [Eveonline](https://authjs.dev/getting-started/providers/eveonline)
    *   [Facebook](https://authjs.dev/getting-started/providers/facebook)
    *   [Faceit](https://authjs.dev/getting-started/providers/faceit)
    *   [Figma](https://authjs.dev/getting-started/providers/figma)
    *   [Forwardemail](https://authjs.dev/getting-started/providers/forwardemail)
    *   [Foursquare](https://authjs.dev/getting-started/providers/foursquare)
    *   [Freshbooks](https://authjs.dev/getting-started/providers/freshbooks)
    *   [Frontegg](https://authjs.dev/getting-started/providers/frontegg)
    *   [Fusionauth](https://authjs.dev/getting-started/providers/fusionauth)
    *   [GitHub](https://authjs.dev/getting-started/providers/github)
    *   [GitLab](https://authjs.dev/getting-started/providers/gitlab)
    *   [Google](https://authjs.dev/getting-started/providers/google)
    *   [Hubspot](https://authjs.dev/getting-started/providers/hubspot)
    *   [Identity Server4](https://authjs.dev/getting-started/providers/identity-server4)
    *   [Instagram](https://authjs.dev/getting-started/providers/instagram)
    *   [Kakao](https://authjs.dev/getting-started/providers/kakao)
    *   [Keycloak](https://authjs.dev/getting-started/providers/keycloak)
    *   [Line](https://authjs.dev/getting-started/providers/line)
    *   [Linkedin](https://authjs.dev/getting-started/providers/linkedin)
    *   [Logto](https://authjs.dev/getting-started/providers/logto)
    *   [Loops](https://authjs.dev/getting-started/providers/loops)
    *   [Mailchimp](https://authjs.dev/getting-started/providers/mailchimp)
    *   [Mailgun](https://authjs.dev/getting-started/providers/mailgun)
    *   [Mailru](https://authjs.dev/getting-started/providers/mailru)
    *   [Mastodon](https://authjs.dev/getting-started/providers/mastodon)
    *   [Mattermost](https://authjs.dev/getting-started/providers/mattermost)
    *   [Medium](https://authjs.dev/getting-started/providers/medium)
    *   [Microsoft Entra Id](https://authjs.dev/getting-started/providers/microsoft-entra-id)
    *   [Naver](https://authjs.dev/getting-started/providers/naver)
    *   [Netlify](https://authjs.dev/getting-started/providers/netlify)
    *   [Netsuite](https://authjs.dev/getting-started/providers/netsuite)
    *   [Nextcloud](https://authjs.dev/getting-started/providers/nextcloud)
    *   [Nodemailer](https://authjs.dev/getting-started/providers/nodemailer)
    *   [Notion](https://authjs.dev/getting-started/providers/notion)
    *   [Okta](https://authjs.dev/getting-started/providers/okta)
    *   [Onelogin](https://authjs.dev/getting-started/providers/onelogin)
    *   [Osso](https://authjs.dev/getting-started/providers/osso)
    *   [Osu](https://authjs.dev/getting-started/providers/osu)
    *   [Passage](https://authjs.dev/getting-started/providers/passage)
    *   [Passkey](https://authjs.dev/getting-started/providers/passkey)
    *   [Patreon](https://authjs.dev/getting-started/providers/patreon)
    *   [Pinterest](https://authjs.dev/getting-started/providers/pinterest)
    *   [Pipedrive](https://authjs.dev/getting-started/providers/pipedrive)
    *   [Postmark](https://authjs.dev/getting-started/providers/postmark)
    *   [Reddit](https://authjs.dev/getting-started/providers/reddit)
    *   [Resend](https://authjs.dev/getting-started/providers/resend)
    *   [Sailpoint](https://authjs.dev/getting-started/providers/sailpoint)
    *   [Salesforce](https://authjs.dev/getting-started/providers/salesforce)
    *   [Sendgrid](https://authjs.dev/getting-started/providers/sendgrid)
    *   [Simplelogin](https://authjs.dev/getting-started/providers/simplelogin)
    *   [Slack](https://authjs.dev/getting-started/providers/slack)
    *   [Spotify](https://authjs.dev/getting-started/providers/spotify)
    *   [Strava](https://authjs.dev/getting-started/providers/strava)
    *   [Threads](https://authjs.dev/getting-started/providers/threads)
    *   [Tiktok](https://authjs.dev/getting-started/providers/tiktok)
    *   [Todoist](https://authjs.dev/getting-started/providers/todoist)
    *   [Trakt](https://authjs.dev/getting-started/providers/trakt)
    *   [Twitch](https://authjs.dev/getting-started/providers/twitch)
    *   [Twitter](https://authjs.dev/getting-started/providers/twitter)
    *   [United Effects](https://authjs.dev/getting-started/providers/united-effects)
    *   [Vipps MobilePay](https://authjs.dev/getting-started/providers/vipps-mobilepay)
    *   [Vk](https://authjs.dev/getting-started/providers/vk)
    *   [Webex](https://authjs.dev/getting-started/providers/webex)
    *   [Wikimedia](https://authjs.dev/getting-started/providers/wikimedia)
    *   [WordPress](https://authjs.dev/getting-started/providers/wordpress)
    *   [WorkOS](https://authjs.dev/getting-started/providers/workos)
    *   [Yandex](https://authjs.dev/getting-started/providers/yandex)
    *   [Zitadel](https://authjs.dev/getting-started/providers/zitadel)
    *   [Zoho](https://authjs.dev/getting-started/providers/zoho)
    *   [Zoom](https://authjs.dev/getting-started/providers/zoom)

*   Adapters

    *   [Azure Tables](https://authjs.dev/getting-started/adapters/azure-tables)
    *   [Cloudflare D1](https://authjs.dev/getting-started/adapters/d1)
    *   [Dgraph](https://authjs.dev/getting-started/adapters/dgraph)
    *   [Drizzle](https://authjs.dev/getting-started/adapters/drizzle)
    *   [DynamoDB](https://authjs.dev/getting-started/adapters/dynamodb)
    *   [EdgeDB](https://authjs.dev/getting-started/adapters/edgedb)
    *   [FaunaDB](https://authjs.dev/getting-started/adapters/fauna)
    *   [Firebase Firestore](https://authjs.dev/getting-started/adapters/firebase)
    *   [Hasura](https://authjs.dev/getting-started/adapters/hasura)
    *   [Kysely](https://authjs.dev/getting-started/adapters/kysely)
    *   [MikroORM](https://authjs.dev/getting-started/adapters/mikro-orm)
    *   [MongoDB](https://authjs.dev/getting-started/adapters/mongodb)
    *   [Neo4j](https://authjs.dev/getting-started/adapters/neo4j)
    *   [Neon](https://authjs.dev/getting-started/adapters/neon)
    *   [PostgreSQL](https://authjs.dev/getting-started/adapters/pg)
    *   [PouchDB](https://authjs.dev/getting-started/adapters/pouchdb)
    *   [Prisma](https://authjs.dev/getting-started/adapters/prisma)
    *   [Sequelize](https://authjs.dev/getting-started/adapters/sequelize)
    *   [Supabase](https://authjs.dev/getting-started/adapters/supabase)
    *   [SurrealDB](https://authjs.dev/getting-started/adapters/surrealdb)
    *   [TypeORM](https://authjs.dev/getting-started/adapters/typeorm)
    *   [Unstorage](https://authjs.dev/getting-started/adapters/unstorage)
    *   [Upstash Redis](https://authjs.dev/getting-started/adapters/upstash-redis)
    *   [Xata](https://authjs.dev/getting-started/adapters/xata)

*   [Integrations](https://authjs.dev/getting-started/integrations)
*   Sponsored[Looking for a hosted alternative?Use Clerk →](https://go.clerk.com/DefS1u4)

[Getting Started](https://authjs.dev/getting-started "Getting Started")[Authentication](https://authjs.dev/getting-started/authentication "Authentication")Credentials

Credentials
===========

To setup Auth.js with any external authentication mechanisms or use a traditional username/email and password flow, we can use the `Credentials` provider. This provider is designed to forward any credentials inserted into the login form (i.e. username/password, but not limited to) to your authentication service.

⚠️

The industry has come a long way since usernames and passwords as the go-to mechanism for authenticating and authorizing users to web applications. Therefore, if possible, we recommend a more modern and secure authentication mechanism such as any of the [OAuth providers](https://authjs.dev/getting-started/authentication/oauth), [Email Magic Links](https://authjs.dev/getting-started/authentication/email), or [WebAuthn (Passkeys)](https://authjs.dev/getting-started/authentication/webauthn) options instead.

However, we also want to be flexible and support anything you deem appropriate for your application and use case, so there are no plans to remove this provider.

💡

By default, the Credentials provider does not persist data in the database. However, you can still create and save any data in your database, you just have to provide the necessary logic, eg. to encrypt passwords, add rate-limiting, add password reset functionality, etc.

### Credentials Provider[](https://authjs.dev/getting-started/authentication/credentials#credentials-provider)

To use the `Credentials Provider`, you’ll first need to import and configure it in your `Auth.js` setup. This provider allows you to implement custom login logic based on form input values.

Here’s how to set it up:

1.   Import the provider.
2.   Add it to the `providers` array in your `Auth.js` config.
3.   Define the `credentials` and `authorize` fields.

#### `credentials`[](https://authjs.dev/getting-started/authentication/credentials#credentials)

The `credentials` object defines the input fields displayed on the default sign-in page. These inputs are automatically rendered on the route:

*   `/api/auth/signin` (Next.js)
*   `/auth/signin` (Other frameworks)

Each field accepts the following properties:

*   `label`: Input label
*   `type`: HTML input type (`text`, `password`, etc.)
*   `placeholder`: Placeholder text

> These fields are also passed to the `authorize` function under the `credentials` argument.

For more details, see the [Built-in Pages guide](https://authjs.dev/guides/pages/built-in-pages).

```
Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
})
```

#### `authorize`[](https://authjs.dev/getting-started/authentication/credentials#authorize)

The `authorize` function handles the custom login logic and determines whether the credentials provided are valid.

It receives the input values defined in `credentials`, and you must return either a user object or `null`. If `null` is returned, the login fails.

Next.js Qwik SvelteKit Express

./auth.ts

```
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})
```

/src/routes/plugin@auth.ts

```
import { QwikAuth$ } from "@auth/qwik"
import Credentials from "@auth/qwik/providers/credentials"
 
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const response = await getUserFromDb(credentials)
          if (!response.ok) return null
          return (await response.json()) ?? null
        },
      }),
    ],
  })
)
```

./src/auth.ts

```
import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
 
export const { signIn, signOut, handle } = SvelteKitAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if user exists
        user = await getUserFromDb(credentials.email, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return JSON object with the user data
        return user
      },
    }),
  ],
})
```

Don’t forget to re-export the `handle` in your `./src/hooks.server.ts` file.

./src/hooks.server.ts

`export { handle } from "./auth"`

./src/routes/auth.route.ts

```
import { ExpressAuth } from "@auth/express"
import Credentials from "@auth/express/providers/credentials"
import express from "express"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
 
const app = express()
app.use(
  "/auth/*",
  ExpressAuth({
    providers: [
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          let user = null
 
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(credentials.password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(credentials.email, pwHash)
 
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
 
          // return user object with the their profile data
          return user
        },
      }),
    ],
  })
)
```

If you’re using TypeScript, you can [augment the `User` interface](https://authjs.dev/getting-started/typescript#module-augmentation) to match the response of your `authorize` callback, so whenever you read the user in other callbacks (like the `jwt`) the type will match correctly.

### Signin Form[](https://authjs.dev/getting-started/authentication/credentials#signin-form)

Finally, let’s create a simple sign-in form.

Next.js Next.js (Client)Qwik SvelteKit Express

./components/sign-in.tsx

```
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}
```

./components/sign-in.tsx

```
"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
  const credentialsAction = (formData: FormData) => {
    signIn("credentials", formData)
  }
 
  return (
    <form action={credentialsAction}>
      <label htmlFor="credentials-email">
        Email
        <input type="email" id="credentials-email" name="email" />
      </label>
      <label htmlFor="credentials-password">
        Password
        <input type="password" id="credentials-password" name="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  )
}
```

/src/routes/index.tsx

```
import { component$ } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import { useSignIn } from "./plugin@auth"
 
export default component$(() => {
  const signInSig = useSignIn()
 
  return (
    <Form action={signInSig}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </Form>
  )
})
```

src/route/+page.svelte

```
<script>
  import { signIn } from "../auth"
  import { page } from "$app/stores"
 
  let email = ""
  let password = ""
</script>
 
<div>
  <form>
    <label>
      Email
      <input name="email" type="email" bind:value={email} />
    </label>
    <label>
      Password
      <input name="password" type="password" bind:value={password} />
    </label>
    <button on:click={() => signIn("credentials", { email, password })}>
      Log in
    </button>
  </form>
</div>
```

views/signin.html

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign In</title>
  </head>
  <body>
    <h1>Sign In</h1>
    <form action="/auth/signin" method="POST">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" name="password" id="password" required />
      <br />
      <button type="submit">Sign In</button>
    </form>
  </body>
</html>
```

Validating credentials[](https://authjs.dev/getting-started/authentication/credentials#validating-credentials)
--------------------------------------------------------------------------------------------------------------

Always validate the credentials server-side, i.e. by leveraging a schema validation library like [Zod](https://zod.dev/).

npm pnpm yarn bun

`npm install zod`

`pnpm add zod`

`yarn add zod`

`bun add zod`

Next, we’ll set up the schema and parsing in our `auth.ts` configuration file, using the `authorize` callback on the `Credentials` provider.

Next.js Qwik SvelteKit Express

./lib/zod.ts

```
import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
```

./auth.ts

```
import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
import { getUserFromDb } from "@/utils/db"
 
export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
 
          const { email, password } = await signInSchema.parseAsync(credentials)
 
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash)
 
          if (!user) {
            throw new Error("Invalid credentials.")
          }
 
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
})
```

./lib/zod.ts

```
import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
```

/src/routes/plugin@auth.ts

```
import { QwikAuth$ } from "@auth/qwik"
import Credentials from "@auth/qwik/providers/credentials"
import { signInSchema } from "./lib/zod"
 
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = await signInSchema.parseAsync(credentials)
 
          // Your logic here
        },
      }),
    ],
  })
)
```

./lib/zod.ts

```
import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
```

./auth.ts

```
import SvelteKitAuth from "@auth/sveltekit"
import { ZodError } from "zod"
import Credentials from "@auth/sveltekit/providers/credentials"
import { signInSchema } from "./lib/zod"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/utils/password"
import { getUserFromDb } from "@/utils/db"
 
export const { handle } = SvelteKitAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
 
          const { email, password } =
            await createUserSchema.parseAsync(credentials)
 
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash)
 
          if (!user) {
            throw new Error("Invalid credentials.")
          }
 
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
})
```

Express not documented yet. Help us by contributing[here](https://github.com/nextauthjs/next-auth/edit/main/docs/pages/getting-started/authentication/credentials.mdx).

💡

When authorize returns null, Auth.js handles the error in one of two ways:

Using built-in pages:

*   The user is redirected to the login page with the query string: `?error=CredentialsSignin&code=credentials`. You can customize the code using the [credentials provider options](https://authjs.dev/reference/core/providers/credentials#returns).
*   Using form actions or custom error handling (e.g., in Remix, SvelteKit): The error is thrown as credentialssignin and must be caught manually in your server action. See more in the [Auth.js error reference](https://authjs.dev/reference/core/errors#credentialssignin).

Last updated on May 13, 2025

[Magic Links](https://authjs.dev/getting-started/authentication/email "Magic Links")[WebAuthn 🔬](https://authjs.dev/getting-started/authentication/webauthn "WebAuthn 🔬")

### About Auth.js

*   [Introduction](https://authjs.dev/getting-started)
*   [Security](https://authjs.dev/security)
*   [Discord Community](https://discord.authjs.dev/?utm_source=docs "Join our Discord")

### Download

[GitHub](https://github.com/nextauthjs/next-auth)[NPM](https://www.npmjs.com/package/next-auth)

### Acknowledgements

[Contributors](https://authjs.dev/contributors)[Sponsors](https://authjs.dev/sponsors)

Auth.js © Balázs Orbán and Team - 2025

![Image 3](https://t.co/1/i/adsct?bci=4&dv=UTC%26en-US%26Google%20Inc.%26Linux%20x86_64%26255%26800%26600%264%2624%26800%26600%260%26na&eci=3&event=%7B%7D&event_id=114543f4-d6fb-484e-aac6-b265c0749ed3&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=33bfc76d-6214-489e-9125-f3661a7db0b6&tw_document_href=https%3A%2F%2Fauthjs.dev%2Fgetting-started%2Fauthentication%2Fcredentials&tw_iframe_status=0&txn_id=o6tnh&type=javascript&version=2.3.33)![Image 4](https://analytics.twitter.com/1/i/adsct?bci=4&dv=UTC%26en-US%26Google%20Inc.%26Linux%20x86_64%26255%26800%26600%264%2624%26800%26600%260%26na&eci=3&event=%7B%7D&event_id=114543f4-d6fb-484e-aac6-b265c0749ed3&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=33bfc76d-6214-489e-9125-f3661a7db0b6&tw_document_href=https%3A%2F%2Fauthjs.dev%2Fgetting-started%2Fauthentication%2Fcredentials&tw_iframe_status=0&txn_id=o6tnh&type=javascript&version=2.3.33)![Image 5](https://t.co/1/i/adsct?bci=4&dv=UTC%26en-US%26Google%20Inc.%26Linux%20x86_64%26255%26800%26600%264%2624%26800%26600%260%26na&eci=4&event=%7B%7D&event_id=826fb45b-0d48-4acb-944d-2aff711bb3c9&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=33bfc76d-6214-489e-9125-f3661a7db0b6&tw_document_href=https%3A%2F%2Fauthjs.dev%2Fgetting-started%2Fauthentication%2Fcredentials&tw_iframe_status=0&txn_id=tw-o6tnh-oi8tp&type=javascript&version=2.3.33)![Image 6](https://analytics.twitter.com/1/i/adsct?bci=4&dv=UTC%26en-US%26Google%20Inc.%26Linux%20x86_64%26255%26800%26600%264%2624%26800%26600%260%26na&eci=4&event=%7B%7D&event_id=826fb45b-0d48-4acb-944d-2aff711bb3c9&integration=advertiser&p_id=Twitter&p_user_id=0&pl_id=33bfc76d-6214-489e-9125-f3661a7db0b6&tw_document_href=https%3A%2F%2Fauthjs.dev%2Fgetting-started%2Fauthentication%2Fcredentials&tw_iframe_status=0&txn_id=tw-o6tnh-oi8tp&type=javascript&version=2.3.33)