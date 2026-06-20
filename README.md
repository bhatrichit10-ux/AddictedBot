# AddictedBot
a discord bot with many features

# Libraries Used

- discord.js 
- dotenv 
- chalk@3

# Commands
- avatar - Displays the avatar of a user
- joke - Tells a random joke
- kick - kicks a user
- ping - pings the bot and shows the ping
- serverinfo - shows the information about the server
- slowmode - adds slowmode to the channel
- warn - DOES NOT WORK FOR NOW - warns user
- weather - gets the weather for a city

# File Description
- index.js - connects all the modules and runs the main bot
- src/ - Tools for clearing and registering commands as well as logging
- src/logger.js - Pino Logs for your bot
- commands/ - contains all the commands of the bot
- commands/fun - contains fun commands
- commands/moderation - commands for server admins
- commands/utils - commands for server/bot utilities
  
## Setting Up Locally

Clone the repository

```bash
git clone https://github.com/bhatrichit10-ux/AddictedBot.git
cd AddictedBot
```

Install dependencies

```bash
bun install
```

or

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env
```

Fill in your Discord bot credentials inside `.env`

```env
TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
```

Register slash commands

```bash
bun startup.js
```

or

```bash
node startup.js
```

Start the bot

```bash
bun index.js
```

or

```bash
node index.js
```

The bot should now be online and ready to use.
# Images of the bot
<img width="431" height="465" alt="image" src="https://github.com/user-attachments/assets/7f98a5db-b390-462b-9ca6-dcc7902851fd" />
<img width="417" height="207" alt="image" src="https://github.com/user-attachments/assets/5c3be3a6-75e9-4442-b180-5abbaa6090b5" />
<img width="555" height="223" alt="image" src="https://github.com/user-attachments/assets/adc7e5a6-870f-4fdf-b031-836abfff303c" />
<img width="813" height="136" alt="image" src="https://github.com/user-attachments/assets/935b4296-80ac-4b4e-924c-5b835a5ae9c5" />
<img width="527" height="242" alt="image" src="https://github.com/user-attachments/assets/5bdd4e5f-adb7-430d-ab7a-9339a9ec4e4f" />
<img width="560" height="223" alt="image" src="https://github.com/user-attachments/assets/6b9dbb7d-584b-4f00-8a5b-6fa358e546d3" />
  


