# Deja Vu Web Client

## Setup

1. `mkdir dejavu && cd dejavu/`
1. `git clone git@github.com:prathd/dejavu-client.git`
1. `cd client && yarn dev:setup`
1. Grab an `.env` file from a team member with the following keys:

   ```sh
   SERVER_URL=
   SENTRY_DSN=
   HEAP_ID=
   ```

1. Make sure you have server up and running. [You can learn how here](https://github.com/prathd/dejavu-server#instructions-to-run-locally).
1. `yarn dev`

## Additional features

You can create a local `/docs` directory for documentation by running:

```sh
yarn typedoc
```

Open [/docs/index.html](./docs/index.html) in your browser, or start a static
server to access documentation (e.g with `python -m http.server --directory ./docs`);

You can find more available yarn scripts to run in "scripts" in [package.json](./package.json)

To generate an analyze file to analyze your webpack generated build, add this to .env file:

```sh
ANALYZE="true"
```

Then run:

```sh
yarn prod:build
```

## Code Styleguide

Most of the code style preferences are enforced with eslint, and code is
auto-formatted with a pre-commit hook. You can configure your editor to use
eslint and prettier formatter to save yourself from "Could not commit" errors.

### Conventions

1. **Separate styled and logical components** <br />
   When using styled components in a component, create a
   `<ComponentName>/styled.tsx` file, and import it with a `S` prefix in your
   component. Named styled components add a lot of cognitive load when reading
   code. Marking them as `S.<MyComponent>` helps making it clear that this is
   just a styled component and no logic goes in it.

2. **Expose minimum API from components** <br />

   Components should use internal state as long as there is no redundant data
   kept in any component. A prop should be exposed only if component's parent
   care about it.

3. **File structure reflects a module's intent and boundaries**

   A component placed in `Parent/Component` should be an indication that this
   component should not be used outside of `<Parent>`. If you feel that it
   makes more sense to use `<Component>` outside of `<Parent>`, please either:

   1. Move `<Component>` outside of Parent directory. For now we are keeping common
      components in `components/common` directory
   2. Create a new component in `components/common` and abstracts the common
      logic out

   Clear boundaries b/w components allow us to work with relative freedom. We
   are trying to achieve:

   1. Clearly defined intent of modules
   2. Clearly defined boundaries b/w modules

   File structure of our codebase reflects both intent and boundaries of a
   component: e.g a component in `/components/common` is supposed to reusable.
   So anyone changing this should be very careful about what they might end up
   breaking.
