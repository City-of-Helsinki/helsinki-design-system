# Why

# About BEM

BEM methology has three entities: "block", "modifier" and "element".

# Added controls

"Extras" adds conditional output that can be used to allow/disallow groups of entities or media queries.

# How css is created

## Blocks

```css
// scss
@include block {
  // contents
}

results in (default, the 'blockName' is set in config) .hds-blockName {
  // contents
}
```

## Modifiers

```css
// scss
@include block {
  @include modifier('modifierName') {
    // contents
  }
}

// results in
.hds-blockName__modifierName {
  // contents
}
```

## Elements

```css
// scss
@include block {
  @include modifier('modifierName') {
    @include element('elementName') {
      // contents A
    }
  }
  @include element('elementName') {
    // contents B
  }
}

// results in
.hds-blockName__modifierName--elementName {
  // contents A
}
.hds-blockName--elementName {
  // contents B
}
```

There are also other @includes

- content
- extra
- custom
- if-content-allowed
- selector-list
- compound-entity?
- descendant-entity?
- compound-block-modifier
- descendant-modifier-element
- block-element
- descendant
- class
- repeat
- repeat-with-replace
- create-custom-selector
- create-custom-level

Explanations below.

## Parameters

Emitted output is controlled with parameters.

### Entities explained

There are three entities in BEM: block, modifier and element. Read more in...

### Rules explained

---

- "modifiers" define which modifiers are emitted. Also includes elements's css nested in the modifier.
- "elements" define which elements are emitted outside of modifiers.
- "extras" define extra conditional boolean settings for special cases like media queries

---

Emitted entities are controlled by rules. "block" is simple, it is just name used in the css class of a block. Blocks are not named in the scss, because there should be only one block in each scss.

By default everything is allowed.

In some cases you only want parts of the css, not everything. The "modifiers" and "elements" are used for controlling the emitted output. Each modifier and element has a name

```css
@include modifier('modifierName') {
    @include element('elementName') {
```

Those names are also used in the rules.

```css
$modifiers: (
  'modifierA': false,
  'modifierB': (
    'elementName': false
  )
);

$elements: 'elementName';
```

If a value is a boolean, "true" allows everything and "false" disallows.

If a value is a string, it names the modifier/element to allow. All other ones are disallowed and not emitted.

If a value is a map, it has name/rule pairs that names explicitly what modifiers/elements are emitted.

"elements" is a name/boolean map.

```css
$elements: (
  'elementA': true,
  'elementB': true
);
```

"modifiers" is a name/boolean or a name:(elementName/boolean) map.

```css
$modifiers: (
  'modifierA': true,
  'modifierB': (
    'elementA': true,
    'elementB': true
  )
  ;
);
```

**Very important rule to remember: if one named entity is allowed, all other ones are disallowed!**

### The "block" rule

Not really a rule. Just the name of the block to output. The css class includes also prefix "hds-". This can be overridden with "config".

The output of a block's css can be controlled with "custom" and "extras" and most simply, with "if-content-allowed".

### The "modifiers" rule

Modifers to emit. By default all modifiers are emitted.

The value can be a boolean, string or map.

Boolean true/false allows/disallows all modifiers. Default is

```css
$modifiers: true;
```

If value is a string, only that modifier is emitted.

```css
$modifiers: 'name of the modifier';
```

If value is a map, modifiers are emitted according to the values.

```css
$modifiers: (
  'modifierA': false,
  'modifierB': false
);
```

All modifiers except "modifierA" and "modifierB" are emitted.

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

```css
$modifiers: (
  'modifierA': true,
  'modifierB': true
);
```

Only modifiers "modifierA" and "modifierB" are emitted.

**If a modifier is set, base elements are not allowed!**

#### "modifiers" elements

Single element in a modifier can be allowed or disallowed

```css
$modifiers: (
  'modifierA': (
    'element': true
  ),
  'modifierB': 'element'
);
```

The 'element' and only that element is emitted in the modifiers.

If value is a string, only that element is emitted.
If value is a map, the emitted elements are picked like modifiers would be.

### The "elements" rule

The "elements" define what css for elements should be outputted.

#### The "base" element

There is a special element named "base" which is for the base rules for block, modifiers and element.

```css
.block {
  block base rules
  color: #f00;

  .block--modifier {
    modifier base rules
    background-color: #f00;
    .block__element {
      element base rules
      padding: 0;
    }
  }
}
```

To control the output of base rules, `@content("base")` should be used. There is no automatic way to pick base rules, so the css must be wrapped.

Usually base is only used in the block level, because other entities are controlled with "elements" and "modifiers".

--
"base" is reserved element name to target rules for the base css of an entity
CSS:
.block--modifier-dark {
padding:0;
margin: 0;
&\_\_element-button {
}
}

The "padding" and "margin" are base css. In order to prevent them to be emitted, the should be marked as "base". See @exported.scss

