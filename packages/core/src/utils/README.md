# Why

The purpose of this library is to create css with sass that can output partial css rules, multiple partials, or all possible rules. CSS selectors can also be renamed and custom css selectors can be added.

Usually the output is for a single component, but there are no limits how complex the output can be. Better to split css to smaller pieces. The mixins can be nested.

Css is defined in a `@mixin` and calling it with different arguments outputs css for different purposes.

For example the output can include all rules and selectors

```css
.my-button {
  // css
}
.my-button--primary {
  // css
}
.my-button--primary--small {
  // css
}
.my-button--primary--small__label {
  // css
}
```

Or just one element

```css
.my-button--primary--small__label {
  // css for one element
}
```

The `multi-sass` creates this by calling

```css
// outputs all css rules
@include MyButton();
```

Or just one element

```css
// outputs the css for "primary" and "small" modifiers and the "label" element.
@include MyButton( { $modifiers:('small': true, 'primary': true), $elements:'label'});
```

# Made for BEM

The arguments of the `multi-sass` mixins match the entities in the BEM methology used in HDS. Some special cases, like themes, variants and media queries require more fine-tuning, so there are alo arguments unrelated to BEM.

BEM methology has three entities: "block", "modifier" and "element" which are also argument names in `multi-sass`.

Every component is a "block" entity in HDS. "Modifier" is usually a variant of the component. "Element" is a child element inside the component.

