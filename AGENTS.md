# Working on Kotoba

- Keep the user interface in Vietnamese and mark Japanese text with `lang="ja"`.
- This is an existing Next.js project. Extend its components and design system.
- Listening is deferred until the user explicitly requests it.
- Read `README.md` and `docs/ADDING_LESSONS.md` before adding lesson content.
- Add each lesson in one file under `data/lessons/` and register it in `data/lessons/index.ts`. Screens, filters, counts and review decks must derive from that registry.
- Use the supplied lesson as the source. Do not invent textbook passages or claim original examples are from the textbook. Label supplemental practice as authored content in the lesson source note.
- Preserve lesson IDs and item IDs once published: browser progress refers to them. The catalog scopes local IDs by lesson and content type.
- Every reading question must link to a complete passage. Every question needs an answer and an explanation. Avoid ambiguous single-answer questions.
- Grammar entries should include clear connection rules, contextual examples, common mistakes and distinctions from nearby patterns when applicable.
- Run `npm run typecheck`, `npm run check:content`, and `npm test` after content or learning-logic changes. Run `npm run build` after route, layout, component or dependency changes.
- Keep existing progress migration and export/import support working. Do not erase browser progress as part of testing.