Elements can be allowed/disallowed in "modifiers", and the rules set in "modifiers" override "elements".

("elements":"buttons","modifiers":"dark")
Only the element "buttons" in the modifier named "dark" is emitted. The base css of the "modifierName" is not emitted.

"elements":("buttons":true,"select":false) ,
"modifiers":("dark":("buttons":false,"select":true),"light":("select":true))
Emits only "select" element in "dark" and "light" modifiers.
--

**If a modifier is set, base elements are not allowed!**

!! content() is ruled with elements
!! extra, extra-selector is ruled with extras

### The "extras" rule

The "extras" should only be "name:true/false" values.

#### Other elements

Other elements can be named in any way.

### Values

All elements are outputted by default. See...

### "modifiers"

### "extras"

### "all"

### What about "content"?

The argument for the `@contents($elementName)` is an element's name. Usually only "base" is used.

By default, everything is outputted.
"all" is changed to false if

- a modifier has explicitly set value (string/bool/map)
- an element ihas explicitly set value (string/bool/map)
- an extra has explicitly set value (string/bool/map)
- "extras" is false
- "modifiers" is false
- "elements" is false

### Values

Setting a parameter `false`, prohibits all its targets from the output.

For example `elements:false` prohibits all elements.

Setting a parameter `true` (default), allows all its targets.

Setting a single target parameter `false`, prohibits that target from the output.

For example `elements:("base":false)` prohibits "base" element.

Setting a single target parameter `true`, prohibits all other targets from the output and allow only that.

Setting multiple target parameters 'true', allows all those targets.

#### Examples

Let's say there is a following css-structure:

```
- block
  - base content
  - element: table
  - element: button
  - modifier: dark
    - element: table
    - element button
  - modifier: light
    - element: table
    - element button

```

Parameters `("element":"base")` outputs

```
- block
  - base content
  - modifier: dark
  - modifier: light

```

Parameters `("modifier":"dark")` outputs

```
- block
  - modifier: dark
    - element: table
    - element button
```

## If there is NO parent selector in the css ($globalRules.parent does not exists):

By default top level selector is `.hds-<block>`
Modifiers and elements are appended to it with `__element` or `--modifier`

Nested rules are added normally.

```
     @include block{
        div {
          ...
        }
        @include element;
     }
```

will result in

```
.hds-<block> div {
  ...
}
.hds-<block> __<element > {
  ...
}
```

## If there is a parent selector in the css ($globalRules.parent exists)

If the rule (block, modifier, element, etc) is the first nested rule, then only its @content is outputted.

```

.mySelector {
@include block/modifier/element/etc;
}

```

will result in

```

.mySelector {
...@content of block/modifier/element/etc;
}

```

If the rule (block, modifier, element, etc) is NOT the first nested rule, then normal nesting is applied

```

.mySelector {
@include block { (this is the first)
@include element (this is NOT the first);
}

```

will result in

```

.mySelector {
...@content of block
}

.mySelector\*\*element {
...@content of element
}

```

with block() and content(), the @content is outputted
Modifiers and elements are appended to the parent with \*\*<element> or --<modifier>
Nested rules are added normally.

## Overriding automatically created selectors

Selectors can be set with named parameters. If element or modifier values are strings, they are considered as selector overrides

```

element:("content":" section")
modifier:("dark":".variantX ")

@include block {
@include element("content"){

}
@include modifier("dark"){

}

}

```

will result in

```

.hds-<block> section {}
.hds-<block>.variantX {}

```

and NOT

```

.hds-<block>\_\_content {}
.hds-<block>--dark {}

```

Overriding a top level block is not possible with named parameters.
But wrapping with a parent selector will do the same

```

.block-override {
@include ...
}

```

will result in

```

.block-override {
...block contents without selector.
}

```

## Special cases

### No need for block's base styles / base styles NOT outputted

If any modifier's in the parameters are explicitly set to "true"/"string", the block's base styles are NOT outputted.
If parameter "modifiers" is omitted, all base styles are outputted
If parameter "modifiers" is "true", all base styles are outputted
If parameter "modifiers" is a map and any ("modifierName":true/string), base styles are NOT outputted

#### Need block base styles and a modifier together?

Add two calls to the scss function,

### Overrides not in output

If there is a parent selector in the css, first nested rule selectors or overrides are not outputted

```

@include scssFunc(params){
  @include block(){
    @include modifier("dark"){
    ....modifier css
    }
  }
}

```

Without parent selector:

```

@include scssFun((modifier:("dark":".variantX "))){}

```

output

```

.hds-<blockName>.variantX{
  ....modifier css
}

```

With parent selector:

```

.mySelector {
  @include scssFun((modifier:("dark":".variantX "))){}
}

```

output

```

.mySelector
  ....modifier css
}

```
