# L.Y.K Launcher

L.Y.K Launcher is a modern Windows-oriented personal game launcher and game library foundation. It serves as a unified personal game library, desktop game launcher, and gaming hub.

## Stack
- Frontend: React, TypeScript, Vite, React Router, Zustand.
- Styling: Custom vanilla CSS variables using a "Dark Graphite" tokenized design system.
- Backend/Desktop: Tauri 2, Rust.

## Architecture

### Domain Models
Strict TypeScript interfaces manage the core domain concepts: `Game`, `LaunchAction`, `Emulator`, `UserProfile`, `Session`, and `ActivityEvent`.

### Persistence
The application is designed to be local-first. Persistence is abstracted behind an `IPersistenceLayer` interface. Currently, it uses a `LocalPersistence` implementation (via `localStorage`), which allows for simple serialization while acting as a stable schema for future migrations or a SQLite transition.

### Provider Architecture
External integrations (metadata, artwork, store offers, news, recommendations) are encapsulated behind clean interfaces (`IMetadataProvider`, etc.). The current implementation uses local fixtures/mocks so the core application functions offline and remains robust against external API failures.

### Desktop & Security Integration (Tauri)
Tauri is strictly configured for security:
- Explicit capabilities in `default.json` (`core:default`, `opener:default`), avoiding unrestricted shell access to the frontend.
- Privileged functionality, like launching games, is handled by custom secure Rust commands (`launch_game`) in `src-tauri/src/lib.rs` using `std::process::Command`, which limits exposure and validates arguments.

## Current Implemented Foundation
- **Home**: A dashboard containing mock recently played games, an activity summary, current gaming news, and recommendations.
- **My Games**: A searchable, filterable grid of game cards supporting manual game registration and executing secure launch actions.
- **Activity**: A timeline of events reflecting real application actions (such as adding games or unlocking achievements).
- **Settings**: A basic profile configuration view with advanced data management (reset persistence).
- **Persistent Layout**: Includes a sidebar for navigation and a visually polished profile header.

## Future Extension Points
The architecture anticipates future modules, providing clear extension points:
- Implementing concrete Providers for SteamGridDB or IGDB.
- Expanding the Emulator integration.
- Implementing a real playtime and session tracking module.
- Real legitimate store integrations.
- Custom theming engines extending the current CSS token system.

## Validation Commands
To validate the integrity of this foundation, the following commands have been run successfully:
- `npx tsc --noEmit` (TypeScript validation)
- `npm run build` (Frontend production build)
- `cd src-tauri && cargo check` (Backend Rust check)

## Limitations & Deferred Functionality
- Advanced emulator frontend functionalities are deferred.
- The news, recommendations, metadata, and artwork providers are currently mocked with fixtures.
- Playtime tracking and achievements are stubbed out via the Activity simulation.
- Authentication and cloud backend features are explicitly omitted to remain local-first.