[Read more about bem methology](https://en.bem.info/methodology/).

# Made for multi-purpose output

It's easy to make scss that outputs everything. By default the `multi-sass` does exactly that, because default arguments enable output for all rules. Enabling or disabling partials is possible with arguments and the output can be customised for multiple purposes.

# Arguments

## Block

Given block is outputted as `.hds-<block>`. The "hds-" prefix is automatically added. It can be overridden with "$config".

Block is defined is the css as

`@include block`

The name of the block is picked from the arguments and is not passed to the `block` mixin.

## Modifiers

Modifiers are outputted as `<parent selector>--<modifier name>`. The "--" prefix is automatically added. It can be overridden with "$config".

A modifier is defined is the css as

`@include modifier('modifier-name')`

## Elements

Elements are outputted as `<parent selector>__<element name>`. The "\_\_" prefix is automatically added. It can be overridden with "$config".

An element is defined is the css as

`@include element('element-name')`

## Extra

The "extra" argument is for outputting css conditionally. Values of each "extra" are therefore booleans indicating should a part of the css be outputted or not.

An extra css block is defined is the css as

`@include extra('name')`

## Config

Config is used for overriding default settings. For example all blocks are prefixed with "hds-" and it can be overridden in the config.

## Alias

The `$alias` argument is for renaming selectors in the css output. The argument is a map in a format of `("name-to-rename":"new-name")`. Names are not entity specific, but entities rarely have same names.

```css
// scss
@include modifier('mod1') {
  @include element('elem1') {
   }
}

// initialization
init-`multi-sass`(
$alias: (
  'mod1': 'cool-mod',
  'elem1': 'nice-element',
));

// result
.hds-blockName.cool-mod .nice-element {
  // css for one element
}

```

Note that delimeters ("\_\_" or "--") are not appended to aliases.

# Special new entity "content"

The "content" is a mixin used to mark css that is just css content, no selectors are created. Using the `@include content(<name>)` is useful when a css should not be outputted every time.

There is no `$content` argument to keep arguments simpler. Content uses element names when checking is it allowed or not. The `<name>` is compared to `$elements`.

Note that same logic can be achieved with `@include extra(<name>)`. "Content" is clearer way to indicate it is not an special case, it is just content.

**This is mainly used for indicating a css block should not always be outputted. **

## Important custom content "base"

Each block has its so called "base" (aka. main/root/default) rules, the css right after the selector

```css
// scss
@include block {
  // base css
}

// output
.hds-blockName {
  // base css
}
```

There must a way to exclude that from the output. If the rules are just written there, they are always outputted.
To control the output of base rules, `@include content("base")` can be used. There is no automatic way to pick base rules, so the css must be wrapped with an "@include".

`multi-sass` has a special and reserved element name for that: "base". If used manually, the scss would be:

```css
@include block {
  @include content('base') {
  }
}
```

There is a special `@include` for this.

```css
@include block {
  @include if-content-allowed {
  }
}
```

Note that the `if-content-allowed` can be used inside any `@include`, not just "block".

```
@include MyButton( { $elements:'base'});
```

**The base is affected by the same rules as all entities. It is not outputted if others are explicitly allowed.**

# Rules

The arguments of the mixins are called rules.

`$modifiers` define the rules for the outputted css of all modifiers.
`$elements` define the rules for the outputted css of all elements.
`$extras` define the rules for other outputted css, like media queries and special cases.

In some cases you only want parts of the css, not everything. These rules control the outputted output. The output of a modifier, element or extra can be either allowed or disallowed. By default, all outputs is allowed.

## Rule logic

If the value is a boolean, "true" allows everything and "false" disallows.

If the value is a string, it names the allowed modifier/element. All other ones are disallowed and not outputted.

If the value is a map, it has name/rule pairs that names explicitly what modifiers/elements are allowed and outputted.

**Very important rule to remember: if one named entity is allowed, all other ones are disallowed!**

### The "modifiers" rule

Defines which modifers are outputted. By default all modifiers are outputted.

The value can be a boolean, string or map. The map can be a nested map. Nested map is considered to contain rules for elements inside the modifier.

Boolean true/false allows/disallows all modifiers. Default is

```css
$modifiers: true;
```

If value is a string, only that modifier is outputted.

```css
$modifiers: 'name of the modifier';
```

If value is a map, modifiers are outputted according to the values.

```css
$modifiers: (
  'modifierA': false,
  'modifierB': false
);
```

All modifiers except "modifierA" and "modifierB" are outputted.

Note that the following settings are identical

```css
$modifiers: (
  'modifierA': true
);
$modifiers: 'modifierA';
```

If an modifier is explicity allowed, all other modifiers are disallowed. Unless also allowed explicitly.

Disallowing 'modifierB' is not necessary here:

```css
$modifiers: (
  'modifierA': true,
  'modifierB': false
);
```

Multiple entities are allowed by naming them explicitly.

```css
$modifiers: (
  'modifierA': true,
  'modifierB': true
);
```

Only modifiers "modifierA" and "modifierB" are outputted.

**If a modifier is set, base elements are not allowed!**

### "modifiers" elements

Single element in a modifier can be allowed or disallowed

```css
$modifiers: (
  'modifierA': (
    'element': true
  ),
  'modifierB': 'element'
);
```

The 'element' and only that element is outputted in the 'modifierA' and 'modifierB'.

### The "elements" rule

Defines which elements are outputted. Rule logic is the same as with modifiers. Except the value cannot be a nested map, because there are nothing to target the nested map with.

#### The important "base" content

A reminder that "base" content is controlled with `$elements`!

### The "extras" rule

The "extras" should only consist "name:true/false" values. Usage is simple:

```css
@include extra('theme-black') {
}

@include MyButton($extra:('theme-black':true);
```

Other usages are for example media queries.

# How to create mixins

`multi-sass` is used with mixins. The mixin should accept same arguments as the `multi-sass` and pass them to a function named `init-multi-sass`. The function must also receive a argument named "$block" that is used in every css selector.

For example `init-`multi-sass`($block:'button')` will output css selector `.hds-button`.

Modifiers of that block are outputted as `.hds-button--modifier` and elements as `.hds-button__element` or `.hds-button--modifier__element`.

Nested modifiers and elements always append selectors to the parent, not to the "root" block, so the output can contain deep selectors like `.hds-button--modifier--childModifier div button--buttonModifier__label`.

Names of the "modifiers" and "elements" are defined inside the mixin with

```css
@include modifier('primary') {
  //
  @include element('label') {
    //
  }
}
```

A mixin that starts with `init-multi-sass` should end with `end-multi-sass`. This is not compulsory, but nested `multi-sass` mixins will not work properly as they will lose their context.

## An example

SCSS files should import the `_exports.scss` and have a `@mixin` with three named arguments. The arguments are passed to the `init-multi-sass` function that controls which css is outputted.

### The SCSS file

Example of `my-button.scss`.

```css
@use '<path>/`multi-sass`/exports' as *;

// the default value of "true" means all modifiers, elements and extras should be outputted

@mixin MyButton($elements: true, $modifiers: true, $extras: true) {
  // init and start the process
  // "$void" has to be used here, because the returned value from a function must be handled.

  $void: init-`multi-sass`(
    $modifiers: $modifiers,
    $elements: $elements,
    $extras: $extras,
    $block: 'my-button',
  );

  // block should be the first entity
  @include block {
    // base css for the block

    @include element('label') {
      // css for the nested "label" element
    }

    @include modifier('primary') {
      // css for the "primary" modifier
      @include element('label') {
        // css for the nested "label" element in the "primary" modifier
      }
    }
  }
  // tell that the process ends here
  $void: end-`multi-sass`();
}
```

#### Usage of the SCSS file

```css
@use '../my-button' as *;

// emit all css rules
@include MyButton;

// emit only the "label" element of the "primary" modifier.
@include MyButton(
  $modifiers: (
    'primary': (
      'label': true
    )
  )
);
```

# The code

## \_rules.scss

The output is controlled with rules. Rules allow or disallow entities and therefore control the output.

## \_levels.scss

The blocks of `@include`s in a scss form a nested hierarchy. The same hierarchy followed in `multi-sass`. Each `@include` is called a "level" in the code. Levels have a type (block, modifier, element, etc.) and a name.

Everytime a level is being processed the rules are checked if the type and name are allowed in the rules. If not, the level or none of its child levels are outputted.

Levels are also used for finding the closest type of entity and getting parent selector to append to.

## \_process.scss

Process creates levels and handles the output with rules.

## \_selectors.scss

Css selectors are created here

## \_output.scss

Writes the output. Handles scenarios where the output should be only content, not selectors and nested content.

## \_exports.scss

Exported functions that should be used to run the `multi-sass`

## \_globals.scss

Creates, stores and handles global variables. Stores also the config. Each `mixin` using the `init-multi-sass` creates a new controller with its own config. This allows each mixin to have their own config and mixins can be nested.

Each nested entity is processed in the context of a controller so there is no need to pass arguments to each `@include` making the code cleaner.

## Other exported mixins and includes

There are also other @includes

### custom

Use `@include custom("#selector")` to output any selector.

The difference between using the `custom("#selector"){...}` and just plain css `#selector{...}` is that custom creates a `level` and can be controlled like other levels.

### selector-list

Use `@include selector-list("#selector")` to output complex selectors with a one-liner.

```css
selector-list((('modifier': 'hello'), ('modifier': 'hello2'), ('element': 'elem'), ('custom': ' div'))) {
  ...;
}
// outputs
.hds-test--hello,
.hds-test--hello2,
.hds-test__elem,
.hds-test div {
  ...;
}
```

### linked-entities

Combines given selectors with selectors from closest entities of given type. This mixin has shorthands named `compound-entity`, `descendant-entity` and `compound-block-modifier`. They set the arguments automatically.

```css
@include linked-entities(
  $block: true,
  $typeAndName: (
    'type': 'modifier',
    'name': 'mod1',
  ),
  $separator: ''
) {
  // css
}
```

Finds the closest block, copies its selector and creates a new selector with modifier named "mod1". It merges the block's selector with the created selector. The selectors are separated with given separator "". Empty separator creates a compound selector of `.hds-blockName.hds-blockName--mod1`

If the "$separator" was " ", the output would be `.hds-blockName .hds-blockName--mod1`.

**Can be nested! Nested calls will create new selectors from the closest entity, not the parent!**

```css
@include modifier('sibling-modifier') {
  // css of sibling-modifier
  @include compound-block-modifier('compound-modifier') {
    // css  of compound-modifier
    @include element('compound') {
      // css  of compound
    }
  }
}
// creates

.hds-test--sibling-modifier {
  // css of sibling-modifier
}

.hds-test--sibling-modifier.hds-test--compound-modifier {
  // css  of compound-modifier
}

.hds-test--sibling-modifier.hds-test--compound-modifier__compound {
  // css  of compound
}
```

This decreases the amount of nested code.

### compound-entity

Shorthand to create a compound selector. Calls the `linked-entities` with `$separator: ""`.

### descendant-entity

Shorthand to create a compound selector. Calls the `linked-entities` with `$separator: " "`.

### compound-block-modifier

Shorthand to create a compound selector from closest block and a modifier. Calls the `compound-entity` with `$block: true` and appends modifiers to the closest block.

```css
@include block() {
  div.xyz {
    @include ('mod1') {
      @include compound-block-modifier('compound-mod1') {
      }
    }
  }
}
// creates

.hds-blockName div.xyz--mod1.hds-blockName--compound-mod1 {
}
```

### descendant-modifier-element

Copies closest modifier and apppends an element to it and appends selector as a descendant.

```css
@include modifier('mod1') {
  @include descendant-modifier-element('element1') {
  }
}
// results in
.hds-test--mod1 .hds-test--mod1__element1;
```

### descendant-block-modifier

Identical to the `compound-block-modifier`, but selectors are separated with " ", making them descendants of the parent.

### block-element

Creates a element for the closest block. Can be called inside any entity.

```css
@include modifier('modifier') {
    @include block-element('block-element')
    }
}
// Results in
 .hds-blockName--modifier .hds-blockName__block-element
```

### descendant

Appends a selector to the parent as a descendant.

```css
 @include modifier('modifier') {
    @include @include descendant('p')
    }
 }
// Results in
 .hds-blockName--modifier p {}
```

### class

Appends a class name to the parent selector .

```css
 @include modifier('modifier') {
    @include @include class('extra')
    }
 }
// Results in
 .hds-blockName--modifier.extra {}
```

### repeat

Finds the closest entity that matches the given arguments and repeats its selector again

```css
@include block() {
  @include repeat($block: true) {
    @include repeat($block: true) {
    }
  }
}
// Results in
.hds-blockName .hds-blockName .hds-blockName {
}
```

### repeat-with-replace

Like repeat, but finds and replaces strings in the selector.

```css
@include block() {
  @include repeat-with-replace($original: '-blockName', $replacement: '-replacement', $block: true) {
  }
}
// Results in
.hds-blockName .hds-replacement {
}
```

### create-custom-selector

Uses a passed function to create a selector. The passed function is called with rules, config and the current level. The function must return only a string.

```css
$passedFunction($ruleMap, $config, $currentLevel)
```

This mixin outputs nested css rules directly without creating a level.

### create-custom-level

Uses a passed function to create a new level as a child to current level. The passed function is called with rules, config and the current level. The function must return a valid level which must have a selector for output.

```css
$passedFunction($ruleMap, $config, $currentLevel)
```

## Config

### blockName

Can be set, but should not be used. Overrides the "$block" passed to the `init-multi-sass`.

`init-`multi-sass`($block:'button', $config:($blockName:'override'))` will output css selector `.hds-override` instead of `.hds-button`.

### rootSelector

Not in use.

### blockPrefix

The prefix used when creating the block level selector. The selector is `.<$blockPrefix><$block>`. Default is "hds-".

`init-`multi-sass`($block:'button', $config:($blockPrefix:''))` will output css selector `.button` instead of `.hds-button`.

### modifierDelimeter

The delimeter used when creating a modifier level selector. The selector is `.<parent selector><$modifierDelimeter><$modifier>`. Default is "--".

### elementDelimeter

The delimeter used when creating an element level selector. The selector is `.<parent selector><$elementDelimeter><$element>`. Default is "\_\_".

### alias

Aliases are stored in config.

### emitContentOnly

Sometimes the output only contain css without selectors. For example if the output should be placed inside a custom selector. The `emitContentOnly` can have two values: 'root' or 'all'. Default is null.

For example using

```css
.wrapper {
  @include myMultiSassComponent {
  }
}
```

could result in

```css
.wrapper .hds-blockName {
  // block css
}
.wrapper .hds-blockName--modifier {
  // modifier css
}
```

But with the 'root' value

```css
.wrapper {
  @include myMultiSassComponent(
    $config: (
      'emitContentOnly': 'root'
    )
  );
}
```

results in

```css
.wrapper {
  // block css
}
.wrapper--modifier {
  // modifier css
}
```

And with the 'all' value, all css is outputted to the nearest entity. This is useful when outputting a deeply nested css into a wrapper selector.

```css
.wrapper {
  @include myMultiSassComponent(
    $config: (
      'emitContentOnly': 'all'
    )
  );
}
```

results in

```css
.wrapper {
  // block css
  // modifier css
}
```
