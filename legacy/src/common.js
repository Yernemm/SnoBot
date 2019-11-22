import React from 'react';
import { Link } from 'react-router-dom'

export const DiscordLoginBtn = () => (
    <div class="discordLoginBtn">
    <a class="w3-card-4" href="/api/discord/login"><i class="fab fa-discord"></i> Login through Discord</a>
  </div>
  )

  export function NoMatch({ location }) {
    return (
      <div>
        <h3>
          Page "<code>{location.pathname}</code>" not found.
        </h3>
        <Link class="active" to="/">Home Page</Link>
      </div>
    );
  }

  export const ComingSoon = () => (
    <div>
      <h1>Coming Soon!</h1>
    </div>
    )