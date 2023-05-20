# 🏋️‍♀️ Gym Check-In API 🏋️‍♂️

RESTFul API for checking-in on a Gym

⚙ Made with:

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- Vitest
- PostgreSQL
- TSUP
- TSX
- Docker & Docker-Compose

📚 Concepts applied:

- SOLID
- Design Patterns (Repository Pattern, In-Memory Databases, Factory Pattern)

## FRs (Functional Requirements)

- [x] It should be possible to register;
- [x] It should be possible to authenticate;
- [x] It should be possible to get a signed-in User profile;
- [x] It should be possible to get the number of Check-Ins made by a signed-in User;
- [x] It should be possible to get the an User History of Check-Ins;
- [x] It should be possible to find nearby Gyms (max 10km);
- [x] It should be possible to find a Gym by it's name;
- [x] It should be possible to an User to Check-In on a Gym;
- [x] It should be possible to validate an User's Check-In;
- [x] It should be possible to register a Gym;

## BRs (Business Rules)

- [x] An user can't be registered with a duplicated e-mail;
- [x] An user can't check-in two times in the same day;
- [x] An user can't check-in if not within 100m from the gym;
- [ ] A check-in can be only validated 20 minutes after its creation;
- [ ] A check-in can be only validated by administrators;
- [ ] A gym can be only registered by administrators;

## RNFs (Non-Functional Requirements)

- [x] User's password must be encrypted;
- [ ] The Data must be stored in a PostgreSQL RDBMS;
- [ ] All data lists must be paginated with a max of 20 itens per page;
- [ ] The user must be identified by a JWT;
