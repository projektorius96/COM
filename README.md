# Canvas Object Model (COM)

### Motivation

Nowadays we can see more and more use cases of canvas object model (hence COM): _one good example is a word processor whose all render logic is reflected within drawn pixels_. Think of COM as a, _however not perfect_, but starter boilerplate that strives to help you understand what is Canvas Object Model paradigm as a whole;

### Installation

`npm ci && npx vite serve --open`

### <u>Goals</u>

1. **Text detection integration**;
2. **Control characters** (_hereinafter referred to as "chars" for "characters"_) is grey-listing switch statement-based control flow for various print characters : _we don't want literal chars such as "Enter", "Shift", etc. be raw-printed on the screen_;
3. **Text selection** with `Konva.Transformer`;
3. **Text cursor** [see commit, line:56](https://github.com/projektorius96/COM/commit/bb9d9a11ee6f5c2909d1f6ddd713d7680bdf8112#diff-58417e0f781b6656949d37258c8b9052ed266e2eb7a5163cad7b0863e6b2916aR56);

---

### <u>Related</u>

- [Data model | html.spec.whatwg](https://html.spec.whatwg.org/multipage/interaction.html#data-model)
- [Key alphanumeric writing system | www.w3.org ](https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system)

