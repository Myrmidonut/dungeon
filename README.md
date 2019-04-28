# dungeon
A dungeon crawler game.

- setting
  - snow?
  - space?
  - dungeon?

- example fight
  - attack vs 20% dodge -> success
  - 10 strength vs 8 stamina -> success
  - 3-8 damage, 10% crit chance -> 4 damage with crit -> 4 x 2 = 8 damage
  - 8 damage - 5 armor = 3 damage
  - 20 health - 3 damage = 17 health

- class
  - barbarian
    - 25% bonus attack with 2-handed weapon
    - 2 x strength per level
  - thief
    - 25% bonus attack with two one-handed weapons
    - 2 x agility per level
  - paladin
    - 25% bonus attack with one-handed weapon and shield
    - 2 x stamina per level

- level
  - stat = current level
  - class stat = 2 x current level

- perception
  - increase with equipment
  - lower with wounds
  - bonus loot
  - find trap, monster chest
  - increase vision
    - show next room
    - show 2 next rooms
  
- fight
  - round based
  - player attacks first
  - attack
    - strength vs stamina
    - 50% (75% class weapon) to deal damage
    - dodge (0 - 50%)
  - damage
    - bonus with class weapon
    - random crit chance
      - double damage
    - weapon vs armor
    - rest goes against health

- armor
  - helmet
  - chest
  - pants
  - boots
  - gloves
  
- weapon
  - type
    - one hand
    - two hand
    - shield
  - damage
    - minimum
    - maximum
    - crit
      - double damage
  - effects
    - electricity (ignore some armor)
    - fire (damage every round)
    - ice (less attack)
    - poison (damage every round)
    - blind (less dodge)
      
- stats
  - strength
    - attack
  - stamina
    - defense
  - endurance
    - health
  - agility
    - dodge chance
    - disable trap, monster chest
  - power rating
    - strength + stamina + endurance + agility
    - balancing factors

- backpack
  - equipment
    - bonus to perception
  - endless storage
  - health potion
    - only usable during fights
    - refill at save point
    - upgrades
      - multiple charges
      - higher potency
      - upgrade with organs
  - bandage
    - only usable outside fights
    - refill at save point
    - upgrades
      - multiple charges
      - upgrade with cloth
  - armor improvements
    - increase level
    - upgrades
      - upgrade with bones, metal
  - craft equipment
    - find materials on monsters
    - tools
      - knife 2 x cloth
      - saw 2 x bones
      - spoon 2 x organs
      - hammer 2 x metal
      - improved tool

- randomly generated maps
  - save place at the end
  - if you die you lose everything you got in the map and go back to the last save place
  - three paths from the save place of varying difficulties
  - better rewards on higher difficulties
    - normal monster power / loot
    - +10% monster power / loot
    - +20% monster power / loot
  - paths
    - chances for
      - straight
      - left
      - right
      - crossing
      - dead end
    - contains
      - monster 50%
      - trap 10%
      - treasure chest 20%
      - empty 20%

- monster
  - random adjectives for strengths/weaknesses
    - giant smelly blind orc
    - 0 - 3 adjectives
      - giant (higher strength)
      - tiny (less strength)
      - smelly (poison cloud)
      - toxic (returns damage on hit)
      - blind (less dodge)
      - cautious (higher dodge)
      - wild (higher attack)
      - scared (less attack)
      - hardened (higher defense)
      - squishy (less defense)
  - elite
    - 10% chance
    - 90% power of player
    - barely beatable, maybe using one potion
    - playerlevel x 0.9 x stat
  - normal
    - 90% chance
    - 50-90% power of player
    - easily beatable
    - playerlevel x (0.5...0.9) x stat
  - 0 - 50% chance dodge

- treasure chest
  - loot 75%
  - monster 25%

- trap
  - disarm
  - damage

- loot
  - materials 33%
  - gold 34%
  - gear 33%

---

- cleared maps counter?
- shop?
  - buy weapons/armor?
- pet?
  - bonus perception?
  - helps in fight?
  - finds random loot?
- weather?
  - reduce effects with clothing?
  - reduced perception?
  - reduced fighting skills?
  
---

- backend
  - express
  - graphql
  - sql
  - jwt

- frontend
  - webpack
  - react

- hosting
  - heroku
  - elephantsql

- stuff
  - testing

---

- database
  - user
  - character

- dynamically generated
  - encounter
  - map
  - weapon
  - armor
  - backpack stuff

---

- user
  - username
  - email
  - password
  - [character id]
  - default character id

- character
  - name
  - level
  - class
  - base stats
    - strength
    - stamina
    - endurance
    - agility
  - gear
    - weapons
    - armor
      - helmet
      - chest
      - pants
      - boots
      - gloves
    - backpack
      - equipment
      - potions
      - bandages
      - crafting materials

- encounter
  - adjectives
    - giant (higher strength)
    - tiny (less strength)
    - smelly (poison cloud)
    - toxic (returns damage on hit)
    - blind (less dodge)
    - cautious (higher dodge)
    - wild (higher attack)
    - scared (less attack)
    - hardened (higher defense)
    - squishy (less defense)
  - stats
    - strength
    - stamina
    - endurance
    - agility
  - elite
    - true
    - false