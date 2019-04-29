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
    - strength
  - thief
    - 25% bonus attack with two one-handed weapons
    - agility
  - paladin
    - 25% bonus attack with one-handed weapon and shield
    - stamina

- level
  - level up after clearing a map
  - 90% chance to increase class stat
  - 50% chance to increase stat

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
  - addon
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
  - crafting
    - find materials on monsters
    - materials
      - cloth
      - bones
      - organs
      - metal
    - tools
      - one for each material
      - 2 x materials from looting

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
      - trap 20%
      - treasure chest 20%
      - empty 10%

- monster
  - stats
    - strength
    - stamina
    - endurance
    - agility
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
    - playerlevel x 0.5...0.9 x stat
  - dodge
    - 0 - 50% chance

- treasure chest
  - loot 75%
  - monster 25%

- trap
  - strength 10% - 100%
  - find with perception
    - disarm with agility
      - success
      - damage
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
- wounds from traps / monsters?
  - heal with material?
  
---

- backend
  - express
  - graphql
  - sql
  - jwt

- frontend
  - react

- hosting
  - heroku
  - elephantsql/heroku

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

- character
  - user id
  - name
  - level
  - class
  - weapon
    - type
    - name
    - value
  - armor
    - type
    - name
    - value
  - addon
    - name
    - value
  - materials
    - type
    - amount
  - tools
    - type
    - name
    - value
  - potion
    - name
    - amount
    - value
  - bandage
    - name
    - amount
    - value

---

- 1 map
  - 10 rooms
    - monster 50%
      - normal 90% / elite 10%
      - stats
        - player power rating x 0.5...0.9 x stat
        - player power rating x 0.9 x stat
          - strength
          - stamina
          - endurance
          - agility
        - dodge 0% - 50%
      - adjectives
      - loot
        - materials 33%
          - cloth 25%
          - metal 25%
          - bones 25%
          - organs 25%
        - gold 34%
        - gear 33%
    - treasure chest 20%
      - loot 75%
      - monster 25%
        - normal 90% / elite 10%
        - stats
        - loot
          - materials 33%
          - gold 34%
          - gear 33%
    - trap 20%
    - empty 10%

---

- frontend:

- backend:
  - create room
    - treasure chest
      - monster
      - loot
    - monster --- DONE
    - empty

  - get loot
  
  - create character
    - class

  - account
    - register
    - login

  - fight